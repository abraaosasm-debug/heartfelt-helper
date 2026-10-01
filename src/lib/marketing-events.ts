import { canTrackMarketing } from "@/lib/marketing-consent-state";

export function trackMarketingEvent(name: string, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !canTrackMarketing() || !window.fbq) return false;
  window.fbq("trackCustom", name, parameters);
  return true;
}
