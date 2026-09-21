#!/usr/bin/env python3
"""Split <lang>/src/<id>/<id>.<ext> into one file per export (usage: split_ts.py <typescript|javascript> <id>)."""
import re, sys, pathlib, subprocess

lang, pid = sys.argv[1], sys.argv[2]
ext = ".ts" if lang == "typescript" else ".js"
HERE = pathlib.Path(__file__).resolve()
ROOT = HERE.parents[2] / lang / "src" / pid
main = ROOT / f"{pid}{ext}"
src = main.read_text()
main.unlink()  # before writing: a declaration may map to the same file name

def kebab(name): return re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name).lower().replace("_", "-")

lines = src.split("\n"); blocks = []; i = 0; pending = []; header = []
while i < len(lines):
    line = lines[i]
    if line.startswith("//") or line.startswith("/**") or line.startswith(" *") or line.strip() == "*/":
        pending.append(line); i += 1; continue
    if line.strip() == "":
        if pending and not any(l.startswith("/**") for l in pending): header += pending; pending = []
        i += 1; continue
    m = re.match(r"^(export\s+)?(?:(abstract)\s+)?(class|interface|type|const|function|function\*)\s+(\w+)", line)
    if not m: raise SystemExit(f"unexpected top-level line {i+1}: {line}")
    if not m.group(1):  # module-private declaration: its own file needs an export
        lines[i] = "export " + line
    m = re.match(r"^export\s+(?:(abstract)\s+)?(class|interface|type|const|function|function\*)\s+(\w+)", lines[i])
    kind, name = m.group(2), m.group(3)
    if kind in ("type", "const") and line.rstrip().endswith(";"):
        j = i
    else:
        depth = 0; j = i; started = False
        while j < len(lines):
            depth += lines[j].count("{") - lines[j].count("}")
            if "{" in lines[j]: started = True
            if started and depth == 0: break
            j += 1
    blocks.append((kind, name, "\n".join(pending + lines[i:j+1]))); pending = []; i = j + 1

names = {n for _, n, _ in blocks}
interfaces = {n for k, n, _ in blocks if k in ("interface", "type")}
files = {}
for kind, name, text in blocks:
    fname = kebab(name) + ext
    refs = {n for n in names if n != name and re.search(rf"\b{n}\b", text)}
    imports = []
    for r in sorted(refs):
        value = re.search(rf"\bnew\s+{r}\b|\b{r}\.|extends\s+{r}\b|\b{r}\(|instanceof\s+{r}\b|\[{r}\b|=\s*{r}\b|\({r}[,)]", text)
        if lang == "javascript": imports.append(f'import {{ {r} }} from "./{kebab(r)}.js";')
        elif r in interfaces or not value: imports.append(f'import type {{ {r} }} from "./{kebab(r)}.ts";')
        else: imports.append(f'import {{ {r} }} from "./{kebab(r)}.ts";')
    body = ("\n".join(imports) + "\n\n" if imports else "") + text + "\n"
    if header and fname == kebab(blocks[0][1]) + ext: body = "\n".join(header) + "\n\n" + body
    files[fname] = body
for f, t in files.items(): (ROOT / f).write_text(t)
print("wrote:", ", ".join(sorted(files)))

def rewrite(path):
    t = path.read_text()
    pat = re.compile(rf'import \{{([^}}]*)\}} from "\./{pid}{ext}";\n')
    m = pat.search(t)
    if not m: return
    new = []
    for s in [x.strip() for x in m.group(1).split(",") if x.strip()]:
        is_type = s.startswith("type "); n = s.replace("type ", "").strip()
        if lang == "javascript": new.append(f'import {{ {n} }} from "./{kebab(n)}.js";')
        elif is_type or n in interfaces: new.append(f'import type {{ {n} }} from "./{kebab(n)}.ts";')
        else: new.append(f'import {{ {n} }} from "./{kebab(n)}.ts";')
    path.write_text(t[:m.start()] + "\n".join(new) + "\n" + t[m.end():])
for p in [ROOT / f"example{ext}", ROOT / f"{pid}.test{ext}"]:
    if p.exists(): rewrite(p)

test = ROOT / f"{pid}.test{ext}"
if test.exists():
    t = test.read_text()
    m = re.search(r'\n  it\("example prints the expected lines".*?\n  \}\);\n', t, flags=re.S) or re.search(r'\ndescribe\("example".*?\n\}\);\n', t, flags=re.S)
    if m:
        ex_block = m.group(0)
        rest = re.sub(r"\n\n\n+", "\n\n", t[:m.start()] + "\n" + t[m.end():])
        head = "\n".join(l for l in t.split("\n") if l.startswith("import ")) + "\n"
        ex_text = head + "\n" + ('describe("example", () => {' + ex_block.rstrip("\n") + "\n});\n" if ex_block.lstrip().startswith("it(") else ex_block.lstrip("\n"))
        (ROOT / f"example.test{ext}").write_text(ex_text); test.write_text(rest); print("tests split")

subprocess.run([sys.executable, str(HERE.with_name("prune_imports.py")), lang, pid], check=True)
