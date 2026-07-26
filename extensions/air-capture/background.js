// Service worker: відкриває first-party вкладку товару Airballoons, читає outerHTML і повертає його.
// Не має доступу до JWT: HTML повертається у SPA, PUT робить сам застосунок.

importScripts("protocol.js");

const LOAD_TIMEOUT_MS = 45_000;
const SETTLE_DELAY_MS = 800;

/**
 * Чекає, доки вкладка догрузиться (status === "complete"), із таймаутом.
 * @param {number} tabId
 * @returns {Promise<void>}
 */
function waitForTabComplete(tabId) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      chrome.tabs.onUpdated.removeListener(onUpdated);
      reject(new Error(self.BTW_AIR_ERROR.LOAD_TIMEOUT));
    }, LOAD_TIMEOUT_MS);

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      chrome.tabs.onUpdated.removeListener(onUpdated);
      // Невелика затримка на дорендер клієнтського контенту
      setTimeout(resolve, SETTLE_DELAY_MS);
    };

    const onUpdated = (updatedTabId, changeInfo) => {
      if (updatedTabId === tabId && changeInfo.status === "complete") {
        finish();
      }
    };

    chrome.tabs.onUpdated.addListener(onUpdated);

    // Вкладка вже могла догрузитися до підписки
    chrome.tabs.get(tabId, (tab) => {
      if (!chrome.runtime.lastError && tab && tab.status === "complete") {
        finish();
      }
    });
  });
}

/**
 * Відкриває url у фоновій вкладці, знімає outerHTML, закриває вкладку.
 * @param {string} url
 * @returns {Promise<string>} outerHTML
 */
async function capturePageHtml(url) {
  let tabId;
  try {
    const tab = await chrome.tabs.create({ url, active: false });
    tabId = tab.id;
  } catch {
    throw new Error(self.BTW_AIR_ERROR.TAB_OPEN_FAILED);
  }

  if (tabId == null) {
    throw new Error(self.BTW_AIR_ERROR.TAB_OPEN_FAILED);
  }

  try {
    await waitForTabComplete(tabId);

    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => document.documentElement.outerHTML,
    });

    const html = results && results[0] ? results[0].result : "";
    if (!html || typeof html !== "string") {
      throw new Error(self.BTW_AIR_ERROR.EMPTY_HTML);
    }
    return html;
  } catch (error) {
    if (error && Object.values(self.BTW_AIR_ERROR).includes(error.message)) {
      throw error;
    }
    throw new Error(self.BTW_AIR_ERROR.READ_FAILED);
  } finally {
    if (tabId != null) {
      chrome.tabs.remove(tabId).catch(() => {});
    }
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (!message || typeof message.type !== "string") return false;

  if (message.type === self.BTW_AIR_MESSAGE.PING) {
    sendResponse({ type: self.BTW_AIR_MESSAGE.PONG, requestId: message.requestId });
    return false;
  }

  if (message.type === self.BTW_AIR_MESSAGE.CAPTURE_REQUEST) {
    const { requestId, url } = message;
    if (typeof url !== "string" || !url) {
      sendResponse({
        type: self.BTW_AIR_MESSAGE.CAPTURE_RESULT,
        requestId,
        ok: false,
        error: { code: self.BTW_AIR_ERROR.INVALID_REQUEST, message: "url відсутній" },
      });
      return false;
    }

    capturePageHtml(url)
      .then((html) => {
        sendResponse({
          type: self.BTW_AIR_MESSAGE.CAPTURE_RESULT,
          requestId,
          ok: true,
          html,
        });
      })
      .catch((error) => {
        sendResponse({
          type: self.BTW_AIR_MESSAGE.CAPTURE_RESULT,
          requestId,
          ok: false,
          error: {
            code: error?.message || self.BTW_AIR_ERROR.READ_FAILED,
            message: String(error?.message || error),
          },
        });
      });

    // async sendResponse
    return true;
  }

  return false;
});
