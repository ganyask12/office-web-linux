// Content script просить запустити office-web; native host запускає його і одразу відповідає.
chrome.runtime.onMessage.addListener((m, _s, reply) => {
  chrome.runtime.sendNativeMessage("com.officebridge.host", { op: m.op, resid: m.resid }, r => {
    reply(chrome.runtime.lastError ? { error: chrome.runtime.lastError.message } : r);
  });
  return true;
});
