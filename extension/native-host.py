#!/usr/bin/env python3
"""Native messaging host: starts office-web (save a document from Office on the web) and replies at once."""
import sys, struct, json, re, subprocess, os

OPS = {"save-resid", "saveas-resid", "finish-resid"}
TOOL = os.path.expanduser("~/.local/bin/office-web")


def send(o):
    b = json.dumps(o).encode()
    sys.stdout.buffer.write(struct.pack("=I", len(b)) + b)
    sys.stdout.buffer.flush()


h = sys.stdin.buffer.read(4)
if len(h) < 4:
    sys.exit(0)
m = json.loads(sys.stdin.buffer.read(struct.unpack("=I", h)[0]))
if m.get("op") in OPS and re.fullmatch(r"[0-9A-Za-z!%._-]{1,200}", m.get("resid") or ""):
    subprocess.Popen([TOOL, m["op"], m["resid"]], start_new_session=True,
                     stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    send({"ok": True})
else:
    send({"error": "Unknown command or document could not be identified"})
