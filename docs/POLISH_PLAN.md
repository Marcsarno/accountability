# Polish pass — review and plan (2026-10-27)

Review of the Phase 0 prototype as deployed, from reading all of `src/` and rendering every screen
(402×874 and 320×568, light and dark, plus desktop). The polish pass stays inside Phase 0: no backend,
same domain rules, simulations still labelled.

## What is strong — keep it
- **Domain model.** Commands with keys/hashes, revisions instead of overwrites, occurrence identity,
  frozen zones, pinned share snapshots. Framework-free and unit-tested (27 tests).
- **Privacy rules are real code**, not copy: `buildPreview` is the only path to a snapshot, and the
  preview digest is checked at publish.
- **Design system.** OKLCH tokens with light/dark/increased-contrast, colour+shape outcome marks, a
  calm miss colour, 17px Dynamic Type root, 44px targets, safe areas, `inert` sheets.
- **Honest tone.** No streaks or scores; "Day marked" is the only celebration.

## Status
- **Paused 2026-10-28** after waves 1–3. Waves 4–6 are on hold; see `docs/COMBINED_PLAN.md`.
- **Waves 1–3 done (2026-10-27).** All bugs below fixed except B7, which turned out not to be a bug:
  occurrences are only ever added there, so comparing counts is correct.
- **Found and fixed during wave 3: B8.** A result could be lost if the app closed right after it was
  recorded. The save ran in a React effect after the screen updated, so "Saved" showed before the
  IndexedDB write had started. Every change now goes through the store's `commit()`, which starts the
  write in the same step over one shared, explicitly committed connection. The e2e reload step caught
  it.
- Tests: 39 unit (12 new). The e2e test now covers focus across clock ticks, the discard guard,
  quick results (online and offline), recording inside the check-in, and carry-forward. The focus step
  fails if the B1 fix is reverted.

## Bugs (confirmed)
| # | Bug | Where | Effect |
|---|---|---|---|
| B1 | Any open sheet steals focus every 30 s on the real clock. The store ticks, the parent re-renders, `onClose` gets a new identity, and the `Sheet` effect re-runs `ref.focus()`. Reproduced in Chromium: focus moved from the input to `div.sheet` after 31 s. | `ui/kit.tsx` `Sheet` | On iPhone the keyboard drops mid-sentence while writing a check-in. |
| B2 | The week's experiment only shows while `weekEnd === today`. | `screens/Review.tsx:15` | The chosen experiment disappears the next day and is never shown on Today. |
| B3 | Theme buttons read `document.documentElement.dataset.theme` during render, but nothing re-renders Settings after a click. | `screens/Settings.tsx` | The pressed state can show the wrong theme. |
| B4 | `Row` components are declared inside the render functions, so every render remounts them. | `Today.tsx` PlanBuilder, `Inbox.tsx` | Ticking a checkbox loses keyboard/VoiceOver focus; extra DOM churn. |
| B5 | Viewing a day with no plan runs `SetDraft`. | `Today.tsx` PlanBuilder effect | Browsing the week creates plan records and command-log entries; offline, they show up as "saved on this device". |
| B6 | The simulated reply targets the latest check-in across all agreements. | `Partner.tsx` ReplySheet | Can reply to a day from a former partner's agreement (simulation only). |
| B7 | `withOccurrences` only replaces occurrences when the count changes. | `app/store.tsx` | Changed occurrences with the same count can go stale. |

## Weaknesses by area
1. **The loop does not close.** The product promise ends in "a practical next attempt", but
   yesterday's *Next step* appears only on yesterday, the week's experiment appears only in Review
   (and vanishes, B2), and an accepted partner suggestion drops silently into Inbox. Planning today
   never shows any of them.
2. **Logging is slow.** Every result means opening a full sheet, choosing an outcome and tapping
   *Save* in the top corner. The check-in sheet lists unreported items but cannot record them, so
   the user has to back out, record each one and come back.
3. **Spec language in the UI.** Examples: "starts no reply window", "source revision 3",
   "agreement v1", "Committing saves a snapshot. Later changes become revisions", and many
   footnotes per screen. Correct but heavy; the rules should be felt, and explained on demand.
4. **Today's hierarchy.**
   - Week-strip marks (conic fills, inner rings, hatching) have no legend and read as decoration.
   - The main action is not time-aware: in the evening, the *Check in* card is below the fold.
   - Button rows wrap unevenly. On the SE, the section-title metadata wraps under the title.
5. **Plan builder.** The available-time chips and a raw number field wrap onto a second line. You
   can't capture inline while planning. The overload acknowledgement is a long checkbox sentence.
6. **Sheets are inconsistent.**
   - Save is in the header on some sheets and is a bottom button on others.
   - Closing via the backdrop or Esc discards edits with no warning.
   - The grabber looks draggable but isn't.
   - The share sheet's confirm button is far below the preview.
7. **Settings is one long page.** Real settings, simulated account info and prototype controls (clock,
   offline, reset) sit together. The time zone is free text.
8. **Desktop is a stretched phone layout.** One 920px column, a week strip with huge gaps, and an
   empty right side on Today and Review.
9. **Visual rough spots.**
   - Empty-state art is clumsy (the sun overlaps the horizon lines; the inbox icon floats).
   - Native orange checkboxes.
   - In dark mode *Block* (danger) and primary buttons are both orange.
   - Recording a result gets no feedback beyond a toast.
10. **Onboarding.** No name; no install nudge for Safari-tab users on iPhone (reminders need the
    Home Screen app); no guided first action — the empty day just says "Nothing to plan yet".
11. **Code that will slow polishing down.**
    - Heavy inline `style={{…}}` throughout the screens, which makes consistent spacing and theming hard.
    - Full-page screenshots show the fixed tab bar mid-page.
    - The e2e test covers one path only.

## Plan — in order
Each wave ends with `npm test && npm run build && npm run e2e && npm run shots` and a look at the
PNGs (CLAUDE.md), then a push for a preview deploy.

**Wave 1 — Fix bugs (B1–B7).** Store `onClose` in a ref inside `Sheet` so the effect runs once.
Keep an experiment for its 7-day window. Hold theme in React state. Hoist row components. Create a
draft only when the user first changes something. Scope the reply to the active agreement. Compare
occurrence keys, not counts. Add unit tests where the domain is touched.

**Wave 2 — Close the loop.** On Today while planning, add a *Carry forward* card:
- yesterday's next step, with one tap to turn it into a draft action;
- this week's experiment as a reminder line;
- an accepted partner suggestion, marked as such.

After a private check-in, offer to plan tomorrow from the next step. Domain changes get A-number
tests (A08, A18).

**Wave 3 — Faster logging.**
- Tapping an item's outcome mark on Today opens a compact four-choice picker that records directly;
  details stay in the full sheet.
- The check-in sheet records unreported items inline.
- Sheets get one consistent action placement (sticky bottom primary button) and an "unsaved changes"
  guard on close.

**Wave 4 — Copy and disclosure.** Rewrite UI strings in plain language and move rule explanations
into one small "How this works" disclosure per screen. Keep internal identifiers (revision numbers,
agreement versions) out of the main UI; show them in history/details. Keep every simulation label.

**Wave 5 — Today and visual polish.**
- Time-aware top card: Plan → In progress → Check in → Day marked.
- Simpler week marks with a legend.
- Available-time stepper instead of the chips plus raw field.
- Redrawn empty-state art, styled checkboxes, a distinct danger tone in dark mode, and a small
  confirmation motion when a result is saved (respecting reduced motion).
- Move inline styles into classes.
- Run `npm run contrast` after any token change.

**Wave 6 — Desktop and Settings.**
- Two-column Today and Review at ≥960px.
- Settings split into Reminders, Time away, Appearance and Your data.
- Account and prototype controls move into a labelled *Prototype* sheet.
- Time-zone picker instead of free text.

**Wave 7 — Onboarding and iPhone feel.** Ask for a name. Show an install nudge when in a Safari tab.
Guide the first action straight into planning. Swipe-down to close sheets. Show the update prompt
above the tab bar consistently.

**Wave 8 — Verification.**
- Extend e2e to quick logging, carry-forward and the unsaved-changes guard.
- Fix full-page screenshots (hide the fixed bar).
- Run the device checklist in `PWA_PREP.md` §4 on a real iPhone from the production URL.

Out of scope: backend/sign-in (Phase 1), real push (Phase 4), new product features beyond the handoff.
