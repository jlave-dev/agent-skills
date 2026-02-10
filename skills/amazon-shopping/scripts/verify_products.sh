#!/bin/bash
# Verify each Amazon product by visiting its page and extracting real data.
#
# MANDATORY: All products MUST be verified before being presented to users.
# This prevents ASIN mismatches and price inaccuracies.
#
# Usage: verify_products.sh <snapshot_file>
# Output: JSON array of verified products

set -e

SNAPSHOT_FILE="$1"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -z "$SNAPSHOT_FILE" ]; then
    echo '{"error": "Usage: verify_products.sh <snapshot_file>", "products": []}'
    exit 1
fi

if [ ! -f "$SNAPSHOT_FILE" ]; then
    echo "{\"error\": \"Snapshot file not found: $SNAPSHOT_FILE\", \"products\": []}"
    exit 1
fi

# Extract products using the Python script
PRODUCTS_JSON=$(python3 "$SCRIPT_DIR/extract_products.py" "$SNAPSHOT_FILE")

# Start JSON array
echo "["

FIRST=true
echo "$PRODUCTS_JSON" | jq -c '.[]' 2>/dev/null | while read -r product; do
    # Skip if jq failed
    [ -z "$product" ] && continue

    ASIN=$(echo "$product" | jq -r '.asin // empty')
    NAME=$(echo "$product" | jq -r '.name // empty')

    # Skip if missing critical data
    [ -z "$ASIN" ] && continue
    [ -z "$NAME" ] && continue

    # Progress indicator (stderr so it doesn't mess up JSON output)
    echo "Verifying: $NAME ($ASIN)" >&2

    # Open product page
    agent-browser open "https://www.amazon.com/dp/$ASIN" >/dev/null 2>&1 || true
    sleep 3

    # Get page snapshot
    PAGE_SNAPSHOT=$(agent-browser snapshot 2>/dev/null || echo "")

    # Verify title match - extract first 30 chars of product name and check
    NAME_PREFIX=$(echo "$NAME" | head -c 30 | sed 's/[[:space:]]*$//')
    TITLE_MATCH=$(echo "$PAGE_SNAPSHOT" | grep -ic "$NAME_PREFIX" || echo "0")

    if [ "$TITLE_MATCH" -eq 0 ]; then
        echo "  SKIP: Title mismatch for $ASIN" >&2
        continue
    fi

    # Extract price - look for "One-time purchase" first (most accurate)
    PRICE=$(echo "$PAGE_SNAPSHOT" | grep -oE 'One-time purchase:\s*\$[0-9]+\.[0-9]{2}' | head -1 | grep -oE '[0-9]+\.[0-9]{2}')

    # Fallback to any dollar amount
    if [ -z "$PRICE" ]; then
        PRICE=$(echo "$PAGE_SNAPSHOT" | grep -oE '\$[0-9]+\.[0-9]{2}' | head -1 | grep -oE '[0-9]+\.[0-9]{2}')
    fi

    # Extract rating
    RATING=$(echo "$PAGE_SNAPSHOT" | grep -oE '[0-9]\.[0-9]\s+out of\s+5' | head -1 | grep -oE '[0-9]\.[0-9]' || echo "")

    # Extract review count
    REVIEWS=$(echo "$PAGE_SNAPSHOT" | grep -oE '[0-9,]+\s+ratings?' | head -1 | grep -oE '[0-9,]+' | tr -d ',' || echo "")

    # Skip if no price found
    if [ -z "$PRICE" ]; then
        echo "  SKIP: No price found for $ASIN" >&2
        continue
    fi

    # Output comma separator for all but first item
    if [ "$FIRST" = true ]; then
        FIRST=false
    else
        echo ","
    fi

    # Output verified product as JSON
    cat <<EOF
{
  "name": $(echo "$NAME" | jq -Rs .),
  "asin": "$ASIN",
  "price": $PRICE,
  "rating": "$RATING",
  "review_count": "$REVIEWS",
  "verified": true
}
EOF

    echo "  VERIFIED: \$$PRICE" >&2
done

echo ""
echo "]"
