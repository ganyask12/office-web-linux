# office-web-linux

Відкривайте файли `.docx` / `.xlsx` / `.pptx` з Linux у **веб-версії Microsoft Office** (Word/Excel/PowerPoint online), а зміни повертайте назад на ПК — без Wine і без реєстрації застосунку в Azure.

*English: open local Office files in Microsoft 365 web apps on Linux and write the edits back to the original file. No Wine, no Azure app registration (uses rclone's login).*

## Як це працює

| Дія | Що відбувається |
|---|---|
| ПКМ на файлі → **Відкрити в Office (веб)** | файл вантажиться в `OneDrive/_pc-temp`, документ відкривається у Chrome (режим застосунку) |
| ПКМ → **Зберегти зміни з Office (веб)** | актуальна версія скачується, оригінал на ПК підміняється, копія йде з OneDrive в кошик |
| Кнопки в кутку вікна Word/Excel online (розширення Chrome) | **Зберегти на ПК** · **Зберегти як…** · **Готово** (зберегти + прибрати копію з OneDrive після закриття вікна) |

Вхід у OneDrive бере з **rclone** (використовується його вбудований застосунок Microsoft); завантаження й скачування йдуть напряму через Microsoft Graph API.

## Вимоги

- Debian/Ubuntu + GNOME, Nautilus із `python3-nautilus`
- `rclone`, Google Chrome, `zenity`, `notify-send`
- акаунт OneDrive (personal)

## Встановлення

```bash
sudo apt install rclone python3-nautilus zenity libnotify-bin
./install.sh
rclone config create od onedrive      # увійти в акаунт Microsoft у браузері
nautilus -q
```

Потім у Chrome: `chrome://extensions` → «Режим розробника» → «Завантажити розпаковане» → папка `extension/`.
ID розширення фіксований (`blfnkkdanndahgadgefkodagendjhcoc`) — від нього залежить native host.

Інший профіль Chrome, ніж `Default`: `export OFFICE_WEB_PROFILE="Profile 1"`.

> Примітка: rclone 1.60 з Debian 13 не вміє завантажувати в OneDrive (помилка `Unauthenticated`), тому `office-web` використовує rclone лише для входу й оновлення токена.

## Обмеження

- Файли до 250 МБ.
- Поки документ відкритий у веб-Office, OneDrive блокує видалення копії — `office-web` чекає до ~20 хв, поки закриєте вікно.
- Доступ до сторінки редактора не офіційний API: після змін Microsoft кнопки розширення можуть потребувати правок.
- Це неофіційний інструмент, не пов'язаний з Microsoft.
