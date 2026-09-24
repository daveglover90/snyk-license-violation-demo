#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

GH="${GH:-/opt/homebrew/bin/gh}"
REPO_NAME="${1:-snyk-license-violation-demo}"

if ! "$GH" auth status >/dev/null 2>&1; then
  echo "Not logged in. Run: gh auth login"
  exit 1
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin already set; pushing..."
  git push -u origin main
else
  "$GH" repo create "$REPO_NAME" \
    --public \
    --source=. \
    --remote=origin \
    --push \
    --description "Sample Node app and intentional GPL dependencies for Snyk license scanning demos"
fi

echo "Done: $("$GH" repo view --json url -q .url)"
