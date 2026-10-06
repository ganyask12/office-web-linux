import gi
gi.require_version("Nautilus", "4.0")
gi.require_version("Gdk", "4.0")
from gi.repository import Nautilus, GObject, Gdk, Gio


def real_path(f):
    """Шлях файлу, також у «Недавніх» і пошуку (recent:// -> file://)."""
    loc = f.get_location()
    if loc is None:
        return None
    path = loc.get_path()
    if path:
        return path
    try:
        info = loc.query_info("standard::target-uri", Gio.FileQueryInfoFlags.NONE, None)
        uri = info.get_attribute_string("standard::target-uri")
        return Gio.File.new_for_uri(uri).get_path() if uri else None
    except Exception:
        return None


class CopyAsPath(GObject.GObject, Nautilus.MenuProvider):
    """Windows 11 style 'Copy as path': copies "/full/path" (quoted), one per line."""

    def _copy(self, _item, paths):
        text = "\n".join('"%s"' % p for p in paths)
        Gdk.Display.get_default().get_clipboard().set(text)

    def _paths(self, files):
        return [p for p in map(real_path, files) if p]

    def _item(self, name, paths):
        item = Nautilus.MenuItem(name=name, label="Копіювати як шлях")
        item.connect("activate", self._copy, paths)
        return [item]

    def get_file_items(self, files):
        paths = self._paths(files)
        return self._item("CopyAsPath::files", paths) if paths else []

    def get_background_items(self, folder):
        paths = self._paths([folder])
        return self._item("CopyAsPath::bg", paths) if paths else []


import json
import os
import subprocess

OFFICE_EXT = (".docx", ".doc", ".xlsx", ".xls", ".pptx", ".ppt", ".odt", ".ods", ".odp", ".csv")
TOOL = os.path.expanduser("~/.local/bin/office-web")
STATE = os.path.expanduser("~/.local/share/office-web/state.json")


def _open_state():
    try:
        return json.load(open(STATE))
    except Exception:
        return {}


class OpenInOffice(GObject.GObject, Nautilus.MenuProvider):
    def _run(self, _item, mode, path):
        subprocess.Popen([TOOL, mode, path])

    def get_file_items(self, files):
        if len(files) != 1:
            return []
        path = real_path(files[0])
        if not path or not path.lower().endswith(OFFICE_EXT):
            return []
        it = Nautilus.MenuItem(name="OpenInOffice::open", label="Відкрити в Office (веб)")
        it.connect("activate", self._run, "open", path)
        items = [it]
        if path in _open_state():
            sv = Nautilus.MenuItem(name="OpenInOffice::save", label="Зберегти зміни з Office (веб)")
            sv.connect("activate", self._run, "save", path)
            items.append(sv)
        return items
