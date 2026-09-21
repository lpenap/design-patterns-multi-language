#!/usr/bin/env python3
"""Point a doc's Participants links at per-class files (usage: fix_doc_links.py <python|typescript|javascript> <id> [<pkg>])."""
import re, sys, pathlib
lang, pid = sys.argv[1], sys.argv[2]
pkg = sys.argv[3] if len(sys.argv) > 3 else pid
doc = pathlib.Path(__file__).resolve().parents[2] / "docs" / "patterns" / f"{pid}.md"
t = doc.read_text()
snake = lambda n: re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", n).lower()
kebab = lambda n: re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", n).lower()
if lang == "python":
    base = f"../../python/src/patterns/{pkg}"
    t = re.sub(rf"\[`(\w+)`\]\({re.escape(base)}/__init__\.py\)", lambda m: f"[`{m.group(1)}`]({base}/{'example' if m.group(1).endswith('Example') else snake(m.group(1))}.py)", t)
else:
    ext = ".ts" if lang == "typescript" else ".js"
    base = f"../../{lang}/src/{pid}"
    t = re.sub(rf"\[`(\w+)`\]\({re.escape(base)}/{re.escape(pid)}{re.escape(ext)}\)", lambda m: f"[`{m.group(1)}`]({base}/{kebab(m.group(1))}{ext})", t)
    t = re.sub(rf"\[`{re.escape(pid)}{re.escape(ext)}`\]\({re.escape(base)}/{re.escape(pid)}{re.escape(ext)}\)", f"[`{pid}/`]({base}/)", t)
doc.write_text(t); print("doc links updated")
