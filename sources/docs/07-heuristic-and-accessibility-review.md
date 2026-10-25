# Heuristic and accessibility review

Phase 4 · Test & refine. Covers both experiences:
- the **crew mobile app**, the default view
- the **office web app** (`?view=office`), plus the customer share page (`?view=share`)

Prompt 039. Date: 2026-10-25.

## Method

| Check | How | Coverage |
|---|---|---|
| Nielsen's 10 usability heuristics | Expert walkthrough of the two main flows (crew capture → save → upload; office find → review → approve / reject → share) against each heuristic. Severity 0–4 (Nielsen). | Both apps |
| WCAG 2.1 A / AA + axe best practice | **axe-core 4.10.2** run in the browser on every screen state | 24 crew screens at 375 px; crew desktop view; 7 office and customer pages at 1366 px (incl. photo panel, compare and share dialogs, expired link); 3 office pages at 375 px. **35 scans.** |
| Target size | axe `target-size` (WCAG 2.2, 24 px minimum), then a stricter **44 px** check: the app's own rule for gloved, outdoor use | Crew and office at 375 px |
| Keyboard and focus | Checked in the browser: dialog focus traps, side panel keys (← → Esc), slide-in menu focus in and out, focus-visible rings, tab order | Both apps |
| Contrast | axe colour-contrast, plus computed ratios for changed colours | Both apps |
| Reflow and motion | No horizontal scroll at 320 px (earlier prompts), `prefers-reduced-motion` rules | Both apps |

**Not done:** no testing with real crew or office users, and no hands-on screen-reader session (VoiceOver / TalkBack). The screen-reader findings come from axe and from inspecting the code (roles, labels, live regions). Treat them as necessary, not sufficient.

## Results at a glance

| | Before fixes | After fixes |
|---|---|---|
| axe violations (35 scans) | **5**: 2 serious, 3 moderate | **0** |
| Tap targets under 44 px on phones | 13 kinds across both apps | **0** (inline text links excepted) |
| Keyboard: page behind the open office menu | Still focusable | Blocked (`inert`) while the menu is open |

## Accessibility findings and fixes

| # | Finding | WCAG | Severity | Fix |
|---|---|---|---|---|
| A1 | **Approve** button: white on `#1A8A47` is 4.4:1, below AA for its 14px text | 1.4.3 | Serious | Background `#13693A`: **6.75:1**. Hover `#0E5530`. |
| A2 | Crew **Uploads**: the scrollable photo list couldn't be reached by keyboard | 2.1.1 | Serious | The list is focusable and labelled "Photos in the upload queue". |
| A3 | Crew **Loading** screen had no heading | 1.3.1 / 2.4.6 | Moderate | Hidden heading "Loading today's jobs", plus `aria-busy`. |
| A4 | Crew desktop view: the "Office view" link sat outside any landmark | 1.3.1 | Moderate | Wrapped in `<nav aria-label="Prototype views">`. |
| A5 | Tap targets under 44px | 2.5.5 (AAA) / app rule | Minor | Raised to 44px: crew Job detail tabs, Jobs period switch and filter chips; office ✕ Close menu, Back to Dashboard, and (on touch screens) the required-photo chips and the phase filter buttons. |
| A6 | With the office slide-in menu open, keyboard focus could reach the page behind it | 2.4.3 | Moderate | Page and top bar are `inert` while the menu is open; focus moves into the menu and back to Menu on close. |

**Already in place and confirmed:**
- **Colour:** never the only signal. Every status has text and an icon, and the progress ring shows its percentage as text.
- **Focus:** visible focus rings in both apps.
- **Labels:** every form control has one.
- **Status messages:** toasts and result counts use live regions, so screen readers announce them.
- **Dialogs:** native `<dialog>`, which keeps focus inside and closes with Esc.
- **Tabs:** the office job tabs follow the ARIA tab pattern.
- **Reduced motion:** both apps respect the phone's reduce-motion setting.
- **Language and titles:** the page language is set, and each view has a page title.
- **Images:** demo images have alt text.
- **Reflow:** no horizontal scroll at 320px.

## Heuristic evaluation

Severity: 0 none · 1 cosmetic · 2 minor · 3 major · 4 catastrophe.

### Crew mobile app

| # | Heuristic | Evidence in the app | Result |
|---|---|---|---|
| 1 | Visibility of system status | Upload bar (offline / uploading / failed / done); progress ring; quality check result; "Saving…" then toast; checklist counts | Pass |
| 2 | Match with the real world | Before / During / After by area of the house; roofing shot names; plain wording ("Can't take", "Photos wait on the phone") | Pass |
| 3 | User control and freedom | Retake; "Choose a different photo"; replace a saved photo; cancel skip; back from camera returns to the job | Pass. Severity 1 note: a skipped shot is undone only by taking the photo; there's no explicit "Undo skip". |
| 4 | Consistency and standards | One spacing token (16px); same card, chip and status styles on every screen; 44px targets | Pass |
| 5 | Error prevention | Skip needs a reason; finishing with missing shots needs a photo or a reason; quality warning before saving a blurry or dark photo | Pass |
| 6 | Recognition rather than recall | Icon and label everywhere; per-shot framing hint; "Next up" and "Take next" tell the crew what's next | Pass |
| 7 | Flexibility and efficiency | "Next shot after saving" setting; quick actions; one-tap tags; gallery or phone camera | Pass |
| 8 | Aesthetic and minimalist design | Home trimmed over prompts 016–021 and 031–034 (weather and duplicate cards removed, one progress ring) | Pass |
| 9 | Recognise, diagnose, recover from errors | "Not an image" / "Can't read this photo" screens with next steps; failed upload with Retry | Pass |
| 10 | Help and documentation | 3-step photo tutorial (replay from camera or Profile); hint on every shot | Pass |

### Office web app

| # | Heuristic | Evidence in the app | Result |
|---|---|---|---|
| 1 | Visibility of system status | Review progress bar; Start → Continue → Mark reviewed; "still uploading" banner; tab counts; toasts | Pass |
| 2 | Match with the real world | Job IDs, addresses, Before / After, "Needs review", "Retake requested"; the five questions a reviewer asks | Pass |
| 3 | User control and freedom | Undo after approve / reject; Esc closes panel, dialogs and menu; share links can be revoked | Pass. Severity 1 note: "Mark job reviewed" is undone only by undoing a photo decision; there's no "Reopen review". |
| 4 | Consistency and standards | 24px spacing token; same cards and chips as the crew app; tabs in the same order as the metrics | **Severity 1:** the key-metric tiles look like the crew app's *tappable* quick actions but aren't interactive (made read-only in prompt 028). Recommendation: make them visually quieter, or link each to its tab. |
| 5 | Error prevention | Reject needs a reason; rejected photos can't be shared; warning before a share link is created; blurry photos flagged | Pass |
| 6 | Recognition rather than recall | Job card states the job, crew, date and progress; "Needs attention" lists every issue with its owner and action (since prompt 041); labelled sidebar | Pass |
| 7 | Flexibility and efficiency | ← → between photos, Esc, Enter in search, deep links | **Severity 2:** with 15 photos, approving is one at a time. Recommendation: "Approve all remaining" after a quick scan. |
| 8 | Aesthetic and minimalist design | Full-width layout, one card per question, follow-ups in one style | Pass |
| 9 | Recognise, diagnose, recover from errors | "No job found for … Check the ID or search by address"; empty filter states with "Clear filters"; "isn't part of this prototype" for unbuilt items | Pass |
| 10 | Help and documentation | The "Evidence check" tiles (since prompt 041) explain what's recorded; but there's no help or onboarding for the review workflow | **Severity 1:** add a short "How review works" note or help entry. Recommendation only. |

## Recommendations not built (to discuss)

1. **Office, bulk approve** (H7, severity 2): an "Approve all remaining" action, with an undo.
2. **Office, metric tiles** (H4, severity 1): either quieter styling or tap-to-filter, so the same look always means the same behaviour.
3. **Office, help** (H10, severity 1): a short explanation of the review steps.
4. **Both apps, explicit undo** for "Skip" (crew) and "Mark job reviewed" (office) (H3, severity 1).
5. **Testing with people:** a screen-reader pass (VoiceOver on iOS for the crew app, NVDA on the office app) and a 3-person hallway test. Both are still open from docs/02.

## How to re-run the automated checks

axe-core was loaded into the running app only while auditing. It isn't part of the app or the repository. To repeat the
check, open any screen in the dev server (the `?state=` list is in the app README) and run the free axe DevTools browser
extension. The `@axe-core/cli` package is another option, but it hasn't been tried in this repository.
