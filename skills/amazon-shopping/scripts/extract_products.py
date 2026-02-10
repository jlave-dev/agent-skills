#!/usr/bin/env python3
"""
Extract products from Amazon accessibility snapshot with ASINs.
Parses the YAML-like structure and extracts product names WITH their ASINs
from the same container element - no mismatches possible.

CRITICAL: This script ensures ASINs are extracted from the SAME product container
as the product name, preventing the ASIN/product mismatch bug.
"""

import sys
import re
import json
from typing import List, Dict, Any, Optional


def parse_indent_level(line: str) -> int:
    """Count leading spaces to determine indentation level."""
    return len(line) - len(line.lstrip(' '))


def extract_products(snapshot_file: str) -> List[Dict[str, Any]]:
    """
    Parse accessibility snapshot and extract product+ASIN pairs from containers.

    Key insight: In the accessibility tree, each product is a listitem containing
    both a heading (product name) and a link (with ASIN). We must extract BOTH
    from the SAME container to prevent mismatches.
    """
    products = []

    with open(snapshot_file, 'r') as f:
        lines = f.readlines()

    i = 0
    while i < len(lines):
        line = lines[i]
        indent = parse_indent_level(line)

        # Look for product heading pattern
        # Match keywords for common medical devices
        heading_match = re.search(
            r'heading\s+"([^"]+.*?(?:Blood\s+Glucose|Glucometer|Monitor|Contour|OneTouch|Accu-Chek|Metene|TRUE\s+METRIX|Care\s+Sens|Prodigy|Ariba|Ketone|Lancet|Test\s+Strip|Diabetes)[^"]*)"',
            line
        )

        if not heading_match:
            # Generic product match - look for any heading with price indicators nearby
            heading_match = re.search(r'heading\s+"([^"]{20,100})"', line)

        if heading_match:
            product_name = heading_match.group(1).strip()
            ref_match = re.search(r'\[ref=([e0-9]+)\]', line)

            # Search FORWARD in same container for the link with ASIN
            asin: Optional[str] = None
            j = i + 1

            # Look within next 20 lines for link in same container
            # Same container = indentation level >= current level
            while j < min(i + 20, len(lines)):
                next_line = lines[j]
                next_indent = parse_indent_level(next_line)

                # Check if we've exited the container (indentation drops below current)
                if next_line.strip() and next_indent < indent:
                    break

                # Look for ASIN in URL
                asin_match = re.search(r'/url:.*?/dp/([A-Z0-9]{10})', next_line)
                if asin_match:
                    asin = asin_match.group(1)
                    # Also extract the ref for this link
                    ref_match = re.search(r'\[ref=([e0-9]+)\]', next_line)
                    break

                j += 1

            if asin:
                products.append({
                    'name': product_name,
                    'asin': asin,
                    'ref': ref_match.group(1) if ref_match else None,
                    'line_index': i
                })

        i += 1

    return products


def print_products_json(products: List[Dict[str, Any]]) -> None:
    """Output products as JSON."""
    print(json.dumps(products, indent=2))


def print_products_simple(products: List[Dict[str, Any]]) -> None:
    """Output products in simple text format for bash parsing."""
    for p in products:
        print(f"{p['asin']}\t{p['name']}")


def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "Usage: extract_products.py <snapshot_file> [--simple]",
            "products": []
        }))
        sys.exit(1)

    snapshot_file = sys.argv[1]
    output_format = "json"

    if len(sys.argv) > 2 and sys.argv[2] == "--simple":
        output_format = "simple"

    try:
        products = extract_products(snapshot_file)

        if output_format == "simple":
            print_products_simple(products)
        else:
            print_products_json(products)

    except FileNotFoundError:
        print(json.dumps({
            "error": f"Snapshot file not found: {snapshot_file}",
            "products": []
        }))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({
            "error": str(e),
            "products": []
        }))
        sys.exit(1)


if __name__ == '__main__':
    main()
