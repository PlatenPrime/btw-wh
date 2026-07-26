/**
 * Веб-сторона контракту повідомлень з Chrome-розширенням `air-capture`.
 * Синхронізувати з `extensions/air-capture/protocol.js`.
 */

export const BTW_AIR_MESSAGE = {
  PING: "BTW_AIR_PING",
  PONG: "BTW_AIR_PONG",
  CAPTURE_REQUEST: "BTW_AIR_CAPTURE_REQUEST",
  CAPTURE_RESULT: "BTW_AIR_CAPTURE_RESULT",
} as const;

export type BtwAirMessageType =
  (typeof BTW_AIR_MESSAGE)[keyof typeof BTW_AIR_MESSAGE];

export interface AirCaptureRequestMessage {
  type: typeof BTW_AIR_MESSAGE.CAPTURE_REQUEST;
  requestId: string;
  url: string;
}

export interface AirPingMessage {
  type: typeof BTW_AIR_MESSAGE.PING;
  requestId: string;
}

export interface AirPongMessage {
  type: typeof BTW_AIR_MESSAGE.PONG;
  requestId: string;
}

export interface AirCaptureError {
  code: string;
  message: string;
}

export interface AirCaptureResultMessage {
  type: typeof BTW_AIR_MESSAGE.CAPTURE_RESULT;
  requestId: string;
  ok: boolean;
  html?: string;
  error?: AirCaptureError;
}

export type AirInboundMessage = AirPongMessage | AirCaptureResultMessage;
