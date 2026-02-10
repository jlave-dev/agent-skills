# ASIN Extraction Reference

## What is an ASIN?

Amazon Standard Identification Number - 10 alphanumeric characters that uniquely identify products.

## URL Patterns

| Format | Example | Extraction |
|--------|---------|------------|
| `/dp/B0XXXXXXXXX` | `/dp/B08XW2X5KH/ref=...` | Extract after `/dp/` until `/` or `?` |
| `/gp/product/B0XXXXXXXXX` | `/gp/product/B08XW2X5KH` | Extract after `/product/` until `/` or `?` |
| `amzn.to/XXXXX` | Shortened redirect | Follow redirect, then extract ASIN |

## Grep Patterns

**Simple extraction:**
```bash
grep -oE "dp/[A-Z0-9]{10}" snapshot.txt | sed 's|dp/||'
```

**With URL context for verification:**
```bash
grep -oE "/[^/]+/dp/[A-Z0-9]{10}[^[:space:]]*" snapshot.txt
```

## URL Normalization

Clean URLs by removing tracking parameters:
```bash
# Strip everything after ? or /ref
echo "/dp/B0XXXXXXXXX/ref=...?tag=..." | sed 's|[/?].*||'
```

**Output**: `B0XXXXXXXXX`

## ⚠️ CRITICAL FAILURE MODE TO AVOID

**NEVER extract ASINs separately from product names. This WILL cause mismatches.**

Example of WRONG approach:
```bash
# ❌ WRONG - This extracts ALL ASINs on the page, including ads/sponsored content
grep -oE "dp/[A-Z0-9]{10}" snapshot.txt | sed 's|dp/||'
# Then pairing them with product names → GUARANTEED MISMATCHES
```

```bash
# ❌ WRONG - Context window approach also fails
grep -B2 -A2 "Product Name" snapshot.txt | grep -oE "dp/[A-Z0-9]{10}"
# This can capture ASINs from NEARBY products, not the target product
```

**Why this fails**: Amazon pages contain ASINs for ads, "sponsored" products, footer links, and unrelated items. These get mixed with actual product results, causing wrong ASIN-to-product associations. The context window approach (grep -B2 -A2) fails because product headings and their URLs are not adjacent in the accessibility tree.

**Example failure**: ASIN B08PVZKVL4 (OneTouch lancets) was incorrectly paired with a TRUE METRIX glucose meter recommendation using grep context windows.

## Verification

ASIN must be:
- Exactly 10 characters
- Alphanumeric only (A-Z, 0-9)
- Present in actual snapshot `/url:` lines
- **Extracted TOGETHER with product name** (not separately)
- **Verified by opening the actual URL before presenting**

**ALWAYS verify before presenting**:
```bash
agent-browser open https://www.amazon.com/dp/[ASIN]
# Confirm the product title matches what you're recommending
```

**NEVER fabricate ASINs**. If extraction fails, re-search or visit product page directly.

---

## ✅ CORRECT: Container-Based Extraction Method

**Use the dedicated extraction script** for 100% accurate product+ASIN pairing:

```bash
python3 ~/.claude/skills/amazon-shopping/scripts/extract_products.py results.txt
```

**How it works:**
1. Parses the YAML/indented structure of the accessibility tree
2. Identifies product containers (list items with both heading and link)
3. Extracts product name AND ASIN from THE SAME container
4. Outputs as JSON with verified pairings

**Output format:**
```json
[
  {"name": "Product Name", "asin": "B0XXXXXXXXX", "ref": "e123", "line_index": 42},
  ...
]
```

This method guarantees 0% ASIN/product mismatches because it never separates the product name from its ASIN.
