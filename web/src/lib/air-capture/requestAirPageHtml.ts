import {
  BTW_AIR_MESSAGE,
  type AirCaptureResultMessage,
  type AirInboundMessage,
} from "@/lib/air-capture/protocol";

/** Розширення відкриває вкладку, чекає завантаження, знімає HTML — може тривати десятки секунд. */
const CAPTURE_TIMEOUT_MS = 60_000;
const PING_TIMEOUT_MS = 1_500;

function createRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `air-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isInboundMessage(value: unknown): value is AirInboundMessage {
  if (!value || typeof value !== "object") return false;
  const type = (value as { type?: unknown }).type;
  return (
    type === BTW_AIR_MESSAGE.PONG || type === BTW_AIR_MESSAGE.CAPTURE_RESULT
  );
}

/**
 * Надсилає повідомлення сторінці та чекає на відповідь із тим самим requestId.
 * Резолвиться `null` при таймауті.
 */
function postAndAwait<T extends AirInboundMessage>(
  outbound: Record<string, unknown>,
  expectedType: T["type"],
  requestId: string,
  timeoutMs: number,
): Promise<T | null> {
  return new Promise((resolve) => {
    let settled = false;

    const cleanup = () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (!isInboundMessage(event.data)) return;
      const data = event.data;
      if (data.type !== expectedType || data.requestId !== requestId) return;

      settled = true;
      cleanup();
      resolve(data as T);
    };

    const timer = window.setTimeout(() => {
      if (settled) return;
      cleanup();
      resolve(null);
    }, timeoutMs);

    window.addEventListener("message", onMessage);
    window.postMessage(outbound, window.location.origin);
  });
}

/** Пінг розширення: true — content-bridge встановлений і воркер відповів. */
export async function isAirCaptureExtensionAvailable(
  timeoutMs: number = PING_TIMEOUT_MS,
): Promise<boolean> {
  const requestId = createRequestId();
  const pong = await postAndAwait(
    { type: BTW_AIR_MESSAGE.PING, requestId },
    BTW_AIR_MESSAGE.PONG,
    requestId,
    timeoutMs,
  );
  return pong !== null;
}

export interface RequestAirPageHtmlResult {
  ok: boolean;
  html?: string;
  errorCode?: string;
  errorMessage?: string;
}

/** Просить розширення відкрити `url` і повернути outerHTML сторінки товару. */
export async function requestAirPageHtml(
  url: string,
  timeoutMs: number = CAPTURE_TIMEOUT_MS,
): Promise<RequestAirPageHtmlResult> {
  const requestId = createRequestId();
  const result = await postAndAwait<AirCaptureResultMessage>(
    { type: BTW_AIR_MESSAGE.CAPTURE_REQUEST, requestId, url },
    BTW_AIR_MESSAGE.CAPTURE_RESULT,
    requestId,
    timeoutMs,
  );

  if (result === null) {
    return {
      ok: false,
      errorCode: "TIMEOUT",
      errorMessage: "Розширення не відповіло вчасно",
    };
  }

  if (!result.ok || !result.html) {
    return {
      ok: false,
      errorCode: result.error?.code || "CAPTURE_FAILED",
      errorMessage: result.error?.message || "Не вдалося зняти HTML сторінки",
    };
  }

  return { ok: true, html: result.html };
}
