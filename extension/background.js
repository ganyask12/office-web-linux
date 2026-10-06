// The content script asks to run office-web; the native host starts it and replies at once.
chrome.runtime.onMessage.addListener((m, _s, reply) => {
  chrome.runtime.sendNativeMessage("com.officebridge.host", { op: m.op, resid: m.resid }, r => {
    reply(chrome.runtime.lastError ? { error: chrome.runtime.lastError.message } : r);
  });
  return true;
});
