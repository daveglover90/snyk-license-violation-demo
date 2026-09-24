#!/usr/bin/env bash
# Run from anywhere; prints GPL license policy issues for the Node demo.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
NODE="$ROOT/nodejs"

if [[ ! -f "$NODE/package-lock.json" ]]; then
  echo "Run: cd \"$NODE\" && npm install"
  exit 1
fi

echo "=== Snyk license demo (Node) ==="
echo "Project path: $NODE"
echo ""

snyk test --file="$NODE/package.json"
