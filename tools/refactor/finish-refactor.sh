#!/bin/bash
# usage: finish-refactor.sh <spec NNN> <python|typescript|javascript> <id> "<Pattern Name>"
set -u
NNN=$1; LANG_=$2; ID=$3; NAME=$4
cd "$(dirname "$0")/../.." || exit 1
export JAVA_HOME=$HOME/.sdkman/candidates/java/$(sed -n "s/^java=//p" .sdkmanrc); export PATH=$JAVA_HOME/bin:$PATH
make check 2>&1 | grep "^check:" | tee /tmp/check-$NNN-$ID.txt
grep -q "^check: 108 ok, 0 drift, 0 mismatch, 0 failed" /tmp/check-$NNN-$ID.txt || { echo "CHECK GATE FAILED"; exit 1; }
git status --porcelain snapshots | grep -q . && { echo "SNAPSHOTS CHANGED"; exit 1; }
W=$(node tools/runner/bin/patterns.js validate 2>&1 | grep -c "^warning: $ID/$LANG_:")
echo "remaining $LANG_ warnings for $ID: $W"; [ "$W" = "0" ] || { echo "WARNINGS REMAIN"; exit 1; }
make lint > /tmp/lint-$NNN-$ID.log 2>&1; L=$?; make test > /tmp/test-$NNN-$ID.log 2>&1; T=$?
echo "LINT EXIT=$L TEST EXIT=$T"; [ $L -eq 0 ] && [ $T -eq 0 ] || { grep -E "error|Error|FAIL|failed" /tmp/lint-$NNN-$ID.log /tmp/test-$NNN-$ID.log | head; exit 1; }
BR=$NNN-$LANG_-$ID
git add -A && git -c user.name="Luis" commit -q -m "Spec $NNN: $NAME, one class per file ($LANG_)

Behaviour-preserving split of the $LANG_ implementation into one file per
participant, tests split into behaviour and example files, doc links
updated. make check unchanged: 108 ok.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" && git push -q -u origin "$BR" 2>&1 | grep -v "^remote:\|^$"
git log --oneline -1
PR=$(gh pr create --base master --head "$BR" --title "Spec $NNN: $NAME, one class per file ($LANG_)" --body "Phase 4, one PR per pattern per language. The $LANG_ implementation of $NAME is split into one file per participant (constitution 1.1.0, Principle IV); the test file is split into behaviour and example tests; the doc's Participants links for $LANG_ point at the per-class files.

- Behaviour-preserving: \`make check\` 108 ok, no snapshot changed
- \`patterns validate\`: no one-class-per-file warning left for $ID/$LANG_
- Lint, type checks, tests and coverage gates green

🤖 Generated with [Claude Code](https://claude.com/claude-code)" 2>&1 | tail -1 | grep -o '[0-9]*$')
echo "PR #$PR"
# master is protected (PRs only), so the plan tick travels in this PR.
python3 - "$PR" "$LANG_" "$NAME" "$NNN" "$ID" <<'PY2'
import sys,pathlib,re
pr,lang,name,nnn,pid=sys.argv[1:]
col={"python":1,"typescript":2,"javascript":3}[lang]
p=pathlib.Path("PLAN.md"); s=p.read_text()
def tick(m):
    cells=m.group(0).split("|")[1:-1]; cells[col]=f" ✅ #{pr} "; return "|"+"|".join(cells)+"|"
s2=re.sub(rf"^\| {re.escape(name)} \|[^\n]*\|$", tick, s, count=1, flags=re.M); assert s2!=s, "row not found"; p.write_text(s2)
spec=next(pathlib.Path("specs").glob(f"{nnn}-*"))/"tasks.md"; t=spec.read_text()
t2=t.replace(f"- [ ] {name} — branch `{nnn}-{lang}-{pid}`", f"- [x] {name} — PR #{pr}"); assert t2!=t, "task not found"; spec.write_text(t2)
print("ticked", name, lang)
PY2
git add PLAN.md specs && git -c user.name="Luis" commit -q -m "Plan: tick $NAME / $LANG_ (PR #$PR)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>" && git push -q origin "$BR" 2>&1 | grep -v "^remote:\|^$"
git log --oneline -1
