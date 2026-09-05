/**
 * DOM-парсер карточек Air-листинга.
 * Селекторы держать в синхроне с
 * extensions/air-skugr-fill/parseAirListing.js
 * и src/modules/browser/air/group-pages/utils/parseAirGroupListingPage.ts
 */

const LAZY_IMAGE_MARKER = "lazy-image.svg";
const GRID_SEL = "#us-category-products, .us-category-products";
const CARD_SEL =
  "div.product-layout[data-pid], div.product-layout[data-product-id]";
const PAGINATION_NEXT_SEL =
  ".pagination li.active + li a, .us-pagination li.active + li a";

export interface AirListingProduct {
  productId: string;
  title: string;
  url: string;
  imageUrl: string;
}

export interface AirListingPayload {
  products: AirListingProduct[];
  nextPageUrl: string | null;
  hasListingMarkup: boolean;
}

function resolveHref(href: string | null | undefined, pageUrl: string): string | null {
  const trimmed = String(href || "").trim();
  if (!trimmed || trimmed === "#") {
    return null;
  }
  try {
    return new URL(trimmed, pageUrl).toString();
  } catch {
    return null;
  }
}

function pickProductCards(doc: ParentNode): NodeListOf<Element> {
  const grid = doc.querySelector(GRID_SEL);
  if (grid) {
    const fromGrid = grid.querySelectorAll(CARD_SEL);
    if (fromGrid.length > 0) {
      return fromGrid;
    }
  }

  const content = doc.querySelector("#content");
  if (content) {
    const fromContent = content.querySelectorAll(CARD_SEL);
    if (fromContent.length > 0) {
      return fromContent;
    }
  }

  return doc.querySelectorAll(CARD_SEL);
}

function extractImageUrl(
  img: Element | null,
  pageUrl: string,
): string | null {
  if (!img) {
    return null;
  }
  const src = (img.getAttribute("src") || "").trim();
  const dataSrcset = (img.getAttribute("data-srcset") || "").trim();
  const dataSrc = (img.getAttribute("data-src") || "").trim();

  if (src && !src.includes(LAZY_IMAGE_MARKER)) {
    return resolveHref(src, pageUrl);
  }

  if (dataSrcset) {
    const firstPart = dataSrcset.split(/\s+/)[0]?.trim();
    if (firstPart) {
      const resolved = resolveHref(firstPart, pageUrl);
      if (resolved) {
        return resolved;
      }
    }
  }

  if (dataSrc) {
    return resolveHref(dataSrc, pageUrl);
  }

  if (src) {
    return resolveHref(src, pageUrl);
  }

  return null;
}

function textContent(el: Element | null): string {
  return el && typeof el.textContent === "string" ? el.textContent : "";
}

function cardProductId(card: Element): string {
  return (
    card.getAttribute("data-pid") ||
    card.getAttribute("data-product-id") ||
    ""
  ).trim();
}

function cardTitleLink(card: Element): Element | null {
  return (
    card.querySelector(".us-module-title a") ||
    card.querySelector(".caption a") ||
    card.querySelector("h4 a") ||
    card.querySelector(".us-module-img a")
  );
}

function queryWithoutPage(url: URL): string {
  const params = new URLSearchParams(url.search);
  params.delete("page");
  const normalized = new URLSearchParams();
  for (const key of [...new Set(params.keys())].sort()) {
    for (const value of [...params.getAll(key)].sort()) {
      normalized.append(key, value);
    }
  }
  return normalized.toString();
}

/**
 * Дзеркало контракту fill-page: origin + pathname, query збігається крім `page`.
 */
export function isSameAirCategoryUrl(
  baseUrl: string,
  candidateUrl: string,
): boolean {
  try {
    const base = new URL(baseUrl);
    const candidate = new URL(candidateUrl);
    if (base.origin !== candidate.origin) {
      return false;
    }
    if (base.pathname !== candidate.pathname) {
      return false;
    }
    return queryWithoutPage(base) === queryWithoutPage(candidate);
  } catch {
    return false;
  }
}

function getNextPageUrl(doc: ParentNode, pageUrl: string): string | null {
  const relNext = doc.querySelector('link[rel="next"]');
  const fromRel = relNext
    ? resolveHref(relNext.getAttribute("href"), pageUrl)
    : null;

  const paginationNext = doc.querySelector(PAGINATION_NEXT_SEL);
  const fromPagination = paginationNext
    ? resolveHref(paginationNext.getAttribute("href"), pageUrl)
    : null;

  const aRelNext = doc.querySelector("a[rel='next']");
  const fromAnchorRel = aRelNext
    ? resolveHref(aRelNext.getAttribute("href"), pageUrl)
    : null;

  for (const candidate of [fromRel, fromPagination, fromAnchorRel]) {
    if (candidate && isSameAirCategoryUrl(pageUrl, candidate)) {
      return candidate;
    }
  }
  return null;
}

/** Нет карточек и нет сетки категории — WAF/чужая страница, не пустой листинг. */
export function isAirListingParseFailed(payload: AirListingPayload): boolean {
  return payload.products.length === 0 && !payload.hasListingMarkup;
}

export function parseAirListingFromDocument(
  doc: ParentNode,
  pageUrl: string,
): AirListingPayload {
  const productsById = new Map<string, AirListingProduct>();

  pickProductCards(doc).forEach((card) => {
    const productId = cardProductId(card);
    if (!productId) {
      return;
    }

    const img = card.querySelector(".us-module-img img");
    const imageUrl = extractImageUrl(img, pageUrl);

    const titleLink = cardTitleLink(card);
    const title = textContent(titleLink).replace(/\s+/g, " ").trim();

    const imgLink = card.querySelector(".us-module-img a");
    const href =
      (imgLink && imgLink.getAttribute("href")) ||
      (titleLink && titleLink.getAttribute("href")) ||
      "";
    const url = resolveHref(href, pageUrl);

    if (!title || !url || !imageUrl) {
      return;
    }

    productsById.set(productId, {
      productId,
      title,
      url,
      imageUrl,
    });
  });

  return {
    products: [...productsById.values()],
    nextPageUrl: getNextPageUrl(doc, pageUrl),
    hasListingMarkup: Boolean(doc.querySelector(GRID_SEL)),
  };
}

export function parseAirListingFromHtml(
  html: string,
  pageUrl: string,
): AirListingPayload {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return parseAirListingFromDocument(doc, pageUrl);
}

export function isAirListingPayload(value: unknown): value is AirListingPayload {
  if (!value || typeof value !== "object") {
    return false;
  }
  const payload = value as Partial<AirListingPayload>;
  return (
    Array.isArray(payload.products) &&
    typeof payload.hasListingMarkup === "boolean" &&
    (payload.nextPageUrl === null || typeof payload.nextPageUrl === "string")
  );
}
