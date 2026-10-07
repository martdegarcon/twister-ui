# UI Twists

[shadcn/ui](https://ui.shadcn.com/docs/components) components rebuilt with **one twist each**: the state shows up in type and motion instead of extra UI.

Same visual and motion language as [Account Flow](https://github.com/<your-username>/account-flow).

**Live demo:** `https://<your-username>.github.io/ui-twists/`

## Batch 1

| # | Component | Twist |
|---|-----------|-------|
| 01 | [Slider](01-slider/) | The number’s font weight is the value, from Thin to Black |
| 02 | [Switch](02-switch/) | The knob stretches as it travels; *Off* morphs into *On* and the label gains weight |
| 03 | [Tabs](03-tabs/) | The pill flows to the tab; content enters from the side you moved to |
| 04 | [Dialog](04-dialog/) | The dialog grows out of the button that opened it and folds back into it |
| 05 | [Alert Dialog](05-alert-dialog/) | Hold to delete instead of a second click; the button names what it deletes |
| 06 | [Combobox](06-combobox/) | Typed letters turn bold inside every match; options glide to their new rank |
| 07 | [Data Table](07-data-table/) | Sorting moves rows to their new places, with no jump |
| 08 | [Toggle](08-toggle/) | Each toggle wears its effect: **B** bolds, *I* leans, U and S draw their lines |
| 09 | [Resizable](09-resizable/) | Text changes letter width (Roboto Flex `wdth` axis) instead of wrapping |
| 10 | [Skeleton](10-skeleton/) | Text writes itself over the bars, eating them letter by letter |

## Batch 2

| # | Component | Twist |
|---|-----------|-------|
| 11 | [Questionnaire](11-questionnaire/) | The form becomes a chat: the chosen option flies over and turns into your reply |
| 12 | [Carousel](12-carousel/) | A deck of cards: the top card leaves and slides back in under the deck |
| 13 | [Empty](13-empty/) | Outlines of future content; *Create* fills the first one in |
| 14 | [Menubar](14-menubar/) | Hold ⌘ / ⇧ / ⌥ and the menu filters itself; matching shortcuts get heavy |
| 15 | [Scroll Area](15-scroll-area/) | While scrolling, the thumb opens into the current section’s name |
| 16 | [Collapsible](16-collapsible/) | A notification stack that deals itself out like cards |
| 17 | [Table](17-table/) | Point at a number and the column re-weighs itself against it |

## Batch 3

| # | Component | Twist |
|---|-----------|-------|
| 18 | [Accordion](18-accordion/) | The open answer gets the weight; closed questions turn thin and step back |
| 19 | [Badge](19-badge/) | Each digit rolls on its own drum; the badge grows a column when needed |
| 20 | [Breadcrumb](20-breadcrumb/) | Squeezed, it tightens tracking first, then folds the middle into “…” |
| 21 | [Calendar](21-calendar/) | Days roll in diagonally on month change; a picked range gains weight |
| 22 | [Chart](22-chart/) | Each value label is as heavy as the value it shows |
| 23 | [Checkbox](23-checkbox/) | The tick is drawn like a pen stroke; done tasks thin out |
| 24 | [Command](24-command/) | ⌘K: the highlight glides, results glide to their new rank |
| 25 | [Date Picker](25-date-picker/) | Day, month and year are separate drums |
| 26 | [Drawer](26-drawer/) | The page shrinks and dims exactly as far as you pull |
| 27 | [Dropdown Menu](27-dropdown-menu/) | The highlight follows the pointer and lends its weight |

## Batch 4

| # | Component | Twist |
|---|-----------|-------|
| 28 | [Field](28-field/) | The hint rewrites itself into the error, word by word |
| 29 | [Hover Card](29-hover-card/) | The card grows out of the @mention; the mention becomes its title |
| 30 | [Input Group](30-input-group/) | A pasted `https://` slides into the prefix; the domain becomes a suffix chip |
| 31 | [Kbd](31-kbd/) | Key caps press down when you press the real keys |
| 32 | [Marker](32-marker/) | A highlighter draws over selected text, line by line |
| 33 | [Message](33-message/) | Streamed words arrive thin and gain weight as the ink dries |
| 34 | [Navigation Menu](34-navigation-menu/) | One panel travels and resizes; content enters from your side |
| 35 | [Pagination](35-pagination/) | Numbers slide to make room; the counter rolls |
| 36 | [Popover](36-popover/) | Grows out of the exact click point |
| 37 | [Radio Group](37-radio-group/) | The dot flows like a drop between options |

## Batch 5

| # | Component | Twist |
|---|-----------|-------|
| 38 | [Select](38-select/) | Opens around your current choice; the new one drops into the field. |
| 39 | [Sidebar](39-sidebar/) | Collapse it and the labels squeeze their tracking into the icons. |
| 40 | [Spinner](40-spinner/) | No circle: a wave of weight runs through the word, then settles. |
| 41 | [Tooltip](41-tooltip/) | One tooltip travels between buttons and rewrites its text. |
| 42 | [Sheet](42-sheet/) | Pushes the page aside instead of covering it; the grid reflows. |
| 43 | [Avatar](43-avatar/) | The stack fans out like a hand of cards; +N rolls. |
| 44 | [Attachment](44-attachment/) | The file lands as a page and shrinks into a chip. |
| 45 | [Bubble](45-bubble/) | Your typed text becomes the bubble; ticks draw Sent → Read. |
| 46 | [Item](46-item/) | Finished items travel down to Done; the counter rolls. |
| 47 | [Alert](47-alert/) | Severity is weight; closing folds the alert into a dot. |
| 48 | [Card](48-card/) | The top layer lifts to reveal details printed underneath. |
| 49 | [Toggle Group](49-toggle-group/) | Lines glide to the new alignment, one after another. |
| 50 | [Button Group](50-button-group/) | A liquid selection stretches across, then lets go. |
| 51 | [Message Scroller](51-message-scroller/) | New messages roll up a counter; landing makes them glow. |
| 52 | [Aspect Ratio](52-aspect-ratio/) | The frame re-crops around the subject; the ratio label rolls. |

That’s 52 of shadcn/ui’s components. The rest are either covered in [Account Flow](https://github.com/<your-username>/account-flow) (Input, Input OTP, Textarea, Progress, Button, Toast) or are structural (Label, Separator, Native Select, Direction, Typography).

## Structure

```
ui-twists/
├── index.html          gallery with live previews
├── shared/             tokens.css (colors, motion curve), haptics.js
└── 01-slider/ … 52-aspect-ratio/
```

## Motion

Everything uses CSS transitions and the Web Animations API on one curve:

```css
--ease: cubic-bezier(.25,1,.5,1);
--move: .5s;
--fade: .35s;
```

## Haptics

- **Android:** vibration on the key moments.
- **iPhone (iOS 26.5+):** only direct taps on native switches tick. Switch uses a real `<input switch>`, so it ticks.
- **Desktop:** nothing.

## Stack

HTML, CSS and vanilla JS, with no build step. Fonts: [Onest](https://fonts.google.com/specimen/Onest), plus [Roboto Flex](https://fonts.google.com/specimen/Roboto+Flex) for Resizable.

## Credits

Design and code by Marat Murzagaliev. Component set inspired by shadcn/ui. MIT License.
# twister-ui
