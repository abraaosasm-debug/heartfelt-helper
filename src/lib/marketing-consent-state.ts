let marketingAllowed = false;
export function canTrackMarketing() {
  return marketingAllowed;
}
export function setMarketingAllowed(allowed: boolean) {
  marketingAllowed = allowed;
  window.dispatchEvent(new Event("marketing-consent-change"));
}
