// Реле між сторінкою SPA (window.postMessage) та service worker (chrome.runtime).
// Інжектиться лише на origin SPA (див. manifest content_scripts.matches).

(function () {
  const MESSAGE = self.BTW_AIR_MESSAGE;
  const RELAYABLE = new Set([MESSAGE.PING, MESSAGE.CAPTURE_REQUEST]);

  window.addEventListener("message", (event) => {
    // Приймаємо тільки повідомлення від самої сторінки
    if (event.source !== window) return;

    const data = event.data;
    if (!data || typeof data.type !== "string" || !RELAYABLE.has(data.type)) {
      return;
    }

    chrome.runtime.sendMessage(
      { type: data.type, requestId: data.requestId, url: data.url },
      (response) => {
        if (chrome.runtime.lastError) {
          // Розширення/воркер недоступні — повертаємо помилку на сторінку
          if (data.type === MESSAGE.CAPTURE_REQUEST) {
            window.postMessage(
              {
                type: MESSAGE.CAPTURE_RESULT,
                requestId: data.requestId,
                ok: false,
                error: {
                  code: "EXTENSION_UNAVAILABLE",
                  message: chrome.runtime.lastError.message || "Розширення недоступне",
                },
              },
              window.location.origin,
            );
          }
          return;
        }
        if (response) {
          window.postMessage(response, window.location.origin);
        }
      },
    );
  });
})();
