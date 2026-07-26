// Стабільний контракт повідомлень між SPA (window.postMessage) та розширенням.
// Дублюється у web/src/lib/air-capture (BTW_AIR_CAPTURE_PROTOCOL) — тримати синхронно.
//
// Потік:
//   SPA  --window.postMessage-->  content-bridge  --chrome.runtime-->  background
//   background відкриває first-party вкладку, читає outerHTML, відповідає назад тим самим шляхом.

const BTW_AIR_MESSAGE = {
  // ping/pong — перевірка, що розширення встановлене й активне на сторінці SPA
  PING: "BTW_AIR_PING",
  PONG: "BTW_AIR_PONG",
  // запит на зняття HTML сторінки товару / результат
  CAPTURE_REQUEST: "BTW_AIR_CAPTURE_REQUEST",
  CAPTURE_RESULT: "BTW_AIR_CAPTURE_RESULT",
};

// Коди помилок у CAPTURE_RESULT.error.code (ok=false)
const BTW_AIR_ERROR = {
  TAB_OPEN_FAILED: "TAB_OPEN_FAILED",
  LOAD_TIMEOUT: "LOAD_TIMEOUT",
  READ_FAILED: "READ_FAILED",
  EMPTY_HTML: "EMPTY_HTML",
  INVALID_REQUEST: "INVALID_REQUEST",
};

if (typeof self !== "undefined") {
  self.BTW_AIR_MESSAGE = BTW_AIR_MESSAGE;
  self.BTW_AIR_ERROR = BTW_AIR_ERROR;
}
