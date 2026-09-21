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
# master accepts pull requests only: the tick already travelled in the PR. Realign local master.
git checkout -q master && git fetch -q origin && git reset -q --hard origin/master
git log --oneline -1
