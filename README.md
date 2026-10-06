# office-web-linux

**English** · [Українська](README.uk.md)

> **In short:** a small toolkit that gives Linux something it lacks out of the box — open a local Word / Excel / PowerPoint file in the **Microsoft Office web apps** and save the edits back to the very same file. Nautilus menu items + a Python script + a Chrome extension. No Wine, no Azure app registration.

## How it works

| Action | What happens |
|---|---|
| Right-click a file → **Open in Office (web)** | the file is uploaded to `OneDrive/_pc-temp` and opens in Chrome (app window) |
| Right-click → **Save changes from Office (web)** | the current version is downloaded, the original file is replaced, the OneDrive copy goes to the recycle bin |
| Buttons in the corner of the Word/Excel online window (Chrome extension) | **Save to PC** · **Save as…** · **Done** (save + remove the OneDrive copy once the window is closed) |

Sign-in is borrowed from **rclone** (it uses rclone's built-in Microsoft app); uploads and downloads go straight through the Microsoft Graph API. Messages and menu labels follow the system language (Ukrainian or English).

## Requirements

- Debian/Ubuntu with GNOME, Nautilus with `python3-nautilus`
- `rclone`, Google Chrome, `zenity`, `notify-send`
- a personal OneDrive account

## Install

```bash
sudo apt install rclone python3-nautilus zenity libnotify-bin
./install.sh
rclone config create od onedrive      # sign in to your Microsoft account in the browser
nautilus -q
```

Then in Chrome: `chrome://extensions` → enable *Developer mode* → *Load unpacked* → pick the `extension/` folder.
The extension ID is pinned (`blfnkkdanndahgadgefkodagendjhcoc`) — the native host depends on it.

Using a Chrome profile other than `Default`: `export OFFICE_WEB_PROFILE="Profile 1"`.

> Note: Debian 13's rclone 1.60 cannot upload to OneDrive (`Unauthenticated` error), so `office-web` uses rclone only for sign-in and token refresh.

## Limitations

- Files up to 250 MB.
- While a document is open in the web app, OneDrive keeps it locked, so removing the copy waits (up to ~20 min) until you close the window.
- The editor page is not an official API: if Microsoft changes it, the extension buttons may need updates.
- Unofficial tool, not affiliated with Microsoft.

## License

[MIT](LICENSE)
