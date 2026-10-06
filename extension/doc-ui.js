// Buttons over the Word/Excel online window. Only useful for files opened via office-web.
const uk = navigator.language.startsWith("uk");
const t = (u, e) => (uk ? u : e);
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
      note.style.display = "inline"; note.textContent = t("Працюю…", "Working…");
      const r = await chrome.runtime.sendMessage({ op, resid });
      note.textContent = r?.error ? t("Помилка: ", "Error: ") + r.error : hint;
    };
    box.append(b);
  };
  add(t("Зберегти на ПК", "Save to PC"), "save-resid", t("Оригінал на ПК замінено.", "Original file replaced."));
  add(t("Зберегти як…", "Save as…"), "saveas-resid", t("Оберіть місце у вікні, що з'явилось.", "Choose a location in the dialog."));
  add(t("Готово", "Done"), "finish-resid", t("Збережено. Закрийте вікно — копію з OneDrive приберу автоматично.", "Saved. Close this window - the OneDrive copy is removed automatically."));
  box.append(note);
  document.body.append(box);
}
