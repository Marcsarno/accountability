# Combined plan: accountability + ADHD-friendly planning, for the Sarno Family App (2026-10-28)

**Status: planning only.** Daymark app development is paused (polish waves 4–6 not started).
This merges two research lines:

- **Accountability:** `docs/Wave8_Handoff.md` (spec, A01–A32) and the Daymark prototype built from it.
- **ADHD planning:** the 2026-10-28 hand-off (six ideas, feature list, two-week trial).

The result is to be built later into the **Sarno Family App** (`Marcsarno/Sarno`, `SarnoPWA/`;
Supabase project "Sarno Family Hub"). Everything about Sarno below was read from its repo
(`61f944c`) and its live schema on 2026-10-28; nothing was changed there.

---

## 1. What it is

A private daily loop inside Sarno for the parents (owner/parent roles):

1. **Capture**, messy, in one tap.
2. **Pick today's top 3**, with one marked as the *minimum*.
3. **Plan each one's start** as a tiny first step plus an if-then: "If it's 9:00, then I open the draft."
4. **Get nudged** at that moment.
5. **See time passing.**
6. **Record what happened** in one tap.
7. **Close the day** with a short recap and one next step for tomorrow.
8. **Optionally share** selected parts with the other parent, who can suggest but never decide.

The promise stays the one from Wave 8: *a manageable commitment, an honest result, a practical
next attempt*. Missed days are expected, not punished.

**Who for:** the person typing, and optionally their spouse as partner. Sarno already limits
personal to-dos to owner/parent at the database level, so sitters and children are out of scope
by construction. Nothing here promises better outcomes. It is a tool to try, and the trial
(section 6) decides what gets built.

---

## 2. The evidence, checked

Each of the hand-off's six ideas, rated after reading the cited sources on 2026-10-28.

| Idea | What the source actually is | Strength | Consequence for the plan |
|---|---|---|---|
| 1. One trusted place: one calendar + one task list, checked daily | Safren's CBT program for adult ADHD ("Mastering Your Adult ADHD"). Sprich et al. 2012 is a *clinical overview*: calendar + task list are "the foundation for subsequent skills", reviewed at least daily. Tested as a whole program **with medication** (small RCT: CBT n=16 vs n=15; CHADD also cites a 2010 JAMA trial). The component alone was never isolated. | Moderate (as part of a program) | Build on Sarno's existing calendar + personal reminders; never add a second list. Daily review is the core habit. |
| 2. Two-step nudges, varied wording, daily cap | Safren's program uses "cue alarms" and timers. The two-step pattern, wording rotation and cap are **design inferences**, not tested findings. | Weak / inferred | Build only if the trial shows nudges help; keep the cap and rotation adjustable. |
| 3. Make time visible (timers, buffers, guessed vs actual) | Safren: measure your attention span and split tasks into chunks that fit it (e.g. 15 min). Guessed-vs-actual feedback is an inference. | Weak–moderate | Daymark already records estimate + actual minutes, so calibration feedback is cheap. |
| 4. Shrink the first step | Safren: break long tasks into smaller chunks; an optional procrastination module. "Built-up dread" is practitioner framing. | Moderate (as part of a program) | Explicit *first step* field; the evening recap's "next step" asks for the smallest version. |
| 5. If-then plans | Gawrilow, Gollwitzer & Oettingen 2011 (*Cogn Ther Res* 35:442): children with ADHD (inpatient n=45, mean age 10.7; outpatient n=47, mean age 10.3) waited longer in a **computerised delay-of-gratification task** after forming if-then plans; goal intentions alone did not help them. A lab task in children, not "pack tomorrow's bag" — that example is illustrative. Adult transfer is an assumption, though implementation intentions are well studied in adults generally. | Moderate for the mechanism, weak for this use | Upgrade Daymark's start cue into a real if-then; a time-based "if" is what the nudge fires on. |
| 6. Company and kindness | Body doubling: Healthline itself says research is "scant"; the main study (Eagle et al. 2024) is about experiences. Kindness: Safren's cognitive restructuring; "don't expect gains to be linear". ADDitude (Gretchen Rubin) is anecdotal and only supports the "ta-da" done list. | Weak | Partner stays optional and suggest-only; "work alongside" is a trial experiment, not a build item. Kindness is a design rule everywhere (no red for misses, no streak resets). |

**Bottom line:** the strongest support is for a structured routine (one list, daily review,
chunking, if-then) taught as a program. Most app-specific mechanics are reasonable inferences.
That is why a cheap trial comes before any build.

---

## 3. How the two research lines fit together

Most of the ADHD ideas are already Daymark mechanisms under another name. Where they conflict,
this is the resolution:

| Topic | Accountability (Wave 8 / Daymark) | ADHD hand-off | Combined decision |
|---|---|---|---|
| Daily size | "Suggest one to three commitments" | Top 3 each morning | Same. Top 3, soft limit (more allowed, with the capacity warning). |
| Minimum vs ideal | — | Minimum day next to the ideal day | **New:** mark one item as the minimum. A day counts as "showed up" when the minimum is done or partial. |
| Capture | Title + observable criterion + estimate | Near-effortless, messy is fine | Capture is text only (Sarno's reminder row or Smart Add). Criterion, first step and estimate are asked **only when an item is picked for today**, and are optional. |
| Starting | Optional start cue ("When or after what will you start?") | If-then plans; tiny first step | The start cue becomes **If [time or event] → then [first step]**. A time "if" schedules a nudge. |
| Reminders | Bounded notices, quiet hours, generic text, dedupe | Two-step nudges, varied wording, daily cap | Combine: two steps (get ready, start now), rotating generic wording, quiet hours, a daily cap, no titles on the lock screen by default. |
| Time | Capacity bar: estimates vs available minutes | Countdown, buffers, guessed vs actual | Keep capacity; add a buffer default and a countdown; weekly "you guessed 20, it took 45" calibration from estimate vs actual. |
| Results | Completed / partial / missed / skipped / not reported; corrections kept | Done list that shows wins | Keep honest outcomes. **Add a wins log** for unplanned things done: it shows on the done list but never changes the planned-item counts. |
| Streaks | None; "no punitive streak system" | Streaks that survive a skip | **No streak counter.** Show "showed up 5 of the last 7 days". It survives a skip by design and never resets to zero. |
| Missed days | Unreported ≠ missed; time away; restart without backlog (A26) | Expect missed days; avoid shame spirals | Same principle; already built in Daymark. |
| Evening | Private check-in; next step carried to the next day | Evening recap of what got done | Same, plus a short done list at the top of the recap. |
| Afternoon | — | One gentle afternoon check-in | **New:** one optional afternoon nudge to record quick results or shrink the plan. |
| Partner | One accepted peer; invite by email; previews; reply windows; block/report | Opt-in partner check-ins that suggest, not decide | Partner is **the other parent, already in the household**. Keep: opt-in, per-day share preview, suggestions become drafts only. Drop for v1: email invites, reply-window deadlines, block/report/moderation (household trust). |
| Breaking down | "Shrink one finish line" suggestion | "Break it down" button | Manual first: "What's the 2-minute version?" An AI proposal via Smart Add's propose-then-confirm pattern only if the trial shows the manual prompt gets used and still stalls. |
| AI | Excluded from first release | — | Sarno already uses Claude (Sonnet) for Smart Add, propose-only. Any AI here follows that rule: proposes, never writes. |
| Calendar | Calendar ingestion deferred | One trusted place incl. calendar | Sarno *is* the family calendar. Today's view shows that day's family events beside the top 3, so planning happens against real commitments. |

---

## 4. Fitting it into Sarno

Facts that constrain the design (from `SarnoPWA/CLAUDE.md`, migrations 0001–0007 and the live
schema):

- **UI is generated.** `src/AppView.jsx` is generated from `tools/proto/markup.html`; logic lives in
  the `AppLogic` class in `src/logic.js`; `tools/verify.py`, `test:empty`, `test:privacy` and
  `smoke` must stay green.
  Daymark's React screens therefore cannot be dropped in. Its **rules** can be ported as a pure
  module, the way `src/smartadd.js` is shared by the client and `api/smart-add.js`.
- **`personal_todos` is the one properly private table**: `user_id = auth.uid()` plus active
  owner/parent membership, enforced by RLS. Columns: `text` (≤500), `due` (date only), `priority`,
  `done`, `completed_at`. It is the natural capture inbox.
- **Push policy:** only `event_invite`, `direct_message` and `supply_request` push ("somebody
  deliberately chose you"); `reminder_due` exists but is in-app only. Notifications are created
  only by the server (no browser insert grant), deduplicated by `(recipient_id, dedupe_key)`.
  Lock-screen text is kept generic.
- **No scheduler exists.** No Supabase Edge Functions; push is sent by the Vercel function
  `api/notify.js` when something happens. Sarno's own deferred-features note says push reminders
  need "a small server-side surface that holds secrets and can act while the app is closed. Build it once."
- **Open blocker in Sarno:** the 11 manual live-RLS tests have never been run.

### 4.1 Where it lives in the app
A **My Day** section at the top of My Page, where personal reminders already live. Reminders stay
the inbox; My Day is the plan. The "+" menu and Smart Add keep working for capture.

### 4.2 Data — proposed tables (not a migration yet)
Every table is private and follows the `personal_todos` pattern:
- `user_id default auth.uid()`
- `household_id`
- RLS `user_id = auth.uid() AND is_household_manager(household_id)`
- no views or definer functions that bypass RLS

Nothing private goes into `family_data`, which every household member can read.

| Table | Purpose | Key columns |
|---|---|---|
| `focus_days` | One row per person per local date | `date`, `zone` (frozen at first commit), `available_min`, unique `(user_id, date)` |
| `focus_entries` | The day's picks, snapshotted when committed | `day_id`, `todo_id` (nullable), `title`, `first_step`, `if_cue`, `cue_at` (timestamptz, nullable), `estimate_min`, `is_minimum`, `position`, `added_at`, `removed_at` — original vs revised plan is derivable from these timestamps instead of full revisions |
| `focus_results` | Append-only outcomes | `entry_id`, `outcome` (completed / partial / missed / skipped), `actual_min`, `performed_at`, `recorded_at`, `corrects` |
| `focus_checkins` | Append-only evening recaps | `day_id`, `rev`, `reflection` (private), `next_step` |
| `focus_wins` | Unplanned things done | `date`, `text` |
| `focus_nudges` | Scheduled nudges | `entry_id` / `day_id`, `kind` (get_ready / start_now / afternoon / recap), `due_at`, `status` (scheduled / sent / suppressed / cancelled), `dedupe_key`, `sent_at` |
| *(phase 4)* `focus_partners`, `focus_shares` | Opt-in sharing with the other parent | Partner must be an active owner/parent in the same household. Shares are pinned snapshots with selected fields; **reflection, notes and private labels are never copied** (Wave 8 A17). |

### 4.3 Logic — a pure, tested module
`src/focus.js`, with no DOM, imported by `logic.js` and the server function. It is ported from
Daymark's tested domain code:
- capacity summary (unknown estimate ≠ 0)
- carry-forward of the last next step
- one-tap result shape (a correction keeps minutes, note and time)
- the day's phase (plan → in progress → check in → marked)
- "showed up X of 7"
- estimate-vs-actual calibration
- nudge planning: two-step times, quiet hours, daily cap, wording rotation

Tests go in `tools/focus.test.mjs`, added to `test:all` and the 12-date sweep. Port the matching
Daymark tests (A02, A04–A06, A08, A12/A13 time-zone cases), not just the code.

### 4.4 Nudges — the server surface
- **Scheduler:** recommended is Supabase `pg_cron` + `pg_net`. Both are available on the project
  but not enabled. Every minute they call a new `api/nudge.js`, which works on any Vercel plan.
  Vercel Cron is the alternative, if the plan tier allows a per-minute schedule (check the
  dashboard).
- **`api/nudge.js`:**
  - Loads due `focus_nudges` with the server key.
  - Re-checks eligibility at send time: entry not done or removed, not in quiet hours, under the
    cap, push subscription alive.
  - Writes a `notifications` row with a new type (e.g. `focus_nudge`) and a dedupe key.
  - Pushes through the same web-push code as `notify.js`, then marks the nudge sent.
  - Retries are safe because of the dedupe key.
- **Policy change needed (Marc's call):** a self-scheduled nudge is "you chose you". Adding
  `focus_nudge` to the push list means updating the check constraint, both PUSH_TYPES lists and the
  test that keeps them in sync.
- **Lock-screen text:** generic and rotating ("10 minutes to your first step", "Start now — just
  the first step"), never the item title unless that's switched on.

### 4.5 Prerequisites before any private data goes server-side
1. Run Sarno's 11 manual live-RLS tests (Outstanding #2), then the same style of test for every
   `focus_*` table: a forged `user_id` must be rejected with `42501`, and a sitter must see nothing.
2. Decide the push policy change (section 7).
3. Choose the scheduler.

---

## 5. Build phases (after the trial; order may change with its results)

| Phase | Builds | Exit check |
|---|---|---|
| **0 — Trial** | Nothing. Two weeks with existing tools (section 6). | Trial log analysed; build order confirmed. |
| **1 — My Day core** | `focus_days` / `entries` / `results` / `checkins` / `wins` + RLS; My Day on My Page: pick top 3 from reminders, mark the minimum, first step + if-then, one-tap results, evening recap with next step carried to tomorrow, done list. No push. | RLS tests pass (forged id rejected, sitter blind); `focus.test.mjs` + Sarno's full suite + sweep green; used for a week on a phone. |
| **2 — Nudges** | `focus_nudges`, scheduler, `api/nudge.js`, push policy change; two-step nudges from time-based if-thens; one afternoon check-in; quiet hours; daily cap; rotating wording. | Five-case phone test like Sarno's notification check: app closed, force-quit, quiet hours, cap reached, item already done → no nudge. |
| **3 — Time** | Countdown for the item in progress; buffer default; weekly calibration card ("you guessed 20, it took 45"). | Calibration numbers match a hand calculation on real data. |
| **4 — Partner (optional)** | Spouse partner, opt-in; per-day share preview; suggestions become drafts; optionally a "working on it now — join?" ping (only if the trial's company experiment helped). | Share contains only selected fields; reflection never leaves; ending the partnership revokes access. |
| **5 — Break it down with AI (optional)** | Smart Add-style proposal of a smaller first step; the user confirms. | Proposal-only (writes nothing); refuses others' items; cost-capped. |

**Out of scope throughout:** streak counters, scores, stakes or money, group features, children's
use, speech recognition (the iPhone keyboard already dictates).

**What happens to Daymark:** it stays as the reference implementation and the trial tool. Its
domain modules and tests (`src/domain/*`) are the source for `src/focus.js`. Polish waves 4–6 are
cancelled unless the trial shows Daymark itself should be the product.

---

## 6. The two-week trial (start here)

**Goal:** learn which features matter before building any. One person, 14 days, about five
minutes a day. It's a feasibility check, not proof.

**Tools (no new code):**
- **Daymark** at https://accountability-lilac.vercel.app, installed to the Home Screen. It already
  does top-3 planning against available time, a "when will you start" cue, one-tap results,
  estimate vs actual minutes, an evening check-in whose next step carries into tomorrow, and a
  7-day review.
  - Ignore its simulated partner.
  - Data stays on the phone; export JSON from Settings at the end.
  - Use the start-cue field for the if-then, and the first word of the title as the first step
    ("Open draft → write section 2").
- **iPhone Clock or Reminders** for nudges. Each morning, set two alarms per timed if-then (10 min
  before, and at the time). Label them from a list of seven pre-written generic phrases, so the
  wording rotates.
- **One fixed afternoon alarm** (e.g. 3:00 pm): "Quick check — record or shrink".

**Daily routine:**
- **Morning (≤5 min):**
  - Pick the top 3 and choose one as the minimum (note it in its title, e.g. "★").
  - Write a first step and an if-then time for each.
  - Estimate minutes.
- **Afternoon alarm:** tap results so far; drop or shrink anything that won't happen.
- **Evening:** check in.
  - Record actual minutes.
  - Write one next step.
  - Answer three questions in the reflection:
    1. Did a nudge help you start today? (yes / no / no nudge)
    2. What stalled anything that stalled? (dread / forgot / no time / interrupted / other)
    3. How did today feel? (1–5)

**Optional company experiment:** on 3 or 4 days, work alongside someone (in person or on a call)
for one block, and note it in the reflection.

**Decision rules at day 14** (from the exported data):

| If… | Then build first… |
|---|---|
| Nudges helped on most days they fired | Phase 2 (nudges) right after phase 1 |
| Estimates were off by more than 50% on most items | Phase 3 (time) before phase 2 |
| "Dread" was the main stall reason | The first-step prompt, then consider phase 5 |
| Mornings were skipped on more than 4 days | Simplify capture/pick (fewer fields); push the morning nudge into phase 1 |
| The minimum was done on most days but the top 3 rarely were | Make the minimum day the default view |
| The company days went clearly better | Pull phase 4's "working on it now" ping forward |
| Feel scores dropped over the two weeks | Cut friction and wording before adding features |

---

## 7. Decisions needed from Marc

1. **Users and partner:** just Marc, or both parents, each with their own My Day? Is the other
   parent the (optional) partner?
2. **Push policy:** may self-scheduled nudges reach the lock screen? This is the one deliberate
   exception to Sarno's "someone chose you" rule. Should titles ever be shown?
3. **AI break-down:** manual "2-minute version" prompt only, or the Smart Add-style AI proposal
   later (phase 5)?
4. **Trial tool:** Daymark plus phone alarms (recommended), or Sarno's reminders list plus paper?
