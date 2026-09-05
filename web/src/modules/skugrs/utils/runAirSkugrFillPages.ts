import { requestAirPageHtml } from "@/lib/air-capture";
import type {
  AirClientApiError,
  FillAirClientSkugrPageParams,
  FillAirClientSkugrPageResponseDto,
  FillSkugrSkusStats,
} from "@/modules/skugrs/api/types";
import {
  addFillSkugrSkusStats,
  EMPTY_FILL_SKUGR_SKUS_STATS,
} from "@/modules/skugrs/api/types";
import {
  AIR_SKUGR_PAGE_JITTER_MS,
  AIR_SKUGR_RETRY_JITTER_MS,
  delayMs,
  jitterMs,
} from "@/modules/skugrs/utils/airSkugrFillTiming";
import {
  isAirListingParseFailed,
  parseAirListingFromHtml,
  type AirListingPayload,
} from "@/modules/skugrs/utils/parse-air-listing/parseAirListing";
import type { AxiosError } from "axios";

export interface AirSkugrFillGroup {
  skugrId: string;
  url: string;
}

export interface AirSkugrFillPageProgress {
  pageIndex: number;
  pageUrl: string;
  phase: "capturing" | "saving";
  productsOnPage?: number;
  /** Накопичені stats після успішного fill-page. */
  stats?: FillSkugrSkusStats;
  clientNextPageUrl?: string | null;
  serverNextPageUrl?: string | null;
}

export interface AirSkugrFillPagesCompleted {
  status: "completed";
  stats: FillSkugrSkusStats;
  pagesFilled: number;
}

export interface AirSkugrFillPagesStopped {
  status: "stopped";
  stats: FillSkugrSkusStats;
  pagesFilled: number;
}

export interface AirSkugrFillPagesFailure {
  status: "error";
  stats: FillSkugrSkusStats;
  pagesFilled: number;
  code?: string;
  message: string;
  /** 401/403 — оркестратор зупиняє всю чергу. */
  stopQueue: boolean;
}

export type AirSkugrFillPagesResult =
  | AirSkugrFillPagesCompleted
  | AirSkugrFillPagesStopped
  | AirSkugrFillPagesFailure;

interface RunAirSkugrFillPagesParams {
  group: AirSkugrFillGroup;
  fillPage: (
    params: FillAirClientSkugrPageParams,
  ) => Promise<FillAirClientSkugrPageResponseDto>;
  shouldStop: () => boolean;
  onProgress?: (progress: AirSkugrFillPageProgress) => void;
}

class CaptureFailedError extends Error {
  readonly captureCode: string;

  constructor(message: string, captureCode: string) {
    super(message);
    this.name = "CaptureFailedError";
    this.captureCode = captureCode;
  }
}

function isAxiosError(
  error: unknown,
): error is AxiosError<AirClientApiError> {
  return Boolean(error && typeof error === "object" && "isAxiosError" in error);
}

function mapFillError(error: unknown): Pick<
  AirSkugrFillPagesFailure,
  "code" | "message" | "stopQueue"
> {
  if (error instanceof CaptureFailedError) {
    return {
      code: error.captureCode,
      message: error.message,
      stopQueue: false,
    };
  }
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const body = error.response?.data;
    const code = body?.code;
    const message = body?.message || error.message || "Помилка запиту.";
    if (status === 401 || status === 403) {
      return { code: code || "AUTH", message, stopQueue: true };
    }
    if (status === 422) {
      return {
        code: code || "PARSE_FAILED",
        message: "HTML без сітки лістингу. Спробуйте пізніше.",
        stopQueue: false,
      };
    }
    if (status === 404) {
      return { code: "NOT_FOUND", message: "Групу не знайдено.", stopQueue: false };
    }
    if (status === 400) {
      return { code: code || "BAD_REQUEST", message, stopQueue: false };
    }
    return { code: code || "REQUEST_FAILED", message, stopQueue: false };
  }
  if (error instanceof Error) {
    return { code: "REQUEST_FAILED", message: error.message, stopQueue: false };
  }
  return { code: "REQUEST_FAILED", message: "Помилка запиту.", stopQueue: false };
}

async function captureListingHtml(pageUrl: string): Promise<string> {
  const capture = await requestAirPageHtml(pageUrl);
  if (!capture.ok || !capture.html) {
    throw new CaptureFailedError(
      capture.errorMessage || "Не вдалося зняти HTML сторінки.",
      capture.errorCode || "CAPTURE_FAILED",
    );
  }
  return capture.html;
}

async function captureAndParseListing(pageUrl: string): Promise<AirListingPayload> {
  const html = await captureListingHtml(pageUrl);
  return parseAirListingFromHtml(html, pageUrl);
}

async function fillParsedPage(params: {
  group: AirSkugrFillGroup;
  pageUrl: string;
  listing: AirListingPayload;
  fillPage: RunAirSkugrFillPagesParams["fillPage"];
}): Promise<FillAirClientSkugrPageResponseDto> {
  return params.fillPage({
    skugrId: params.group.skugrId,
    body: {
      sourceUrl: params.group.url,
      pageUrl: params.pageUrl,
      products: params.listing.products,
      nextPageUrl: params.listing.nextPageUrl,
      hasListingMarkup: params.listing.hasListingMarkup,
    },
  });
}

/**
 * Посторінковий refill однієї Air-групи: capture HTML → parse на клієнті → fill-page.
 * Немає сітки лістингу або 422 — один retry сторінки з jitter 3–6 s.
 */
export async function runAirSkugrFillPages({
  group,
  fillPage,
  shouldStop,
  onProgress,
}: RunAirSkugrFillPagesParams): Promise<AirSkugrFillPagesResult> {
  let pageUrl: string | null = group.url;
  let pageIndex = 0;
  let stats = EMPTY_FILL_SKUGR_SKUS_STATS;

  while (pageUrl && !shouldStop()) {
    pageIndex += 1;
    const currentUrl = pageUrl;

    try {
      onProgress?.({ pageIndex, pageUrl: currentUrl, phase: "capturing" });
      let listing = await captureAndParseListing(currentUrl);
      if (shouldStop()) {
        return { status: "stopped", stats, pagesFilled: pageIndex - 1 };
      }

      if (isAirListingParseFailed(listing)) {
        await delayMs(
          jitterMs(AIR_SKUGR_RETRY_JITTER_MS.min, AIR_SKUGR_RETRY_JITTER_MS.max),
        );
        if (shouldStop()) {
          return { status: "stopped", stats, pagesFilled: pageIndex - 1 };
        }
        onProgress?.({ pageIndex, pageUrl: currentUrl, phase: "capturing" });
        listing = await captureAndParseListing(currentUrl);
        if (shouldStop()) {
          return { status: "stopped", stats, pagesFilled: pageIndex - 1 };
        }
        if (isAirListingParseFailed(listing)) {
          return {
            status: "error",
            stats,
            pagesFilled: pageIndex - 1,
            code: "PARSE_FAILED",
            message: "HTML без сітки лістингу. Спробуйте пізніше.",
            stopQueue: false,
          };
        }
      }

      onProgress?.({ pageIndex, pageUrl: currentUrl, phase: "saving" });
      let response: FillAirClientSkugrPageResponseDto;
      try {
        response = await fillParsedPage({
          group,
          pageUrl: currentUrl,
          listing,
          fillPage,
        });
      } catch (error) {
        const isParseFailed =
          isAxiosError(error) && error.response?.status === 422;
        if (!isParseFailed) {
          return {
            status: "error",
            stats,
            pagesFilled: pageIndex - 1,
            ...mapFillError(error),
          };
        }

        await delayMs(
          jitterMs(AIR_SKUGR_RETRY_JITTER_MS.min, AIR_SKUGR_RETRY_JITTER_MS.max),
        );
        if (shouldStop()) {
          return { status: "stopped", stats, pagesFilled: pageIndex - 1 };
        }

        onProgress?.({ pageIndex, pageUrl: currentUrl, phase: "capturing" });
        listing = await captureAndParseListing(currentUrl);
        if (shouldStop()) {
          return { status: "stopped", stats, pagesFilled: pageIndex - 1 };
        }
        if (isAirListingParseFailed(listing)) {
          return {
            status: "error",
            stats,
            pagesFilled: pageIndex - 1,
            code: "PARSE_FAILED",
            message: "HTML без сітки лістингу. Спробуйте пізніше.",
            stopQueue: false,
          };
        }
        onProgress?.({ pageIndex, pageUrl: currentUrl, phase: "saving" });
        response = await fillParsedPage({
          group,
          pageUrl: currentUrl,
          listing,
          fillPage,
        });
      }

      stats = addFillSkugrSkusStats(stats, response.data.stats);
      onProgress?.({
        pageIndex,
        pageUrl: currentUrl,
        phase: "saving",
        productsOnPage: response.data.productsOnPage,
        stats,
        clientNextPageUrl: listing.nextPageUrl,
        serverNextPageUrl: response.data.nextPageUrl,
      });
      pageUrl = response.data.nextPageUrl;
      if (pageUrl) {
        await delayMs(
          jitterMs(AIR_SKUGR_PAGE_JITTER_MS.min, AIR_SKUGR_PAGE_JITTER_MS.max),
        );
      }
    } catch (error) {
      return {
        status: "error",
        stats,
        pagesFilled: pageIndex - 1,
        ...mapFillError(error),
      };
    }
  }

  if (shouldStop()) {
    return { status: "stopped", stats, pagesFilled: pageIndex };
  }
  return { status: "completed", stats, pagesFilled: pageIndex };
}
