import { parseAirListingFromDocument } from "./parseAirListing.js";

/**
 * Content script: карточки листинга Air из live DOM.
 * Селекторы: parseAirListing.js ↔ web parseAirListing.ts ↔ parseAirGroupListingPage.ts
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message && message.type === "GET_LISTING") {
    sendResponse(parseAirListingFromDocument(document, location.href));
  }
  return false;
});
