#!/bin/bash
# Встановлює office-web: скрипт, пункти меню Nautilus і native host для розширення Chrome.
set -e
D="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.local/bin ~/.local/share/nautilus-python/extensions ~/.local/share/office-web
install -m 755 "$D/bin/office-web" ~/.local/bin/office-web
install -m 644 "$D/nautilus/office_web.py" ~/.local/share/nautilus-python/extensions/office_web.py
"$D/extension/install.sh"
echo "Готово. Перезапустіть Nautilus: nautilus -q"
echo "Далі: rclone config create od onedrive  (вхід у OneDrive), потім завантажте extension/ у chrome://extensions"
