#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-http://localhost:8080}"

echo "Smoke tests → $BASE"
code() { curl -s -o /dev/null -w "%{http_code}" "$1"; }

# Endpoints
for p in "/" "/pricing.html" "/robots.txt" "/sitemap.xml" "/data/videos.json"; do
  c=$(code "$BASE$p"); echo "$c $p"; test "$c" = "200" || { echo "FAIL $p"; exit 1; }
done

# Content probes
curl -fs "$BASE/" | grep -q "Original 4K Stock" && echo "OK hero"
curl -fs "$BASE/" | grep -q "vf-collections-grid" && echo "OK grid"
curl -fs "$BASE/data/videos.json" | (jq 'length>=8' >/dev/null 2>&1 || jq '.collections|length>=8' >/dev/null 2>&1) && echo "OK videos >= 8" || { echo "videos.json too short"; exit 1; }

echo "Done."
