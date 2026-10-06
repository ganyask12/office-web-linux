#!/bin/bash
# Реєструє native host для Chrome. Запуск: ./install.sh
set -e
D="$(cd "$(dirname "$0")" && pwd)"
for B in google-chrome chromium; do
  T="$HOME/.config/$B/NativeMessagingHosts"
  [ -d "$HOME/.config/$B" ] || continue
  mkdir -p "$T"
  cat > "$T/com.officebridge.host.json" <<J
{"name":"com.officebridge.host","description":"Office PC bridge","path":"$D/native-host.py","type":"stdio","allowed_origins":["chrome-extension://blfnkkdanndahgadgefkodagendjhcoc/"]}
J
  echo "Зареєстровано для $B"
done
