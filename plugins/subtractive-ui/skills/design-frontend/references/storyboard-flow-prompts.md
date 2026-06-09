# Storyboard Flow Prompts

## Flow Board Shape

Use this default shape:

```text
Create a polished UI design storyboard showing the entire <flow name> for <app/product>.
The board should show <3-5> full screens side-by-side on a calm neutral background.
Use captions outside each screen: "1 <Step>", "2 <Step>", ...
The app UI itself should look production-ready, not like a wireframe.
```

Good screen count:

- 3 screens: input -> confirm -> success
- 4 screens: input -> choose/process -> confirm/review -> success
- 5 screens: input -> processing -> result selection -> confirm -> success

If there are more than 5 states, split the flow into multiple boards.

## Required Prompt Sections

Include:

```text
Product context: <what the app is and who uses it>
Flow: <what user is trying to accomplish>
Visual references: <local mocks, style, platform, mood>
Board composition: <screen count and labels>
Screen 1: <state, content, primary action>
Screen 2: <state, content, primary action>
Screen 3: <state, content, primary action>
...
Strict copy constraints: <words and patterns to avoid>
Style constraints: <palette, typography, spacing, platform polish>
```

## Copy Constraints Template

Use this or adapt it:

```text
Strict copy constraints:
Do not include implementation-detail words such as API, provider, adapter, database, backend, edge function, model, prompt, demo, mock, prototype, local, generated, schema, token, or key.
Do not include explanatory paragraphs.
Do not duplicate primary actions.
Keep labels short and user-facing.
```

Add domain-specific banned words when needed. For example:

- location apps: do not say `Google Places API`; say `Search places`
- AI apps: do not say `AI extraction`; say `Find`, `Read`, `Summarize`, or the user action
- auth apps: do not say `OAuth` or `JWT`; say `Sign in`

## Step Captions

Captions outside the app frame can explain the storyboard:

- `1 Search`
- `2 Choose`
- `3 Confirm`
- `4 Saved`

Inside the app, avoid tutorial-like headings unless they are real product UI.

## Minimal Flow Patterns

### Search Flow

```text
Screen 1: Search input with one primary action.
Screen 2: Results list with one selected result and Continue.
Screen 3: Confirmation with the selected item, key facts, Save, and a quiet correction action.
Screen 4: Saved state showing the item in its final destination.
```

### Upload / Import Flow

```text
Screen 1: Upload well or selected file with one primary action.
Screen 2: Processing state with a grounded preview and plain status.
Screen 3: Review state with selected candidates and correction affordances.
Screen 4: Saved state showing the final result.
```

### Auth Flow

```text
Screen 1: Email or sign-in input.
Screen 2: Code/magic-link check state.
Screen 3: Signed-in account or app home.
```

### Settings / Menu Flow

```text
Screen 1: Closed surface.
Screen 2: Menu/popover open.
Screen 3: Selected settings pane or confirmation dialog.
```

## Inspection Checklist

Before saving a storyboard:

- Does every screen have one main job?
- Does every screen have one primary action?
- Is any text redundant between title, body, and button?
- Are all technical/provider words removed?
- Are captions outside the app frame rather than inside the UI?
- Does the success screen show where the user lands?
- Are visual references visible in spacing, color, hierarchy, and density?

## Project Save Pattern

For project-bound mockups:

1. Generate with built-in `imagegen`.
2. Locate the output under `$CODEX_HOME/generated_images`.
3. Copy the selected image into the project, such as:

```text
docs/design-docs/reference-assets/<product>-<flow>-mock.png
```

4. Update the design/reference doc:

```text
Use for:
- <what implementation should borrow>

Do not copy:
- <incidental screenshot details, stale scope, or generated artifacts>
```
