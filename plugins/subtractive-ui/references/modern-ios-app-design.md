# Modern iOS App Design Reference Board

Status: curated visual references for Subtractive UI

Use this file when an agent needs taste calibration for modern iOS/mobile UI. These are reference pages to inspect visually, not assets to copy. Open the linked pages, study the screenshots and context, then translate the principles into the current product's domain.

## Core iOS Principles

Source: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines?lang=en)

Apple's current platform guidance emphasizes hierarchy, harmony, and consistency. For practical agent work, translate that into:

- hierarchy: content and primary actions are instantly legible
- harmony: controls feel native to the device and do not fight the surface
- consistency: use familiar controls before inventing custom ones
- restraint: the interface should elevate the content, not narrate itself

Copy principle:

- Use familiar user words, not implementation words.
- Prefer short labels and state over explanatory paragraphs.
- Navigation should support the app without drawing attention to itself.

## Reference Apps

### Tide Guide

Sources:

- [2026 Apple Design Awards announcement](https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/)
- [Tide Guide on the App Store](https://apps.apple.com/us/app/tide-guide-charts-tables/id1406371071)

Why it is fantastic:

- It makes dense environmental data feel visual, immediate, and usable.
- Full-screen charts are not decoration; they are the product.
- The aquatic theme and sky-like palette make the app feel bespoke without burying the data.
- Motion and polish are tied to meaning: weather, tide, sun, moon, time.

What to steal:

- Let the core domain object own the screen.
- Use one strong visual system instead of many unrelated cards.
- Make charts/maps/visual data feel like working surfaces.

What not to steal blindly:

- Do not add visual richness if the app's data is not ready for it.
- Do not use glass/material effects as generic decoration.

### Crouton

Sources:

- [2024 Apple Design Awards page](https://developer.apple.com/design/awards/2024/)
- [Crouton on the App Store](https://apps.apple.com/us/app/crouton-recipe-manager/id1461650987)

Why it is fantastic:

- The information hierarchy is tuned to a real context: cooking while distracted, hands busy, attention split.
- Key details are easy to find exactly when needed.
- The app keeps the user's focus on the task, not the screen.

What to steal:

- Design around the physical context of use.
- Put the next action close to the relevant information.
- Keep helper copy short because the app is used mid-task.

What not to steal blindly:

- Do not overfit to kitchen/recipe patterns unless the product has step-by-step task flow.

### Gentler Streak

Sources:

- [2024 Apple Design Awards announcement](https://www.apple.com/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/)
- [Gentler Streak on the App Store](https://apps.apple.com/us/app/gentler-streak-workout-tracker/id1576857102)

Why it is fantastic:

- It organizes health data around personal progression rather than comparison.
- Tone and interface are aligned: encouraging, personal, and humane.
- The UI avoids turning metrics into shame.

What to steal:

- Make tone part of the interface, not just copy.
- Use status, trends, and summaries to reduce anxiety.
- Avoid overexplaining the system; show the next healthy action.

What not to steal blindly:

- Do not import wellness-style encouragement into tools that need quiet utility.

### Things 3

Source: [Things 3 on the App Store](https://apps.apple.com/us/app/things-3/id904237743)

Why it is fantastic:

- It is a masterclass in quiet hierarchy: lists, spacing, and controls stay out of the user's way.
- The app can modernize visuals while preserving familiar muscle memory.
- It treats every small affordance as craft: to-dos, dialogs, controls, and icons all share one calm system.

What to steal:

- One primary action can carry a whole screen.
- Whitespace and typography can replace explanatory copy.
- Rounded/glassy updates should preserve function, not become the point.

What not to steal blindly:

- Do not copy task-manager layout for non-list-heavy products.

### Flighty

Source: [Flighty on the App Store](https://apps.apple.com/us/app/flighty-live-flight-tracker/id1358823008)

Why it is fantastic:

- It turns stressful real-time information into confident status.
- Complex data is layered: summary first, details available when needed.
- It supports glanceable states across iPhone, Lock Screen, widgets, and Watch without changing the core mental model.

What to steal:

- Make status unmistakable.
- Use progressive disclosure for complex data.
- Surface time, distance, and state as compact primitives.

What not to steal blindly:

- Do not expose every backend/provider detail just because the system knows it.

### Moonlitt

Sources:

- [2026 Apple Design Awards announcement](https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/)
- [Moonlitt on the App Store](https://apps.apple.com/us/app/moonlitt-moon-phase-tracker/id6444718902)

Why it is fantastic:

- It gives a single domain object, the moon, a strong visual center.
- The app turns technical astronomical data into an elegant everyday ritual.
- Navigation and interaction support exploration without excessive instruction.

What to steal:

- Pick one visual hero for the domain.
- Convert technical facts into human-facing state.
- Use atmosphere when it is tied directly to content.

What not to steal blindly:

- Do not use dark cosmic visuals unless the product's domain calls for it.

### CapWords

Sources:

- [Behind the appealing design of CapWords](https://developer.apple.com/articles/capwords)
- [2025 Apple Design Awards page](https://developer.apple.com/design/awards/2025/)

Why it is fantastic:

- It hides advanced technology behind a playful, understandable interaction.
- The concept is easy to explain visually: point at a thing, get a language-learning object.
- The app's delight is not extra chrome; it is the learning mechanism.

What to steal:

- Let AI become a simple user action, not visible system plumbing.
- Make the result tangible.
- Teach by doing, not by explaining.

What not to steal blindly:

- Do not add cute character systems unless they belong to the product.

### Arc Search

Source: [2024 Apple Design Awards page](https://developer.apple.com/design/awards/2024/)

Why it is fantastic:

- It narrows a browser into a direct search/action surface.
- The best idea is reduction: fewer browser concepts, more direct user intent.
- It shows how a powerful app can begin from one obvious input.

What to steal:

- Start with the user's intent, not the product's architecture.
- One clear input can be more powerful than a dashboard of options.
- Avoid surfacing internal modes unless users need to choose between them.

What not to steal blindly:

- Do not hide necessary correction/recovery paths in pursuit of minimalism.

### (Not Boring) Camera

Sources:

- [2026 Apple Design Awards page](https://developer.apple.com/design/awards/)
- [(Not Boring) Camera on the App Store](https://apps.apple.com/gb/app/not-boring-camera/id6737783441)

Why it is fantastic:

- It shows that utility apps can have a strong point of view.
- Visual personality is allowed when it makes the core action feel more direct and memorable.
- The brand system is distinctive without needing explanatory UI.

What to steal:

- A tool can feel opinionated without adding paragraphs.
- Make controls tactile and memorable.
- Strong visual identity should reduce friction, not add it.

What not to steal blindly:

- Do not turn every app into a visual performance.
- Use expressive style only after the core workflow is crisp.

## Cross-App Lessons

1. The best modern iOS apps are not verbose.
   - They use labels, state, hierarchy, and motion instead of explanatory paragraphs.

2. They hide implementation.
   - AI, APIs, data providers, sync, widgets, and platform integrations appear as user benefits or quiet affordances, not system diagrams.

3. They have one visual thesis.
   - Tide Guide has charts/water/sky.
   - Moonlitt has the moon.
   - Flighty has flight status/timeline.
   - Things has quiet lists.
   - Crouton has task-focused cooking flow.

4. They are dense only where the domain demands it.
   - Density is acceptable for flight, tide, finance, or health data.
   - Density is not an excuse for duplicate controls or repeated copy.

5. They prioritize glanceability.
   - At a glance, users know status, next action, and whether anything needs attention.

6. They keep delight attached to function.
   - Delightful visuals support the task; they are not decoration pasted onto a weak flow.

## Agent Checklist

When applying these references to a frontend:

- Name the closest reference app before editing.
- Name the one visual thesis for the current product.
- Remove implementation words from UI.
- Delete duplicate CTAs and repeated explanations.
- Use one primary action per decision area.
- Prefer native controls and familiar mobile patterns.
- Inspect rendered screenshots, not just code.
- Verify mobile first.
