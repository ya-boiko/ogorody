import { NextResponse } from "next/server";
import { LeadSchema } from "@/lib/schemas";
import { submitLead } from "@/lib/leads";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  await submitLead(parsed.data);
  return NextResponse.json({ ok: true });
}
