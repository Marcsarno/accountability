# Brief for the Sarno session: Marc's personal Home, accountability tracker and ADHD reminders

This is research and a starting point, not a finished design. Sarno's code may have changed since the
research read it (a copy of `main` from 2026-10-05). **Check the current code before relying on anything
below, and decide the open points with Marc.** Follow `SarnoPWA/CLAUDE.md` as always.

## What Marc wants
- He has ADHD. He finds it hard to start tasks, to focus and to remember, and he forgets to open apps.
  He wants Sarno to bring him the first step of a task at the time he set, and keep coming back until he
  decides, as many notifications as useful.
- **A private, personal Home for each parent.** Marc and Yola each get their own Home that the other
  cannot see. The ADHD reminder tools are on Marc's only. Sitters keep today's Home. Privacy between Marc
  and Yola matters a lot to him.
- **The accountability tracker.** A private daily loop: capture tasks, pick today's top 3 with one
  marked as the minimum, give each a tiny first step and an if-then start ("If it's 9:00, then I open
  the draft"), get nudged then, record what actually happened in one tap, and close the day with a
  short recap and one next step for tomorrow. Honest results, missed days expected, no streaks or
  punishment. This came from the Daymark prototype (`Marcsarno/accountability`) and its spec
  (Wave 8, requirements A01–A32). The reminders are how this loop reaches him.
- No paid services and no other apps. Everything is built into Sarno.

## Already decided by Marc
| Topic | Decision |
|---|---|
| Lock-screen text | Show the actual step. A setting can hide it; Sarno's own wording never names the kids or places |
| Must-not-miss items | A banner is enough; the app says plainly it can't ring through silent mode or Focus |
| Quiet hours | 22:00–06:45 |

## Open: decide with Marc
- What family information, if any, appears on the personal Home.
- How reminders get sent on time (a scheduler such as `pg_cron`/`pg_net`; check whether anything is
  already set up), and whether reminders may push at all, which changes Sarno's current push policy.
- How many tasks to line up on kid days and kid-free days.
- Leave-for-pickup warnings.
- What happens after a stretch of not opening the app.
- Everything else in the research's decision table.
- **Accountability partner:** the combined plan suggested the other parent as an optional partner.
  Do not assume that. Marc has since stressed privacy between him and Yola. Ask him.
- **The two-week trial** in the combined plan is dropped: Marc doesn't want to set up or try other
  apps first.

## Research to read (in the accountability repo, `docs/research/`)
- `ADHD feature integration and behaviour.md`: behaviour ideas (states, repeat timing, a "Now" screen,
  wording, kid-day windows, recovery, focus sessions), an architecture idea ("the phone plans, the server
  only fires"), and possible conflicts with Sarno's code. Treat these as suggestions to check.
- `Why top ADHD apps work.md`: what the strongest ADHD apps do and why.
- `iPhone PWA notifications for ADHD.md`: what iOS web push can and can't do.

## Accountability tracker sources (full text in the appendix)
- `COMBINED_PLAN.md`: how the accountability and ADHD research fit together, evidence ratings,
  proposed tables, a pure logic module, phases. Written before Marc's later decisions; where it
  conflicts with this brief (partner, trial, server-side nudges), this brief wins.
- `Wave8_Handoff.md`: the original accountability spec, requirements A01–A32 and acceptance tests.
- `PHASE0.md`: decisions and the requirement-to-test record from the Daymark prototype.
- `PWA_PREP.md`: verified iPhone PWA platform research done for the tracker.
- `POLISH_PLAN.md`: a review of the prototype (bugs, weak spots, what waves 1–3 fixed).
- Waves 1–7 of the original research are private ChatGPT pages linked from the Wave 8 handoff, and
  are not included.
- The Daymark prototype code (`Marcsarno/accountability`, `src/domain`) shows working behaviour
  for plans, results, carry-forward and day close. It is TypeScript and doesn't fit Sarno's code, so
  use it as a behaviour reference, not code to copy.

## Things the research noticed in Sarno (verify)
- A server reading `personal_todos` would conflict with migration 0004 and privacy test S.
- `PUSH_TYPES` is pinned in the server, the client and tests; `reminder_due` is in-app only.
- `?tab=mypage` deep links set a tab that renders no screen (My Page is `'kids'` internally).
- `push-sw.js` assumes the same `tag` replaces a notification; on iOS they stack.
- The baseline numbers in `CLAUDE.md` looked stale, and `tools/tokens.py` rewrote unrelated colours.

## Suggested way of working
Plan first and show Marc the plan before writing code. Build in small phases on a working branch, with
tests for each. No deploys, SQL or production pushes without Marc's explicit OK.
