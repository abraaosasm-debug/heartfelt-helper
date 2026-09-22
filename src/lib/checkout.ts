// Set verified HTTPS checkout URLs when sales open. Never use "#" as a payment link.
export const checkoutUrls: Record<"essential" | "complete", string | null> = {
  essential: null,
  complete: null,
};
