#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="/Users/apple/Documents/Codes/Laravel/momento-be"
DB_PATH="/tmp/momento-playwright.sqlite"

rm -f "$DB_PATH"
touch "$DB_PATH"

(
  cd "$BACKEND_DIR"
  DB_CONNECTION=sqlite DB_DATABASE="$DB_PATH" APP_ENV=testing php artisan migrate:fresh --seed --quiet
  DB_CONNECTION=sqlite DB_DATABASE="$DB_PATH" APP_ENV=testing php artisan serve --host=127.0.0.1 --port=8000
) &
BACKEND_PID=$!

trap 'kill "$BACKEND_PID" 2>/dev/null || true' EXIT

until curl -fsS http://127.0.0.1:8000/api/invitations/aira-bima >/dev/null 2>&1; do
  sleep 1
done

cd "$ROOT_DIR"
MOMENTO_API_URL=http://127.0.0.1:8000/api NEXT_PUBLIC_MOMENTO_API_URL=http://127.0.0.1:8000/api pnpm dev --hostname 127.0.0.1 --port 3000
