export interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  ADMIN_ORIGIN: string;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/auth") {
      return handleAuthStart(url, env);
    }
    if (url.pathname === "/callback") {
      return handleAuthCallback(url, env);
    }
    if (url.pathname === "/" || url.pathname === "") {
      return new Response(
        "ogorody-decap-oauth: GitHub OAuth proxy for Decap CMS.\n",
        { headers: { "content-type": "text/plain; charset=utf-8" } },
      );
    }
    return new Response("Not found", { status: 404 });
  },
};

function handleAuthStart(url: URL, env: Env): Response {
  const redirectUri = `${url.origin}/callback`;
  const ghUrl = new URL("https://github.com/login/oauth/authorize");
  ghUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  ghUrl.searchParams.set("redirect_uri", redirectUri);
  // Force public_repo scope: our content repo is public, this caps blast
  // radius if the issued token leaks (no read access to private repos).
  ghUrl.searchParams.set("scope", "public_repo");
  // Pass through CSRF state if Decap supplied one
  const state = url.searchParams.get("state");
  if (state) ghUrl.searchParams.set("state", state);
  return Response.redirect(ghUrl.toString(), 302);
}

async function handleAuthCallback(url: URL, env: Env): Promise<Response> {
  const code = url.searchParams.get("code");
  if (!code) {
    return renderClose("missing_code", null, env);
  }

  let token: string;
  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    if (!res.ok) {
      return renderClose(`token_http_${res.status}`, null, env);
    }
    const json = (await res.json()) as { access_token?: string; error?: string };
    if (!json.access_token) {
      return renderClose(json.error || "no_token", null, env);
    }
    token = json.access_token;
  } catch {
    return renderClose("token_fetch_failed", null, env);
  }

  return renderClose(null, token, env);
}

/**
 * Render the popup close-page that posts the result back to Decap and closes
 * the window. Decap listens for messages of shape:
 *   "authorization:github:success:{...json...}"   on success
 *   "authorization:github:error:{...json...}"     on failure
 */
function renderClose(error: string | null, token: string | null, env: Env): Response {
  // Fail closed if ADMIN_ORIGIN is missing — never broadcast to "*", a
  // misconfiguration must NOT silently expose tokens to any opener page.
  if (!env.ADMIN_ORIGIN || !env.ADMIN_ORIGIN.startsWith("https://")) {
    return new Response(
      "Worker misconfigured: ADMIN_ORIGIN is not set to an https:// URL.",
      { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }
  const target = env.ADMIN_ORIGIN;
  const payload = error ? { error } : { token, provider: "github" };
  const status = error ? "error" : "success";

  // Escape any HTML in the payload string just in case
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorising…</title></head>
<body><script>
(function () {
  var data = ${json};
  var target = ${JSON.stringify(target)};
  var finalMsg = "authorization:github:${status}:" + JSON.stringify(data);

  // Decap CMS uses the netlify-cms two-step handshake:
  //   1) popup posts "authorizing:github" to opener with "*"
  //   2) opener replies with "authorizing:github" (cue that listener is wired)
  //   3) popup posts "authorization:github:<status>:<payload>" with opener's origin
  function receive(e) {
    if (typeof e.data !== "string") return;
    if (e.data.indexOf("authorizing:github") !== 0) return;
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(finalMsg, e.origin || target);
    }
    window.removeEventListener("message", receive, false);
    setTimeout(function () { window.close(); }, 200);
  }

  window.addEventListener("message", receive, false);

  if (window.opener && !window.opener.closed) {
    // Step 1 announcement uses "*" because we don't yet know the opener's origin
    // for sure; the opener echoes back, and step 3 uses e.origin for token send.
    window.opener.postMessage("authorizing:github", "*");
  }
})();
</script></body></html>`;

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
