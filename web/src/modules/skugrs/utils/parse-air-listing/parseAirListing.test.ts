import { describe, expect, it } from "vitest";
import {
  isAirListingParseFailed,
  isAirListingPayload,
  isSameAirCategoryUrl,
  parseAirListingFromHtml,
} from "@/modules/skugrs/utils/parse-air-listing/parseAirListing";

const PAGE_URL =
  "https://air.example.test/ua/index.php?route=product/category&path=1";
const PAGE2_URL = `${PAGE_URL}&page=2`;

function airProductCard(opts: {
  pid?: string;
  productIdAttr?: string;
  productPath: string;
  imageUrl: string;
  title: string;
  titleClass?: string;
}): string {
  const idAttr = opts.productIdAttr
    ? opts.productIdAttr
    : `data-pid="${opts.pid ?? ""}"`;
  const titleWrapClass = opts.titleClass ?? "us-module-title";
  return `<div class="product-layout product-grid" ${idAttr}>
    <div class="us-module-img">
      <a href="${opts.productPath}">
        <img src="${opts.imageUrl}" alt="" />
      </a>
    </div>
    <div class="${titleWrapClass}">
      <a href="${opts.productPath}">${opts.title}</a>
    </div>
  </div>`;
}

function airPageHtml(opts: {
  cards: string[];
  nextHref?: string;
  paginationHref?: string;
}): string {
  const next =
    opts.nextHref != null
      ? `<link rel="next" href="${opts.nextHref}" />`
      : "";
  const pagination =
    opts.paginationHref != null
      ? `<ul class="pagination">
          <li class="active"><span>1</span></li>
          <li><a href="${opts.paginationHref}">2</a></li>
        </ul>`
      : "";
  return `<!DOCTYPE html><html><head>${next}</head><body>
    <div class="row us-category-products">${opts.cards.join("")}</div>
    ${pagination}
  </body></html>`;
}

describe("parseAirListingFromHtml", () => {
  it("parses cards, title, urls, next page", () => {
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "111",
          productPath: "/ua/product/p111",
          imageUrl: "https://air.example.test/image/cache/a.jpg",
          title: "Balloon 10",
        }),
      ],
      nextHref: PAGE2_URL,
    });

    const result = parseAirListingFromHtml(html, PAGE_URL);

    expect(result.hasListingMarkup).toBe(true);
    expect(result.nextPageUrl).toBe(PAGE2_URL);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]).toEqual({
      productId: "111",
      title: "Balloon 10",
      url: "https://air.example.test/ua/product/p111",
      imageUrl: "https://air.example.test/image/cache/a.jpg",
    });
  });

  it("uses data-src when src is lazy placeholder", () => {
    const real = "https://air.example.test/image/cache/catalog/x-228x228.jpg";
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "9",
          productPath: "/ua/product/z",
          imageUrl:
            "https://air.example.test/image/catalog/1lazy/lazy-image.svg",
          title: "Z",
        }).replace(
          `src="https://air.example.test/image/catalog/1lazy/lazy-image.svg"`,
          `src="https://air.example.test/image/catalog/1lazy/lazy-image.svg" data-src="${real}"`,
        ),
      ],
    });

    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.products[0]?.imageUrl).toBe(real);
  });

  it("uses data-srcset when src is lazy placeholder", () => {
    const real = "https://air.example.test/image/cache/catalog/x-228x228.jpg";
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "9",
          productPath: "/ua/product/z",
          imageUrl:
            "https://air.example.test/image/catalog/1lazy/lazy-image.svg",
          title: "Z",
        }).replace(
          `src="https://air.example.test/image/catalog/1lazy/lazy-image.svg"`,
          `src="https://air.example.test/image/catalog/1lazy/lazy-image.svg" data-srcset="${real} 100w"`,
        ),
      ],
    });

    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.products[0]?.imageUrl).toBe(real);
  });

  it("empty grid is listing markup with no products", () => {
    const result = parseAirListingFromHtml(
      airPageHtml({ cards: [] }),
      PAGE_URL,
    );
    expect(result.hasListingMarkup).toBe(true);
    expect(result.products).toHaveLength(0);
    expect(result.nextPageUrl).toBeNull();
    expect(isAirListingParseFailed(result)).toBe(false);
  });

  it("parses cards from #content when category grid is missing", () => {
    const html = `<!DOCTYPE html><html><body>
      <div id="content">
        ${airProductCard({
          pid: "5",
          productPath: "/ua/product/c",
          imageUrl: "https://air.example.test/c.jpg",
          title: "C",
        })}
      </div>
    </body></html>`;
    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.hasListingMarkup).toBe(false);
    expect(result.products).toHaveLength(1);
    expect(result.products[0]?.productId).toBe("5");
  });

  it("reads data-product-id when data-pid is absent", () => {
    const html = airPageHtml({
      cards: [
        airProductCard({
          productIdAttr: 'data-product-id="77"',
          productPath: "/ua/product/d",
          imageUrl: "https://air.example.test/d.jpg",
          title: "D",
        }),
      ],
    });
    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.products[0]?.productId).toBe("77");
  });

  it("reads title from .caption a", () => {
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "3",
          productPath: "/ua/product/e",
          imageUrl: "https://air.example.test/e.jpg",
          title: "Caption title",
          titleClass: "caption",
        }),
      ],
    });
    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.products[0]?.title).toBe("Caption title");
  });

  it("uses OpenCart pagination when rel=next is missing", () => {
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "1",
          productPath: "/ua/product/p",
          imageUrl: "https://air.example.test/p.jpg",
          title: "P",
        }),
      ],
      paginationHref: PAGE2_URL,
    });
    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.nextPageUrl).toBe(PAGE2_URL);
  });

  it("skips cards without image title or url", () => {
    const html = airPageHtml({
      cards: [
        `<div class="product-layout" data-pid="1">
          <div class="us-module-title"><a href="/ua/product/p">T</a></div>
        </div>`,
      ],
    });
    const result = parseAirListingFromHtml(html, PAGE_URL);
    expect(result.hasListingMarkup).toBe(true);
    expect(result.products).toHaveLength(0);
  });

  it("WAF markup has no listing grid", () => {
    const result = parseAirListingFromHtml(
      "<!DOCTYPE html><html><body><h1>Захищена сторінка</h1></body></html>",
      PAGE_URL,
    );
    expect(result.hasListingMarkup).toBe(false);
    expect(result.products).toHaveLength(0);
    expect(result.nextPageUrl).toBeNull();
    expect(isAirListingParseFailed(result)).toBe(true);
  });

  it("accepts listing payload shape", () => {
    expect(
      isAirListingPayload({
        products: [],
        nextPageUrl: null,
        hasListingMarkup: true,
      }),
    ).toBe(true);
    expect(
      isAirListingPayload({
        products: [],
        nextPageUrl: PAGE2_URL,
        hasListingMarkup: false,
      }),
    ).toBe(true);
    expect(isAirListingPayload(null)).toBe(false);
    expect(isAirListingPayload({ products: [] })).toBe(false);
    expect(
      isAirListingPayload({
        products: "nope",
        nextPageUrl: null,
        hasListingMarkup: true,
      }),
    ).toBe(false);
  });

  it("falls back to pagination when rel=next is a different category route", () => {
    const seoUrl = "https://air.example.test/ua/shariki/latex";
    const seoPage2 = `${seoUrl}?page=2`;
    const routePage2 =
      "https://air.example.test/ua/index.php?route=product/category&path=20&page=2";
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "1",
          productPath: "/ua/product/p",
          imageUrl: "https://air.example.test/p.jpg",
          title: "P",
        }),
      ],
      nextHref: routePage2,
      paginationHref: seoPage2,
    });
    const result = parseAirListingFromHtml(html, seoUrl);
    expect(result.nextPageUrl).toBe(seoPage2);
  });

  it("drops next URL when neither rel=next nor pagination match the category", () => {
    const seoUrl = "https://air.example.test/ua/shariki/latex";
    const routePage2 =
      "https://air.example.test/ua/index.php?route=product/category&path=20&page=2";
    const html = airPageHtml({
      cards: [
        airProductCard({
          pid: "1",
          productPath: "/ua/product/p",
          imageUrl: "https://air.example.test/p.jpg",
          title: "P",
        }),
      ],
      nextHref: routePage2,
    });
    const result = parseAirListingFromHtml(html, seoUrl);
    expect(result.nextPageUrl).toBeNull();
  });
});

describe("isSameAirCategoryUrl", () => {
  it("treats page query as the only allowed difference", () => {
    const base =
      "https://air.example.test/ua/index.php?route=product/category&path=1";
    expect(isSameAirCategoryUrl(base, `${base}&page=2`)).toBe(true);
    expect(
      isSameAirCategoryUrl(
        "https://air.example.test/ua/shariki/latex",
        "https://air.example.test/ua/shariki/latex?page=2",
      ),
    ).toBe(true);
  });

  it("rejects a different pathname", () => {
    expect(
      isSameAirCategoryUrl(
        "https://air.example.test/ua/shariki/latex",
        "https://air.example.test/ua/index.php?route=product/category&path=20&page=2",
      ),
    ).toBe(false);
  });
});
