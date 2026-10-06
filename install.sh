#!/bin/bash
# Installs office-web: the script, Nautilus menu items and the native host for the Chrome extension.
set -e
D="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.local/bin ~/.local/share/nautilus-python/extensions ~/.local/share/office-web
install -m 755 "$D/bin/office-web" ~/.local/bin/office-web
install -m 644 "$D/nautilus/office_web.py" ~/.local/share/nautilus-python/extensions/office_web.py
"$D/extension/install.sh"
echo "Done. Restart Nautilus: nautilus -q"
echo "Next: rclone config create od onedrive  (sign in to OneDrive), then load extension/ in chrome://extensions"
