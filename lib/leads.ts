import "server-only";
import type { Lead } from "./types";

export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  console.log("[lead]", JSON.stringify(lead));
  // TODO(backlog): deliver to email / Telegram / CRM once destination is decided
  return { ok: true };
}
