#!/bin/bash
# usage: do-refactor.sh <python|typescript|javascript> <id> <pythonpkg> "<Pattern Name>"
set -u
LANG_=$1; ID=$2; PKG=$3; NAME=$4
HERE=$(cd "$(dirname "$0")" && pwd)
case $LANG_ in python) NNN=030;; typescript) NNN=031;; javascript) NNN=032;; esac
cd "$HERE/../.." || exit 1
git checkout -q master && git pull -q && git checkout -q -b "$NNN-$LANG_-$ID" || exit 1
if [ "$LANG_" = python ]; then
  python3 "$HERE/split_python.py" "$PKG" || exit 1
  (cd python && uv run ruff check --fix . -q; uv run ruff format -q .; uv run ruff check . -q && uv run ruff format --check . -q && uv run mypy | tail -1 && uv run pytest -q 2>&1 | tail -1) || { echo "PYTHON CHECKS FAILED"; exit 1; }
  python3 "$HERE/fix_doc_links.py" python "$ID" "$PKG"
else
  python3 "$HERE/split_ts.py" "$LANG_" "$ID" || exit 1
  (cd "$LANG_" && (pnpm lint 2>&1 | grep -E "error|warning" && exit 1 || true) && pnpm test 2>&1 | grep -E "Tests |# pass|# fail|FAIL|not met") || { echo "$LANG_ CHECKS FAILED"; exit 1; }
  python3 "$HERE/fix_doc_links.py" "$LANG_" "$ID"
fi
"$HERE/finish-refactor.sh" "$NNN" "$LANG_" "$ID" "$NAME"
