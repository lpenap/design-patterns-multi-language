#!/bin/bash
# usage: merge-refactor.sh <pr> <spec NNN> <python|typescript|javascript> <id> "<Pattern Name>"
set -u
PR=$1; NNN=$2; LANG_=$3; ID=$4; NAME=$5
cd "$(dirname "$0")/../.." || exit 1
for attempt in $(seq 1 12); do st=$(gh pr checks $PR 2>&1); echo "$st" | grep -q "no checks" || break; sleep 30; done
gh pr checks $PR --watch --interval 15 > /dev/null 2>&1
st=$(gh pr checks $PR 2>&1); echo "$st" | awk '{print $1, $2}'
[ "$(echo "$st" | grep -vc pass)" = "0" ] || { echo "CHECKS NOT ALL PASSING"; exit 1; }
gh pr merge $PR --merge --subject "Merge spec $NNN: $NAME, one class per file ($LANG_)" --body "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" 2>&1 | tail -1
git checkout -q master && git pull -q origin master
python3 - "$PR" "$LANG_" "$NAME" "$NNN" "$ID" <<'PY'
import sys,pathlib,re
pr,lang,name,nnn,pid=sys.argv[1:]
col={"python":1,"typescript":2,"javascript":3}[lang]
p=pathlib.Path("PLAN.md"); s=p.read_text()
def tick(m):
    cells=m.group(0).split("|")[1:-1]; cells[col]=f" ✅ #{pr} "; return "|"+"|".join(cells)+"|"
s2=re.sub(rf"^\| {re.escape(name)} \|[^\n]*\|$", tick, s, count=1, flags=re.M); assert s2!=s; p.write_text(s2)
spec=next(pathlib.Path("specs").glob(f"{nnn}-*"))/"tasks.md"; t=spec.read_text()
t2=t.replace(f"- [ ] {name} — branch `{nnn}-{lang}-{pid}`", f"- [x] {name} — PR #{pr}"); assert t2!=t; spec.write_text(t2)
print("ticked", name, lang)
PY
git add PLAN.md specs && git -c user.name="Luis" commit -q -m "Plan: tick $NAME / $LANG_ (PR #$PR)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" && git push -q origin master 2>&1 | grep -v "^remote:\|^$"
git log --oneline -1
