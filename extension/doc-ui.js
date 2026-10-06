// Кнопки поверх вікна Word/Excel online. Працює лише для файлів, відкритих через office-web.
if (window.top === window) {
  const resid = new URLSearchParams(location.search).get("resid") || new URLSearchParams(location.search).get("sourcedoc") || "";
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;z-index:2147483647;right:16px;bottom:44px;display:flex;gap:6px;padding:6px;border-radius:12px;background:#fffffff2;box-shadow:0 2px 12px #0004;font:13px system-ui";
  const note = document.createElement("span");
  note.style.cssText = "align-self:center;color:#555;max-width:260px;display:none";
  const add = (label, op, hint) => {
    const b = document.createElement("button");
    b.textContent = label;
    b.style.cssText = "padding:6px 10px;border:1px solid #c8c8cc;border-radius:8px;background:#fff;color:#1c1c1e;cursor:pointer";
    b.onclick = async () => {
      note.style.display = "inline"; note.textContent = "Працюю…";
      const r = await chrome.runtime.sendMessage({ op, resid });
      note.textContent = r?.error ? "Помилка: " + r.error : hint;
    };
    box.append(b);
  };
  add("Зберегти на ПК", "save-resid", "Оригінал на ПК замінено.");
  add("Зберегти як…", "saveas-resid", "Оберіть місце у вікні, що з'явилось.");
  add("Готово", "finish-resid", "Збережено. Закрийте вікно — копію з OneDrive приберу автоматично.");
  box.append(note);
  document.body.append(box);
}
