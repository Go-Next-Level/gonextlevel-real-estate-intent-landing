export const plans = [
  { id: "local5", name: "Local", price: 7, scope: "Up to 5 cities", use: "List building and CSV exports in your selected cities." },
  { id: "local10", name: "Multi-market", price: 27, scope: "Up to 15 cities", use: "List building and CSV exports across your markets, plus email enrichment." },
  { id: "nationwide", name: "Nationwide", price: 47, scope: "Across the U.S.", use: "List building and CSV exports nationwide, plus email enrichment and Watchlist." },
] as const;

export const sharedPlanBenefits = "All plans include unlimited contacts and CSV exports within your coverage. No free trial. Website visitor tracking (Pixel) is not included.";
export const sharedCityPolicy = "Your selected cities apply across all your lists. Fill unused slots anytime. A replacement takes effect at your next paid renewal. Nationwide does not require city selection.";
