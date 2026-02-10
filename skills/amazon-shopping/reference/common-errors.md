# Common Amazon Shopping Errors

## ⚠️ CRITICAL: ASIN-Product Mismatch

**Symptom**: Recommended product link goes to completely different product

**Example**: Recommending TRUE METRIX glucose meter but link goes to OneTouch lancets

**Root Cause**: Extracting ASINs separately from product names, causing mismatched pairs

**Solution**:
1. **ALWAYS extract product name AND ASIN together** from the same URL block:
   ```bash
   grep -B1 -A1 "/url:.*dp/[A-Z0-9]{10}" snapshot.txt | grep -E "(heading \"|/url:.*dp/)"
   ```
2. **Verify each ASIN before presenting**:
   ```bash
   agent-browser open https://www.amazon.com/dp/[ASIN]
   # Confirm title matches product being recommended
   ```
3. **If verification fails, find correct ASIN** - do NOT present mismatched data

**Prevention**: Never use `grep -oE "dp/[A-Z0-9]{10}"` alone - this extracts ALL ASINs including ads, sponsored products, and unrelated items

## ⚠️ CRITICAL: Price Inaccuracy

**Symptom**: Prices shown in recommendations don't match actual product page prices

**Example**: Recommending a product at ~$20 but actual price is $35

**Root Cause**: Extracting prices from search results pages instead of actual product pages. Search results may show:
- Different prices for variants/sizes
- Outdated pricing
- Prices from third-party sellers
- Promotion prices that have expired

**Solution**:
1. **ALWAYS verify price on the actual product page**:
   ```bash
   agent-browser open https://www.amazon.com/dp/[ASIN]
   sleep 3
   agent-browser snapshot | grep -iE "One-time purchase"
   ```
2. **Look for "One-time purchase: $XX.XX"** on the product page
3. **Never trust search result prices** - they're often misleading

**Prevention**: Make price verification mandatory alongside ASIN verification before presenting any recommendation

## CAPTCHA Detection

**Symptom**: Snapshot shows "enter characters" or "prove you are human"

**Solution**:
1. Wait 60 seconds
2. Retry from amazon.com homepage
3. If persistent, inform user Amazon is rate-limiting

## Rate Limiting

**Symptom**: "try again later", 403 error, or empty results

**Solution**:
1. Wait 2-3 minutes before retry
2. Avoid rapid successive searches
3. Consider rotating search terms

## No Results Found

**Symptom**: Fewer than 3 products in snapshot

**Solution**:
1. Broaden search terms (use category names)
2. Try alternative search phrasing
3. Navigate by category instead

## Slow Page Load

**Symptom**: Incomplete snapshot or missing product data

**Solution**:
1. Increase sleep time to 7-10 seconds
2. Check for dynamic content indicators
3. Wait for page load completion
