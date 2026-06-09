# Refactor Patterns

## Copy Rewrites

Use product-language replacements:

- "Use the Google Places API" -> "Search places"
- "AI extraction" -> "Find places"
- "Provider-backed match" -> "Place match"
- "Supabase auth" -> "Sign in"
- "Edge Function failed" -> "Could not finish. Try again."
- "Demo data" -> remove, or show realistic data without labeling it as demo
- "Mock provider" -> remove
- "Local prototype" -> remove
- "Hydrate saved places" -> "Refresh"

## Structural Rewrites

- paragraph explainer + button -> button only, with compact empty state if needed
- duplicate buttons -> one primary button, one secondary text/icon action if truly different
- repeated suggestions -> one concise suggestion row
- nested cards -> one card with sections separated by spacing or borders
- helper panel -> inline empty/error state
- multiple badges for same fact -> one compact status pill

## Preserve Quiet States

Errors can be clear without being technical:

- "Could not find places from that link."
- "Try a screenshot or search manually."
- "No saved places yet."
- "Location is off. Distance sorting is unavailable."

Avoid:

- stack traces
- provider error names
- endpoint names
- schema/validation details
- environment/setup hints
