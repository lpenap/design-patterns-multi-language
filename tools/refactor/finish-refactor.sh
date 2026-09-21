#!/bin/bash
# usage: finish-refactor.sh <spec NNN> <python|typescript|javascript> <id> "<Pattern Name>"
set -u
NNN=$1; LANG_=$2; ID=$3; NAME=$4
cd "$(dirname "$0")/../.." || exit 1
export JAVA_HOME=${JAVA_HOME:-$HOME/.sdkman/candidates/java/25.0.4-tem}; export PATH=$JAVA_HOME/bin:$PATH
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
gh pr create --base master --head "$BR" --title "Spec $NNN: $NAME, one class per file ($LANG_)" --body "Phase 4, one PR per pattern per language. The $LANG_ implementation of $NAME is split into one file per participant (constitution 1.1.0, Principle IV); the test file is split into behaviour and example tests; the doc's Participants links for $LANG_ point at the per-class files.

- Behaviour-preserving: \`make check\` 108 ok, no snapshot changed
- \`patterns validate\`: no one-class-per-file warning left for $ID/$LANG_
- Lint, type checks, tests and coverage gates green

🤖 Generated with [Claude Code](https://claude.com/claude-code)" 2>&1 | tail -1
