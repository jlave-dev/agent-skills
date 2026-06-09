# Leak And Dedup Checklist

## Leaky Words

Flag these in user-facing UI unless there is a clear product reason:

- API
- backend
- database
- Supabase
- Firebase
- Cloudflare
- Edge Function
- function
- adapter
- provider
- schema
- migration
- mock
- demo
- prototype
- fixture
- generated
- model
- prompt
- local storage
- environment
- token
- key

Provider attribution can be allowed when required, but it should be attribution, not task copy.

## Redundant UI Patterns

Flag:

- title and body saying the same thing
- CTA text repeated in helper copy
- two primary buttons in the same decision area
- "Save" and "Confirm" both acting on the same item
- chips duplicating filters
- repeated empty states across panels
- cards inside cards to show one concept
- multiple explanations of source, status, or confidence
- multiple ways to start the same task without meaningful distinction

## Replacement Patterns

- "Click here to search Google Places API" -> "Search places"
- "Use Supabase email OTP to sign in" -> "Sign in with email"
- "This demo uses mock saved places" -> remove from UI
- "The map below shows your saved places" -> remove; the map is self-evident
- "Confirm this provider-backed candidate" -> "Save place"
- "Call extract-source-candidates" -> "Find places"
- "Upload screenshots for AI extraction" -> "Add screenshot"

## Minimum Good Screen

A good screen usually has:

- one clear screen title
- one primary action
- compact supporting controls
- state only where needed
- no internal implementation vocabulary
- no duplicate explanations
- enough information to act, not enough to document the system
