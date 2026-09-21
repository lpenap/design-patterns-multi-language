#!/usr/bin/env python3
"""Split python/src/patterns/<pkg>/__init__.py into one module per class (usage: split_python.py <pkg>)."""
import ast, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2] / "python"
pkg = sys.argv[1]
pkg_dir = ROOT / "src" / "patterns" / pkg
src = (pkg_dir / "__init__.py").read_text()
tree = ast.parse(src)
lines = src.split("\n")

def snake(name): return re.sub(r"([a-z0-9])([A-Z])", r"\1_\2", name).lower()

def segment(node):
    start = node.lineno - 1
    if getattr(node, "decorator_list", None):
        start = min(d.lineno for d in node.decorator_list) - 1
    return "\n".join(lines[start:node.end_lineno])

docstring = ast.get_docstring(tree)
future = any(isinstance(n, ast.ImportFrom) and n.module == "__future__" for n in tree.body)
imports = [n for n in tree.body if isinstance(n, (ast.Import, ast.ImportFrom)) and not (isinstance(n, ast.ImportFrom) and n.module == "__future__")]
classes = [n for n in tree.body if isinstance(n, ast.ClassDef)]
assigns = [n for n in tree.body if isinstance(n, (ast.Assign, ast.AnnAssign))]
assert not [n for n in tree.body if isinstance(n, ast.FunctionDef)], "top-level functions not handled"

class_names = {c.name for c in classes}
example_cls = next(c for c in classes if c.name.endswith("Example"))
example_assign = next(a for a in assigns if isinstance(a, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "example" for t in a.targets))
constants = [a for a in assigns if a is not example_assign]
const_names = set()
for a in constants:
    for t in (a.targets if isinstance(a, ast.Assign) else [a.target]):
        if isinstance(t, ast.Name):
            const_names.add(t.id)

def provided(imp): return {(a.asname or a.name.split(".")[0]) for a in imp.names}

def names_used(node): return {n.id for n in ast.walk(node) if isinstance(n, ast.Name)}

def split_names(cls):
    """(runtime names, annotation-only names) referenced in the class."""
    ann = set()
    for n in ast.walk(cls):
        if isinstance(n, ast.arg) and n.annotation is not None: ann |= names_used(n.annotation)
        if isinstance(n, ast.FunctionDef) and n.returns is not None: ann |= names_used(n.returns)
        if isinstance(n, ast.AnnAssign) and n.annotation is not None: ann |= names_used(n.annotation)
    rt = set()
    class V(ast.NodeVisitor):
        def visit_arg(self, node): pass
        def visit_FunctionDef(self, node):
            for d in node.decorator_list: self.visit(d)
            for s in node.body: self.visit(s)
            for d in node.args.defaults + [x for x in node.args.kw_defaults if x]: self.visit(d)
        def visit_AnnAssign(self, node):
            if node.value is not None: self.visit(node.value)
        def visit_Name(self, node): rt.add(node.id)
        def visit_ClassDef(self, node):
            for b in node.bases: self.visit(b)
            for k in node.keywords: self.visit(k.value)
            for s in node.body: self.visit(s)
    V().visit(cls)
    return rt, ann - rt

out = {}
for cls in classes:
    fname = "example.py" if cls is example_cls else f"{snake(cls.name)}.py"
    rt, ann = split_names(cls)
    used = rt | ann
    header = ["from __future__ import annotations", ""] if (future or ann & class_names) else []
    ext, tc_ext = [], []
    for imp in imports:
        prov = provided(imp) & used
        if not prov: continue
        if isinstance(imp, ast.ImportFrom):
            keep = [a for a in imp.names if (a.asname or a.name) in prov]
            stmt = f"from {imp.module} import " + ", ".join(a.name + (f" as {a.asname}" if a.asname else "") for a in keep)
        else:
            keep = [a for a in imp.names if (a.asname or a.name.split('.')[0]) in prov]
            stmt = "import " + ", ".join(a.name + (f" as {a.asname}" if a.asname else "") for a in keep)
        (tc_ext if (prov <= ann and not (prov & rt)) else ext).append(stmt)
    local_rt, local_tc = [], []
    for other in sorted(class_names - {cls.name}):
        mod = "example" if other == example_cls.name else snake(other)
        if other in rt: local_rt.append(f"from .{mod} import {other}")
        elif other in ann: local_tc.append(f"from .{mod} import {other}")
    for c in sorted(const_names):
        if c in used: local_rt.append(f"from .constants import {c}")
    body = ext + ([""] if ext and local_rt else []) + local_rt
    tc = tc_ext + local_tc
    if tc:
        if body: body.append("")
        body += ["from typing import TYPE_CHECKING", "", "if TYPE_CHECKING:"] + [f"    {s}" for s in tc]
    text = "\n".join(header + body).rstrip("\n")
    parts = [text, "", "", segment(cls)] if text else [segment(cls)]
    if cls is example_cls: parts += ["", "", segment(example_assign)]
    out[fname] = "\n".join(parts).rstrip("\n") + "\n"

if constants:
    used_c = set()
    for a in constants: used_c |= names_used(a)
    ext = []
    for imp in imports:
        prov = provided(imp) & used_c
        if prov:
            ext.append((f"from {imp.module} import " + ", ".join(a.name for a in imp.names if (a.asname or a.name) in prov)) if isinstance(imp, ast.ImportFrom) else ("import " + ", ".join(a.name for a in imp.names if a.name.split('.')[0] in prov)))
    out["constants.py"] = "\n".join((ext + [""] if ext else []) + [segment(a) for a in constants]).rstrip("\n") + "\n"

init = [f'"""{docstring}"""', ""] if docstring else []
exports = []
for cls in classes:
    init.append(f"from .{'example' if cls is example_cls else snake(cls.name)} import {cls.name}"); exports.append(cls.name)
for c in sorted(const_names):
    init.append(f"from .constants import {c}"); exports.append(c)
init.append("from .example import example"); exports.append("example")
init += ["", "__all__ = [", *[f'    "{e}",' for e in exports], "]"]
out["__init__.py"] = "\n".join(init) + "\n"
for fname, text in out.items(): (pkg_dir / fname).write_text(text)
print("wrote:", ", ".join(sorted(out)))

tests = ROOT / "tests" / f"test_{pkg}.py"
if tests.exists():
    t = tests.read_text(); ttree = ast.parse(t); tl = t.split("\n")
    def seg(n):
        s = n.lineno - 1
        if getattr(n, "decorator_list", None): s = min(d.lineno for d in n.decorator_list) - 1
        return "\n".join(tl[s:n.end_lineno])
    timports = [n for n in ttree.body if isinstance(n, (ast.Import, ast.ImportFrom))]
    tfuncs = [n for n in ttree.body if isinstance(n, (ast.FunctionDef, ast.ClassDef, ast.Assign))]
    ex = [n for n in tfuncs if isinstance(n, ast.FunctionDef) and "example" in n.name]
    rest = [n for n in tfuncs if n not in ex]
    imp_text = "\n".join(seg(n) for n in timports)
    tests.write_text(imp_text + "\n\n\n" + "\n\n\n".join(seg(n) for n in rest) + "\n")
    (ROOT / "tests" / f"test_{pkg}_example.py").write_text(imp_text + "\n\n\n" + "\n\n\n".join(seg(n) for n in ex) + "\n")
    print("tests split")
