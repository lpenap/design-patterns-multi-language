#!/usr/bin/env python3
"""Remove unused named import specifiers in a TS/JS pattern folder (usage: prune_imports.py <typescript|javascript> <id>)."""
import re, sys, pathlib
lang, pid = sys.argv[1], sys.argv[2]
ext = ".ts" if lang == "typescript" else ".js"
root = pathlib.Path(__file__).resolve().parents[2] / lang / "src" / pid
STRINGS = re.compile(r'"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\'', re.S)  # not template literals: ${...} holds code
for path in root.iterdir():
    if path.suffix != ext: continue
    t = path.read_text()
    body = "\n".join(l for l in t.split("\n") if not l.startswith("import "))
    body = re.sub(r"/\*.*?\*/", "", body, flags=re.S)
    body = re.sub(r"^\s*//.*$", "", body, flags=re.M)
    body = STRINGS.sub('""', body)
    out = []
    for l in t.split("\n"):
        m = re.match(r'^import (type )?\{([^}]*)\} from "([^"]+)";$', l)
        if not m: out.append(l); continue
        specs = [x.strip() for x in m.group(2).split(",") if x.strip()]
        keep = [x for x in specs if re.search(r"\b" + re.escape(x.replace("type ", "").strip()) + r"\b", body)]
        if keep: out.append(f'import {m.group(1) or ""}{{ {", ".join(keep)} }} from "{m.group(3)}";')
    text = "\n".join(out)
    text = re.sub(r"\n\n+\}\);", "\n});", text)
    text = re.sub(r"\n{3,}", "\n\n", text).lstrip("\n")
    path.write_text(text if text.endswith("\n") else text + "\n")
print("imports pruned")
