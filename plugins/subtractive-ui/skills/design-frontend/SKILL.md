---
name: design-frontend
description: Use when designing or redesigning frontend screens from specs, screenshots, visual references, product direction, or brand direction.
---

# Design Frontend

Use before substantial frontend design or redesign work.

## Workflow

1. Identify the screen job.
   - Name the user's current goal.
   - Pick one primary action for the state.
   - Name the state: empty, loading, normal, error, confirming, or done.

2. Ground the visual direction.
   - Read named local design docs, screenshots, mockups, or brand references.
   - Inspect images directly when available.
   - Extract rhythm, density, hierarchy, typography, spacing, color roles, and component behavior.

3. Build the product surface.
   - Make the actual app screen, not a landing page unless requested.
   - Use realistic content and real app states.
   - Do not show implementation, setup, architecture, provider, database, API, mock, or demo explanations in the UI.

4. Subtract before adding.
   - Prefer fewer sections, cards, labels, buttons, and explanatory sentences.
   - Add UI only when it enables the task, clarifies risk, prevents a likely mistake, or shows information needed to decide.
   - Use familiar controls and compact labels instead of explainer panels.

5. Stabilize the layout.
   - Define design tokens before styling screens.
   - Use icons for familiar tool actions.
   - Keep cards for repeated items, modals, or framed tools only.
   - Avoid nested cards, decorative blobs, generic gradients, marketing heroes, accidental dashboards, and text that resizes layout.

## Flow Storyboards

Create a storyboard before coding when the work spans several states, the input path is unclear, or a single screen mock would hide confirmation/success problems.

Use `references/storyboard-flow-prompts.md` for prompt structure. Keep captions outside app screens, keep in-app copy minimal, and split distinct modes into separate boards.

## References

Read `references/subtractive-principles.md` when the screen feels cluttered, generic, or too verbose.

Read `../../references/modern-ios-app-design.md` for mobile or iOS-style work that needs taste calibration.

## Handoff Standard

Rendered screens should show a clear primary action, no implementation-detail copy, no duplicate CTAs, no repeated obvious text, no clipped controls, and visual rhythm traceable to the selected references.
