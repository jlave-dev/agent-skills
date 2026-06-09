# Subtractive UI Principles

## Core Principle

Keep UI as minimal as possible until there is a good reason to add more. Prefer subtractive editing over additive explanation.

## Professional UI Does Not Explain Its Internals

User-facing UI should not mention implementation details such as:

- API names
- provider names unless legally/contractually required as attribution
- database/backend names
- edge functions
- adapters
- mocks/demo mode
- local state
- architecture
- scaffolding
- environment variables
- development status

If the UI says "click here to use the Google Places API," rewrite it as the user's action, such as "Search places." If a provider attribution is required, show it as attribution, not as instructional copy.

## Remove Obvious Copy

Delete text that merely narrates visible UI:

- "Use this button to save"
- "Search lets you find places"
- "This map shows your saved places"
- "Choose an option below"
- "Click a tab to switch views"

Replace with compact labels, state, and affordances.

## One Concept, One Place

Do not repeat the same concept in a title, paragraph, card, button, and empty state. Choose the most useful location.

Common duplication problems:

- two save buttons in one view
- both "Confirm" and "Save" for the same action
- duplicate source text in header and card
- repeated suggestions chips with the same meaning
- explanatory paragraphs plus labels that say the same thing
- empty state plus helper panel plus tooltip all explaining one action

## Add Only For A Reason

Add UI when it:

- enables the task
- clarifies a risky state
- prevents a likely mistake
- shows information needed to choose
- satisfies legal attribution

Do not add UI merely to show that engineering work exists.

## Visual Minimalism Is Not Underbuilding

Minimal UI still needs:

- responsive layout
- real loading, empty, error, and success states
- accessible labels/tooltips for icon-only controls
- stable dimensions
- clear destructive affordances
- useful recovery paths
