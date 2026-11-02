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

## ADHD research (full text in the appendix)
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

---

# Appendix: the full research

All research follows in full: first the accountability tracker documents, then the ADHD hand-off and the five ADHD reports. The detailed notes behind the ADHD reports are in ADHD_RESEARCH_NOTES.md. They are background and suggestions; the brief above and Marc have the final say. Links to files under /home/user/ or relative links point to notes or code that are not included.

---

# Document: Wave8_Handoff

Wave 8 completes the research and design handoff for an original daily accountability planner. The recommended first product serves independent workers with a private planning and review loop plus optional support from one accepted peer. Its promise is a manageable commitment, an honest result and a practical next attempt.

**The project is ready to begin an original prototype. It is not ready to claim production reliability, market demand or improved goal attainment.** The remaining uncertainties have concrete checks and release gates below. No production app, paid service or user pilot has been completed.

Current decisions and source checks are dated October 27, 2026. Wave 7 defines the release scope; Wave 6 supplies behavior where applicable; the clarifications in this handoff resolve conflicts between them. Earlier waves remain research records, including their historical next-step notes.

# Research package and coverage audit

| Research asset | What to use it for | Status and boundary |
| - | - | - |
| [Master plan](https://chatgpt.com/space/page_a073f4b3c64481918c18012afaf967c8) | Original questions and project checkpoint | Eight-wave research/design sequence |
| [Wave 1 landscape](https://chatgpt.com/space/page_499daa5f4b888191b43cf255e1d1ca87) | 30 candidates, categories and eight study references | Public-source landscape; Supporti availability unresolved |
| [Wave 2 methods](https://chatgpt.com/space/page_4eecd7dc84dc8191aa6295729a6bc7fa) | Evidence, limitations, non-app routines and method-to-feature map | Underlying techniques; proposed app not validated |
| [Wave 3 comparison](https://chatgpt.com/space/page_db3fb5942b4c8191bf95aa491a411b7f) | Eight-product matrix, dossiers, pricing snapshot and finalists | Published capabilities and reports; phone-only gate unresolved |
| [Wave 4 journeys](https://chatgpt.com/space/page_60231120dae8819191b13fd331c9284b) | GoalsWon teardown, Marvin and HabitShare journeys, recovery and exit | Public signup/checkout screens observed; authenticated flows largely documented |
| [Wave 5 failure analysis](https://chatgpt.com/space/page_2a6db787dc8081918257b4849f6cd023) | Ranked failures, 20 desk scenarios and worked workload | Source-based critique, not a week of app use |
| [Wave 6 technical specification](https://chatgpt.com/space/page_ec0343674cdc81918fe554bb2923e832) | Entities, states, commands, time, permissions, architecture and 26 cases | Original specification with optional modules now narrowed |
| [Wave 7 product and concepts](https://chatgpt.com/space/page_74e2f8963ee481919824e25da9c84d9d) | Audience, scope, screen inventory, original concepts, metrics and pilot | Four main concept states plus Inbox/Review; rendered review pending |
| This Wave 8 handoff | Scope precedence, traceability, acceptance suite, gates and build prompt | Research/design handoff; tests below are expected outcomes |

| Original research question | Answer carried into the product | What remains to establish |
| - | - | - |
| Who needs accountability and with whom? | Focus on adults doing independent work; private core with one optional accepted peer | Target-user demand and partner uptake |
| How does an intention become a realistic action? | Concrete criterion, estimated effort, optional cue, available minutes and explicit commitment | Ease of first planning and estimate usefulness |
| What adds value beyond reminders? | Honest reporting, selected visibility, agreed response and next-action review | Incremental benefit over a paper card and ordinary reflection |
| What happens after a miss or absent partner? | Preserve history, distinguish unknown from miss, choose a small restart, show expired reply windows | Actual return behavior and peer reliability |
| Which product is the strongest reference? | GoalsWon for the daily loop; Marvin for capacity/recovery; HabitShare for selective sharing | No universal winner or purchase recommendation; live phone gates remain open |
| What would a recreation require? | Original domain model, server permissions, jobs, versioned sync and both participant workflows | Provider/device experiments, operating budget and production tests |

No initial question has been dropped without a disposition. The broad market directory is retained; secondary-product gaps are deferred when they cannot change the selected release. The whole research package is not an exhaustive systematic review, and a completed research wave does not turn a proposed rule into observed vendor behavior.

# Evidence and reference conclusions

The behavioral foundation remains concrete action planning and recorded progress. Harkin and colleagues' [original monitoring synthesis](https://www.apa.org/pubs/journals/releases/bul-bul0000025.pdf) supports monitoring interventions across the included experiments; its reporting/publicity moderators do not establish the independent causal effect of our peer feature. No research effect size is translated into a promised percentage improvement for this app.

The [researcher-authored implementation-intentions overview](https://cancercontrol.cancer.gov/brp/research/constructs/implementation-intentions) describes linking a recognizable situation with an action. It is an archived reference, not current platform guidance. Add an optional “When or after what event will I start?” prompt inside action planning. A short obstacle/fallback prompt belongs in reflection or restart; neither should block first use.

| Reference | Supported pattern | Build decision and limit |
| - | - | - |
| [GoalsWon FAQ](https://www.goalswon.com/faq/) | Daily goals, results, human feedback and follow-up after silence | Preserve the loop; peer agreements do not inherit its professional response promise |
| [Marvin day planning](https://help.amazingmarvin.com/amazing-marvin/day-planning-2) and [mobile matrix](https://help.amazingmarvin.com/amazing-marvin/which-features-work-on-mobile) | Capacity comparison; capacity bar/day-planning sidebar documented as absent on phone | Make manual capacity equally available on both platforms |
| [Marvin recurrence](https://help.amazingmarvin.com/amazing-marvin/recurring-tasks) | Mobile all-instance edit default; pattern edits can lose per-copy changes; conversion can lose comments | Default to one occurrence, preview broader changes and preserve context |
| [Marvin sync guidance](https://help.amazingmarvin.com/amazing-marvin/troubleshooting-sync) | Locally saved phone changes may be lost by reinstalling before sync | Preserve pending work before recovery; show local and confirmed states separately |
| [HabitShare product](https://habitshareapp.com/) | Private defaults and per-friend habit visibility | Use selected sharing with a preview; actual reply reliability remains a separate test |

GoalsWon remains a behavioral reference rather than a complete clone target. The selected product is a smaller original combination. A paid human responder, an unpaid friend, a reminder and an AI assistant provide different services. Vendor marketing statistics, testimonials and old bug-fix notes are not evidence of our effectiveness or current failure rates.

# Release scope and precedence

Build the private loop and accepted-peer loop as one coherent product. Use Today, Inbox, Review and Partner as primary navigation, with labeled Settings. Phone is single-column with bottom navigation; desktop uses left navigation and a wider work area. Essential actions cannot depend on hover, dragging or a desktop handoff.

| Scope area | First release | Explicitly deferred |
| - | - | - |
| Planning | Small Inbox, optional goal label, criterion, estimate, optional start cue, manual capacity, date-only deadline | Full projects/dependencies, calendar ingestion, auto-scheduling |
| Results and review | Completed/partial/missed/skipped/unreported, optional actual effort, corrections, daily and seven-day review | Opaque score, punitive streak system, proof certification |
| Recurrence | Daily or selected weekdays, one occurrence per series/origin date, explicit move/pause | Monthly dates, quotas and after-completion rules |
| Accountability | One accepted primary peer per owner; separately accepted reciprocal role; day-linked replies | Paid coaches, groups, public matching, unrestricted chat |
| Data and delivery | Private owner drafts/results offline, versioned server state, optional bounded notices, export, Trash and deletion | Partner offline caches, attachments, billing, AI and native packages |

Wave 6's monthly recurrence, attachment, billing, calendar and AI rules are extension specifications, not hidden first-release work. Its case 10, case 18, case 26 and the billing portion of case 23 are deferred. Retain account deletion itself. Adapt the remaining cases to the chosen peer model and text-only data.

The optional start cue is a small clarification within Capture, not a scheduling engine or required onboarding field. Store it with the action/occurrence snapshot, keep it private by default, and include it in a partner preview only when the owner selects it. A fallback creates an explicitly revised or new commitment; it never completes the original by implication.

# Rules clarified by the final audit

**Private check-in and sharing are separate actions.** SubmitPrivateCheckIn closes the owner's review without requiring a partner, recipient, grant or invitation. Its server-confirmed revision remains private; offline completion is a queued local draft until sync. PublishPlan can expose selected already-committed actions before work begins, while PublishCheckIn exposes selected outcomes and a separately written shared message afterward. Both require an accepted agreement and explicit online preview/confirmation. Editing or syncing private source data never republishes either snapshot.

Shared snapshots have an explicit kind, plan or check-in, and pin exact source revisions and approved fields. A shared plan shows the selected commitment with “No results shared yet”; it does not reveal later private outcomes. Publishing a plan does not count as a daily check-in or start a reply window. Submitted private check-ins and published versions retain their own history. AmendPlan or AmendCheckIn changes only the confirmed shared snapshot. Feedback remains attached to the published check-in revision actually reviewed; an amended version marks older feedback as referring to an earlier version.

**Moving a repeated occurrence preserves its origin identity.** A Monday occurrence moved to Tuesday and Tuesday's own occurrence remain two distinct opportunities. Preview both with their origin dates; never merge, duplicate or complete either silently. Identity is series plus origin date, not current display date or rule revision. The owner may withdraw an obsolete opportunity with visible history.

**A prospective series change preserves committed or edited exceptions.** Present untouched future copies separately from changed copies. Require an explicit resolution for conflicts; leave earlier results and context intact. Creating a repeating series from an existing action preserves its history and notes rather than deleting them. Past unreported dates stay in Review and are not automatically promised again today.

**Agreement pause and planned absence are separate controls.** On server confirmation, a relationship pause by either participant stops new publication, response obligations and eligible relationship notices, and revokes current partner grants. Until confirmation, show a pending request rather than claiming access has stopped. Resuming requires both participants to accept the current agreement; old days are not automatically re-shared. A planning absence suppresses the owner's future recurring opportunities and reminders for selected dates without relabeling past results.

**Ending an agreement is not deleting owner history.** The owner retains their own plans and received feedback within retention rules. The former partner loses access to the owner's shared records, old links, previews and system-provided owner excerpts attached to feedback. A limited export of a person's own authored reply must not rejoin revoked owner records or hidden aggregates; free-text copies already possessed remain outside the revocation guarantee. Deletion/redaction requests can further reduce retained content under the published policy.

**Peer reply windows use the first published result, not private completion or a shared plan.** Store the normal reply window and an accepted minimum response interval. For the initial published check-in, the deadline is the later of the original reply deadline and publication time plus that interval. Example: cutoff 21:00, next-day reply 12:00, interval 15 elapsed hours; initial publication at 23:00 resolves to 14:00 next day. Amendments preserve that window and its history; they never move the deadline or erase an overdue record. A reply names the revision reviewed. If a replied-to day is amended, mark the new version unreviewed without automatically imposing another reply obligation. A new review obligation needs explicit participant agreement. Paused days create no new obligation.

**No receipt overclaims delivery or exposes private participation.** “Saved on this device,” “Synced,” “Privately submitted,” “Shared,” “Queued notice” and “Provider accepted” are distinct states. Only server confirmation establishes the corresponding remote state. A partner can see “No check-in shared” but cannot infer whether the owner completed a private review. A private submission suppresses the owner's ordinary check-in reminder; an agreed, separately bounded sharing follow-up depends on publication status. A shared plan satisfies neither check-in condition. Repeated taps/retries return one logical action, and permission is rechecked before cached results and outgoing notices.

# Requirements traced to behavior and checks

R01 through R14 identify the fourteen first-release requirement families from Wave 7. A01 through A32 below are release acceptance scenarios, not executed test results. References to Wave 2 mean a method rationale; references to Waves 5 and 6 mean an explicit original design response or specification.

| Requirement | Basis and screen | Data or command responsibility | Acceptance checks |
| - | - | - | - |
| R01 Account and privacy | Wave 6 permissions; onboarding and Settings | Verified actor, account/session status, zone; authorize every read/write | A01, A14, A15, A29 |
| R02 Concrete capture | Wave 2 action planning; Inbox and detail | Private task, criterion, estimate, cue, optional goal/deadline; CreateAction | A02, A03 |
| R03 Capacity and commitment | Marvin capacity plus original history choice; Today | DayPlan/entries and commitment snapshots; CommitPlan/RevisePlan | A02, A03, A04 |
| R04 Honest results | Wave 2 monitoring, Wave 5 denominators; Today/detail | Progress events with performed/received times; RecordResult/CorrectResult | A04, A05, A06, A25 |
| R05 Daily check-in | GoalsWon loop plus explicit publication choice; Check-in | Private check-in plus plan/result snapshot kinds; SubmitPrivateCheckIn, PublishPlan, PublishCheckIn and explicit amendments | A07, A16, A17, A20 |
| R06 Review and next action | Wave 2 feedback/recovery; Review and partner day | Feedback tied to reviewed version; AcceptSuggestion creates owner draft | A08, A18, A20 |
| R07 Recovery and repeats | Marvin recurrence and Wave 5 return failures; Restart/detail | Repeat rule, stable occurrences, pause intervals and dispositions | A09–A13, A26 |
| R08 Peer agreement | GoalsWon/HabitShare mechanisms plus our contract; Partner | Recipient-bound invitation, agreement versions, one active primary per owner and one reviewing role per peer in the pilot | A14, A18, A19 |
| R09 Sharing and moderation | HabitShare privacy, Wave 6 permissions; preview/Partner/operator view | Field grants, pinned snapshots, revocation, block/report and restricted case access | A15–A17, A21, A22, A28, A29 |
| R10 Reminders | Wave 2 attention tradeoff; Settings and reminder status | Due outbox jobs, logical notice IDs, quiet hours and current eligibility | A12, A19, A22–A24 |
| R11 History and weekly review | Wave 5 original/current distinction; Review | Versioned cohorts, explicit outcome counts, coverage and next experiment | A04–A08, A26, A28 |
| R12 Sync and recovery | Marvin recovery warning, Wave 6 command contract; global status | Account-bound local queue, actor/key/payload receipt, expected versions, change cursor | A23, A25–A27 |
| R13 Phone desktop and access | Wave 4 platform gaps, Wave 7 usability choices; all screens | Same core actions, focus/labels, non-drag controls and responsive layouts | A30, A31 |
| R14 Exit and data controls | Wave 5 exit analysis, original retention policy; Settings/Trash | Export and deletion jobs, authorization, purge markers and restore procedure | A21, A28, A29, A32 |

# Data and implementation contract

Use a responsive installable web client, an authenticated application API, a relational database and a background worker. PostgreSQL is the proposed database baseline. Managed identity, deployment region, framework and notification provider are build-start selections: the builder records one compatible choice, supported versions and a local setup path before adding real data. They need not block a fictional interface prototype.

Keep current relational state plus append-only revisions while retained. Required records are Account, Task, RepeatRule, Occurrence, DayPlan/Entry, CommitmentRevision, ProgressEvent, CheckInRevision, Agreement/Invitation, ShareGrant/Snapshot, Feedback, CommandReceipt/ChangeCursor, Outbox/Notice, ReportCase, ExportRequest, DeletionRequest and AuditEvent. Distinguish the owner's private submitted revision from separately published plan/result snapshots; each published snapshot records its kind, source revisions and agreement/recipient. A goal can start as a private label; no goal hierarchy is required.

Every owned record carries an owner key; relationships enforce foreign keys. Uniqueness covers account/local-day plan identity, series/origin-date occurrence identity, actor/command key and logical notice ID. Freeze the plan's zone and original snapshots. An action's planned date, hard deadline, reported outcome and current disposition are independent values. For the pilot, an account may have one accepted primary responder for its own scope and may accept the reviewing role for one other owner. Reciprocal support is a separate agreement. Enforce both limits atomically at acceptance; pending invitations reserve no access. Ending or pausing a role releases it without restoring old grants on replacement.

| Operation family | Required input | Confirmed result and conflict boundary |
| - | - | - |
| CreateAction | Criterion, title, optional estimate/cue/goal/deadline | Private action and stable IDs; validate without losing input |
| CommitPlan and RevisePlan | Local date/zone, available minutes, entry snapshots, acknowledgements, expected version | Original snapshot or appended revision; never edit the original in place |
| RecordResult and CorrectResult | Occurrence, explicit outcome, optional effort, performed time, expected version | New event, received time and refreshed owner report; competing outcomes conflict |
| SubmitPrivateCheckIn | Owner/day, exact result revisions, private reflection, expected version | Owner-only submitted revision; no recipient or grant required; offline remains queued until confirmed |
| Preview and Publish or Amend | Snapshot kind plan/check-in, exact committed-plan or submitted-check-in revisions, selected fields, recipient and agreement version | Server-generated preview/digest; unchanged scope/source versions checked before atomic publication; private reflection/notes and goal labels excluded |
| Respond and AcceptSuggestion | Authorized pinned check-in version; reply or suggestion; owner acceptance | Version-linked feedback; owner acceptance creates a draft, not a committed day |
| Repeat or Pause | Explicit scope, effective dates and expected versions | Preview then apply; preserve exceptions; relationship and planning pauses are distinct |
| Invite and AcceptAgreement | Intended identity, agreement version, expiry; authenticated recipient | Only accepted current proposal becomes active; changed proposal needs new acceptance |
| Revoke Block and Report | Relationship/grant IDs and actor; minimal case evidence | Immediate authorization effect; queued notices invalidated; restricted report case |
| Export Trash Restore Delete | Owner scope and confirmation; reauthentication for sensitive exit | Authorized receipt, recoverable state or tracked purge; restored items private |

Every mutation has a unique client command key, a payload hash and expected versions where conflict is possible. The server derives identity from the session. Domain changes, history, the command receipt and necessary outbox rows commit together. [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) supply the atomic-write primitive; the application still has to enforce the intended invariant.

Same actor/key/payload returns the accepted result after current authorization. Reusing the key with different payload returns a conflict. A stale version returns a conflict with permitted current data; the client preserves its draft for reconciliation. Purged IDs are never recreated by an old offline retry. Return IDs, accepted versions, server time and change cursor only after success.

Use server ownership/grant checks and row-level policies with a restricted application role. [PostgreSQL's RLS documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) states that superusers/BYPASSRLS roles and normally table owners bypass policies. A passing owner-only UI demonstration is not an isolation test. Test partner, stranger, worker and revoked-session paths.

Owner drafts, private check-ins and result commands may queue offline; publication, invitation acceptance, agreement changes, complete account exports and account deletion need online server authorization. Bind every local queue/cache to its authenticated owner; a different sign-in must not display or replay it. Preserve/export pending owner work before logout, update migration or storage repair, then lock it until the same owner reauthenticates or explicitly discards it. When acting as reviewer, never persist another owner's shared responses/views for offline reading; exclude those responses from service-worker/app caches. Changes to dates, results and sharing never silently merge across devices. A local rescue file contains only that owner's pending work and is not a complete server export.

Server workers schedule reminders, recurrence generation and export/purge work. Recheck current state at dispatch; use leases, retries, a failed-job queue and logical deduplication. A server outage must not be disguised as an absent user. Monitor stuck work without logging private titles or reflections. A plan publication is available in-app without automatically sending a result notice. Allow at most one partner result-check-in push per owner, frozen plan date, recipient and agreement generation; amendments update the in-app snapshot and any unsent notice without another push after dispatch. Owner check-in reminders and the single agreed sharing follow-up have separate eligibility and deduplication keys. A partner notice never exposes private submission status.

# Acceptance suite for the selected release

All A01–A32 cases below are pending execution against the implementation. Use controlled clocks, two owner devices and separate owner/peer/stranger accounts. Test the server response and retained data as well as the screen. Store actual results, build identifier, platform/version, expected outcome and evidence link in the eventual test log.

## Planning reporting and review

| Case | Scenario | Required observable result |
| - | - | - |
| A01 | Sign in as owner, peer and unrelated account | New workspace private; no cross-account reads; role/session changes reauthorize |
| A02 | 95 minutes proposed with 60 available; repeat with missing estimate | Overload 35; unknown is not zero; explicit acknowledgement or revision before commitment |
| A03 | Move 45-minute project to Wednesday; add separate 10-minute review | Revised Tuesday 60; Friday deadline unchanged; adding review requires its own explicit selection |
| A04 | Record writing 15 partial, walk 20 complete, review unknown | Original and revised cohorts distinguishable; no completion inferred from effort |
| A05 | Complete then correct a result; submit rapid retries | Correction retained, counts recompute, one logical result per command |
| A06 | Midnight passes with no result; record a late offline result | Unknown stays unreported; performed and received time visible; no independent proof claim |
| A07 | Submit a private check-in with no peer; separately share a pre-work plan and later selected results; edit private source then amend | Solo submission succeeds without grants; plan shows no private results and starts no reply window; only explicit confirmed publication changes the matching pinned snapshot |
| A08 | Review seven dates with pauses, moved items and unknowns | Denominators/coverage explicit; choose one next experiment; no opaque success score |

## Recurrence dates and return

| Case | Scenario | Required observable result |
| - | - | - |
| A09 | Edit one repeat, then preview a future-series edit | Default affects one; changed/committed exceptions preserved or resolved explicitly |
| A10 | Convert an existing action to repeating | Existing notes, results and identity/history retained; future copies separately identifiable |
| A11 | Move Monday's daily occurrence to Tuesday; generate Tuesday twice | Two distinct origin dates; one Tuesday-origin copy; no silent merge or duplicate generation |
| A12 | Reminder at repeated New York 01:30 on November 1, 2026 | Resolve earlier 05:30 UTC once logically; retry does not add another scheduled notice |
| A13 | Nonexistent spring local time; travel or change home zone | Visible gap adjustment; frozen history/series zone preserved; no duplicate owner-day plan |
| A26 | Pause prospectively, enter a retroactive correction, return after a week | Future eligibility suppressed; original cohort retained; today's small plan works without forced backlog |

## Peer permissions and publication

| Case | Scenario | Required observable result |
| - | - | - |
| A14 | Invite is forwarded, declined, expired, withdrawn or accepted twice | Only intended authenticated recipient can accept current proposal; one primary and one reviewing role per account under concurrent acceptance; solo remains usable |
| A15 | Peer guesses owner URLs/IDs, requests search/totals or cached receipts | Only granted fields/revisions returned; hidden item existence and counts not disclosed |
| A16 | Preview sharing, then alter recipient, agreement or source version before confirmation | Stale confirmation rejected; new preview required; no unexpected field is published |
| A17 | Put private reflection/notes, goal labels, optional cue and unselected tasks beside shared items | Reflection/notes and goal labels stay excluded; cue appears only if selected/previewed; hidden tasks/counts absent; peer cannot infer private check-in submission |
| A18 | Peer replies and proposes next action; owner accepts | Reply tied to reviewed revision; suggestion cannot mutate owner work; acceptance makes owner draft |
| A19 | Owner publishes late; partner misses reply; either pauses; replacement invited | 23:00 publication with 15-hour minimum resolves no earlier than 14:00 next day; an amendment preserves the initial deadline and overdue history; confirmed pause revokes grants; replacement accepts separately |
| A20 | Owner amends a reviewed day | New version visible; old feedback names old revision; no fabricated rereview or automatic new reply obligation |
| A21 | End/block relationship or Trash an item, then reuse old links | New reads and eligible notices denied; restore is private; copied data limitation stated |
| A22 | Revoke, pause or delete before notice dispatch; report an abusive reply | Eligibility rechecked; unsent notice suppressed; restricted case available to authorized operator |

## Reliability exit and usable devices

| Case | Scenario | Required observable result |
| - | - | - |
| A23 | Worker crashes before/after provider acceptance; repeated command key changes payload | Safe retry and logical deduplication; changed payload conflicts; no exactly-once display claim |
| A24 | Deny push, ordinary iPhone tab, installed app closed, quiet hours, stale subscription | Accurate setup/state, usable in-app path, no sensitive push text, no false delivery/read receipt |
| A25 | Two devices edit same result/date; offline queue reconnects after an update | Conflict visible; input survives; retained command applies once; different account cannot see/replay queued work; no persistent peer cache |
| A27 | Storage fills, queue migration fails, logout attempted with pending work | Error visible; available drafts recoverable/account-bound; logout locks them until same-owner sign-in or explicit discard; no false sync success |
| A28 | Export original/revised data, feedback and user-entered formula-like text | Correct owner scope, schema/relations, dates/zones, coverage/redaction; safe CSV text; no revoked owner data in peer export |
| A29 | Delete account, retry old sessions/commands/exports, restore backup | Access revoked immediately; purge tracked; deletion markers reapplied before restored data can be accessed |
| A30 | Core first plan through restart at 320/390-pixel phone widths and desktop | No clipped primary controls or desktop prerequisite; long titles and keyboard remain usable |
| A31 | Keyboard, VoiceOver/TalkBack, 200 percent text/zoom and reduced motion | Labels, focus, errors and outcomes understandable; no color/drag-only operation; main targets meet chosen 44-pixel design |
| A32 | Trash/restore, expire retention window, fail export/purge job | Context restored privately before purge; failure visible/retriable; published retention matches actual provider behavior |

The numerical ordering groups related cases; A26 is recurrence/return, and A25/A27 cover synchronization and local recovery. All 32 identifiers are unique. Deferred extension tests do not count as passing first-release tests, and unused extension modules should not appear in the navigation.

# Prototype and pilot boundaries

| Capability | Original prototype may demonstrate | External pilot must actually provide |
| - | - | - |
| Identity | Fictional users and role switch labeled simulation | Separate authenticated accounts and server authorization |
| Storage | Local fictional dataset with an explicit reset | Confirmed server persistence, owner queue, recovery and conflicts |
| Partner | Simulated acceptance, reply, silence and replacement | Recipient-bound agreement, real selective reads/replies, block/report |
| Check-in and publication | Independent private review, pre-work plan preview and result-sharing preview | Private submission needs no peer; distinct plan/result snapshots, server-generated preview and version-checked atomic publication |
| Reminders | Simulated job/status and manual clock | Real eligible worker dispatch and tested device setup |
| Exit | Example export and a simulated deletion receipt | Correct authorized export, revocation, purge tracking and backup handling |
| Accessibility | Responsive layout and semantic controls | Actual keyboard/screen-reader/device checks |
| Benefit | A coherent worked example | Participant evidence; no efficacy inference from the demonstration |

Keep a conspicuous simulation label whenever a prototype lacks the corresponding real capability. Local fictional persistence is useful for continuity in a demo; it is not multi-account privacy, server synchronization or a notification service. The existing Wave 7 embed is a design aid, not the first production slice. The prototype must use one coherent editable local model across screens, with a fresh-user path and an optional sample scenario. Changes to actions, results, history and previews must agree; do not substitute disconnected hardcoded screens. Local persistence should survive reload when available, with an explicit demo reset and visible storage errors. The overloaded fixture is a test scenario, not the required onboarding routine.

# Build phases and release gates

| Phase | Concrete deliverable | Exit gate |
| - | - | - |
| 0 Interface prototype | Original Today/Inbox/Review/Partner/Settings screens; fresh-user workflow, optional fixture, private check-in, plan/result previews and recovery on one local model | Render at narrow/wide widths; inspect interactions and disclosure wording; label simulations |
| 1 Private working slice | Real sign-in, schema/migrations, capture, commitment, result, correction, private check-in and review | Core private data persists across sessions; A01–A08 relevant private paths pass |
| 2 Recovery and sync | Repeat rules, pauses, dates/zones, local queue, conflicts and history | A09–A13, A25–A27 pass under controlled failures |
| 3 Peer working slice | Agreements, distinct pinned plan/result publication, day-linked feedback, silence, replacement, revocation and reports | A14–A22 pass across separate accounts; no hidden-field leakage |
| 4 Pilot operations | Real optional notices, export/Trash/deletion, support access controls, monitoring and accessible layouts | A23–A24, A28–A32 plus full regression pass; unresolved blockers closed |
| 5 Feasibility study | Moderated usability followed by the capped 14-day pilot from Wave 7 | Assess useful plans, honest reporting, burden, return and partner response; revise before paid promises |

A numbered phase is a build sequence, not permission to call unfinished P0 work a pilot-ready release. Role-based permissions and basic accessibility must influence the early slices even when their full test suite appears later. Production credentials, purchases and deployment remain separate implementation work.

Before the real backend slice, choose providers and record an architecture decision: authentication/session handling, runtime/deployment region, PostgreSQL connection/role model, worker scheduling, push delivery, export artifact storage, backups, retention, observability and a spending cap. Use supported stable versions available in that environment, pin them and keep secrets server-side. No particular framework is necessary to preserve the behavioral contract.

The first-release cost model excludes staff coaching, image ingestion, AI requests and calendar sync. Retain software hosting/database, auth, jobs/push, backups, export storage, monitoring, moderation and support. At the illustrative 100 users × 30 days × three occurrences/day, load is 9,000 occurrences; four commands per occurrence gives 36,000 before other actions; two notice attempts/day gives 6,000. These are workload assumptions, not measured usage or a quoted monthly bill.

Provider and device experiments must happen early enough to change the design. [WebKit's push guidance](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) requires an appropriate Home Screen app and a direct user gesture for the iPhone permission path. [WebKit's storage guidance](https://webkit.org/blog/14403/updates-to-storage-policy/) describes quota failures and best-effort eviction. An installed icon does not establish reliable reminders or durable local drafts.

Proposed retention targets carried from Wave 6 remain Trash 30 days, active-data purge within seven days of confirmed account deletion and backup expiry within 35 days. Verify provider behavior and publish the actual policy before real data. Keep export download authorization current, artifacts short-lived, and retained security/report data minimal and justified. These are proposed engineering targets, not legal requirements.

# Open questions assigned to concrete checks

| Open item | Priority and owner role | Next check and required evidence | Release consequence |
| - | - | - | - |
| Rendered concepts and real disclosure comprehension | Before prototype signoff; builder/designer | Render the saved concepts and working screens at phone/desktop widths; exercise controls; record problems | Do not claim rendered review is complete from source syntax alone |
| Physical iPhone/Android setup and push | Before reminder promise; builder with device tester | Ordinary tab/installed mode, allow/deny, app closed, quiet hours, reinstall, stale subscription; timestamped result log | Use explicit reduced promise or revise platform if unacceptable |
| Local queue durability and conflicts | Before pilot; builder | Quota failure, restart, update migration, logout, competing device and stale command | Data loss or silent overwrite blocks pilot |
| Partner access and publication race | Before peer pilot; builder/reviewer | Owner/peer/stranger tests, changed preview, revocation, old links/receipts, exports and counts | Any unauthorized disclosure blocks peer use |
| Repeat/date behavior | Before pilot; builder | Origin-versus-display collision, exceptions, pauses, DST gap/fold and zone changes | Destructive edits or duplicates block release |
| Export deletion backup restore | Before real-data pilot; operator/builder | Inspect actual files and schema; rehearse purge and restoring deletion markers | No unsupported deletion or portability promise |
| Moderation and support | Before inviting external users; pilot operator | Report a fictional abusive reply; verify case access, response ownership and account restriction | No unowned report queue |
| Target-user demand and peer reliability | Feasibility study; researcher/product owner | Interviews, partner acceptance/decline, useful replies, return and burden measures | Change audience/model if the promise is not useful |
| Vendor authenticated phone flows and export contents | Conditional research; researcher | Use authorized accounts only if a precise unknown could alter the original design | Remain unverified; not a vendor endorsement or production dependency |
| Supporti, Focusmate status, Forfeit/Habitica exit and code reuse | Deferred secondary research; researcher if scope changes | Recheck current official state/terms only before using those features or code | No dependency or reuse assumed in this release |

The Wave 7 HTML reference was retrieved successfully and matches the locally available concept source. This confirms the saved source, not its rendered appearance or behavior. No physical-device, authenticated multi-user, provider or pilot tests have been executed in Wave 8.

Use the existing method cards as a low-cost comparison: the same commitment, criterion, capacity budget, optional cue, honest check-in, willing peer agreement and next-step review can run on paper. A small feasibility pilot can reveal usability and participation problems; it cannot establish causal or durable benefit. A later comparative study should define outcomes in advance and add one mechanism at a time.

# Practical Codex handoff

The prompt below contains the essential scope, rules, requirement list and acceptance checklist. It can be pasted into a builder without access to the research Pages. The linked research remains optional supporting detail; a builder must not claim to have read or tested inaccessible material.

```text
Build an original daily accountability planner for adults doing independent work. This prompt is self-contained. Optional research context is at https://chatgpt.com/space/page_d5c41754be7c819185bac79b88852d09 ; do not block if that Page is unavailable, and do not claim to have read inaccessible research. The product helps a person choose a manageable commitment, report honestly and make a practical next attempt. It works privately with optional support from one trusted peer. Do not promise a paid coach, guaranteed response or proven effectiveness.

FIRST DELIVERABLE
Complete an original, coherent phone-and-desktop prototype using fictional data. Inspect any supplied repository/instructions and reuse its suitable stack; otherwise choose a simple maintainable stack and explain it briefly. Make routine implementation decisions without stopping for naming or branding. Keep domain behavior separate enough to test. Phase 0 ends at a runnable, rendered prototype with clearly labeled simulations; real backend, provider setup and an external pilot are later phases, not implied by local interactions.

NAVIGATION AND WORKING INTERFACE
Use Today, Inbox, Review and Partner, with labeled Settings. Phone uses a single column and bottom navigation; desktop uses left navigation and a wider work area. Support first use, empty, validation/error, pending/offline, conflict, paused and returning-user states. Use one editable local model across all screens: create/edit an action, commit, log/correct a result, review, share a preview and restart. History, totals and previews must agree after changes. Persist fictional local state across reload where available, show storage errors, and provide an explicit demo reset. Include an empty fresh-user path and a separate sample scenario; do not force every user through an overloaded example. Render and inspect the UI at narrow and desktop widths. Use original screen design rather than copied branding or disconnected static mockups.

REQUIREMENT FAMILIES
R01 Account/privacy: simulate identity visibly in Phase 0; real sign-in, verified actor, session controls and server isolation before pilot.
R02 Capture: small private Inbox; title, observable done criterion, optional goal label/start cue, optional estimate/planned date/date-only hard deadline.
R03 Capacity: available minutes after fixed obligations, selected estimates, unknown estimates and explicit commitment with original/current revisions.
R04 Results: completed, partial, missed, skipped or unreported; optional actual minutes/private notes; append corrections.
R05 Daily check-in: private submission works with no peer; pre-work plan sharing and later result publication are separate optional actions.
R06 Review/next action: structured solo reflection or version-linked peer feedback; an accepted suggestion becomes an owner draft only.
R07 Recovery/repeats: daily/selected weekdays, one-occurrence edit default, prospective series preview, pauses and a small restart without forced backlog.
R08 Peer agreement: intended-recipient invitation, acceptance/decline/expiry/withdrawal, response timing, silence, pause/end and replacement.
R09 Sharing/moderation: field/recipient preview, revocation, block/report and restricted operator handling before external users.
R10 Notices: optional daily check-in reminder, bounded sharing follow-up, partner result notice, quiet hours and accurate status.
R11 History: original/current cohorts, explicit outcomes/coverage, seven-day reflection and next experiment, no opaque score.
R12 Sync: owner-bound local queues, confirmed versus local states, duplicate-safe commands, visible conflicts and retained drafts.
R13 Accessibility/platforms: the whole core path on phone and desktop, labels/focus/text scaling, 44-CSS-pixel main control design and non-drag alternatives.
R14 Exit: Trash/restore privately, owner export, account deletion and verified published retention before real data.

PLANNING AND RESULTS
Suggest one to three commitments without a rigid limit. Sum known estimates; unknown is not zero and cannot yield a 'fits' claim. Require an explicit acknowledgement of known overload or incomplete capacity, or let the user revise. Preserve original commitments and changes. Criterion and estimate are distinct: recording minutes does not complete an outcome. Moving, pausing, withdrawing or deleting is not completion. Midnight does not change an unreported result to a miss. Track performed/self-reported time separately from server receipt when a backend exists. Planned work day and hard deadline are independent.

RECURRENCE AND TIME
Support daily and selected weekdays only, once per series/origin local date. Preserve identity after moving an occurrence. Monday moved to Tuesday and Tuesday's own occurrence remain two opportunities; preview both origins, never merge them silently. Do not use rule version or current display date as occurrence identity. Broader edits preserve committed/edited exceptions and existing notes/results, including conversion from a one-time action. Past unreported dates remain in history, not today's automatic commitment. Use local dates plus IANA zones, frozen plan zones and separate UTC audit instants. A date-only hard deadline ends at the next local midnight in its stored zone. For reminders, choose the earlier instant at a repeated local time and first valid instant after a gap, and show any adjustment.

PRIVATE SUBMISSION AND OPTIONAL PUBLICATION
SubmitPrivateCheckIn requires no recipient, invitation or grant. In the real app it confirms an owner-only submitted revision; offline work is visibly queued until accepted. PublishPlan shares selected already-committed actions before work starts. PublishCheckIn shares selected outcomes and a separately written shared message afterward. Plan and check-in snapshots have explicit kinds and pin exact source revisions. A shared plan says 'No results shared yet'; it does not expose later private results, count as a check-in or start a peer reply window. Only online preview/confirmation publishes or amends either snapshot; syncing private edits never republishes them. Preview committed/submitted source versions, selected fields, recipient and agreement version; reject stale confirmation and require a fresh preview.

SHARING RULES
Default private. Private reflection, private notes and goal labels are excluded from first-release sharing. A start cue is optional and shareable only when selected and previewed. A shared action may expose its selected title, criterion, planned day, estimate, hard deadline, approved result/actual effort and chosen shared message. Unselected items and hidden totals must not leak. Each new day needs its own selection. Feedback names the published check-in revision reviewed. Revocation/Trash/block/end stops new authorized access through old links, search, cached command results, exports and eligible jobs, but cannot recall copies already viewed. Restore privately; do not reactivate old sharing automatically.

PEER AGREEMENT AND REPLY WINDOWS
For the pilot, an account can have one primary responder for its own plan and can review one other owner's plan. Reciprocal support needs a separate acceptance. Enforce both caps atomically at acceptance/resume. Invitations expire after seven days, are bound to the intended authenticated recipient, and grant no access while pending. A partner may respond/suggest, never edit, move, complete or delete owner work.
The accepted agreement records owner check-in days/cutoff/zone, normal reply deadline, minimum response interval, quiet hours and whether one sharing follow-up is allowed. For the FIRST published results, reply due = later of normal reply deadline and publication time plus the accepted minimum interval. Example: cutoff 21:00, normal reply next day 12:00, minimum 15 elapsed hours; initial publication at 23:00 means due 14:00 next day. Amendments preserve the initial deadline/history and cannot erase an overdue record. After a reply, an amendment is marked unreviewed without automatically imposing another reply. A new obligation needs explicit participant agreement.
On server-confirmed relationship pause, stop new publication/obligations/notices and revoke grants; pending offline requests must not claim success. Resume needs both acceptances and available roles; never auto-share old history. End the old agreement before replacement. Planning absence is a separate pause of future recurrence/reminders, not a rewrite of past outcomes. A silent peer never blocks private planning/check-in/restart.

NOTIFICATION AND PRIVACY STATES
Distinguish on-device, queued, synced, privately submitted, shared and provider-accepted states. A peer sees 'No check-in shared', not whether a private review exists. A private submission stops the owner's ordinary check-in reminder; an agreed sharing follow-up separately depends on missing publication. Plan publication starts no result notice or review window. Cap partner result push to one per owner/frozen plan date/recipient/agreement generation; later amendments update in-app/unsent notice content without another push after dispatch. Keep owner reminders and sharing follow-up separately bounded/deduplicated. Respect recipient quiet hours. Generic push text contains no private titles/reflections. Never claim exact delivery, a read receipt or exactly-once display.

SHARED TEST FIXTURE
Optional sample: Tuesday October 27, 2026, New York, available 60 minutes. Writing 30 + walk 20 + project 45 = 95, overload 35. Preserve an explicitly acknowledged initial commitment. Then explicitly move project to Wednesday and separately add a 10-minute review, so Tuesday is 60; Friday October 30 deadline stays unchanged. Writing 15 is explicitly partial, walk 20 complete, review outcome/time unknown. Allow an optional pre-work share of writing/walk, a private check-in and a separately confirmed result share with a chosen message. A peer suggests a smaller next action; owner accepts a draft. Also exercise no reply and return after a week. Preserve original and revised cohorts and private/shared denominators.

PROTOTYPE AND LATER BUILD BOUNDARY
Phase 0 uses fictional users/data and visible simulations of identity, acceptance/replies, sync, jobs, notifications, export and deletion. Local role switching is not authorization and a timer is not push. Exclude AI, stakes, billing, staffed coaching, attachments, calendar connections, advanced recurrence and full project management; no dormant menu items.
Later phases are: real private account/server slice; recurrence/recovery/sync; real peer permissions/publication; then notices/exit/moderation/operations; only afterward an exploratory pilot. Use a responsive installable web client, authenticated API, PostgreSQL baseline and background worker, unless an existing stack justifies a documented equivalent. Choose stable supported versions, managed identity, deployment region, worker/push/export/backup providers, secrets handling and a spending cap before real data. No specific frontend framework is required.

REAL IMPLEMENTATION CONTRACT
Records cover account, task, repeat rule, occurrence, plan/entry, commitment revision, progress event, private check-in revision, agreement/invitation, plan/result share snapshot and grant, feedback, command receipt/change cursor, outbox/notice, report case, export/deletion and audit. Use owner keys/foreign keys and uniqueness for owner/local-day plan, series/origin date, actor/command key and logical notice ID. Retained history is versioned, not retained forever.
Authenticate/authorize every server read/write and cached command response. Use restricted DB roles and grant policies, not a privileged connection or hidden controls as isolation. Each mutation uses actor-derived identity, client command key, payload hash and expected versions. Commit state/history/receipt/outbox atomically. Same key/payload returns the authorized accepted result; changed payload or competing versions conflict and preserve input. Old queued commands never recreate purged data.
Bind local work to the same authenticated owner; another sign-in cannot see or replay it. Lock pending work on logout after offering sync/local rescue export or explicit discard. Preserve/migrate queues before updates or repair. When acting as reviewer, do not persist another owner's shared responses for offline use or cache them via service workers. Server workers recheck eligibility at dispatch and use safe retries/leases/failure visibility.
A real export includes schema-versioned CSV/JSON relationships, original/current revisions, outcomes, dates/zones, permitted feedback and coverage/redaction; protect formula-like text and authorize download. Never rejoin revoked owner records into a former peer's export. Deletion revokes sessions/grants/jobs immediately on confirmation and tracks purge/backup handling. Proposed targets are Trash 30 days, active purge within seven days and backup expiry within 35 days; verify/publish actual provider-supported policy before real data, and reapply deletion markers on restore.

ACCEPTANCE CHECKLIST
Keep these identifiers in the eventual test log; use subcases where needed. Expected outcomes are requirements, not existing passes. Phase 0 may check local behavior and renderability only; mark real-server/provider/device checks pending.
A01 New workspace private; owner/peer/stranger sessions isolated.
A02 95 versus 60 shows overload 35; missing estimate remains unknown; explicit acknowledgement/revision.
A03 Move project independently from adding review; revised 60 and Friday deadline unchanged.
A04 Explicit partial/complete/unknown; original/current cohorts and effort separate.
A05 Corrections retained, counts update, duplicate command creates no duplicate action.
A06 Midnight keeps unknown; late offline work labels performed/received time.
A07 Solo private submission needs no peer; pre-work plan shares no private results; result publication/amendment is explicit and pinned.
A08 Seven-day review labels coverage/pauses/moves and ends in one next experiment.
A09 One-occurrence default and previewed future edits preserve exceptions.
A10 Converting to recurrence retains notes/results/history.
A11 Moved Monday and Tuesday origins stay distinct; repeated generation adds no duplicate.
A12 New York November 1, 2026, repeated 01:30 resolves to earlier 05:30 UTC once logically.
A13 Spring gap adjustment and travel/home-zone change preserve frozen dates and plan identity.
A14 Forwarded/declined/expired/revoked/duplicate invitation and concurrent role acceptance grant no unintended access or extra role.
A15 Guessed IDs/search/totals/old command receipts expose only current authorized fields.
A16 Changed source/recipient/agreement after preview rejects stale confirmation.
A17 Private reflection/notes/goal labels/hidden items/counts stay absent; cue requires selection; private submission status stays private.
A18 Reply references reviewed version; only owner acceptance makes a suggested draft.
A19 Late first publication calculates deadline correctly; amendments preserve it and overdue history; pause/resume/replacement obey grants/role limits.
A20 Amendment identifies old feedback and adds no fabricated rereview or automatic new reply obligation.
A21 Revocation/Trash/block/end denies new access through old paths; restore private; copied-data limit honest.
A22 Eligibility changes before dispatch suppress unsent notices; abuse report reaches restricted operator workflow.
A23 Worker failures retry safely; logical notices/commands deduplicate; changed payload conflicts; no exactly-once display claim.
A24 Denied push, ordinary iPhone tab, installed app closed, quiet hours and stale subscription show accurate usable states without private push content.
A25 Competing devices show conflict and preserve input; queue applies once; another login cannot replay it; no persistent reviewer cache.
A26 Prospective pause, retroactive correction and week-away restart preserve history without forced backlog.
A27 Quota/migration/logout failures preserve available owner-bound drafts, show errors and never falsely claim sync.
A28 Actual exports have correct owner scope/schema/relations/time/coverage/redaction and safe CSV; no revoked owner joins.
A29 Deletion invalidates sessions/old commands/exports; backup restore reapplies deletion markers before access.
A30 Whole core path fits 320/390-pixel phone widths and desktop with long titles and on-screen keyboard.
A31 Actual keyboard, VoiceOver/TalkBack, 200-percent text/zoom and reduced-motion review; understandable labels/focus/errors and non-drag controls.
A32 Trash/restore/purge and failed export/deletion jobs match published policy and remain visible/retriable.

DELIVERY AND RELEASE GATES
Deliver the runnable Phase 0 prototype, setup instructions, brief design/architecture decisions, requirement-to-test record and remaining experiments. Record what passed, failed, stayed simulated or could not run; never claim real phone behavior from a desktop viewport. Keep the 32 scenarios distinct from executed results. No unresolved unauthorized access, data loss or destructive recurrence may enter a real pilot. The proposed later feasibility study is ten moderated usability sessions, followed only after gates pass by six consenting adult peer pairs plus four solo participants for 14 days. Its purpose is usability/feasibility, not causal effectiveness. Do not silently deploy, spend money, contact participants, collect real data or claim validated benefit. Complete Phase 0 first.
```

# Completion checkpoint

Wave 8 closes the planned research/design sequence with a linked evidence package, six-question coverage audit, scoped product, fourteen requirement families, clarified behavior, 32 acceptance scenarios, phased build order, release gates, open-question owners and a copyable Codex brief. The next concrete action is Phase 0: implement and render the original prototype against the worked fixture. Real users, accounts, notifications, operations and benefit claims remain subject to their assigned checks. The final handoff recheck separates solo submission, pre-work plan publication and result publication; preserves reply deadlines through amendments; enforces peer-role/account-cache boundaries; and makes the copyable brief self-contained. These are specification corrections, not executed application tests.

---

# Document: PHASE0

# Phase 0 — decisions, requirement-to-test record, remaining experiments (2026-10-27)

## Decisions
- **Stack:** React 19.3 + Vite 8 + TypeScript 7, vite-plugin-pwa 2 (`injectManifest`, prompt-to-update,
  update check on foreground + hourly). Hand-written CSS on OKLCH tokens; Phosphor icons (MIT).
- **Domain kept separate** in `src/domain` (no React). Every mutation is a command with a client key and
  payload hash: same key + same payload is a no-op, changed payload conflicts, stale expected versions
  conflict and the UI keeps the user's input.
- **Time:** `temporal-polyfill`. Local dates + IANA zones; plan zone frozen at first commit; reminders
  resolve repeated local times to the earlier instant and gaps to the first valid instant, and say so.
- **Recurrence identity** is series + origin date. Moving changes the display date only.
- **Sharing** goes through one `buildPreview` used for both the preview UI and the publish check; publish
  requires the preview digest, so any change in source, recipient or agreement rejects a stale confirmation.
  Snapshots pin the source revision; private reflection, notes and goal labels are never read into them.
- **Local storage:** whole state per (simulated) owner in IndexedDB, `schema: 1`, refuses unknown
  schemas rather than guessing. Phase 2 replaces this with a per-command outbox and migrations.
- **Visual identity:** “paper and signal” — warm neutrals, ink, one amber signal colour. Outcomes use
  colour *and* shape; a miss is neutral slate, never red. No streaks or composite score (handoff). The
  only celebration is a calm “Day marked” after an honest check-in.
- **iOS specifics:** `viewport-fit=cover`, black-translucent status bar, safe-area padding everywhere, a
  solid fixed strip under the status bar (iOS 27 blur workaround, unverified), opaque 180px touch icon,
  light/dark splash screens, 17px rem base so Dynamic Type scales all text, 16px+ inputs, 44px targets,
  real `switch` checkboxes for toggles (iOS haptic), sheets via portal with `inert` background and
  `visualViewport` keyboard sizing.
- **Backend (Phase 1+), not yet chosen:** Supabase (Postgres + RLS, email OTP auth, Edge Functions,
  pg_cron) is the leading candidate. Record an ADR (auth, region, DB roles, worker, push sender,
  export storage, backups, retention, spending cap) before any real data.

## Requirement-to-test record (A01–A32)
Status key: **pass-unit** = Vitest; **pass-e2e** = driven through the UI; **rendered** = implemented and
inspected in screenshots only; **simulated** = demonstrated locally, real behaviour needs a server;
**pending** = needs server, device or provider. Nothing here is a real-server or real-device result.

| ID | Status | Evidence / gap |
|---|---|---|
| A01 | simulated | Single fictional owner; storage key bound to owner id. Real auth/isolation pending |
| A02 | pass-unit, pass-e2e | Overload 35; unknown ≠ 0; commit disabled until acknowledged |
| A03 | pass-unit | Fixture revision = 60; Friday deadline unchanged |
| A04 | pass-unit | Partial/complete/unknown; original vs current cohorts |
| A05 | pass-unit, pass-e2e | Same key no-op, changed payload conflict; correction keeps history |
| A06 | pass-unit (by construction) | No code path converts unreported to missed; late entries show performed vs entered time |
| A07 | pass-unit | Solo submit; plan snapshot has no outcomes or reply window; check-in pinned |
| A08 | pass-unit, rendered | Denominators, time away, moved items; one next experiment |
| A09 | pass-unit, rendered | Exceptions/committed copies preserved unless explicitly ticked in preview |
| A10 | pass-unit | Source action retained with notes/history |
| A11 | pass-unit | Moved Friday + Monday's own occurrence distinct; regeneration idempotent |
| A12 | pass-unit | 2026-11-01 01:30 New York → 05:30Z, once |
| A13 | pass-unit | Spring gap shifted and labelled; zone change keeps frozen plan zones |
| A14 | simulated, partial unit | Accept/decline/expire/withdraw states; one agreement at a time. Recipient binding and concurrent acceptance need a server |
| A15 | pending | Needs server authorization tests (guessed IDs, totals, receipts) |
| A16 | pass-unit | Stale preview rejected after source change |
| A17 | pass-unit | Reflection, notes, goal labels, unselected cue absent from snapshots; partner view shows only "No check-in shared" |
| A18 | pass-unit | Reply tied to version; suggestion becomes uncommitted draft only |
| A19 | pass-unit (deadline), simulated (pause) | Late-publication rule; amendment keeps deadline; paused peer cannot reply |
| A20 | pass-unit | v2 amendment; feedback still names v1; one partner notice |
| A21 | pass-unit, simulated | Trash revokes sharing, restore stays private; end/block revoke peer view |
| A22 | simulated | Notice eligibility recomputed from state; report opens restricted case (local) |
| A23 | pending | Worker/provider |
| A24 | rendered, pending device | App detects Safari tab vs installed; reminder setup states shown; push not implemented |
| A25 | partial | Command dedupe/conflict implemented; no SW caching of partner data; two-device test pending |
| A26 | rendered | Time away suppresses future copies only; +1 week clock control for return |
| A27 | rendered, pending | Storage read/write errors surfaced; quota/migration failure not exercised |
| A28 | pass-unit | Formula-safe CSV; JSON excludes sim/command internals. Server export pending |
| A29 | pending | Deletion simulated as local erase |
| A30 | rendered | No overflow at 320/402/desktop, light+dark; on-screen keyboard pending device |
| A31 | partial | Labels, focus rings, 44px targets, reduced motion, contrast script; VoiceOver/200% text pending device |
| A32 | pending | Retention/purge jobs |

## Remaining experiments (owner: builder + device tester)
1. Install on iOS 26 and 27: icon, splash (light/dark), status bar, `safe-area-inset-top` value
   (WebKit 301994), whether the top strip prevents the iOS 27 blur, tab bar above home indicator.
2. Keyboard in sheets (visualViewport sizing), VoiceOver pass, largest Dynamic Type, Reduce Transparency.
3. Haptic on the `switch` toggles in Settings.
4. Persistence across force-quit and a week of non-use; `storage.persist()` result when installed.
5. Before promising reminders (Phase 4): push in tab/installed/denied/closed/backgrounded/Focus states,
   declarative `navigate` routing, badge, resubscribe after reinstall.

---

# Document: PWA_PREP

# iPhone PWA build prep — consolidated research (2026-10-27)

Three research passes (iOS platform, engineering stack, visual/art), merged and applied to the
Wave 8 accountability-planner handoff. Items marked **[device]** need a real iPhone to confirm.
Items marked **[unverified]** came from a single or secondary source.

## 1. Platform facts that shape the product

| Topic | Current state (iOS 26–27.2) | Consequence for Daymark |
|---|---|---|
| Install | iOS 26: Add to Home Screen opens as a web app by default, but users can switch "Open as Web App" off (→ plain Safari bookmark: no push, other storage); no `beforeinstallprompt` | Install-coach sheet says leave the toggle on; app detects non-standalone |
| Standalone detection | `navigator.standalone` or `matchMedia('(display-mode: standalone)')`; also check `fullscreen` (WebKit 264218) | Feature-detect; never parse the frozen UA |
| Push | Home Screen app only (16.4+); permission + `subscribe()` inside the tap handler; VAPID; 4 KB payload; TTL required; no silent push (permission revoked) | Reminders are server-sent; A24 states must cover "ordinary tab", "denied", "installed" |
| Declarative Web Push | iOS 18.4+: `{"web_push":8030,"notification":{title, navigate, body}, "app_badge"}`; works without SW | Use as the payload format; SW `push` handler parses same JSON for other browsers |
| Notification click | MDN data says unsupported (possibly stale); WebKit 252544: taps route to app root when closed; one `openWindow` only | Route with declarative `navigate`; treat SW `notificationclick` as best-effort |
| `pushsubscriptionchange` | Not fired (WebKit 273063); subscriptions can silently die (OS updates) | Re-check `getSubscription()` every launch; server tracks last-delivered/last-seen; delete on 410; TTL must be >0, valid `Urgency` |
| Background work | No Background Sync, Periodic Sync, Notification Triggers | Flush outbox on launch/`visibilitychange`/`online`; server scheduler for all reminders |
| Storage | Same quota as Safari (up to ~60% disk/site); ITP 7-day rule: Home Screen apps have their own use counter (2020 statement) but eviction is still reported — not a guarantee; `storage.persist()` granted heuristically (more likely when installed) | IndexedDB as local truth, call `persist()`, surface quota errors (A27) |
| Safari ↔ app | Separate storage; cookies copied once at install (17.2) | No magic links — use 6-digit email codes / passkeys **[device]** |
| Manifest | Honors name, short_name, start_url, scope, display standalone, icons (SVG only via manifest), id; theme_color reportedly has no effect on the status bar since iOS 26. Ignores orientation, background_color, maskable/monochrome, shortcuts, share_target | Still ship full manifest for Android/desktop |
| apple-touch-icon | Overrides manifest icons; must be opaque 180×180 | Generate opaque PNG |
| Splash | Only via `apple-touch-startup-image` + `apple-mobile-web-app-capable`; per-device media queries; dark-mode splash fixed at install time (WebKit 259328); white flash on dark cold start (311569) | Generate plain light/dark solid splashes |
| Status bar | Status-bar meta deprecated but still the only full-bleed path; colour not reliably refreshed after install **[unverified]**. WebKit 301994 (reopened, iOS 26.1→27): standalone status bar stays visible and `safe-area-inset-top` can read 0 | Layout must work with inset 0 or ~59px; device-test both |
| iOS 27 top blur | System bar blurs content beneath it; a `position:fixed` element with a background, ≥90% wide and >10px tall at the top, makes the bar take its colour (community reading of WebKit `fixedContainerEdges`) **[unverified]**; theme-color/status meta don't help | Fixed `--bg` strip, height max(inset, 12px) |
| Keyboard | No VirtualKeyboard API / interactive-widget | Use `visualViewport` to keep sheet actions visible |
| Back swipe | Edge swipe works, no back button | In-app back affordances; coherent history |
| Haptics | No Vibration API; real `<input type=checkbox switch>` tap gives a tick (switch shipped 17.4; haptic reported 17.4–18+); programmatic paths closed in 26.5 **[unverified]** | Use real switch inputs where a toggle fits (settings), not as fake buttons |
| Modern CSS/JS | View Transitions (18.0/18.2), Popover (17), anchor positioning (26), scroll-driven animations (26), Navigation API (26.2), `light-dark()` (17.5), OKLCH (15.4) | Free to use with feature detection |
| No glass API | `-apple-system-glass-material` is private | Approximate with backdrop-filter, chrome only |
| EU | Home Screen apps kept (reversal 1 Mar 2024) | No special path |

## 2. Engineering decisions

| Layer | Research default | Phase 0 decision | Why |
|---|---|---|---|
| UI | React 19.3 + Vite 8 | **Same** | Fluency, ecosystem; ViewTransition stable in 19.3 |
| Router | TanStack Router | **Tab state + URL hash** (Phase 0) | 5 top-level views and sheets; add router when deep links/push arrive |
| CSS | Tailwind 4 | **Hand-written tokens + CSS** | Tokens are the design system; small surface |
| Sheets | Base UI Drawer (Vaul unmaintained) | Hand-built sheet now; Base UI when swipe-dismiss is needed | Keep deps small |
| Local data | Dexie + outbox | **Raw IndexedDB, whole-state per owner** | Phase 0 fictional model; Dexie + command outbox in Phase 2 |
| Dates | date-fns-tz | **temporal-polyfill** | A12/A13 need exact `earlier`/gap semantics; Temporal has them natively |
| SW | vite-plugin-pwa `injectManifest`, `registerType:'prompt'`, update on `visibilitychange` + hourly, `vite:preloadError` reload, no API caching in SW | **Same** | Push handlers need injectManifest |
| Backend (Phase 1+) | Supabase (Postgres + RLS, OTP auth, Edge Functions, pg_cron) | Candidate; record ADR before real data | Matches handoff's PostgreSQL + worker + RLS contract; RLS bypass by owners/superusers must be tested (handoff) |
| Push sender | `@pushforge/builder` (Web Crypto) over `web-push` | Phase 4 | Runs on edge runtimes |
| Hosting | Cloudflare Workers Static Assets; no-cache on sw.js/index.html/manifest; immutable /assets | Phase 4 | Custom domain from day 1 (origin = installs, push, passkeys) |
| TS | TS 7.0.2 incompatible with typescript-eslint | Using TS 7, no typescript-eslint | Biome/oxlint if linting needed |
| Tests | Vitest 5 + Playwright (Chromium here; WebKit not installed in this container) | Domain tests for A02–A21 logic; screenshot review | Emulation ≠ iOS standalone |

Performance budget: ≤170 KB gz JS first route, LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.

## 3. Visual direction for Daymark

- **Identity:** "Paper and signal" — warm paper neutrals, deep ink, one amber signal colour. Brand
  over iOS mimicry; borrow iOS *behaviour* (floating tab bar, sheets, large titles, 44pt targets,
  safe areas, springs).
- **Glass** only on the tab bar and sheet chrome; 1–3 glass surfaces/screen, blur ≤18px, never animated;
  `prefers-contrast: more` → solid.
- **Type:** `system-ui` (SF Pro) body; `ui-rounded` + tabular-nums for numbers; Dynamic Type via
  `font: -apple-system-body` scoped to iOS; rem everywhere; nothing under 11pt.
- **Colour:** OKLCH tokens, separate dark palette (elevated = lighter), increased-contrast overrides.
  Outcomes use colour **and** shape: completed (teal, check), partial (half-filled, amber), missed
  (neutral slate ring — never red), skipped (lavender, arrow), unreported (dashed outline).
- **Handoff overrides habit-app conventions:** no streak flames, no opaque score, no punitive
  streaks, no mascot. Celebrate *honest check-ins*, not perfect days; reward is a calm "day marked"
  moment, reduced-motion aware.
- **Icons:** Phosphor (MIT), regular for inactive, fill for active. SF Symbols are not licensed for web.
- **Art:** geometric SVG from brand primitives (sun-on-horizon mark, horizon lines) for icon,
  empty states and install guide.
- **Assets:** 1024 master SVG → apple-touch-icon 180 (opaque), 192/512 any, 512 maskable (80% safe),
  favicon.svg, light/dark solid splashes. Rasterize with Playwright/sharp; container has no rsvg.
- **Self-review loop:** Playwright at 393×852 / 402×874 / 440×956 / 375×667 / 320 wide / desktop,
  light+dark, simulated safe areas (`--debug-sat:59px; --debug-sab:34px`); read PNGs and critique.
  Container renders `system-ui` as a non-SF font — typography is approximate.

## 4. Device test checklist (needs the user's iPhone)
1. Install via Safari (… → Share → Add to Home Screen, Open as Web App on). Splash, icon, status bar, top blur.
2. Safe areas, tab bar above home indicator, keyboard with sheets.
3. Push: ordinary tab state, permission prompt from tap, denied; delivery and tap routing with app closed / backgrounded / foreground; after force-quit; under Focus & Notification Summary; badge; delete icon → reinstall → resubscribe.
6. `env(safe-area-inset-top)` value in standalone (0 vs ~59px, WebKit 301994) and whether the top strip stops the iOS 27 blur.
4. Kill app, relaunch: data persists; update prompt on new deploy.
5. Dark mode cold start (white flash), reduce transparency, Dynamic Type at largest size, VoiceOver.

## 5. Critic pass and verification (2026-10-27)

Two Sonnet critics reviewed sections 1–4. I verified only the load-bearing flagged items directly:
- **WebKit 301994** — confirmed: title is "Status bar remains visible in fullscreen mode in Home Screen Web apps"; no mention of black-translucent; reopened 2026-08-04 (26.5.2, 27 beta); reporter saw `safe-area-inset-top` = 0. Row rewritten.
- **WebKit 301108** — confirmed: Safari browser (see-through address bar) bug, not standalone; no workaround. Row and CSS recipe removed.
- **Top-blur thresholds** — confirmed: milkbox PR #55 cited 6px/80% (Modern Web Weekly), revised in PR #60 to ≥90% width, >10px, from reading WebKit source. Strip updated.
Accepted without re-checking (low risk, adopted as caveats): notificationclick reliability, subscription death, TTL/Urgency, ITP caveat, haptics 17.4, Open-as-Web-App toggle, theme-color.

---

# Document: POLISH_PLAN

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

---

# Document: COMBINED_PLAN

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

---

# Document: ADHD planning hand-off 2026-10-28

Hand-off: ADHD planning research (Oct 28, 2026)

Goal: merge this with the existing accountability research into one plan. Pause app development and switch to planning; the combined plan will later be built into the Sarno Family App PWA (Supabase project "Sarno Family Hub", which already has personal_todos, notifications and push_subscriptions tables).

Six ideas with the strongest support (adult ADHD clinical work, ADHD user studies, CHADD, ADDitude):
1. One trusted place: a single calendar plus a single task list, checked daily. Capture must be near-effortless; messy is fine.
2. Nudge at the moment: two-step alerts ("get ready" then "start now"). Vary the wording so reminders don't go invisible, and cap how many per day.
3. Make time visible: countdown timers, buffer time, and "you guessed 20 min, it took 45" feedback for time blindness.
4. Shrink the first step: starting is often blocked by built-up dread, so the first step should be almost too small to fail.
5. If-then plans: "If it's 9pm, then I pack tomorrow's bag" beat plain goals in a study of kids with ADHD.
6. Company and kindness: working alongside someone helps people start and finish (mostly survey evidence). Rigid plans and broken streaks trigger shame spirals, so the system should expect missed days.

Feature ideas for the app:
- One-tap capture with messy text allowed
- "Break it down" button that makes the first step tiny
- Two-stage reminders with rotating wording and a daily cap
- Visible countdown plus guessed vs actual time
- Opt-in partner check-ins that suggest, not decide
- A "minimum day" next to the ideal day, streaks that survive a skip, and a done list that shows wins

Suggested first step: a two-week trial (top 3 each morning, one gentle afternoon check-in, evening recap of what got done) to learn which features are worth building first.

Sources:
https://chadd.org/attention-article/mastering-your-adult-adhd/
https://pmc.ncbi.nlm.nih.gov/articles/PMC3874265
https://www.additudemag.com/how-to-be-productive-adhd/
https://www.socmot.uni-konstanz.de/sites/default/files/Gawrilow_Gollwitzer_Oettingen_Delay_2011-2.pdf
https://www.healthline.com/health/adhd/body-double-adhd
---

# Document: ADHD feature integration and behaviour

# Write the spec here, build inside Sarno

**Recommendation: do not build the feature in this planning session, and do not build a separate skeleton to merge later.** Finish a contract-first handoff spec here. A Claude Code session working inside `Marcsarno/Sarno` then builds it in phases, following Sarno's own rules, and nothing is released until Marc approves and runs the migrations. Sarno's code rules out a skeleton. Its whole UI is generated from one 10,947-line template, and the parts that would transplant cleanly (a pure logic module, migration SQL, a server function) are exactly what an in-repo session can write fastest against Sarno's real test harness. The code map also shows that the earlier plan's first build round, a server-run nag ladder reading `personal_todos`, collides with a recorded security decision (migration 0004) and a privacy test that asserts the server holds nothing on that table. This report replaces that design with **"the phone plans, the server only fires"**. Marc's app computes every future push for the next 14 days: wording, times, kid days and drive windows. It stores them in owner-only tables. A minute-by-minute database job moves due pushes into Sarno's existing notification path. This keeps one implementation of the family-calendar logic (in the browser, where it already lives), keeps time-zone logic off the server, and leaves `personal_todos` untouched by the service role. The behaviour spec that follows is built around Marc as an adult with ADHD. Each push brings his own plan (when, where, first step). A swipe never ends anything. Nothing pushes while he is driving or reaches a solo-parenting block unless it belongs there. Missed items move on their own, with no counts or red. Each day is framed by a single "today's one thing" prompt that adapts to kid days and kid-free days. Before the in-repo session starts, Marc has about fifteen decisions to make, listed below. The most consequential: enabling `pg_cron`/`pg_net`, allowing reminders to push at all (a reversal of Sarno's push policy), and what text may appear on his lock screen.

## A skeleton cannot carry Sarno's UI, so the spec is the deliverable

The question was whether to build a separate prototype and combine it with Sarno later, build directly inside Sarno, or build nothing in this session and hand a thorough spec to an in-repo session. The codebase map settles it for the third option, with one refinement: the spec should be split contract-first, as Sarno's own Smart Add round was.

**Sarno has no component layer to merge a skeleton into.** `src/AppView.jsx` is generated by `tools/proto/convert.py` from `tools/proto/markup.html`. The template DSL has `sc-if`, `sc-for`, `{{ binding }}` and four event types, with "no conditional-style logic", and it has never handled inline SVG ([CLAUDE.md L83-89, L586-591](/home/user/sarno/SarnoPWA/CLAUDE.md); [convert.py L17](/home/user/sarno/SarnoPWA/tools/proto/convert.py)). Every screen is an `sc-if` block keyed on `tab`. Every sheet is an `sc-if` on a flag that must also be listed in `_allClosed()`. Every binding comes from one `renderVals()` that returns about 930 keys and is recomputed every 60 seconds ([src/logic.js L118, L9548-9560](/home/user/sarno/SarnoPWA/src/logic.js)). A React skeleton would have to be rewritten into that DSL. The alternative is to mount it by hand from `main.jsx`, as `SyncBanner` is. That would leave it outside `verify.py`, the binding-completeness invariants, smoke's tab walk and `tokens.py`'s colour discipline, and Sarno has no precedent for a full screen built that way ([src/main.jsx L41-82, L188-198](/home/user/sarno/SarnoPWA/src/main.jsx)). The obvious existing skeleton, the Daymark prototype in `/home/user/accountability`, is the worst fit. It is TypeScript with a `dispatch` command layer, a `Sheet` kit, `tokens.css` and Playwright. None of these exist in Sarno, which ships plain ES modules with only `react`, `react-dom` and `web-push` as runtime dependencies ([package.json L21-25](/home/user/sarno/SarnoPWA/package.json)).

**A separate app or sub-path breaks Marc's own constraints.** This part is inference from the build configuration, not a tested result. Sarno registers one Workbox-generated service worker at scope `/`, which imports `/push-sw.js` and serves `index.html` for every navigation, with no denylist ([vite.config.js L7-39](/home/user/sarno/SarnoPWA/vite.config.js)). A sub-path page would be served Sarno's cached shell. A separately installed home-screen app would need its own subscription and device rows, and it would be another app, which Marc has refused. The things that most need proving (iOS delivery, deep links into the right screen, calendar-aware timing) exist only inside Sarno's origin and service worker, so a prototype elsewhere cannot prove them.

**Building directly from this session is blocked, and would break the house rules if it were not.** The current handoff records read-only access to the Sarno repo ([BUILD_HANDOFF.md](/home/user/accountability/docs/research/BUILD_HANDOFF.md)). Sarno's working rules (plan first, flag decisions, no deploys, pushes or SQL, report every command, name the test behind every claim) assume a session that runs Sarno's pipeline on a working branch ([CLAUDE.md L1197-1210](/home/user/sarno/SarnoPWA/CLAUDE.md)). The steelman for a skeleton is speed: Marc could see something on his phone sooner. But what would make that useful (real pushes, his calendar) is exactly what a skeleton cannot reach.

The spec should copy the shape of Sarno's Round D. That round's Phase 1 was "contract + server", with "No UI at all"; Phase 2 built the UI only after Marc approved the contract ([planning/roundD-smart-add.md L127-217](/home/user/sarno/SarnoPWA/planning/roundD-smart-add.md)). The recurring build shape for a private, per-user feature is already established: migration with its own table and forced RLS → `backend.js` CRUD → `logic.js` state and a `xxxVals()` spread → markup and regenerated view → privacy and empty-state pins → a `CLAUDE.md` OUTSTANDING entry with run order and verification SQL ([sitter availability, CLAUDE.md L1084-1099](/home/user/sarno/SarnoPWA/CLAUDE.md)). Most new logic should live in a new framework-free module, say `src/focus.js`, following the `src/smartadd.js` precedent: imported by `logic.js`, tested by plain node scripts under the pinned clock, and holding no secrets ([CLAUDE.md L821-825](/home/user/sarno/SarnoPWA/CLAUDE.md)). The diff inside the 600 KB files then stays small and easy to grep.

## Sarno's code contradicts the earlier engine plan in six places

The earlier handoff's Round 1 ("`remind_at` + first step + star; pg_cron sender; nag ladder…") assumed a server that reads Marc's reminders and decides what to send. The code map found that design conflicts with recorded decisions. Each conflict below names what the code says, what the spec must do, and whether Marc must decide.

**1. A server-run ladder reverses migration 0004 and fails privacy test S.** Migration 0004 records the principle "The server never needs to read anyone's private reminders but the asker's own, and now cannot" ([0004 L118-123](/home/user/sarno/SarnoPWA/supabase/migrations/0004_service_role_grants.sql)). Privacy test S derives every admin database operation from the endpoint source and asserts that "service_role holds nothing on personal_todos". Its endpoint list is hard-coded to `smart-add.js` and `notify.js` ([privacy.test.mjs L1813, L1862-1903](/home/user/sarno/SarnoPWA/tools/privacy.test.mjs)). A cron job has no caller token, so a server that reads reminders to build nags needs an admin grant on private text. This report's architecture (next section) avoids that. The phone writes ready-made push rows into owner-only tables, and a `SECURITY DEFINER` database function copies the due ones into the existing `notifications` table. Some privileged code still reads Marc's planned pushes, so the principle changes in scope, if not in letter. Marc must approve that explicitly, and the session must record it in `CLAUDE.md` and pin it with new privacy tests. It must not slip in quietly.

**2. There is no scheduler of any kind.** No migration uses `pg_cron` or `pg_net`, and no `vercel.json` exists. Every push today is request-driven: the browser reports `{kind, entityId}` after a save ([api/notify.js L9-14](/home/user/sarno/SarnoPWA/api/notify.js); [0003 L336-358](/home/user/sarno/SarnoPWA/supabase/migrations/0003_notifications.sql)). The earlier handoff says `pg_cron` and `pg_net` are available on Supabase but not enabled. The repo itself does not record this either way, so turning them on is a production change only Marc can make. This round did not check Vercel's cron frequency limits. The earlier research's position, that `pg_cron` calling out every minute makes the Vercel plan irrelevant, stands.

**3. The push-type list is pinned in three places, and reminders were deliberately excluded.** `PUSH_TYPES = ['event_invite', 'direct_message', 'supply_request']` is asserted literally by privacy test T. The client's `NOTIF_INAPP_TYPES` list is asserted by the empty-state suite, and the client keeps matching lists in `logic.js` ([api/notify.js L54-59](/home/user/sarno/SarnoPWA/api/notify.js); [privacy.test.mjs L1157-1166](/home/user/sarno/SarnoPWA/tools/privacy.test.mjs); [emptystate.test.mjs L2556-2559](/home/user/sarno/SarnoPWA/tools/emptystate.test.mjs)). Sarno's push policy says a push happens only when "somebody deliberately chose YOU", and Smart Add's plan states "Reminders do not push and do not notify" ([CLAUDE.md L342-373](/home/user/sarno/SarnoPWA/CLAUDE.md); [roundD L65-66](/home/user/sarno/SarnoPWA/planning/roundD-smart-add.md)). The database already allows a `reminder_due` type with a null actor, and the client planner has an owner-only `reminder_due` branch ([0003 L125-153](/home/user/sarno/SarnoPWA/supabase/migrations/0003_notifications.sql); [src/logic.js L789-796](/home/user/sarno/SarnoPWA/src/logic.js)). So the plumbing is half there, but making reminders push is a policy reversal. All three lists and the policy text must change together, as Round M did.

**4. Reminder text on the lock screen conflicts with Sarno's own payload rule.** The existing `reminder_due` plan puts up to 140 characters of reminder text in the body. Meanwhile `push-sw.js` states that payloads keep "child names, addresses and schedule logistics out" ([src/logic.js L795](/home/user/sarno/SarnoPWA/src/logic.js); [public/push-sw.js L14-20](/home/user/sarno/SarnoPWA/public/push-sw.js)). The ADHD design depends on the first step being visible on the lock screen. So Marc must choose between step text by default (with a discreet switch) and discreet text by default. The system-written parts of the copy should never name children or places either way.

**5. The deep-link list has a live bug, and every new screen inherits the trap.** `DEEP_TABS()` accepts `mypage`. But the My Page screen renders on `tab === 'kids'`, so a probe of `handleNotificationClick('/?tab=mypage')` sets a tab for which no screen renders ([src/logic.js L373-417, L9576](/home/user/sarno/SarnoPWA/src/logic.js)). The probe ran in demo mode in a scratch copy, not on a device. Any new `now` target must be added to `DEEP_TABS()` *and* mapped to a real `tab` value. The `mypage` fix is a one-line change, but it touches shared behaviour, so it belongs in its own flagged commit.

**6. The baselines in Sarno's instructions are stale, and `tokens.py` now rewrites unrelated files.** `CLAUDE.md` tells a new session to stop if any baseline number differs ([CLAUDE.md L21-30, L68](/home/user/sarno/SarnoPWA/CLAUDE.md)). Measured on 2026-10-28 in a scratch copy, every number differs. Verify finds 1,510 bindings, 370 onclick handlers and 341 methods, against a documented 1,402 and 339. The suites report privacy 533 against a documented 489, empty-state 2,119, smart-add 437 and sync 80. The build precaches 55 entries (3,372 KiB), against a documented 49 (about 2,669 KiB). Lint shows 111 warnings. `tokens.py`, documented as idempotent, performs 9 colour merges and edits `markup.html` and `logic.js`. The `ROUND-NOTES.md` header still says no migration has run since 0003. The spec must state these measured numbers up front. It must also tell the session not to run `tokens.py` inside the feature diff, so an unrelated 34-line palette change does not get tangled with the feature.

Four smaller constraints round out the list. `personal_todos` has no time column, by explicit decision ("do not invent a time field to hold 'at 5pm'"). Its RLS admits Yola as a parent, so any column added there exists for her rows too ([roundD L63-74](/home/user/sarno/SarnoPWA/planning/roundD-smart-add.md); [0002 L28-129](/home/user/sarno/SarnoPWA/supabase/migrations/0002_personal_todos.sql)). The app's only clock is a 60-second `tick()`, so a per-second countdown would be a new effectful code path ([src/main.jsx L217-225](/home/user/sarno/SarnoPWA/src/main.jsx)). The sender uses `TTL: 3600` with no `Urgency` or `Topic`, and `push-sw.js` sets `tag` on the assumption that it replaces earlier notifications, which it does not on iOS ([api/notify.js L294-347](/home/user/sarno/SarnoPWA/api/notify.js); [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). And the family-calendar resolution engine (`resolveDay`/`_effDay`) exists only in the browser. Sarno's own planning notes rejected a server re-implementation of it for the calendar feed unless the engine is "first extracted into a shared module like smartadd.js" ([planning/parked-2026-08-28.md L20-28](/home/user/sarno/SarnoPWA/planning/parked-2026-08-28.md)).

### The architecture that resolves them: the phone plans, the server only fires

This design is inference from the code map, not something Sarno has done before. The client, running the pure `focus.js` module, plans Marc's entire future push stream for the next 14 days. It does this on every open, on every return to the foreground, after every decision Marc makes, and after every family-data pull that changes the schedule. It uses the family-calendar engine it already has to work out kid days, drive windows and bedtimes, and it picks rotated wording from Marc's own send log. The result is ready-to-send rows in an owner-only `focus_sends` table: send time, title, body, link, topic, template id and a generation number. Every decision bumps the item's generation, which cancels its old rows. Once a minute, `pg_cron` runs a `SECURITY DEFINER` function. It takes rows that are due, still on the current generation and less than about 20 minutes old. It marks older ones skipped, so there are no catch-up bursts. It inserts the due rows into `notifications` as `reminder_due`, with dedupe key `focus:<send_id>`. Then `pg_net` pokes a new `api/focus-send.js`, authenticated by a shared secret. That endpoint sends pending `reminder_due` rows through the existing `web-push` sender, with `Urgency: high`, a 15–30 minute TTL and `Topic: t<item>`.

The design pays off several times over. The server never needs Marc's time zone or the custody schedule. The service role gains nothing on `personal_todos`, so test S's existing assertion stays true and the new endpoint is simply added to its list. The wording, ladder and window rules exist once, in one tested module. And for a man who forgets to open apps, the pushes keep coming for two weeks without him opening anything. The cost is staleness. If Yola moves a pickup and Marc has not opened Sarno since, his plan still holds the old drive window. The safety net is that iOS Driving Focus silences notifications in the car anyway ([Apple Support](https://support.apple.com/en-au/HT208090)). The last planned push before the 14-day horizon runs out is a neutral "Open Sarno once so reminders keep coming." Whether a `SECURITY DEFINER` function owned by `postgres` can read tables with *forced* RLS depends on role attributes on the hosted project, which the repo cannot show ([codebase map §4 gaps](/home/user/research_notes/ADHD%20feature%20integration%20and%20behaviour/sarno_codebase_map.md)). The session must write verification SQL for Marc to run, and must not assume either way.

## Behaviour spec, part 1: every reminder ends in a decision, never a swipe

The behaviour rests on three findings, established in earlier rounds and confirmed in this one. First, adults with ADHD fail at *forming* plans far more than at recalling them (d = 1.60 against d = 0.03) ([Fuermaier et al. 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/)). Second, in the only study that tested both cue types in the same adults with ADHD, time-based prospective memory was impaired by a large margin while event-based memory was not ([Altgassen et al. 2014](https://archive-ouverte.unige.ch/unige:98251)). A smaller study from the same group found event-based cues can also fail under load, so event cues are better, not immune ([Altgassen et al. 2019](https://bibliographie.ub.uni-mainz.de/en/catalog/publication-148568)). Third, for ADHD users a swiped notification "basically never existed" ([r/ADHD, 2026](https://reddit.sentinel-team.org/posts/1twhie6/snapshots/2026-06-05T21%3A20%3A56.551596Z)). So the push delivers a plan Marc already made, attaches it to a family event where it can, and treats every non-decision as "still pending". **No timing value below has ADHD-specific evidence behind it.** They are defaults taken from practice (Due, Marvin), from general-population interruption research and from inference, and Marc's own logs should replace them after three weeks.

### Item states and what moves them

An item enters the feature when it has a time or an event anchor (`remind_at`, or an anchor such as "after drop-off Thu" that resolves to a time). Undated items never nag on their own. They are candidates for the morning pick. The tier is either **normal** or **starred**. No louder tier exists, because iOS web push cannot ring through silent mode or Focus, and Marc has ruled out paid channels ([earlier WebKit source reading](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)).

| State | Enters when | What Marc sees | Leaves when |
|---|---|---|---|
| Planned | Captured with a time or anchor | Nothing pushes; the item shows on Home's Now card when it is next | Its time arrives → Due |
| Due (ladder running) | `remind_at` reached inside an open window | Rung pushes (below); Now screen shows the first step | Done, Start, Later, Smaller or Drop; or the ladder ends → Carried |
| Started | Tap **Start** | Focus session with end time; remaining rungs cancelled | Session end push → Done / Keep going / Stop here |
| Snoozed | Tap **Later** + a preset | Next push at the chosen clock time; ladder restarts there | Its time arrives → Due |
| Carried | Ladder ended with no decision, or the window closed | One neutral "Moved: …" push at the next suitable window, which starts a fresh ladder | As Due; after the third carry the item stops nagging → Parked |
| Parked | Third carry, or **Fresh start** | Not shown or pushed; offered only as a morning suggestion | Picked in the morning or reopened |
| Done | **Done** | A tick, then the item appears in "Done today"; Undo for 10 s | Final |
| Dropped | **Drop** | "Decided: not doing this. Good call to clear it."; Undo for 10 s | Final |

A **swipe** changes nothing, because the server never learns about it, and the ladder simply continues. A **tap that opens the Now screen without a decision** is Due's "Stop": it does not end the series, and the next rung comes no sooner than 10 minutes after the tap. Each push's link carries a send id, so the app records the tap ([earlier report: Why top ADHD apps work](/home/user/reports/Why%20top%20ADHD%20apps%20work.md)).

### The nag ladder, in minutes

| Rung | When (anchored to `remind_at`) | Tiers | Job of the wording |
|---|---|---|---|
| Pre-warning | T − 10, single, soft | Starred items, and any item whose step involves leaving or a transition | Heads-up only, names the first step that is coming |
| 1 Start | T | All | Task as a verb + first step + time context |
| 2 Step | T + 10 (or tap + 10) | All | First step only, smaller-sounding |
| 3 Time | T + 25 | All | Time cost in calendar terms; offers moving it |
| 4 Choice | T + 45 | Starred only | "Do it, move it, smaller, or drop it?" |
| End | Normal after rung 3, starred after rung 4 | — | Quiet. At the next suitable window, one "Moved" push opens a fresh ladder |

The ladder runs to about five touches over 45 minutes, which matches Due's default series. Each rung is worded differently, because acceptance of a repeated clinical reminder fell about 30% with each extra reminder in one encounter ([Ancker et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)). That is also why the gap after rung 1 is "medium" rather than one or two minutes: a reminder that lands mid-hyperfocus is a break Marc did not choose, and the follow-up must offer a way back in, not repeat the interruption. Hyperfocus is a measurable trait linked to ADHD symptoms (r = 0.53 in one 347-adult sample), but nothing can detect it from a web app ([Hupfeld et al. 2024](https://doaj.org/article/4fafdcea90614363aedc3cc0d95cf462)). The answer is a one-tap "When I surface" snooze, described below.

Several rules apply to every push. Items due within the same five minutes are combined into one push ("2 things now: bins, council email"), because same-tag notifications stack on iOS rather than replace each other. Any two pushes to Marc are at least 3 minutes apart (an inference meant to avoid stacking and Apple's 429 rate-limit response). The app badge is **1** while something is waiting and **0** otherwise, never the size of the backlog. That refines the earlier report's "badge counts what is waiting". The behaviour research found every visible failure count adds a brick to the "wall of awful" ([Life Skills Advocate on Mahan](https://lifeskillsadvocate.com/blog/wall-of-awful/)).

### The Now screen: one step, five one-tap answers

The push opens the Now screen, because iOS web push can carry no buttons. The top line is the day context, given as time remaining until the next fixed family event, not as a clock: "Kid day · 42 min until you leave for pickup". This is Barkley's advice to make time physical at the point of performance ([Barkley clinic blog](https://neuropsychologyclinicadhdlab.blogspot.com/2010/09/nearsighted-to-future.html)). Below it, the first step appears in large type, with the task name small underneath. The full scope of the task never appears. Five actions follow, each one tap.

**Start** (the orange commit button) records "started X at 14:05", cancels the remaining rungs and opens a focus session. **Done** asks one question when the item has more than one step: "That's the hard part. Keep going, or stop here?" "Stop here" counts as a success. It records the step as done and offers the next window for the next bit. This rewards starting, given the steep delay discounting measured in ADHD ([Jackson & MacKillop 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5049699)). **Later** opens a sheet of presets, and each preset shows the clock time it lands on. **Make it smaller** asks Claude, through a new `shrink` intent beside Smart Add, to break *only this step* one level down. The screen then shows the single new step and Start, with no editor. That puts a cap on planning as a form of avoidance. Offline, it falls back to three generic shrinkers ("Just open it", "Just put it where you'll see it", "Just 2 minutes"). This follows Solanto's clinical rule, "If you're having trouble getting started, then the first step is too big," which comes from a programme that beat supportive therapy in an 88-adult RCT ([ADDitude on Solanto](https://www.additudemag.com/cognitive-behavioral-therapy-for-adult-adhd/); [Solanto et al. 2010](https://psychiatryonline.org/doi/abs/10.1176/appi.ajp.2009.09081123)). The rule itself was not tested on its own. **Drop** sits low on the screen but is never hidden. A good first step is a verb plus an object Marc can touch, doable where he is in about two minutes, with no decision inside it and a visible finish ("open the council email", not "decide about the council").

The **Later** presets depend on the day. "+10 min · 3:12" is offered only as "I'm about to". "When I surface · 3:47" is +45 minutes, for hyperfocus. Then come "After pickup · 4:30" (the next family transition), "Tonight after bedtime · 8:15" on kid days or "This evening · 7:00" on kid-free days, and "Tomorrow after drop-off · 9:40". A snooze sets a new anchor, and the ladder restarts from rung 1. **After the second snooze of the same item, the Now screen leads with "Make it smaller?"**, because repeated deferral marks an item as too big or unclear, not a missing ring ([Sarrafzadeh et al. 2019](https://arxiv.org/pdf/1901.04375)). A small "Busy until…" control holds every push until a chosen time. It exists because work meetings are not in Sarno's family calendar.

### Wording: name the step, the time and an exit

Titles stay under about 40 characters and start with a verb or a time. Bodies carry the first step, its minutes and a time context. Each rung needs at least five variants, rotated so that no variant is reused on the same rung within 14 days. This follows Duolingo's measured finding that reusing the last template did worse than picking at random ([Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)). Certain wording is banned outright: "overdue", "late", "missed", "still", "again", "you haven't", "last chance", "don't forget", "Reminder", any count of items above one, any streak, and any line about Marc's absence. Self-forgiveness after one lapse predicted less procrastination before the next, and adults with ADHD report lower self-compassion, partly because of criticism from others ([Wohl et al. via BPS](https://bps.org.uk/research-digest/cure-procrastination-forgive-yourself); [Beaton et al. 2020](https://eprints.whiterose.ac.uk/165039)). Phrases the system writes itself say "pickup", "the kids" and "the other house", never a child's name or an address. Discreet mode replaces every title with "Your next thing is ready" and every body with "Open Sarno for the first step."

| Moment | Title (examples to seed the pool) | Body |
|---|---|---|
| Pre-warning | "In 10 min: council email" | "Heads-up only. First bit will be: open it." |
| Rung 1 | "Start: council email" · "Council email, now's the slot" | "First bit: open the council email. 2 min · 40 min till pickup." |
| Rung 2 | "Just open the council email" · "One tap: open the email" | "Nothing else yet. 2 minutes." · "Step 1 only. Decide the rest later." |
| Rung 3 | "35 min till pickup" · "Before pickup, or tonight?" | "Council email fits before you leave. Or move it to tonight." |
| Rung 4 | "Do it, move it, or drop it?" · "Your call on the council email" | "Any answer clears it." · "Now, later, smaller or not at all." |
| Carried | "Moved: council email" | "New slot: after drop-off. First bit: open it." |
| Morning, kid-free | "Today's one thing?" | "Kid-free day, 6 hours open. Suggest: council email." |
| Morning, kid day | "One thing for after drop-off?" | "Suggest: council email. Tap to keep or swap." |
| Focus end | "15 min up" | "Still on it, done, or stop here? All fine." |
| After a gap | "Pick one for today: council email?" | "Just that. The rest can wait." |
| Evening | "Anything for tomorrow after drop-off?" | "One line is plenty. That's all for today." |

## Behaviour spec, part 2: the family calendar decides when a push may land

No study found addresses scheduling tasks around a co-parenting rotation for a parent with ADHD, or ADHD fathers specifically. What does exist points one way. A 2023 review states that "parental ADHD symptoms have been reported to be the strongest predictor of parenting stress", even after controlling for the child's symptoms ([Frontiers in Psychiatry 2023](https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1321078/pdf)). Interruptions cost least at coarse breakpoints between activities ([Iqbal & Bailey, CHI 2008](https://www.interruptions.net/literature/Iqbal-CHI08.pdf)). So kid days are low-capacity days, transitions are the best cues, and the drive and solo-parenting blocks are when pushes wait. Everything in this section is inference built on that evidence.

### Day types, windows and blocks

The client works out each day's type from Sarno's own schedule. On a **kid day**, the kids are with Marc for the after-school or overnight block. On a **kid-free day**, they are not. A **handover day** is when they move between houses. The client then marks each day's time as open or held, using the rules in the table.

| Block | Rule | Pushes inside it |
|---|---|---|
| Quiet hours | Default 22:00–07:30 (Marc sets these) | None; queued to the window's opening, never dropped |
| Drive window | 15 min before a pickup, drop-off or activity drive that Marc is doing, until arrival + 5 min | None; the ladder pauses and resumes at arrival with "Back from pickup?" wording. A push that would have fallen inside never counts as a rung |
| With the kids | Kid day, from pickup until bedtime | Only items tagged "fine with kids" (school forms, kid admin); everything else is held |
| Open, kid day | After drop-off until 15 min before pickup; post-bedtime (+15 min) until quiet hours | Normal; post-bedtime gets only items estimated at 15 min or less |
| Open, kid-free day | Everything outside quiet hours and "Busy until" | Normal |

Driving gets the strictest rule for safety. Driving Focus can switch on automatically from motion or car Bluetooth and silences notifications. Apple does not document whether held web pushes appear afterwards, and users report them arriving in a batch ([Apple Support](https://support.apple.com/en-au/HT208090); [Apple Discussions](https://discussions.apple.com/thread/255945559)). If Marc opts in, a **leave-for-pickup warning** ("Leave for pickup in 10") fires before each drive he is doing. It is the one time-based family event where his weakest kind of memory meets a deadline that cannot move. Event anchors such as "after drop-off" become computed times: the end of the drop-off event plus 10 minutes. The wording names the event, because a web app cannot sense arrival in the background ([codebase map; Altgassen 2014](https://archive-ouverte.unige.ch/unige:98251)). If the event moves, the item moves with it the next time the client replans.

### Daily structure: one thing in the morning, nothing to review at night

Safren's CBT programme (53% against 23% responders) is built on a single calendar and task list checked daily. Organisational strategies roughly doubled the odds of response across 43 trials ([Safren et al. 2010](https://anhoriga.se/Artiklar-och-rapporter/2010/cognitive-behavioral-therapy-vs-relaxation-with-educational-support-for-medication-treated-adults-with-adhd-and-persistent-symptoms-a-randomized-controlled-trial); [Matsumoto et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683884/)). Because Marc forgets to open apps, the daily check has to come to him and take less than a minute. The **morning prompt** fires once. On kid days it comes 10 minutes after drop-off ends; on kid-free days, at his chosen time. It opens the Now screen with the day's shape and one suggested item, and one tap keeps it. A single follow-up at +30 minutes says "Picked one for you: …". If he never answers, the plan goes ahead as it stands. Planning is never a gate. The **daily budget**, which shapes suggestions and capture warnings, is 1 must-do plus up to 2 more on kid days and up to 3–5 on kid-free days. That sits at the low end of the 2–5 range practitioners recommend ([Adult ADHD Tool Kit summary](https://divergent-tabletop-wiki.pages.dev/3-ND-Resources/2-Books--and--Papers-Summaries/ADHD/The-Adult-ADHD-Tool-Kit---Using-CBT-to-Facilitate-Coping-Inside-and-Out)). When a kid day is already full, capture *proposes* the next kid-free slot instead of moving anything silently. The **evening prompt** is a single capture-only push, after bedtime on kid days and at about 21:00 otherwise. It never lists what was missed. A **weekly reset** comes about an hour after the evening the kids go to the other house. Each of these anchor prompts gets at most one follow-up, so the day frame adds 3–5 pushes, and item ladders add the rest. That fits "as many as useful": the evidence found similar compliance at 3, 6, 9 or 12 prompts a day, and named sameness, not volume, as the problem ([Wrzus & Neubauer](https://heibib.ub.uni-heidelberg.de/search/Record/1839595345)).

### Missed tasks and recovery move without asking

An item that reaches the end of its ladder, or whose window closes, is **carried automatically** to the next suitable window, with one neutral "Moved" push. The original date stays only in history. This settles a tension between two earlier findings. Recovery must not depend on Marc answering a prompt (Structured's lesson), yet silent reshuffling can feel like losing control (Motion's lesson). The move is automatic, announced and undoable, while capture-time overflow is only proposed. After three carries, the item is **Parked**. After **48 hours with no open and no tap**, the server suppresses item ladders and sends only the anchor prompts, each naming one item and none mentioning the gap. This is a deliberate trade against "as many as possible". When Marc is ignoring everything, more pushes buy habituation, not starts. Marc must approve it. **Fresh start** is one tap on the Now screen or the morning prompt. It parks everything except one chosen item and the must-dos. **Pause for N days** stops every push and resumes by itself with one plain note. Nothing piles up while it runs. The Done list rewards what happened and never counts consecutive days.

### Focus sessions: a declared start, an end time and a check-in

Body doubling has qualitative support, and one 12-person VR study found that an AI co-worker helped as much as a human one. Controlled evidence is thin, and one study found no effect ([Eagle & Ringland 2024](https://doi.org/10.1145/3689648); [arXiv 2509.12153](https://arxiv.org/html/2509.12153v1)). Software can stand in for the "hello, here's my task, goodbye" loop. It cannot stand in for being watched. **Start** declares the task and opens a session whose length defaults to the step's estimate, or 15 minutes, with options of 5, 15, 25 and 45. The screen shows "**ends 14:30 · 18 min left**", updated by the existing 60-second tick, instead of a per-second countdown. That avoids a new timer path in Sarno and the time-anxiety some ADHD users report with ticking timers ([Super Productivity blog](https://super-productivity.com/blog/adhd-time-blindness-strategies/)). At Start, the client plans an end push and two follow-ups at +5 and +10 minutes, then stops ("15 min up. Still on it, done, or stop here? All fine."). The goodbye logs what happened, with no score. Routines (a step player for the basics) are deferred until the core loop has survived three weeks.

## Five build phases replace the earlier four rounds

The earlier handoff proposed four rounds: an engine first, then screens, then Smart Add, then focus. This round changes that order in three ways. The engine cannot ship before the Now screen, because a push that lands on a list (or on a blank `?tab=mypage`-style target) fails the core lesson that reminders bring adults with ADHD back faster but do not, on their own, raise completion ([Nordby et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9149073/)). The server becomes a thin "fire" step instead of the brain. And decisions and baselines come first.

| Phase | Contents | Marc's gate |
|---|---|---|
| 0 Decide & baseline | Marc answers the decision table; session records measured baselines; optional separate commits for the `mypage` fix and a reviewed `tokens.py` run | Decisions signed off |
| 1 Contract, no UI | `src/focus.js` (ladder, windows, presets, wording picker, batching, generations) + node tests under the fixed clock with DST dates added; migration 0008 written (not run); privacy pins; `backend.js` CRUD gated owner-only | Marc reads the contract and the wording bank |
| 2 Screens + capture | Now screen, Later/Smaller/Focus sheets, Home "Now" card, delivery-status and phone-settings checklist, `remind_at`/anchor/first step in the reminder sheet; client planner writing `focus_sends`; push still off | Marc tries it in demo mode / preview |
| 3 Fire | Migration 0009 (pg_cron job + definer function), `api/focus-send.js`, push-policy change across all three pinned lists, declarative-vs-SW payload per device test, heartbeat status | Marc enables extensions, runs 0008 then 0009, sets the secret, device-tests, then promotes |
| 4 Smart Add plans | Contract fields `remindAt`, `anchor`, `firstStep`, `tier`; rule 11 relaxed; `shrink` intent; validator, summary, apply and tests | Contract approval as in Round D |

Phases 1–3 ship as one release, in Sarno's order: run the migration first, then deploy. A `FOCUS_ENABLED()` switch, following the `PAYMENTS_ENABLED()` pattern, keeps the code dark until the cron job and secret exist ([CLAUDE.md L906-914, L979-1015](/home/user/sarno/SarnoPWA/CLAUDE.md)).

### Decisions Marc must make before the session starts

| # | Decision | Recommendation |
|---|---|---|
| 1 | Build path: spec here, phased build by an in-repo session | Yes |
| 2 | Give that session push access to a working branch (currently read-only) | Yes, branch only; no `main` |
| 3 | Enable `pg_cron` and `pg_net` on the production Supabase project | Yes; it is the only free scheduler found |
| 4 | Privacy model: phone plans, definer function fires (no service-role grant on `personal_todos`), versus a server that reads reminders | Phone plans; record the narrowed 0004 principle in `CLAUDE.md` |
| 5 | Reverse the push policy so `reminder_due` pushes, for the owner only | Yes |
| 6 | Lock-screen text: step text by default with a discreet switch, or discreet by default | Step text, with system wording never naming children or places |
| 7 | Yola: add `remind_at`/`first_step` columns to the shared `personal_todos` (hidden in her UI) and keep all ladder machinery in owner-only tables | Yes; owner-only enforced at database level via `member_role(household_id)='owner'` |
| 8 | Entry point: Home "Now" card plus a `now` deep-link screen, versus a new nav tab | Home card; the nav row is shared |
| 9 | Payload: declarative `web_push: 8030`, or the existing service-worker path | Decide after the device test on tap behaviour while the app is open |
| 10 | Quieter mode after 48 h with no opens | Yes |
| 11 | Leave-for-pickup warnings | Yes, opt-in |
| 12 | Use the existing Anthropic key for "Make it smaller" calls | Yes, with the offline fallback |
| 13 | Fix `?tab=mypage` in a separate commit on the same branch | Yes |
| 14 | `tokens.py` drift: review its 9 merges separately, or leave untouched | Leave untouched in this work |
| 15 | Must-not-miss items: accept banner-only reach, or set one Clock alarm himself | His call; the UI says plainly that Sarno cannot ring through silent mode |
| 16 | Quiet hours, kid-free morning time, default focus length | Defaults 22:00–07:30, 09:00, 15 min |

## The handoff spec the in-repo session receives

The spec should be one document, placed under `SarnoPWA/planning/` the way earlier briefs were, with the following sections.

| § | Section | Key contents |
|---|---|---|
| 1 | Purpose and promise | "When Marc gives a task a time, Sarno brings its first step then, comes back in different words until he decides, and never goes quiet without saying so." Marc only; Yola and sitters see no change. Recommended model and effort, as in earlier briefs |
| 2 | Rules and session ritual | Read `CLAUDE.md`; re-run `test:all`, lint and build and record numbers, with the 2026-10-28 measurements pre-stated as expected; do not run `tokens.py`; branch from `origin/main`; no deploy, push to `main`, SQL or real keys; report every command; name the test behind every claim; grep before naming (trap 2); file-editing tools, not heredocs |
| 3 | Marc's decisions | The decision table above, with his answers |
| 4 | Scope fence | No changes to `family_data`, sync semantics, existing push types, the sleep and privacy gates, or other people's notifications; no new `family_data` keys or `PERSISTED_KEYS` for private data |
| 5 | Architecture | Phone plans, server fires; data flow diagram; the generation and staleness rules; 14-day horizon and tail push; failure modes (stale schedule, dead subscription) |
| 6 | Data: migrations 0008 and 0009 | 0008: `personal_todos` gains `remind_at timestamptz` and `first_step text` (additive; client selects explicit columns); owner-only tables `focus_prefs`, `focus_state` (tier, state, anchor, generation, snooze and carry counts, started time), `focus_sends` (send time, title, body, link, topic, template id, generation, status, sent and tapped times), `focus_log`; forced RLS with `user_id = auth.uid() and member_role(household_id) = 'owner'`; explicit revokes and grants; WHY / SECURITY IDENTITY headers; verification SQL. 0009: the `pg_cron` schedule and the definer function, run only after Marc enables the extensions, plus SQL that proves the function can read the forced-RLS tables |
| 7 | Gate | One predicate, `canUseFocus()`: live means membership role `owner` and not in View-As; demo means `_realUser()==='marc'`. Checked at the Home card, deep link, writers and `renderVals`, mirrored by the endpoint and the database |
| 8 | Pure module `src/focus.js` | Signatures with injected `now`: `planSends(items, windows, prefs, log, now)`, `applyDecision(state, decision, now)`, `laterPresets(now, windows)`, `dayWindows(resolvedDay, prefs)`, `pickTemplate(rung, history, rand)`, `batchSends(sends)`; no React, no fetch |
| 9 | Behaviour spec | This report's parts 1 and 2 verbatim: state table, ladder table, Now actions, presets, wording rules and the bank of at least 5 variants per rung, window table, daily frame, recovery, focus sessions |
| 10 | Server | `api/focus-send.js` (shared-secret auth, `dbAsAdmin` only on `notifications` and `push_subscriptions`, `Urgency: high`, TTL 900–1800, `Topic`, back off on 429, fixed error enums); `PUSH_TYPES`, `NOTIF_*` lists and tests T and empty-state changed together; push-policy text in `CLAUDE.md`; `deepLink` for `reminder` → `/?tab=now&n=<send>` |
| 11 | UI | `now` tab block and sheets in `markup.html`, regenerated; flags in `_allClosed()`; `...this.nowVals()` spread with every binding defined in every state and `x`/`notX` pairs; `DEEP_TABS` plus a mapping to a real tab; Phosphor icons; palette discipline (new hexes into `PROTECTED`); orange = commit; the "Private to your account" sheet pattern; minute-resolution session display |
| 12 | Heartbeat and setup checklist | Extend `_reconcilePushOnBoot()`; "Reminders on · last delivered 14:02" from `push_subscriptions` non-secret columns; tap receipts; the phone-settings checklist (Persistent banners, Sarno allowed in every Focus, Immediate delivery, Watch mirroring), marked confirmed or self-reported |
| 13 | Smart Add (phase 4) | Contract and tool-schema fields, rule 11 rewrite, `saValidate`, `saSummary`, `smartAddVals`, `saApply` → `_createTodo` signature, the `shrink` intent; "proposes, never writes" kept |
| 14 | Tests | Pure-module tests in `test:all` and the sweep's clock-sensitive list, with 2026-11-01 and 2027-03-14 DST dates added; empty-state pins that assert surfaces exist (trap 13); privacy pins for 0008/0009 policy text, owner-only refusals (Yola and sitters send no request), no secrets, the new S-section endpoint and grants; smoke walk of `now` and its sheets; negative controls |
| 15 | Device test script for Marc | Delivery under each Focus and in Low Power Mode; Driving Focus hold and release; declarative tap with the app open and closed; whether `getNotifications` sees declarative notifications; Watch mirroring; whether Banner Style appears; a 14-day horizon tail push |
| 16 | Release and run order | 0008 → deploy with `FOCUS_ENABLED()` off → enable extensions → 0009 + secret → device tests → switch on; content-marker check, not bundle name |
| 17 | Report back | Changed files, verification table, commands run, what is unverified, and `CLAUDE.md` OUTSTANDING and `ROUND-NOTES` entries |

## What remains unknown

Several gaps could change the build, and the spec should list them as open rather than settled. On the **platform**: whether `pg_cron`/`pg_net` are actually enabled, and whether a definer function can read forced-RLS tables on the hosted project; how the `pg_net` call's secret is stored (Vault or config); whether 0003 and 0004 were ever applied (implied, not recorded); Vercel's cron limits (not checked this round); and whether a free Supabase project can pause, which would stop the scheduler silently. On **Sarno's data**: exactly how the schedule engine represents "kids at Marc's", bedtimes, and which drives Marc himself is doing. The code map did not trace `resolveDay` far enough to say whether the drive and with-kids blocks can be derived without new data entry. Also open: whether two of Marc's devices planning at once need a plan version to avoid overwriting each other, and what `renderVals()` costs on an older iPhone. On **iOS**: every item in the device-test script above, especially whether a declarative tap reaches an already-open app and whether pushes held by Driving Focus arrive afterwards. On **the evidence**: no peer-reviewed source gives an ADHD-specific nag interval, pre-warning lead time, daily task budget or post-bedtime capacity. No randomised trial of implementation intentions in adults with ADHD was found ([APSARD](https://apsard.org/?p=4314)). No research on co-parenting rotations and parental ADHD task scheduling was found. Marc's own `focus_log` is the only way any of these numbers gets better than a guess.

## Conclusion

This round's main correction is architectural, not behavioural. The earlier plan put the intelligence on the server, which is how commercial reminder apps work. Sarno's history pulls the other way: its privacy rules, its single browser-side calendar engine and its one-implementation principle all favour a client that plans and a server that only fires. That design is also better for Marc specifically. Every push is computed while he is looking at his real family week, and it keeps arriving for two weeks even if he never opens the app. The spec is therefore the product of this session. The code belongs to a session that can run Sarno's 2,000-plus pinned tests.

The behavioural research adds a second correction. The earlier designs measured persistence in pushes per task. The moment-to-moment evidence measures it in *chances to start*: a step shown at the right moment, moved without blame when the moment is wrong, and never fired into a drive or a bath. On that view, the most valuable rules in the spec are the ones that hold a push back (windows, carry-over, the badge capped at 1, the 48-hour quiet mode), not the ones that add more.

---

# Document: Why top ADHD apps work

# Each great ADHD app lifts one burden

The strongest apps for adults with ADHD are great for one reason each: **each one permanently takes over a single executive job the user cannot do reliably**, and does that job without being asked. Due and the iPhone's Clock alarms and Urgent reminders take over *remembering*. They refuse to be dismissed until the user makes a real decision. Goblin Tools takes over *planning the first step*. Routinery takes over *deciding what comes next and how long it takes*. Structured takes over *seeing time*. Finch takes over *wanting to do the boring basics*. Users explain each mechanism in plain words: "I can reliably ignore my watch… knowing that I will be notified in another five minutes"; "not having to spend executive function points on breaking down the task… is a lifesaver"; "your past self who created the routine removes the decision fatigue". Each app fails in the same few ways. It stops reaching the user (Goblin and Finch are forgotten within days), it stops silently (Due's capped repeats, Structured alerts that die after a week), it gets too loud or too long (Routinery's 2 a.m. voice, Goblin's 42-step lists), it punishes (Finch's sad bird), or it breaks trust (lost lists, removed features, surprise paywalls). For Marc's private feature in Sarno, almost all of the strengths can be rebuilt. They live in server logic and in the one screen a push opens, not in the alarm. One cannot be rebuilt: **an iOS web push can never ring through the ring switch or a Focus**, so loudness must come from Marc's phone settings or not at all. Marc will not pay or use other apps, so Pushover, which the earlier research recommended for alarm-grade escalation, is off the table. That leaves "nag by changing the words, never by repeating them" as the main lever. This pass also corrects the earlier reports in several places. Due's repeats run on a fixed clock anchored to the due time; only Prominent alarms count from the user's response. Structured never rejected snooze; it simply has not built it. Notification tags do not collapse on iOS.

## Six apps, six jobs moved off the user's brain

Each app solves a different ADHD weakness, so it helps to see the six side by side before going app by app. The pattern behind them is consistent. Each app makes a decision ahead of time, so the user does not have to make it in the moment, and each delivers its help without waiting to be opened. Where an app does not come to the user, users report forgetting it exists. Goblin users say "I *sometimes remember* that I have Goblin Tools" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json)). The top reply in a Finch thread is "after 2 days I completely forgot about it" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1r45z19/)).

| App | Job it takes over | Core mechanism | Users' own reason it works | Where it breaks | What Sarno takes from it |
|---|---|---|---|---|---|
| **Due** | Remembering, and not letting go | Every item has a time; Auto Snooze repeats until Done, reschedule or snooze; snoozing is as cheap as completing | "I need to be reminded of my reminders… until the task is done" | Repeats stop silently; devices drift; "done to shut it up"; buzz storms | The state machine, snooze-to-a-meaningful-time, short must-do list |
| **Clock + Urgent reminders** | Remembering at a time, at alarm volume | Rings through silent mode and Focus until Stop or Snooze; Snooze repeats automatically | Urgent is "even better than what you get with Due" | Snoozed forever; alarm fatigue; backlog | Labels that name the action, a forced decision, an urgent budget. Not the ring |
| **Goblin Tools** | Planning the first step | One tap turns a title into steps; a chili scale sets how many; any step can be broken down again | "It's like being told but without the perceived demand avoidance" | Too many steps; generic steps; data loss; never reminds | Claude breakdown, first step only, push the step |
| **Routinery** | Deciding what's next and how long | One timed step full-screen, live "ready at" time, voice, nag on overrun; a start nag that stops only when you start | "I just need to decide to start the routine, the rest is decided" | Loud, unsilenceable nags; timer anxiety; lost routines | Start nag with limits, one-step player, overrun pushes |
| **Structured** | Seeing time | One vertical day; duration is height; a moving now-line; start and end alerts; shame-free rescheduling | "I am visually able to see all the time in my day" | Entry friction; missed tasks vanish unless triaged; no nagging | Now-line and gaps, start/end cues, automatic carry-over |
| **Finch** | Wanting to do the basics | Tiny goals feed a pet that goes on an adventure and comes back later; rewards only | "Doing for someone else? No problem. Doing for self? No possibility" | Guilt; notification volume; gaming rewards; "infantile" | Easy wins, two reward moments, pause, no streaks. No pet |

## Why each app works, and where it breaks

### Due nags on a fixed clock until Marc decides

Due's developer built it for himself in 2010 to "quickly capture *what* needs to be done, and *when*". He added Auto Snooze when he "realized it was easy to miss notifications". He embraces the result: "'Annoying' is probably not a word a developer would like his app to be associated with… I certainly don't mind" ([MacStories, sponsored post by the developer](https://www.macstories.net/sponsored/i-made-the-most-annoying-app-and-people-loved-it-sponsor/)). The mechanism is a small state machine. **Every reminder must have a due time**; undated to-dos are not supported ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/204235295-Can-I-create-todos-without-alerts-or-due-date)). At the due time it fires. If the user does not act, it re-fires every 1, 5, 10, 15, 30 or 60 minutes. It does this **5 times by default and up to 10**, and re-arms "indefinitely" whenever the user opens Due or acts on any of its notifications ([App Store description](https://itunes.apple.com/lookup?id=390017969&country=us)). It stops only when the reminder is marked done, rescheduled or snoozed, or when auto snooze is switched off for that item ([Due for Mac Help](https://www.dueapp.com/support/osx/fine-tuning-reminders.html)). The cadence is **anchored to the due time**, not to the user's last action. In the developer's own bug write-up, a reminder due at 9:10 with 5-minute auto snooze produced "three notifications… at once at 9:20", meaning the 9:10, 9:15 and 9:20 slots ([Due App Diary, 2016](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8)). A user describes the same thing for timers: "notified at 31 min, 32 min, 33 min" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)). The one exception is the **Prominent** alarm tier. It "keeps sounding until you attend to it, so its Auto Snooze interval only starts counting once you do" ([Due Help: alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)). Stopping a Prominent alarm is not marking it done: it "fire[s] again at the next Auto Snooze interval" ([Due Help: Prominent](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793-Use-Prominent-Alerts)).

The second half of the design is that **postponing is as cheap as completing**. The expanded notification shows Mark Done plus three one-tap snoozes, which default to **+1 hour, +3 hours and +1 day** ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761-Mark-a-reminder-done-or-snooze-it-from-a-notification)). The developer explains why short snoozes are a trap. He moved his first option from +1 hour to +3 hours because "if I cannot, or do not want to, act on a reminder right now, it's unlikely for me to be able to do so in an hour's time". His other two presets were "10:30 AM" for the next morning and "10:30 PM" for "before the end of today", so that he would have "to launch Due less often" ([More Snooze, Less Due](https://medium.com/due-app-diary/more-snooze-less-due-fbc12a2cf8ad)). Capture follows the same speed-first logic. Typing "Dentist 3p Thu" underlines the date and turns the first button into **Set to "Thu 3pm"**. Parsing never applies silently, and a **Keep** button restores the words ([Due Help: date parsing](https://dueapp.zendesk.com/hc/en-us/articles/203530719-Type-the-date-as-part-of-the-reminder-natural-date-parsing)). Due also reframes what a reminder is for: "Prepare for meeting" at 3pm, not "Meeting" at 4pm ([Due Help: pre-alerts](https://dueapp.zendesk.com/hc/en-us/articles/204235285-Can-I-setup-pre-alerts-before-due-time)). Recurring items can repeat from the due date or from completion, and postponing one occurrence keeps the pattern ([Due Help: repeat](https://dueapp.zendesk.com/hc/en-us/articles/203530769-Repeat-a-reminder-daily-weekly-monthly-on-certain-days-or-after-you-complete-it)).

ADHD reviewers say the repeat catches exactly the gap they fall into. "Just now, I got a reminder to take my medication. I went into the bathroom, got distracted, and forgot my med. Due reminded me again so I got back up and took it." "When I am hyper focused I may not even notice a reminder go off… Now I can get alerts 4+ times realize I'm not going to do it right now, and then immediately reschedule." Users also describe how persistence lowers anxiety: "I can reliably ignore my watches alerting me, knowing that I will be notified in another five minutes." And they describe snoozing as a decision: "If I push something into the future I have to make a constant choice, which is a very healthy way of deciding what to do at a given moment." The deepest reason is trust. Reminder apps "are only worth it if you can FULLY TRUST that once you put it in the app, it WILL remind you… It's like telling a close trusted friend 'hey, can you call me on Tuesday'" (all from [App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)). Experienced users keep the scope narrow. They use Due "for anything I ABSOLUTELY CANNOT AFFORD TO FORGET", or keep "only time-sensitive reminders" so they are not "becoming desensitized". The developer gives the same advice: keep the loud tiers "for the reminders that genuinely need them" ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)).

Due breaks in five ways, and each one teaches Sarno something. **Silent stops** are the worst: "I randomly stop getting notifications until I open the app again… I keep forgetting to take meds." The finite 5-to-10 burst is almost certainly a side effect of iOS local notifications. After iOS 10 the app had to pre-schedule discrete alerts, and an app that is never opened cannot add more ([Due App Diary](https://medium.com/due-app-diary/preliminary-findings-on-notifications-randomly-not-firing-in-ios-10-6df649f9a969)). **Cross-device drift** means a reminder cleared on the phone "will still ding every 5 minutes on your iPad". **Buzz storms** happen when five reminders due at 9 AM buzz the Watch "5 separate times". **Dishonest completion** is the price of persistence: the app "will force you to face up and lie about the reminder you didn't do and you checked it off", and one user admits "Do I become numb to the alerts sure". **No undo** costs data: "I have hit the 'complete' check mark… by accident. Then the whole reminder is gone" (all from [App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)). Even Due does not beat hyperfocus every time: "sometimes i completely miss its alarms because i'm hyper-focused… very true when i am emotional" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1khtf1d/hardwired_highreliability_system_to_check_1_daily/)). A server-run system fixes the first two outright, because the server owns the schedule and every device's state. It can fix the third by sending one combined push instead of five. It cannot copy Due's Critical and Prominent tiers. A web push cannot break through Silent mode or Focus, ring continuously, or take over the screen.

### iPhone Clock alarms and Urgent reminders turn a time into an event

The built-ins work because an alarm is a different kind of object from a notification. Apple states that "Do Not Disturb, the Ring/Silent switch, and Silent mode don't affect the alarm sound" ([Apple Support](https://support.apple.com/en-us/118444)). An alarm keeps sounding until the user chooses Stop or Snooze, and Snooze brings it back automatically. Without Snooze it "will only sound once" ([Apple Community](https://discussions.apple.com/thread/255144678)). A banner arrives once and allows a third outcome, never noticing it, which is where most reminders die. The cognitive research explains why this matters for ADHD. In a study of 25 adults with ADHD against 25 controls, the ADHD group was markedly impaired at **time-based** prospective memory (remembering at a given time with no cue) but showed no difference at **event-based** prospective memory, where something in the world triggers the intention ([task-dissociation study](https://metatoc.com/papers/2052-task-dissociation-in-prospective-memory-performance-in-individuals-with-adhd)). Adults with ADHD also carried out fewer of their own real-life intentions in a 2018 study of 29 patients ([Springer](https://link.springer.com/article/10.1007/s12402-018-0273-x)). An alarm converts the weak kind of memory task into the strong kind: the alarm *is* the event. One r/ADHD user worked this out from the research and concluded that widgets fail for the same reason: "you have to spontaneously generate the thought 'check the list' out of nowhere" ([r/ADHD](https://reddit.com/comments/1x5reha/_/pgp14op)).

iOS 26.2 grafted this onto Reminders. A reminder with a time can be marked **Urgent**, and "Reminders will schedule an alarm when that reminder is due". "Alarms will activate even when your device is silenced or a Focus is on." They ring "only… on the device that Find My uses as your location", and need iCloud Reminders and the Alarms permission ([Apple Support](https://support.apple.com/en-gb/HT205890)). The alarm has Snooze and slide-to-stop. A **Complete for Alarm** setting swaps Snooze for Complete, closing the loop at the moment of the alert ([MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)). iOS 26.4 added an **Urgent smart list**, which 9to5Mac's reviewer describes as an antidote to an overwhelming Today list. He reports a 9-minute snooze and says the feature stopped him forgetting urgent tasks ([9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)). A Mac Power Users member called it "even better than what you get with Due". The same thread found that Urgent could not be set from Shortcuts or the API as of January 2026 ([MPU Talk](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)). So nothing outside the phone, Sarno's server included, can create one for Marc.

ADHD users' own setups show what makes alarms work beyond loudness. They use many alarms as time anchors: "roughly every 2-3 hours at random times… 2:00pm, 4:11pm, 7:24pm… one for 11pm on trash night" ([r/ADHD](https://reddit.com/comments/1x6l54c/_/pgw8opy)). They rename the alarm to the action ([earlier research: r/ADHDers](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllr1tn/)). They tie alarms to transitions such as waking or leaving the house rather than to clock times, because "alarms at fixed times just stopped working" and fixed-time reminders "just get snoozed forever" ([r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1s41s5h/snapshots/2026-03-27T19%3A11%3A28.198901Z)). The failure modes are the mirror image. One user said giving everything the medication-alarm treatment "would just be too disruptive and I'd get alarm fatigue" ([r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1sfzayv/snapshots/2026-04-10T20%3A30%3A07.765544Z)). Another felt "like a hostage in my own house" after setting 10 alarms a day ([earlier research: r/ADHDers](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllqnk2/)). The research supports the users. People habituate quickly to repeated identical warnings, with measurably lower neural activity and fewer eye fixations, while warnings whose appearance changes hold attention longer ([BYU News on Vance et al., MISQ 2018](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications)).

For Sarno, the built-ins set both the bar and the boundary. The bar: they are already on the phone, need no opening and are trusted to fire, so any custom feature starts with a trust deficit and must earn it through reliable delivery. The boundary: of the four properties that make an alarm work, a web push can copy only two. It can carry an action-named label, and the server can make it repeat. It cannot ring through silent or Focus, and it cannot force a Stop-or-Snooze choice on the notification itself, because iOS web pushes carry no buttons. Sarno has to move the decision onto the screen the push opens.

### Goblin Tools plans the first step, then waits to be remembered

Magic ToDo is an ordinary nested list with a wand button. The client sends the task's text, a 1–5 "spiciness" number and the texts of all parent items (`Ancestors`) to the server, and gets back a flat JSON array of steps ([goblin.tools client code](https://goblin.tools/js/todo-base.js)). Spiciness is one global setting with a **default of 2**. The help text frames it as "how hard or stressful you find the task… It's not an exact measure, more a hint" ([goblin.tools/ToDo](https://goblin.tools/ToDo)). Live calls to the same endpoint on 28 October 2026 show what the dial does. "Do my taxes" gave **5 steps at 1 chili, 7 at the default 2, 12–18 at 3 and 42 at 5**. The 42-step version opens with "Find a quiet and comfortable place to work" and closes with "Celebrate completing your taxes responsibly". "Clean the kitchen" went from 7 steps to 36 ([goblin.tools API](https://goblin.tools/ToDo)). Wanding a step replaces only that step's children, and the parent chain goes along as context, so the tool is built for zooming in on the step that is stuck ([goblin.tools/js/todo.js](https://goblin.tools/js/todo.js)). In 2026 the creator added **Taskmaster**, which "walks you through your Magic Todo items one at a time, with a timer" and a 🪄 button "to break down the current task if you're stuck" ([goblin.tools/Taskmaster](https://goblin.tools/Taskmaster)). The creator, Bram De Buyser, keeps the website free with no signup or ads. He sends only the task text to the model, and says requests cannot be linked to a user ([goblin.tools/Privacy](https://goblin.tools/Privacy)). He picks models for instruction-following consistency over raw quality, and treats output that varies from run to run as a feature ([creator on model choice](https://reddit.com/r/AutisticWithADHD/comments/1rzsmuh/my_best_adhd_tips_so_far/obt43wt/); [creator on non-determinism](https://reddit.com/r/AI_Agents/comments/1onijek/who_has_actually_deployed_code_that_uses_llms_in/nmx3kyz/)).

Users explain why it works more precisely than for any other app: the breakdown *is* the executive-function task they cannot do. In the most-upvoted post found (2,045 upvotes), one user wrote: "I have always found the 'tip' of breaking things down into smaller tasks very unhelpful because to me that's the same as doubling my workload… I just cleaned my absolute health hazard of a kitchen in record time" ([r/adhdwomen](https://reddit.com/r/adhdwomen/comments/13oreld/to_whoever_mentioned_goblintools_in_a_comment/)). Others: "It's like being told but without the perceived demand avoidance!!!" ([r/adhdwomen](https://reddit.com/r/adhdwomen/comments/19e3219/first_time_trying_the_ai_goblin_tool_it_was/)). "I struggle with initiation. Having the direction outlined for me allows me to just go!" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json)). The relief comes at the moment of generation: "I can literally feel the tightness in my chest subside as I watch it generate task breakdowns" ([r/ADHD](https://reddit.com/r/ADHD/comments/1awhslj/goblintools_is_amazing/)).

The failures fall into four groups. The first is **too many steps**: "suddenly what was a simple task that you couldn't do now has 18 steps and makes you want to die" ([r/ADHD](https://reddit.com/r/ADHD/comments/1i6103l/goblin_tools_does_it_actually_work/)), and "seeing all the subtasks just makes it worse, i just want the first step" ([r/adhdwomen](https://reddit.com/r/adhdwomen/comments/1fzo31f/either_im_too_dumb_for_goblintools_my_needs_are/)). An AuDHD user found that Taskmaster's real gift was the one-at-a-time view: "I didn't even need the tasks broken down, I just needed that organized method to focus on one thing at a time". They asked for the next tasks to be hidden ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json)). The second is **generic steps**. The model sees only a title, so "go to the library" becomes book-borrowing logistics for a student who wanted to study. That irritated the user enough that "now I don't ever touch it" ([r/adhdwomen](https://reddit.com/r/adhdwomen/comments/1tn8n5h/how_do_you_make_goblin_tools_work_for_you_cant/)). Even at the default level, steps are often abstract ("Organize income and expense information"). The concrete, physical wording users praise ("each of the steps is immediately do-able") mostly appears at high spice or after re-wanding. The third is **data loss**, which hurts most because the list is the user's memory. One user "actually cried" when tasks vanished ([r/adhdwomen](https://reddit.com/r/adhdwomen/comments/1giyhtx/goblin_tools_failed_me/)). Another warned "Do not use it for large, time spanning tasks… Especially if you don't have great working memory" ([App Store reviews p.2](https://itunes.apple.com/us/rss/customerreviews/page=2/id=6449003064/sortby=mostrecent/json)). The fourth is that **it never comes to you**. Deadlines show as overdue in the list, but the client contains no notification code. The v2.0 release in August 2026 promises widgets and notifications only "some time in the future" ([App Store listing](https://apps.apple.com/us/app/goblin-tools/id6449003064)). The 2026 move to a Pro subscription, including sync that had been free, caused most of the recent one-star reviews. That anger is irrelevant to Marc's build except as a warning about trust.

For Sarno, Goblin is the closest template, because Smart Add already calls Claude and already asks Marc to confirm. The lesson is to keep Goblin's one-tap, judgement-free handoff of planning and fix its four gaps. Sarno should show the first step, not the list. It should break down one step at a time, with the parent chain as context. It should accept one line of optional context, and keep it private. And it should **push the first step to Marc** instead of waiting for him to remember the tool exists.

### Routinery decides everything in advance and nags only when Marc drifts

Routinery turns a routine into a "playlist" of short timed steps. The listing recommends **1–5 minute steps** with a voice that announces what comes next, so the routine can run "while showering or cooking" ([App Store listing](https://apps.apple.com/us/app/routine-planner-habit-tracker/id1450486923)). After a breathing intro that users mention fondly, one step fills the screen with its own countdown, plus a **projected finish time** for the whole routine. Finishing early pulls that time forward: "your end time will go down! This is my biggest motivator — it turns it into a game… It also lets me know if I'm running late, so I can skip over a less important task" ([r/ADHD](https://reddit.com/r/ADHD/comments/1bei4v7/the_app_that_changed_my_adhd_life/)). By default a step **does not auto-advance** when time runs out. The timer turns red, and the app nudges again at roughly +1, +5 and +10 minutes, by voice or push. One reviewer with MS and depression explains the effect: "It does not let me off the hook… If I'm not doing what I'm supposed to be doing, it is at least a deliberate choice now". Skipping is not punished: "I can skip a part of my routine and it still marks the entire routine as completed… it removes the feeling of missing something and the guilt". At the end, a planned-versus-actual summary shows "how long it ACTUALLY took me" (all from [App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1450486923/sortby=mostrecent/json)). Founder Ian Seo describes the philosophy as "environment-driven habit formation" rather than willpower. He chose a guided sequence over "the traditional checklist style" because "Humans are naturally more focused when we have a set amount of time for a task" ([Ness Labs interview](https://nesslabs.com/routinery-featured-tool)). Growth came after the app "went viral in an ADHD community in the US", and the company describes the app as built "to execute plans, more than just planning" ([KED Global](http://www.kedglobal.com/newsAmp/ked202407110012)).

The reviewer who best explains why it works also names the job it takes over: "People often say 'just start' but it feels like every part of a bigger task needs that decision to start. With this app, I just need to decide to start the routine, the rest is decided." The routine's real hook, though, is getting the user in. The users helped most credit a start reminder that **keeps firing until the routine is opened**: "I have to open the app in order to turn off the push notifications… Hella annoying — but effective, because by the time it's open, I figure I may as well start after all". When a July 2026 update turned that nag into a dismissable alarm, a paying user quit: "The appeal… was that the alarm would push constant notifs… with no way to turn it off except to start the routine" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1450486923/sortby=mostrecent/json)). Off-app drift is where it used to fail: "if I'm… on reddit and I get distracted I entirely forget I'm doing a routine… if I'm off the app it doesn't do that for me" ([r/ADHD](https://reddit.com/r/ADHD/comments/1c31w9h/routinery_notifications/)).

The same persistence produces most of the complaints. Users report "There is no way to silence this apps alarms when you put your phone in DND mode", a voice so loud at zero volume that "I jumped", an alarm that "at 2:27 am… kept setting off my phone", reminders "every time I pause", and guilt copy such as "This is your last chance to do the routine… There is no guidance, only guilt". Timer pressure splits the ADHD audience. An AuDHD user wrote "the time component on this app brings me severe anxiety… I just want the reminder to do the thing. Not the count down", and another asked for steps that just have "a done button". Steps start immediately with no transition time, which "stresses me out". Reliability failures hit hardest, because a hand-tuned routine is months of work: routines lost or reverted after updates, and reorder bugs that mark skipped steps as done (all from [App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1450486923/sortby=mostrecent/json)). Novelty fade is real too: "I've used Routinery to get ready in the morning for 8 months, brain doesn't respond to it anymore" ([r/ADHD](https://reddit.com/r/ADHD/comments/zzx8my/my_brain_doesnt_respond_to_routinery_anymore_any/)). A 500-day app tester gave the fairest summary: it suits people for whom "the pressure of a countdown timer keeps you motivated" and fails "visual thinker[s] for whom countdowns do not work" ([r/ADHD, 4,623 points](https://reddit.com/r/ADHD/comments/r2zi3r/i_spent_over_500_days_trying_productivity_apps_so/)). Ads, the two-routine free cap and billing complaints dominate the rest of the one-star reviews, but none of that applies to a private build.

For Sarno, the player itself is easy to rebuild on the web. That covers one step on screen, the countdown, the "ready at" time, skip or extend for today, and the planned-versus-actual summary. What is hard is everything that happens while the app is closed. The start nag and each step-end or overrun alert must be server pushes, scheduled when Marc taps Start and rescheduled whenever he skips or extends. They will arrive as ordinary banners with the default sound, or a vibration on silent. The in-app voice (`speechSynthesis`) can speak only while the page is in the foreground. Whether it keeps speaking with the screen locked, and whether Screen Wake Lock works in an iOS home-screen app, both need a device test.

### Structured makes time visible and forgives, but rarely insists

Structured is one vertical day. Each task is a coloured block at its start time, its height shows its duration, a "now" marker moves down the day, and blocks fill in as time passes. The App Store pitch is "Most planners give you a blank page. Structured gives you a timeline" ([App Store description](https://itunes.apple.com/lookup?id=1499198946&country=us)). On iOS, default alerts fire at a task's start, at its end, and 5 minutes before the start. Users can enable Time-Sensitive notifications so alerts break through Focus ([Structured Help](https://help.structured.app/en/articles/330434)). An Inbox holds unscheduled tasks. The Pro-only **Replan** walks through each missed task with swipes: up to reschedule, left to the Inbox, right to complete, down to delete. Its copy is gentle: "Just move it to your inbox, to give yourself a break, but not forget about it" ([Structured blog](https://structured.app/blog/replan)).

ADHD reviewers describe the mechanism as seeing time as space. "I have ADHD and time blindness… With this, I am visually able to see all the time in my day, and it keeps me on track with alerts/notifications for the start and end of a task so I know when to wrap up." "i love how it does the calculations of how many minutes you have between each task so it really helps with time blindness." What keeps them coming back is the absence of punishment: "when I slip, this app really helps me get back on track without guilt for missing an item or even a day… if I miss a single item [in Fabulous] I break my streak and that works against me." Looks matter more than designers assume: "I love the aesthetic of it and the simplicity so I don't feel like my planner is another task I have to do" (all from [App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)). Of 500 recent reviews, 82 mention ADHD, autism, neurodivergence or time blindness, and 66 of those give four or five stars (same source, researcher's own count).

Structured breaks where forgetful users most need help. **Missed tasks vanish** unless the user acts on a prompt. "(Auto-)Move Incomplete Tasks" was the board's all-time top request (2,517 votes), and one commenter put it bluntly: "A person with ADHD is not going to remember to move their tasks every day if incomplete" ([feedback board](https://feedback.structured.app/p/auto-move-uncompleted-tasks)). Even after Replan shipped, "If I miss the Replan notification, unfinished tasks often get lost" ([feedback board](https://feedback.structured.app/p/add-an-option-to-automatically-move-unfinished-tasks-to-the)). **It never insists.** "Snooze Notifications" (223 votes) and "Nagging Reminders" (130 votes) have sat unbuilt since 2022. One commenter wrote "As an ADHD person, this is one thing I'm missing… for now I'll stick with Due" ([snooze](https://feedback.structured.app/p/snooze-notifications); [nagging](https://feedback.structured.app/p/nagging-reminders)). A paying user asked for "nudging every hour" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)). **Entry friction** is the next complaint. A multi-step create modal and a fiddly time picker mean "it takes me about 3 to 4 times as long to put a task on a schedule compared with using something like Apple's calendar", and one neurodivergent user felt asked "50 million questions like an Outlook calendar". **Alerts that silently stop** come up too: "after that first week, I stopped getting alerts." Completing a task does not clear its queued notifications ([feedback board](https://feedback.structured.app/p/clean-notifications-for-a-certain-task-when-it-is-completed)). Recurring tasks sit behind the Pro paywall, which dominates the one-star reviews but is irrelevant to Marc. Overrunning a task is not handled either: "Task Overtime" (246 votes) is still unbuilt ([feedback board](https://feedback.structured.app/p/task-overtime)).

For Sarno, Structured's strongest ideas are cheap. They are a now-line with "N min free" gaps for the few timed things in Marc's day, start **and** end cues, and shame-free movement. Its weakest ideas are the ones Sarno should invert. Recovery should be a default, not a prompt. Completing a task should cancel everything queued for it, which is trivial when the server owns the queue. And a single line of text should be enough to create a timed item.

### Finch makes the small things feel worth doing, and guilt is the price

Finch's founders say their thesis is that people already know what to do. "To take care of yourself, you don't actually need a lot—you just need consistency and motivation" ([Paste Magazine](https://www.pastemagazine.com/tech/finch/finch-app-mental-health-virtual-pet-self-care)). According to a summary of the co-founder's own account, they built about eight prototypes in ten months, and "in each, strangers did not return after day two". The pet was the "last idea they intended to try", and it was the first version people came back to ([note.com teardown](https://note.com/pubvoice/n/n9f2a0fe8d290?hl=en)). The loop links each tiny goal to a visible effect. A typical goal earns 5 energy. At full energy the bird **automatically leaves on an adventure** of about 6 hours, and each further goal shortens it ([Finch wiki: Energy](https://finch.fandom.com/wiki/Energy)). The bird later comes back with a discovery. One action therefore pays twice, once now and once hours later, and the second payoff is a built-in reason to reopen the app. Suggested goals include an "Easy Wins" tab ([Finch wiki: Goals](https://finch.fandom.com/wiki/Goals)). The lowest mood rating **earns more stones**, so a bad day pays more, not less ([Finch wiki: Rainbow Stones](https://finch.fandom.com/wiki/Rainbow_Stones)). Streaks can be switched off. Two missed days in a row can be repaired for free, and a returning user can pick a target as low as "Baby steps (2 days)" ([Finch wiki: Streaks](https://finch.fandom.com/wiki/Streaks)). Pause mode hides everything but the pet and stops all notifications ([Finch on Threads](https://www.threads.com/@finchcare/post/DIjgbHaJ-8D/)).

Users name the mechanism precisely. "It shifts 'I ought to do this self-care for me' executive dysfunction over onto 'I should do this… for this (fictional) other (cartoon bird) person.' Which for a surprisingly large number of us, is a trick that works… And it does not work for all of us" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1p0kaxo/)). Successful ADHD users keep it tiny: "The trick has been keeping the goals small and basic… 'Get out of bed.' 'Drink water.' 'Eat a meal.'" Results can last: "Tomorrow will be day 500!", and "I used it for two years until the habits became second nature" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1r45z19/)). The last quote describes a tool that succeeded by becoming unnecessary.

Finch's failures are the most instructive of the six, because they come from the same bond that makes it work. **Guilt and avoidance**: "I felt awful about letting the little bird down but.. adhd happens. I fucked up and couldn't face him and cried rather than open the damn app and see a sad bird" (the top comment in its thread) ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1k25zqm/)). **Dishonesty**: "I started lying to make bird happy" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1r45z19/)), and "It's too easy for me to just hit complete when I didn't do the thing in order to save a streak" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1p0kaxo/)). The streak counts app check-ins, not completed goals, so "I totally bs the goals… but I do it every day because its fun" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1r45z19/)). **Notification volume**: "I receive dozens of notifications a day now because they're all separate… it's overwhelming" ([r/finch](https://www.reddit.com/r/finch/comments/1un2yzg/)), and "I just want one morning check in notification… I had 5 notifications yesterday" ([r/finch](https://www.reddit.com/r/finch/comments/1vx5qys/)). At the same time, its reminders are unreliable: "When I set a 'Remind Me', I don't get a notification anymore", and one user "wish[ed] nagging option could be added" ([App Store reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1528595748/sortby=mostrecent/json)). **Reward farming**: "you want more gems… so you make more tasks… now i have 30 tasks. i don't do any of them" (same source). The fan wiki itself warns that some users "stop paying attention to their Goals". **Tone**: a 235-upvote thread calls the "childish, cartoony characters… a real turn-off", and one user feels "a feeling of distrust and infantalization" ([r/ADHD](https://www.reddit.com/r/ADHD/comments/1k25zqm/)). Finch also does little for starting larger, time-bound tasks. Users ask for an "App like finch, but more of a calendar".

For Marc, the pet and its dress-up economy are the parts that cannot and should not be carried over. The pet's pull and its guilt are the same mechanism seen from opposite ends, and an adult who dislikes cuteness gets only the guilt. What transfers cleanly is the rest of the design: easy-win defaults, an immediate visible tick plus a later payoff, rewards with no penalties, more credit on a bad day, no streaks, a pause that silences everything, and few notifications that each matter.

### What to copy, adapt and avoid from each app

| App | Copy as is | Adapt for a web-push PWA | Avoid |
|---|---|---|---|
| Due | Every nag-able item has a time; a series ends only on Done, snooze-to-a-time or drop; snooze presets that land on meaningful moments; "prepare for it" framing; confirm parsed dates with a visible "Set to…" and a way to keep the words; repeat from due date or completion; title = the reminder text | Cadence anchored to the due time, kept server-side with no repeat cap imposed by the platform; Done/Snooze on the screen the push opens, not on the notification; one combined push for simultaneous items | Loud-tier promises the PWA can't keep; no undo; nagging everything |
| Clock + Urgent | Labels that name the action; repeat until a decision; a small, separate "urgent" lane | Server re-sends with changing words instead of a continuous ring; morning/transition anchors instead of arbitrary times | Treating a banner as if it were an alarm; more than about three interrupt-level items a day |
| Goblin Tools | One-tap, judgement-free breakdown; self-rated granularity; parent chain as context; break down one step at a time | Default to 3–6 steps, show step 1 only, put step 1 in the push body; one optional private context line | 30+ step lists; abstract or filler steps; title-only prompts; fragile storage |
| Routinery | One step full-screen; live "ready at" time; no auto-advance by default; skipped still counts as done; planned vs actual | Start nag and step-end/overrun alerts as server pushes; voice only while open; quiet hours, "not today", transition buffer, untimed steps | Nags during pause; loud or robotic voice; guilt copy ("last chance"); feature creep |
| Structured | Now-line, duration as height, minutes free between items; start and end cues; Inbox for untimed items; warm recovery copy | Carry-over that happens automatically, with one-tap triage later; Done cancels all queued alerts; one-line creation via Smart Add | Wizard-style entry; recovery that depends on answering a prompt; red overdue states |
| Finch | Easy-win defaults; rewards only; bad days count more; pause that silences everything | Two reward moments without a creature (tick now, evening "done" list later); pause that resumes on its own | A pet or anything that can look disappointed; check-in streaks; rewards for adding tasks; many small pushes |

## Eight principles recur across all six apps

**The tool has to come to the user, or it does not exist.** Every app that waits to be opened gets forgotten. Goblin has no reminders, and users "sometimes remember" it. Finch is "completely forgot[ten]" after two days by its most-upvoted critic. Routinery used to lose users the moment they drifted into another app. The built-ins win because Clock rings without being opened. This is Marc's central problem, since he forgets to open apps at all. So in Sarno every feature has to be designed around the push and the badge, the two things that reach him. The app's screens come second.

**A reminder ends with a decision, and every decision costs about the same.** Due's real innovation is symmetry. Done and "not now, but at 6:30" are each one tap on the same surface, so the user never has to lie with Done to stop the noise. Clock forces Stop or Snooze. Urgent's Complete-for-Alarm puts Done on the alarm. Routinery's start nag ends only by starting. On iOS web push the notification can carry no buttons, so the decision must sit on the screen the push opens, and every choice there should take one tap.

**Loudness is a budget, and repetition must change its words.** Experienced Due users keep it for what they "ABSOLUTELY CANNOT AFFORD TO FORGET". Clock users who alarm everything feel like hostages. Apple shipped an Urgent list partly to keep the loud lane short. Finch's 2026 users quit over volume, not tone. The research behind this is consistent. Identical warnings habituate within days ([BYU/MISQ](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications)). Acceptance of a clinical reminder fell about **30% with each additional reminder** in one encounter ([Ancker et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)). Duolingo found that reusing the last template did worse than picking at random ([Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)). A web push has only a title, a body and a badge to vary, so the wording has to do all the work.

**Decide once, earlier, so nothing needs deciding in the moment.** Routinery's "past self who created the routine", Due's "prepare for it", Goblin's breakdown and Structured's planned day all do the deciding before the hard moment arrives. The evidence agrees with the users. In adults with ADHD the large deficit is in forming a plan (d = 1.60), not in recalling it (d = 0.03) ([Fuermaier et al. 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/)). The only adult ADHD reminder trial found that reminders brought people back faster but did not raise completion ([Nordby et al. 2022](https://www.frontiersin.org/articles/10.3389/fdgth.2022.821031/text)). So a push only helps if it delivers a plan already made, which makes Smart Add the place where most of the value is created.

**Show one thing.** Routinery's full-screen step, Goblin's Taskmaster, the request to "just want the first step" and Structured's now-line all reduce the visible world to the next action. Long lists are where Goblin, Finch ("now i have 30 tasks") and Structured's Inbox ("HORRIBLY PAINFUL") turn into overwhelm.

**Forgive by default and recover automatically.** Users credit Structured's shame-free moves, Finch's "It only rewards you" and Routinery's "skipped still counts" by name. They blame streaks, sad pets and "last chance" copy for quitting. Recovery has to happen *without* the user's initiative. Structured's prompt-based Replan still loses tasks for people who miss the prompt, and Finch's pause does not help someone who is too low to press it.

**Silent failure is the worst bug, because trust is the product.** In every app the angriest reviews describe a promise quietly broken. Due's nagging stops until the app is opened. Finch's "Remind Me" stops arriving. Structured's alerts stop after a week. Goblin's lists vanish. Routinery's routines revert. For a user who forgets, a dead reminder looks exactly like a quiet day. Due's most loyal reviewer calls the app "a close trusted friend" for a reason.

**Keep scope narrow and stable.** Routinery's push into an all-day planner, social feed and AI, Finch's removal of Journeys, Due's October 2026 redesign ("none of the useful features (eg undo!!) are anywhere to be found") and Goblin's subscription switch each drove away users who had built routines around the old version ([Due reviews](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json); [Finch thread](https://www.reddit.com/r/ADHD/comments/1p0kaxo/)). A private feature for one person avoids every commercial pressure behind those changes. It keeps one risk: rebuilding something Marc already relies on.

## Six corrections to the earlier reports

This pass read primary documentation more closely than the earlier ones. Where the two disagree, the new notes win. Most changes are refinements, but the first changes how Sarno's nag cadence should be built.

**Due's repeats run on a fixed clock from the due time.** The earlier notification report said Due's snooze interval "counts from the user's response, not from the original fire time, so rings never pile up". That holds only for the **Prominent** alarm tier, whose interval "only starts counting once you [attend to it]" ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)). For Standard and Critical reminders, the cadence is anchored to the due time. That is why a missed 9:10 reminder produced the 9:10, 9:15 and 9:20 slots at once after an iOS 10 delivery bug ([Due App Diary](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8)). Anchoring has a real advantage: lateness stays legible, since the third nag at 5 minutes always means 10 minutes late. For Sarno the reconciled rule has four parts. Nag offsets count from `remind_at`, which is how the earlier ladder's "+10 / +20 / +30 / +45 min" rungs already work. An explicit snooze sets a new anchor and restarts the count. A tap that opens the Now screen without a decision behaves like Due's Stop on a Prominent alarm: it does not end the series, and the next nag comes one interval after the tap, so Marc is not pinged seconds after looking. And the server never sends catch-up bursts. If a rung was missed (server down, phone offline), it sends only the current one. The earlier report's `Topic` header advice, which coalesces stored pushes, also enforces this on Apple's side ([Apple: sending web push](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)). Two smaller details are worth recording. Due's notification snooze presets default to +1 h, +3 h and +1 day. And only the 1-minute and 60-minute auto-snooze intervals are free; 5, 10, 15 and 30 minutes are a paid unlock ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/203299799-Reminders-not-respecting-auto-snooze-setting)).

**Structured has not rejected snooze; it has left it unbuilt.** The earlier report said Structured "has no snooze at all, and rejected a request for one". The board shows "Snooze Notifications" (223 votes) and "Nagging Reminders" (130 votes) still open in "Inbox" since 2022. What was formally rejected were persistent alarm-style alerts and sticky reminders, on the grounds that Apple did not allow them ([feedback board](https://feedback.structured.app/p/alarm-request-alternative-to-notification)). After AlarmKit arrived, the same team built an alarm into a separate app, Awake ([TechCrunch](https://techcrunch.com/2025/09/15/awakes-new-app-requires-heavy-sleepers-to-complete-tasks-in-order-to-turn-off-the-alarm)). So Structured is not evidence that ADHD users reject nagging. Its own users ask for nagging and leave for Due to get it. The earlier report also credited Structured with a morning "plan your day" reminder and an overdue reminder at ">3 unfinished tasks". This pass could not confirm either from a second primary source; it found only Replan's optional morning and evening prompts, which are Pro only. Treat the ">3 unfinished" threshold as a single-source design idea, not an established pattern.

**Pushover and Due are off the table, and so is free alarm-grade escalation from the server.** The earlier notification report's top recommendation was Pushover at $4.99, for Critical Alerts through silence and Focus and as an independent heartbeat channel. The free-apps report already dropped Due and Pushover in favour of Reminders Urgent. Marc's constraints now rule out both paid routes and any app other than Sarno. The consequence should be stated plainly: **no free path exists for Sarno's server to make Marc's phone ring through the ring switch or a Focus.** Urgent reminders cannot be created from outside the phone ([MPU Talk](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)). The only free, alarm-grade layers are things Marc sets on the phone himself: recurring Clock alarms, Urgent reminders, or a Shortcuts automation that creates Clock alarms. That automation is untested while the phone is locked. Whether those count as "other apps" is Marc's call. The design should work without them, and should say honestly what is lost.

**Notification tags stack on iOS; they do not replace each other.** The Due notes suggest giving simultaneous reminders the same `tag` to avoid Due's buzz storm. The earlier notification report read WebKit's source and found that each iOS web notification gets a fresh identifier. `tag` only filters `getNotifications()`, so same-tag pushes stack ([WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). The source-code reading wins. Sarno should avoid storms by **combining simultaneous items into one push on the server** ("3 things at 9:00: bins, meds, email Sam"), not by relying on tags.

**Goblin's spice advice and "no scheduling" claim need tightening.** The free-apps report suggested spice 3–5 for "any task that feels impossible". The live API shows that 3–5 produces 12–42 steps, which is the overwhelm users complain about, while the default of 2 gives about 7 ([goblin.tools API samples](https://goblin.tools/ToDo)). For Sarno's own breakdown, start coarse and break down only the stuck step. The earlier statement that Goblin has "no reminders and no scheduling" is nearly right. Items can carry deadlines that turn "overdue" in the list, and an export lays tasks into tomorrow's calendar, but nothing ever notifies ([goblin.tools/ToDo](https://goblin.tools/ToDo)). Goblin also now has a one-at-a-time Taskmaster view, which supports the earlier "one step on a Now screen" design.

**One Structured claim drops out, and the Urgent snooze figure firms up.** The task-starting report cited a reviewer saying Structured takes about 15 minutes to set up and that minute-level planning "killed his early use". This pass found no review with that wording and could not reach the source. The App Store quotes on entry friction ("3 to 4 times as long", "50 million questions") make the same point with verifiable sources. The Urgent reminder's **9-minute snooze**, previously unverified, is now reported directly by 9to5Mac ([9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)). Apple itself has not documented it. Clock's own snooze length became adjustable in iOS 26, according to Apple's current wording and a podcast transcript ([Apple Support](https://support.apple.com/en-us/118444); [AppleVis](https://applevis.com/comment/195259)).

## Keep these in mind before building

The constraints frame every item below. An iOS home-screen web push carries a title, a body, the default sound, a badge number and a tap link. It shows no action buttons, is never Time Sensitive, vibrates only when the ring switch is on silent, and is held back by any Focus that does not list Sarno ([earlier WebKit source reading](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). The server must send every reminder and every repeat, because iOS gives web apps no background scheduling. Subscriptions can die without any event firing ([WebKit bug 273063](https://bugs.webkit.org/show_bug.cgi?id=273063)). The feature is Marc's alone, behind the same `user_id = auth.uid()` row-level security as his existing reminders list, and costs nothing to run beyond what Sarno already uses. The checklist maps each lesson to what the platform allows.

| # | Keep in mind | Learned from | PWA can? | Build decision for Sarno |
|---|---|---|---|---|
| 1 | Nothing nags without an exact time | Due requires a time on every item | Yes | Add `remind_at timestamptz` beside today's date-only `due`; date-only items never nag individually and appear in the morning roll-up instead |
| 2 | Every reminder and repeat comes from the server | Due's silent stops came from on-device scheduling | Yes (server); no on-device scheduling | pg_cron every minute calls the existing web-push sender; Done anywhere stops everything everywhere |
| 3 | A swipe or tap is not an answer | Due, Clock, Routinery's start nag | Yes | The series ends only on Done, snooze-to-a-time or Drop; a tap without a decision acts like Due's Stop (next nag one interval later) |
| 4 | Anchor the cadence to the due time and never burst | Due's fixed cadence; its iOS 10 triple-fire bug | Yes | Offsets from `remind_at`; snooze sets a new anchor; send only the current rung after an outage; set `Urgency: high`, a short TTL and `Topic` |
| 5 | Repeat with different words, then stop | Habituation research; Due users' numbness; Clock fatigue | Yes (title, body, badge only) | About five nags over about 45 minutes, each worded differently (task → first step → "2 minutes" → "do, move or drop?"), then fold into the next anchor |
| 6 | The decision lives one tap after the push | Due's in-notification grid; Urgent's Complete | Partly: no buttons on the notification | `navigate` opens a Now screen with Done, three meaningful snoozes showing clock times, "Make it smaller" and Drop, each one tap |
| 7 | Snooze to moments, not to "+1 hour" | Due's developer: "+1 hour means I end up getting interrupted… again" | Yes | Presets such as "+10 min · 3:12" (only for "I'm about to"), "This evening · 6:30" and "Tomorrow · 9:30"; after the second snooze, lead with "Make it smaller?" |
| 8 | The label is the instruction | Renamed alarms; Due's 2024 title change | Yes | Title = verb + object under about 40 characters ("Start: email Sam"); body = the first physical step and its minutes; never "Reminder" |
| 9 | Loud alerts are not available, so do not imply them | Due's Critical/Prominent; Clock; Urgent | **No** | Banner, default sound, vibration on silent only. Say so in the UI; offer, never require, a Clock alarm or Urgent reminder for the one or two true must-not-miss items |
| 10 | Marc's phone settings are the only volume knob | Structured's Time-Sensitive toggle (native only) | Settings only | One checklist screen: Persistent banners, Sarno allowed in every Focus, Immediate delivery, Watch mirroring; show what is confirmed vs self-reported |
| 11 | Simultaneous items arrive as one push | Due's Watch buzz storms; iOS tags stack | Yes (server batching) | Combine items due within the same minute into one push that opens a short "Now" list |
| 12 | Done cancels everything queued, and can be undone | Structured's leftover alerts; Due's lost reminders | Yes (queue); clearing shown banners needs a device test | Done deletes pending sends and offers Undo for 10 seconds; try `getNotifications()` + `close()` on open |
| 13 | Capture must be one line and always confirmed | Due's "Set to…"; Structured's entry friction; Goblin's Compiler dropped "Friday" | Yes | Smart Add proposes time, first step and nag on/off; Marc confirms; parsed dates are shown, never applied silently; deadlines are never dropped |
| 14 | Break down into a few steps and show only step one | Goblin's 42-step lists; "i just want the first step" | Yes (Claude) | 3–6 steps by default; step 1 large, the rest collapsed; "Make it smaller" re-breaks one step with its parent chain; verb-first physical steps, no filler |
| 15 | Push the first step, not the task name | Goblin never reaches users; Nordby's null result | Yes | The nag body carries step 1 ("Open the tax folder on your desk · 2 min") |
| 16 | A start nag stops only when Marc starts, inside limits | Routinery's most-praised and most-hated feature | Yes (pushes); no sound beyond default | For one or two routines: start pushes until Start or "Not today", with quiet hours, a cap and calm copy; never "last chance" |
| 17 | The routine player waits, then nudges | Routinery's no-auto-advance plus +1/+5/+10 | In-app yes; closed-app only via push | One step full-screen, "ready at" time, skip or extend for today, untimed steps, transition buffer; step-end and overrun pushes scheduled at Start; pause stops all pushes |
| 18 | Time must be visible where Marc already looks | Structured's now-line; the lack of web widgets | Partly: no widgets or Live Activities | A small Today strip (now-line, next item, "N min free") on the screen the push opens; the badge counts what is waiting |
| 19 | Missed items carry over by themselves | Structured's 2,517-vote request; "tasks are lost" after Replan | Yes | At the day boundary, unfinished one-offs move into "Carried over (3)" at the top of today, with recurring items excluded; one-tap triage later; no red |
| 20 | Reward only, never punish, and pay twice | Finch's two reward moments; skip-counts-as-done | Yes | An immediate visible tick, plus an evening "Done today" list; no streaks, no failure counts, no sad states; a bad day counts the same or more |
| 21 | Pause must silence everything and come back by itself | Finch's pause needs a manual unpause; holidays overwhelm Structured users | Yes | "Pause for N days" stops every push and resumes automatically with one plain note; nothing piles up while paused |
| 22 | Silence is the worst failure, so watch for it | Due, Finch, Structured and Goblin all failed silently | Detect yes; alert through another channel **no** (no free channel) | Re-check `getSubscription()` on every open; show "Reminders on · last delivered 14:02"; flag missing taps after about 24 h on next open; an optional "Open Sarno" Clock alarm is the only free outside fallback |
| 23 | Keep it private and discreet | Goblin's privacy model; Sarno's preview rule | Yes | Marc-only RLS; optional discreet titles; context lines and notes never in push text, previews or logs; Claude receives only what the breakdown needs |
| 24 | Durability and stability are features | Goblin data loss; Routinery reverted routines; Finch's removed Journeys | Yes (process) | Versioned rows, no destructive migrations, no silent removal of anything Marc relies on |
| 25 | Expect novelty to fade and measure it | Routinery "brain doesn't respond anymore"; HeartSteps fade in 2–4 weeks | Yes | Log send → tap → decision → done per template; rotate wording; review with Marc at three weeks and cut what stopped working |

A few platform questions remain open, and they decide how close Sarno can get to the apps above. On a real iPhone, the following still need testing: whether Persistent banner style and Focus allow-listing appear for a home-screen web app; whether `getNotifications()` can see and clear declaratively shown notifications; whether pushes mirror to an Apple Watch; whether `speechSynthesis` and Screen Wake Lock work in a standalone web app with the screen on, and what happens when it locks; and how quickly pushes arrive near a step boundary in Low Power Mode. No study gives an ADHD-optimal nag interval or cap. Due's 5-minute, 5-repeat default and the earlier ladder's 45-minute series are starting points from practice and anecdote, and Marc's own logs should replace them.

## Conclusion

Taken together, the six apps show that "great for ADHD" is not a property of features. It describes a contract. Each app promises to carry one job the user cannot, and is loved for exactly as long as it keeps that promise without being asked. That reframes Marc's feature. Sarno does not need to be a planner, a pet, a timeline and a nagging app at once. It needs to make one promise it can keep on a web push: *"when you tell me something with a time, I will bring you its first step at that time, keep coming back in different words until you decide, and never go quiet without telling you."* Remembering, planning the first step and recovering can be fully delegated within that promise. Seeing time and feeling rewarded are worth adding only once the promise has held for a few weeks.

The constraint Marc set (no paid services, no other apps) is less limiting than it looks for every job except one. It removes the only server-triggered way through the ring switch and Focus, so Sarno cannot be louder than a banner. Two moves can make up for that: varied wording, and a first step small enough that a quiet buzz is enough to start it. The one place the built-in Clock still outperforms anything Sarno can build is a must-not-miss moment while the phone is silenced, and that trade-off should be put to Marc honestly, not designed around.

---

# Document: iPhone PWA notifications for ADHD

# Reach Marc through silence, Focus and swipes

The apps adults with ADHD actually rely on to remember and start tasks (Due, TickTick, Amazing Marvin, and Apple's and Todoist's new Urgent reminders) share one rule: **a swipe never counts as dealing with a reminder**. Only Done or a reschedule ends the series. They pair that rule with a one-tap way to resolve the reminder, with louder alert tiers kept for the few things that must not be missed, and with a tiny next step. Marc's Sarno PWA can copy most of this. It cannot get past a hard ceiling that is now confirmed in WebKit source. On iOS 26 and 27 a web push carries only a title, a body, the default sound, a badge number and a tap link. There are no buttons, it can never be Time Sensitive, and it is silenced by the ring switch and by any Focus that does not explicitly allow the app. The cheapest way past that ceiling is **Pushover ($4.99 once)**. Its Critical Alerts ring through mute and Focus and repeat until acknowledged, with a callback to Supabase. The free backup is a Shortcuts automation that turns server data into Clock alarms. A native AlarmKit companion ($99/yr) is where to end up, not where to start, and SMS adds reach only when everything else is dead. The reminder science supports sending Marc many prompts. It does not support sending the same prompt many times. Reminders roughly double adherence (OR 2.11), and 3–12 prompts a day draw similar compliance. But identical repeats lose about 30% of their pull each time, and a message family fades over 2–4 weeks. The design that follows is therefore a server-run escalation ladder. Every rung changes its wording and then its channel, every snooze is a re-plan to a specific time, and a heartbeat watches for the silent failure that matters most for someone who forgets to open apps: a dead push channel.

## Apps that work never let a swipe count as done

Six reminder designs from ADHD-relevant apps are worth copying precisely. They differ in how persistent they are, what stops them, and how they escalate. Due has the most complete specification. Auto Snooze "keeps nudging you about a missed reminder until you mark it done or reschedule it". The repeat interval is 1, 5, 10, 15, 30 or 60 minutes, and the series runs **5 times by default and up to 10**. It runs "indefinitely when you launch Due or act on any of its notifications" ([Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)). Due also has three alert tiers per item. Standard plays once and respects Silent and Focus. Critical breaks through both. Prominent is a Clock-style alarm that "keeps sounding until you Mark Done or Stop". The help centre warns that the loud tiers are "intrusive by design… Using them sparingly keeps them effective" ([Due Help: alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009)). Two details are easy to miss and matter for a server-side clone. First, Due's snooze interval **counts from the user's response**, not from the original fire time, so rings never pile up. Second, *Stop* on a Prominent alert silences only this ring, and the reminder "will fire again at the next Auto Snooze interval" ([Due Help: Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793)). Due's conceptual move is just as useful: the reminder marks the moment to *prepare*, so "Prepare for meeting" sounds at 3pm for a 4pm meeting ([Due Help: pre-alerts](https://dueapp.zendesk.com/hc/en-us/articles/204235285)).

The other persistence designs differ in the details. Amazing Marvin's Bug Me stops only when the task is marked done. "Dismissing a notification only clears that one reminder." It runs for Today, 3 days, 7 days or Until done. A reminder that falls outside the allowed hours "waits until the window opens again", so it is queued rather than dropped ([Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)). TickTick renamed and broadened Constant Reminder in May 2026. Reminders "continue until the task is completed, postponed, or otherwise handled" ([Releasebot: TickTick](https://releasebot.io/updates/ticktick)), and users praise them because they "cannot be swiped away" ([Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)). Apple Reminders' Urgent toggle (iOS 26.2+) schedules a real alarm through AlarmKit ([9to5Mac](https://9to5mac.com/2025/11/04/ios-26-2-alarms-and-timers-in-reminders/)). An optional "Complete for Alarm" setting replaces Snooze with a large Complete button ([MacMost](https://macmost.com/urgent-reminders-with-alarms-on-iphone.html)). Todoist's urgent reminders "cut through silent and Do Not Disturb modes" and are now on every plan, with one urgent reminder per task on the free tier ([Todoist Help](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)). Focus Bear's Late No More is the only app found that escalates the *form* of the alert. It gives an easy-to-dismiss alert 15 minutes before a meeting, then a hard-to-dismiss one at 2 minutes that "changes colour" and plays "annoying motivating sound effects", then voice or a song ([Product Hunt](https://www.producthunt.com/p/focus-bear/late-no-more?page=1)). One answer, "I don't need to attend", cancels the rest of the series ([Focus Bear Support](https://support.focusbear.io/portal/en/kb/articles/joining-a-meeting)).

Planner apps contribute a second family, which can be called **day-framing** notifications. Structured fires alerts at both the start and the end of every timed task by default, and at 8:00 am for all-day tasks ([Structured Help](https://help.structured.app/en/articles/1870914)). It adds a morning "plan your day" reminder and an overdue reminder that fires "once you have more than 3 unfinished tasks in a row" ([Structured Help: planning reminders](https://help.structured.app/en/articles/9179330)). Structured has no snooze at all, and rejected a request for one ([Structured feedback](https://feedback.structured.app/p/sticky-reminder-with-snooze-options)). Tiimo's "Review today" "stays visible until completed" and resets daily, with a weekly review on Sunday ([Tiimo FAQ](https://tiimoapp.com/faq/notifications)). Routinery runs each step on a timer "while a voice calls out what comes next", and when you overrun, "the voice pulls you out" ([Routinery, App Store](https://apps.apple.com/us/app/routinery-routine-planner/id1450486923)). Llama Life lets users choose what happens at the end of a timer: one sound (the default), **Nag** "once every minute until turned off", or Continuous ([Llama Life Help](https://intercom.help/llama-life/en/articles/6456183-using-alarms)).

| App | Repeat rule | What ends it | Snooze from the alert | Loudest tier |
|---|---|---|---|---|
| Due | Every 1/5/10/15/30/60 min; 5× default, 10 max, indefinite if you interact | Mark Done or reschedule; the interval restarts from your response | +1 h, +3 h, +1 day; optional grid of 12 Quick Access Times ([Due Help](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761)) | Prominent: an alarm that rings until Done/Stop |
| Marvin Bug Me | 5 min to hours; Today / 3 d / 7 d / until done | Done only; dismiss clears one notification | In-app: 10m, 30m, 1h, Afternoon, Evening, Tonight, Tomorrow 9am, Pick ([Marvin Help](https://help.amazingmarvin.com/articles/1950238-reminders)) | None (ordinary push) |
| TickTick Constant | Interval not documented | Complete or postpone; can't be swiped away | Minutes, hours or next day | Constant reminder |
| Apple Urgent | Alarm, then snooze (9 min, unverified) | Complete, reschedule or delete | Snooze or Complete | AlarmKit alarm through silent and Focus |
| Late No More | 15 min soft, then 2 min hard, then colour, sound, voice | "I don't need to attend", or Attend | None | Voice or song (Mac only) |
| Structured | None | n/a | None | Start and end alerts by default |

What ADHD users say matches these designs. "If i can swipe it away once, it basically never existed." "I start subconsciously ignoring repetitive phone reminders after a while." Phone reminders work when there is "a second step that does not rely on me opening the app again" ([r/ADHD mirror, 2026](https://reddit.sentinel-team.org/posts/1twhie6/snapshots/2026-06-05T21%3A20%3A56.551596Z)). One Due user sets a laundry reminder "that goes off every minute because I know I'm gonna look at it and immediately forget 800 times" ([Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)). A Tiimo user found the default sound too brief to pull attention, and the developer said they were "definitely not the first" to ask for a more persistent alarm ([Tiimo, App Store](https://apps.apple.com/us/app/id1480220328?l=en-us)). Persistence has a known downside: Due users admit marking items done "just to get it to shut up" ([ADDitude](https://www.additudemag.com/reviews/post/adhd-organization-tools-you-will-use-everyday/)). No vendor publishes data on nag effectiveness, opt-out rates or habituation, so every claim in this section about what *works* rests on design convergence and testimony, not measurement.

Four mechanics should be copied into the Sarno app. The first is Due's repeat-until-resolved state machine, including its "interval from response" and "Stop ≠ Done" rules. The second is the Structured/Tiimo day frame: a morning plan, start and end cues, an overdue roll-up, and an evening review that stays put until done. The third is Late No More's escalation by changing the form of the alert, which in Sarno means changing the wording and then the channel. The fourth is the human time labels from Marvin's and Due's snooze menus, each showing the resulting clock time. Duolingo contributes something the others lack: a measured way to stop its own messages going stale. That belongs in the science section below.

## Web Push on iOS carries five fields and nothing else

The earlier research hedged on what an iPhone home-screen web app can put in a notification. Reading the WebKit source settles it. On iOS, `webpushd` builds each notification with only a title, a body, a fixed subtitle "from <web app name>", the badge number, the web app's own icon, and the system default sound unless `silent` is true. It registers its notification category with **`actions:@[]`**, so no action buttons can ever appear. It **never sets `interruptionLevel`**, so a web push is never Time Sensitive or Critical. It never sets attachments, so there are no images ([WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). In WebKit's interface definitions, `image`, `badge`, `actions`, `requireInteraction`, `renotify`, `vibrate`, `timestamp` and `sound` are all commented out, and the browser drops them silently ([NotificationOptions.idl](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationOptions.idl)). The `icon` URL is parsed but not used. Nothing new for notifications shipped in Safari 26.0 or Safari 27.0. iOS 27 is now released, and testers report on 27.0.1 ([WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/); [WebKit bug 263687](https://bugs.webkit.org/show_bug.cgi?id=263687)). There are still no Notification Triggers, no Periodic or Background Sync, no widgets and no Live Activities. **Every reminder, every repeat and every end-of-timer alert must be sent by the server at the moment it should appear.**

Three behaviours in the source matter directly for a nagging design. First, **notifications with the same `tag` stack rather than replace each other**. Each notification gets a fresh UUID as its system identifier, and `tag` is used only to filter `getNotifications({tag})` ([WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). Sarno's current service worker sets `tag` with the comment "so a retry replaces rather than stacks". On iOS that assumption is wrong, and its `icon`, `badge` and `renotify` options do nothing ([public/push-sw.js](/home/user/sarno/SarnoPWA/public/push-sw.js)). Second, a push handled by service-worker code that fails to show a notification within **30 seconds** counts as a strike, and **three strikes delete every subscription for the origin** ([WebPushDaemonConstants.h](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/Shared/WebPushDaemonConstants.h); [PushService.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/PushService.mm)). Sarno's handler always shows something and wraps it in `waitUntil`, which is correct. Third, a **declarative** push (`"web_push": 8030`) is shown directly by the system daemon without launching the service worker. The source states such pushes "can never result in a silent push timeout" ([WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)). The parser accepts top-level `web_push`, `notification`, `mutable` and `app_badge`. Inside `notification` it accepts `title`, `body`, `navigate`, `dir`, `lang`, `tag`, `icon`, `silent` and `data`. A type error in any field rejects the whole payload. `app_badge` was moved to the top level in May 2025, and current code ignores it inside `notification` ([NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp); [WebKit bug 293457](https://bugs.webkit.org/show_bug.cgi?id=293457)). The payload Sarno should send for every reminder is therefore:

```json
{
  "web_push": 8030,
  "app_badge": 4,
  "notification": {
    "title": "Start: email Sam about Friday",
    "body": "Step 1: open Mail and search \"Sam\" · 2 min",
    "navigate": "https://<sarno-origin>/now?task=123&n=8f2c",
    "tag": "task-123",
    "silent": false,
    "app_badge": 4
  }
}
```

The second `app_badge` is there for older iOS builds that may predate the move to the top level. Newer parsers ignore it. Which iOS release first shipped the top-level location is unconfirmed. The request headers also need changing. Sarno sends `TTL: 3600` and no `Urgency` header ([api/notify.js](/home/user/sarno/SarnoPWA/api/notify.js)). Apple's push service says `Urgency: high` is how to "attempt to deliver the notification immediately". It stores undelivered pushes for up to the TTL, but "the number… stored while the device is offline is limited". A `Topic` of at most 32 characters coalesces stored, undelivered pushes, so a newer one replaces an older one ([Apple: Sending web push notifications](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)). Nag pushes should use `Urgency: high`, a TTL of 15–30 minutes so a "start now" message is not delivered stale hours later, and `Topic: t<taskid>` so a phone coming back online gets only the newest nag. Apple publishes no per-device rate limit. The only signal is HTTP 429 `TooManyRequests` for "too many consecutive requests to the same device token". So the sender should space pushes to one endpoint and back off on 429. The documentation does not describe how Low Power Mode interacts with `Urgency`.

Two failure modes have changed since the earlier research. The first is subscription death, which is still silent. WebKit never fires `pushsubscriptionchange` ([WebKit bug 273063](https://bugs.webkit.org/show_bug.cgi?id=273063)). A blocked or replaced subscription can still return **201** instead of 410 ([Apple Developer Forums 719990](https://developer.apple.com/forums/thread/719990)). Safari 27 adds a new way to lose the channel: it now unregisters a service worker whose main script or imported scripts go missing ([WebKit Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)). Sarno pulls `push-sw.js` into a Workbox-generated worker, so that filename must stay stable across Vercel deploys. Declarative payloads soften this risk, because they display without the service worker at all. The second change is good news: **tap-to-deep-link now works with the app closed**. The long-standing "opens the root instead of the URL" bug could not be reproduced on iOS 26.0 or on iOS 27.0.1. In the 27.0.1 test, `openWindow()` opened the in-scope URL with its query string intact ([WebKit bug 263687](https://bugs.webkit.org/show_bug.cgi?id=263687)). An absolute, in-scope `navigate` URL carrying a notification id therefore does two jobs. It lands Marc on the right screen, and it gives the server a delivery-and-engagement receipt even though a non-mutable declarative push never runs app code.

## Nine settings on Marc's iPhone decide whether a push gets through

Because the server cannot raise a web push's interruption level, Marc's phone settings are the main lever on the web-push side. A Home Screen web app gets its own entry under Settings > Notifications, which can be managed "per web app" ([WebKit: Web Push for Web Apps](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)). Apple's Focus guide says you "can allow or silence notifications from specific web apps you've added to your Home Screen" ([Apple Support: Focus](https://support.apple.com/guide/iphone/allow-or-silence-notifications-for-a-focus-iph21d43af5b/ios)). The Time Sensitive and custom-sound options appear only "if the app supports it" ([Apple Support: notification settings](https://support.apple.com/guide/iphone/change-notification-settings-iph7c3d96bab/ios)), and the web app never does. The setup is therefore mostly about removing the places where a push can be held back.

| Setting | Value for Marc | Why |
|---|---|---|
| Settings > Notifications > Sarno > Allow | On; Lock Screen, Notification Center and Banners all ticked | Baseline delivery |
| Banner Style | **Persistent** | The only stand-in for `requireInteraction`, which WebKit does not implement |
| Sounds, Badges | Both on | Default sound is the only sound available. The badge is the one cue that stays visible |
| Show Previews | Always, or When Unlocked if sitters see his phone | The title carries the task. Use discreet wording if previews are hidden |
| Notification Delivery | **Immediate**, if Scheduled Summary is on | A summary would batch nags into uselessness |
| Every Focus (Sleep, Work, Personal, Driving) | Add Sarno to "Allow Notifications From" | Web push can never be Time Sensitive, so this list is the only way through a Focus |
| Apple Watch app > Notifications | Mirror iPhone alerts | WebKit says web push reaches "a paired Apple Watch"; a wrist tap still lands when the phone is on silent |
| Home Screen icon | Keep "Open as Web App" on; never delete and re-add casually | Deleting the icon removes the subscription; Safari 26 lets a user turn the web app back into a bookmark ([Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)) |
| Pushover (if added) | Turn on Critical Alerts and pick a volume; allow in Focus too | Critical Alerts are off by default ([Pushover blog](https://blog.pushover.net/posts/2020/2/ios-critical-alerts)) |

The table's recommendations come from Apple's general per-app controls. Nobody has posted a screenshot of the iOS 26/27 settings pane for a *web* app. Whether Banner Style appears for a web clip, whether Apple Intelligence "Reduce Interruptions" can bury web-app notifications, and whether Announce Notifications on AirPods covers web apps are all untested. CarPlay almost certainly does not show web-app notifications. The ring switch has a hard limit: a web push can only use the default sound, so on silent it vibrates and does not ring. That is why everything above the web-push rung of the ladder below uses another channel. The app should not assume any of this is in place. A one-screen setup checklist should show "permission granted / last push confirmed / Focus allowed (self-reported)", because each item is something Marc will forget he changed.

## Pushover and a Shortcut add alarm-grade reach for $4.99

With web push capped at ordinary notifications, the supplementary channels decide how far the system can reach. Ranked by noticeability per unit of effort, one is a clear winner. **Pushover** costs **$4.99 once** on iOS, and the free API allowance is 10,000 messages a month ([Pushover pricing](https://pushover.net/pricing); [Pushover API](https://pushover.net/api)). Its priority 2 "emergency" messages "repeat until acknowledged". The repeat interval (`retry`) is 30 s or more, the series lasts up to 3 h (`expire`) with a cap of 50 retries, and a `receipt` and `callback` URL report the acknowledgement ([Pushover API](https://pushover.net/api)). Apple approved Pushover's Critical Alerts entitlement in 2020, so these alerts play through the mute switch and Do Not Disturb ([Pushover blog](https://blog.pushover.net/posts/2020/2/ios-critical-alerts)). That gives a Supabase function a server-triggered, Due-style Prominent alert with no native code. The callback lets the server stop escalating the moment Marc acknowledges. Pushover is also independent of WebKit, so it still works after the web-push subscription has silently died, which makes it the natural heartbeat channel. Its costs are a one-time Critical Alerts opt-in and a third party that sees message text. Neutral wording handles the second ("Sarno: your 9:30 thing is waiting"), which also matches Sarno's rule that private content never reaches previews. No 2025–26 Pushover post confirms that Critical Alerts behave the same on iOS 26, though nothing suggests a change. **Pushcut** ($1.99/mo or $17.99/yr Pro) is the alternative if action buttons matter more than loudness. Its notifications can be Time Sensitive and carry buttons that run a Shortcut or make a background HTTP request ([Pushcut JSON help](https://pushcut.io/help/json)). That supplies the "Done / +10 min without opening the app" step that web push can never offer.

**Shortcuts-created Clock alarms** are the free backup. Shortcuts has had Create Alarm since 2018, and Time of Day automations can run with "Ask Before Running" turned off ([Matthew Cassinelli](https://matthewcassinelli.com/actions/create-alarm/); [Apple Support](https://support.apple.com/guide/shortcuts/apd602971e63/ios)). A morning automation can call Get Contents of URL on a Supabase function that returns the day's anchors, delete or turn off yesterday's alarms, and create today's. The results are real Clock alarms that ring through silent mode and Focus. Several things make it fragile. Create Alarm always adds a new alarm, so the Shortcut must prune its own, and Toggle Alarm picks alarms by time rather than label ([Apple Community](https://discussions.apple.com/thread/255277417)). Apple does not document which actions run while the phone is locked, and users report locked and Sleep-Focus runs failing ([Automators forum](https://talk.automators.fm/t/why-do-some-time-triggered-shortcuts-run-on-a-locked-iphone-and-others-fail/18608)). One user found a run-immediately automation asking for confirmation again after iOS 18.2 ([MacRumors forum](https://forums.macrumors.com/threads/automation-set-to-run-immediately-keeps-asking-for-confirmation-since-18-2.2445766)). Run it at a time Marc is usually unlocked, test it overnight on a locked phone, and keep it to the 1–3 daily anchors.

**Apple Reminders Urgent** is the strongest *built-in* interrupt: an AlarmKit alarm that activates "even when your device is silenced or a Focus is on" ([Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-reminders-wii-be-impossible-to-ignore-thanks-to-this-ios-26-2-addition-and-thats-great-news-for-me)). As of January 2026 it could not be set from Shortcuts, and "the API doesn't seem to accept urgent:true" ([MacPowerUsers forum](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)). Coverage of iOS 26.4's new Urgent list does not say whether that changed. For now it is a manual tool for the rare must-not-miss appointment that Marc sets himself. Smart Add's confirm sheet can *suggest* it. **A native companion with AlarmKit** is the ceiling for anything self-built. AlarmKit alarms break "through the silent mode and the current focus" and need only user consent, not an Apple entitlement ([WWDC25 session 230](https://developer.apple.com/wwdc25/230); [WWDC Notes](https://wwdcnotes.com/documentation/wwdc25-230-wake-up-to-the-alarmkit-api/)). The same app could send Time Sensitive pushes, a capability developers switch on themselves ([Apple Developer Forums 703568](https://developer.apple.com/forums/thread/703568)), and Capacitor plugins already wrap AlarmKit ([Capgo alarm](https://capgo.app/docs/plugins/alarm); [Capawesome alarm](https://capawesome.io/docs/sdks/capacitor/alarm/)). But it needs a Mac, Xcode and the $99/yr Developer Program, because free provisioning expires every 7 days, which is fatal for a forgetful user ([Impactor docs](https://mintlify.com/claration/Impactor/concepts/provisioning-profiles)). Its alarms are scheduled on the device, so they only sync when the app runs. Critical Alerts for one's own app are reserved for "a very restricted number of purposes" and are unlikely to be granted for a family planner ([Apple Developer Forums 106042](https://developer.apple.com/forums/thread/106042)).

**SMS and voice** add less than they appear to. An SMS obeys the same silent and Focus rules as a push. Its only advantage is reaching a phone whose web-push subscription has died, and Pushover already covers that. US delivery needs Toll-Free verification or A2P 10DLC registration even for one recipient, at about $2/month plus about $0.008 per SMS ([Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc); [Twilio Verify pricing](https://static0.twilio.com/en-us/verify/pricing)). A Twilio voice call breaks through only if the number is a Favorite or allowed in Focus. That is plausible, but nobody has tested it for this case. Programmatic iMessage needs an always-on Mac relay such as BlueBubbles that Apple does not sanction ([Sendblue](https://www.sendblue.com/blog/send-imessage-programmatically)). Not worth it. A webcal feed with `VALARM` refreshes on the device's schedule and its alerts are ordinary notifications ([nocal.app](https://nocal.app/help/apple-calendar/subscribe-on-iphone-and-mac)). Email is weaker still for someone who doesn't open apps. ntfy's iOS app lacks critical and time-sensitive alerts ([ntfy iOS plan](https://ddprojects.chickenkiller.com/binwiederhier/ntfy/issues/1680)).

| Channel | Through silent? | Through Focus? | Repeats until acknowledged? | Cost and effort | Verdict for Marc |
|---|---|---|---|---|---|
| Web push (declarative) | Vibrates only | Only if Sarno is allowed | Server-driven nags | Built | Baseline for every prompt |
| **Pushover priority 2 + Critical** | **Yes** | **Yes** | **Yes, with callback** | $4.99 once; one HTTP call | **Add first**, for escalation, anchors and heartbeat |
| Pushcut Time Sensitive + buttons | No | Yes | No | $17.99/yr | Optional, if one-tap Done without opening the app proves decisive |
| Shortcut → Clock alarms | Yes | Yes | Alarm snooze | Free; manual build; fragile when locked | Add second, for 1–3 anchors |
| Apple Reminders Urgent | Yes | Yes | Alarm snooze | Free; manual only | Marc's own tool for rare must-not-miss events |
| Native AlarmKit companion | Yes | Yes | Yes | $99/yr + Mac + days of work | Only if the above fall short |
| Twilio SMS / voice | No / if Favorite | No / if allowed | No | ~$2/mo + registration | Skip unless Pushover fails |
| Webcal, email | No | No | No | Low | Skip |

So the **maximum reach** achievable today without writing native code is this. Every prompt goes to the Lock Screen, Notification Center, a persistent banner and the Watch via web push, wherever Focus allows Sarno. On top of that, alarm-grade, repeat-until-acknowledged Critical Alerts go through Pushover for whatever the server escalates, plus Clock alarms for daily anchors that work even if every server is down.

## The evidence favours many prompts, but never the same one twice

The reminder literature answers Marc's "as many as useful" question more precisely than expected. A prompt is a **short-acting dose**. In the Drink Less micro-randomised trial, a notification raised the chance of opening the app in the next hour **3.5-fold** ([Bell et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)). In HeartSteps, a walking suggestion raised steps in the next 30 minutes by **107% on day 1**. The effect then decayed about 3% a day and was undetectable by about day 29, and participants called the messages "boring" after 2–4 weeks. Vague "get up and stretch" prompts never worked at all ([Klasnja et al. 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)). Across 16 RCTs, text reminders roughly doubled medication adherence, **OR 2.11**, or about 1.68 after correcting for publication bias. Personalisation, two-way messaging and daily frequency did not change the effect ([Thakkar et al. 2016](https://www.ehidc.org/sites/default/files/resources/files/Thakkar%202016%20JAMA%20text%20messaging%20meta%20analysis.pdf)). Volume itself did not clearly hurt. Daily notifications beat occasional ones ([Morrison et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5207732)), and experience-sampling experiments found similar two-week compliance at **3, 6, 9 or 12 prompts a day** ([Wrzus & Neubauer](https://heibib.ub.uni-heidelberg.de/search/Record/1839595345)). People already receive about 56–64 notifications a day ([Pielot et al. 2018](https://www.interruptions.net/literature/Pielot-MobileHCI18.pdf)), so Marc's need is to stand out, not to stay under a quota. No study gives a per-day count at which people disable notifications.

**Repetition** is what the evidence warns against. In an EHR cohort of 112 clinicians, the chance of accepting a reminder fell **30% for each additional reminder in the same encounter** ([Ancker et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)). Warnings whose appearance changed each time resisted habituation in fMRI. In a three-week field study, 76% of people still followed changing warnings at day 15, against 55% for static ones ([Vance et al.](https://misq.umn.edu/pub/skin/frontend/default/misq/pdf/V42I2/14124_RA_VanceJenkinsAbstract.pdf); [BYU News](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications)). Duolingo measured the same effect in its own reminders. Always reusing the last template did **0.5% worse than random**. Its bandit penalises recently used templates with a **15-day half-life**, and that system added +0.5% daily active users and +2% new-user retention over an already heavily optimised baseline ([Yancey & Settles, KDD 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)). One counterpoint should be kept in view: in Drink Less, varied messages did no better than a fixed one over 30 days. Rotation buys single-digit percentages and slows the fade. It is not a cure.

On **timing**, prompts work within about 30–120 minutes. HeartSteps measured 30 min, Drink Less 1 h, and Duolingo rewards a lesson within 2 h. So a prompt should arrive when the task can actually start. Delivering at natural breakpoints halved response time, from 54 to 27 minutes, across more than 680,000 Yahoo! JAPAN users ([Okoshi/Tsubouchi](https://interruptions.net/literature/Tsubouchi-UbiComp17.pdf)). Learned timing improved receptivity by up to 40% over random timing ([Mishra et al.](https://www.cs.dartmouth.edu/dfk/research/mishra-receptivity/index.html)). For scheduled items, **two touches beat one**: reminders 3 days and 1 day before an appointment outperformed either alone ([Steiner et al. 2018](https://www.ajmc.com/view/optimizing-number-and-timing-of-appointment-reminders-a-randomized-trial)). The best of 19 nudges in a 47,306-patient megastudy said the vaccine was "**reserved for you**" and was sent twice ([Milkman et al. 2021](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html)). On **wording**, asking people to write down a date *and* time raised vaccination by 4.2 points, while a date-only prompt did nothing significant ([Milkman et al. 2011](https://nber.org/system/files/working_papers/w17183/w17183.pdf)). Concrete actions beat vague ones (HeartSteps). No trial compares guilt with self-compassionate notification copy. Indirectly, students who forgave themselves for procrastinating procrastinated less before the next exam ([Wohl, Pychyl & Bennett, via BPS](https://bps.org.uk/research-digest/cure-procrastination-forgive-yourself)).

**Snoozing and escalation** have the thinnest evidence. Deferral concentrates on effortful items: emails that need a reply or careful reading are the ones people put off ([Sarrafzadeh et al. 2019](https://arxiv.org/pdf/1901.04375)). So a repeatedly snoozed task is a signal that it is too big or unclear, not that the user needs another ring. In a trial with children, reminder days raised studying, but the gap on non-reminder days *grew* ([Nobbe et al. 2024](https://doaj.org/article/4a00e095de7a4064a2026866f55eeb6d)). That kind of dependence is acceptable for getting tasks done, but it is worth thinning out for habits Marc wants to own. Two ADHD-specific results frame all of this. The only adult ADHD reminder trial found reminders sped up logins but **did not raise completion** ([Nordby et al. 2022](https://www.frontiersin.org/articles/10.3389/fdgth.2022.821031/text)). ADHD carries steeper delay discounting (**d = 0.43**, N = 3,913) ([Jackson & MacKillop 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5049699)). The push gets Marc to the task, but whether he starts depends on the task already being tiny and the reward coming immediately. No MRT has tested push reminders for task initiation in adults with ADHD, so the rules below transfer from other populations and from easier behaviours.

| Rule | Evidence grade |
|---|---|
| Remind at all; expect roughly doubled odds of the target action | **A** (Thakkar meta-analysis) |
| Two or more touches for a scheduled item: advance plus at-time | **B** (Steiner RCT; Milkman megastudy) |
| Name the concrete next action and its time; frame it as set up and waiting | **B** (Milkman 2011, 2021; HeartSteps) |
| Deliver when the action can start; the response window is 30–120 min | **B** (HeartSteps, Drink Less, Duolingo) |
| Prefer breakpoints and learned slots over random times | **B** (Okoshi; Mishra) |
| Rotate templates; avoid reuse within ~2 weeks | **B/C** (Duolingo; polymorphic warnings) |
| Never repeat identical alerts within one occasion; change the form and cap it | **C** (Ancker, clinicians) |
| Frequent prompts are tolerated (3–12/day similar compliance) | **C** (EMA experiments) |
| Expect a message family to fade in 2–4 weeks; monitor and refresh | **B, mixed** (HeartSteps vs Drink Less) |
| Snooze = re-plan to a specific time; repeated snoozes mean shrink the task | **D** (extrapolated from deferral and planning-prompt evidence) |
| Forgiving tone after a miss; no guilt | **C/D** |
| Reminders alone won't raise ADHD completion; pair with planning and a tiny first step | **B** for the null; **D** for the remedy |

## The design: a server-run escalation ladder with a heartbeat

The system below is Marc-only, gated by a per-user `reminder_prefs` row that only Marc has, and enforced by the same `user_id = auth.uid()` row-level security as `personal_todos`. Yola and the sitters see no change, and the design does not assume Yola as an accountability partner or as a fallback contact. Every escalation goes to Marc's own channels. The data the scheduler needs comes in three parts. On the task: `remind_at timestamptz` (today `due` is a date only ([0002_personal_todos.sql](/home/user/sarno/SarnoPWA/supabase/migrations/0002_personal_todos.sql))), `first_step`, `tier` (normal / starred / must-not-miss), `snoozed_until`, `snooze_count` and `state`. A `reminder_events` log records every send with its channel, rung, template id, the `n` id in its navigate URL, and the times it was tapped, acknowledged or acted on. A `templates` table holds the copy pool. `pg_cron` runs every minute and uses `pg_net` to call either an Edge Function or a Vercel endpoint that reuses the existing `web-push` sender ([Supabase: scheduling functions](https://supabase.com/docs/guides/functions/schedule-functions)). That function claims due rows with `FOR UPDATE SKIP LOCKED` and writes each attempt through the existing `notifications` / `push_done_at` path. Whether free Supabase projects still pause after inactivity was not verified, and a pause would silently stop pg_cron. That is one more reason for the heartbeat.

**The daily frame** copies Structured and Tiimo and keeps alarm-grade alerts to three a day. A **morning anchor** at Marc's chosen time ("Pick today's one thing — 3 waiting") goes out as a web push, a Shortcut Clock alarm and, if unacknowledged after 10 minutes, a Pushover emergency alert. A **midday anchor** folds the overdue roll-up into one forgiving message ("2 slipped — pick one, move the rest") instead of a red wall. Structured's ">3 unfinished" trigger is the right threshold. An **evening review** ("What got done today?") is a web push plus a badge that stays until he opens it, copying Tiimo's "stays visible until completed". A Sunday review is optional.

**Each timed task** gets the ladder below. It combines the two-touch evidence with Due's state machine, Late No More's change of form, and Duolingo's rotation. The interval restarts from Marc's last response. Swiping or ignoring changes nothing. Only Done, a snooze to a specific time, or "Drop" ends the series. Pushes in quiet hours are queued, not dropped, as Marvin does.

| Rung | When | Channel | Copy pattern (rotated from a pool of ≥5 per rung) | Copied from | Evidence |
|---|---|---|---|---|---|
| 0 Prepare | 30–60 min before (day before for appointments) | Web push | "Coming up 3:00: email Sam. Set-up: find Friday's dates" | Due "prepare", Steiner two-touch | B |
| 1 Start | At `remind_at` | Web push → `/now` | Title "Start: email Sam"; body = first step + "2 min" | Due at-time; Milkman "set up for you" | B |
| 2 Step | +10 min | Web push | Leads with the first step only: "Just open Mail and type Sam" | HeartSteps concrete action | B/C |
| 3 Cost | +20 min | Web push (starred: also Pushover priority 1, neutral text) | "10 minutes gets this done before 4" | Late No More hard prompt | C |
| 4 Alarm | +30 min, starred or must-not-miss only | **Pushover priority 2, Critical**, retry 60 s, expire 15 min, callback | Neutral: "Sarno: your 3:00 thing" | Due Prominent; Pushover API | D (mechanism only) |
| 5 Choice | +45 min, then stop | Web push | "Do it, move it, or drop it?" → Now screen | Marvin, Duolingo "change strategy" | C/D |

After rung 5 the task goes quiet and reappears in the next anchor's roll-up. That caps identical pressure per occasion, which is the Ancker lesson, without dropping the task. Normal-tier tasks stop at rung 3. That gives Due's default of about five touches with no alarm. **The Now screen**, which `navigate` opens, carries what iOS will not put on the notification. It shows the first step in large type with four buttons: Start, Done, Snooze, and Not really — break it down. Snooze offers human labels that each show the resulting time ("+10 min · 3:12", "After lunch · 1:30", "Tonight · 7:00", "Tomorrow 9am"), following Due's "At Time / From Now" presets and Apple's iOS 26.5 move to exact return times ([Zeera Wireless, unverified](https://zeerawireless.com/blogs/news/ios-26-5-reminders-snooze-update)). After the **second snooze** of the same task, the screen leads with "Make it smaller?" (a Claude breakdown), with Reschedule and Drop beside it. Repeated deferral marks an effortful or unclear task, not a missing ring. Done and Snooze also call `getNotifications({tag})` and `close()` to clear that task's stacked notifications. Whether `getNotifications` returns notifications displayed declaratively needs a device test. If it does not, stacking is acceptable, because a growing Lock Screen count is itself a cue. **Focus blocks** started from the Now screen schedule a halfway push and an end push at the moment Marc taps Start, since the phone cannot run the timer in the background. Copying Llama Life's "Nag", the end push repeats every 5 minutes until he picks extend or done.

**Wording rules** apply to every template. Each one names the action, its time and the smallest next step, and frames it as already set up. Each rung has at least five variants, and no variant is reused for the same rung within 14 days, following Duolingo's half-life. The variants rotate structure as well as words: question vs statement, time-led vs step-led, emoji or none. Visual change is what protects attention, but the title, body and badge are the only variables iOS allows. After a miss the copy is always forgiving and forward-looking ("Missed it, no problem. Next chance 4pm, just step 1"). It never uses streaks, counts of failures, or Marc's absence as the subject. A discreet mode, chosen by the user, replaces task text with "Your next thing is ready". Pushover and any other third-party channel always get neutral text, because neither private notes nor goal labels should leave Sarno.

**The heartbeat** guards against the worst failure. On every app open and every return to the foreground, the app calls `getSubscription()`, re-subscribes if the subscription is missing or its endpoint changed, and upserts `last_seen_at`. It shows a one-tap "Reconnect reminders" button whenever permission is not granted. The server sets 410, 404 and `VapidPkHashMismatch` subscriptions to disabled, but it does not trust 201, which can come back for a dead endpoint. Instead it looks at taps: **if pushes went out but no `navigate` tap and no app open arrived for 24 hours**, it sends one Pushover message: "Sarno reminders may be off — open the app once." Pushover is the right channel because it does not depend on WebKit. If Marc skips Pushover, the fallback is SMS at a few dollars a month. **Self-measurement** borrows the micro-randomised-trial idea. The log records "acted within 2 h" for every template, slot and rung. About one in five sends picks a template or slot at random, and a three-week review with Marc retires what stopped working. That lets the population studies' open questions (the best interval, whether rotation helps, how much is too much) be answered for the one person who matters. Response rates that keep falling, or Marc muting the app, are the real ceiling, and the system should respond by shifting load to fewer, better rungs rather than adding more.

| Build step | Contents | Gain in reach | Platform certainty |
|---|---|---|---|
| 1 | `remind_at`, pg_cron sender, declarative payload with `Urgency: high`, TTL 900–1800, `Topic`; Now screen; ladder rungs 0–3 and 5; template rotation; heartbeat; setup checklist | Every timed task actually fires; repeats until resolved | Payload and stacking verified in WebKit source; deep link verified by testers on 27.0.1 |
| 2 | Pushover: rung 4, anchor escalation, heartbeat channel, acknowledgement callback | Through silent mode and Focus; repeats until acknowledged | Documented API; iOS 26 Critical behaviour assumed unchanged |
| 3 | Shortcut that builds anchor Clock alarms from a Supabase function | Alarm-grade anchors with no push dependency | Locked-phone runs untested; needs a device test |
| 4 (only if 1–3 fall short) | Capacitor companion on TestFlight with AlarmKit and Time Sensitive pushes | The self-built ceiling; no third parties | Documented; effort estimate speculative |

Before relying on any of this, these device tests are still outstanding: delivery under each Focus with and without Sarno allowed; behaviour in Low Power Mode; mirroring to the Watch; whether Banner Style appears for the web app; whether `getNotifications` sees declarative notifications; whether the Shortcut runs while locked and during Sleep Focus; and Pushover Critical Alerts on iOS 27.

## Conclusion

The new evidence turns "send Marc as many notifications as useful" from a question about volume into one about variety and channel. Volume is cheap: no study found a daily ceiling, and Marc's phone already absorbs about sixty notifications a day. What is expensive is sameness. Every identical repeat loses about a third of its pull, and every message family loses its novelty within weeks. "As many as useful" therefore means as many *different* prompts as can be written, each moving up a rung in specificity and then in channel, rather than the same banner more often. The finding that removes guesswork about the platform is that iOS cannot make a web push louder. Any noticeability beyond an ordinary banner has to come from Marc's settings or from another app, and the $4.99 Pushover path gets most of the remaining distance.

The deeper implication is that the notification system and the task system cannot be designed separately. The ladder works only if each rung has something concrete to say: a time, a first step, a smaller version of the task. That content comes from planning at capture time, so Smart Add proposing `remind_at` and `first_step` is part of the notification design, not a separate feature. Because the evidence for snooze design, nag intervals and ADHD tolerance is grade D at best, the most valuable feature for the first month may be the least visible one: the log that records which prompt, at which time and in which words, actually got Marc moving.

---

# Document: ADHD task starting apps

# Build reminders that find Marc first

No app built for adults with ADHD has trial evidence that it improves real-world task completion. The apps ADHD users keep using all share four mechanics. First, **reminders that repeat until he explicitly marks the task done**: Due's Auto Snooze, Amazing Marvin's Bug Me, TickTick's Constant Reminder and Apple Reminders' new Urgent alarms. Second, **cutting the task down to one tiny first step** (Goblin Tools' Magic ToDo, Marvin's Smallest Step). Third, **one task on screen with a visible countdown** (Llama Life, Routinery, Tiimo). Fourth, **forgiving him instead of punishing him** (Finch, Structured). The research does not back any of these apps directly. It backs the structure they copy: CBT-style organisation and planning (53% vs 23% treatment responders in Safren's RCT), and help at the moment of planning. Adults with ADHD fail at *forming* a good plan (d = 1.60), not at *recalling* it (d = 0.03). The only adult ADHD trial of reminders found they brought people back faster but **did not raise completion**. So for Marc a push is necessary but not enough. Every push has to land on a single step he can do right away. The iPhone PWA can deliver most of this. Supabase pg_cron and pg_net call a function every minute to send Web Push, which makes the Vercel plan irrelevant. The app can nag until done, deep-link to a one-step "Now" screen, run a start timer that the server ends with a push, and watch for dead push subscriptions. It **cannot** ring through silent mode or Focus, show Lock Screen countdowns or widgets, or rely on notification action buttons. For must-not-miss items the fallback is Apple Reminders Urgent or Due. To avoid: streaks, red overdue walls, guilt copy, the same alert text over and over, and anything Marc has to configure.

## Persistence, a tiny first step and visible time explain the apps ADHD users keep

The notes cover about twenty-five products. The ones that best match Marc's three problems split cleanly by problem, and the mechanic behind each one is more specific than "ADHD-friendly design."

For **not forgetting**, the leaders are the persistent-reminder apps. Due repeats a missed reminder at 1, 5, 10, 15, 30 or 60-minute intervals, **5 times by default and up to 10**, until the item is marked done or rescheduled. It adds Critical and Prominent Alerts that "ring like an alarm until acted on" ([Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)). Its developer added Auto Snooze because "it was easy to miss notifications" ([Due blog](https://www.dueapp.com/blog/most-annoying-app.html)). Marvin's Bug Me nags every 5 minutes to 3 hours, only inside allowed days and hours, and "the ONLY way to get Marvin to stop bugging you about the Task is to mark it as done." Dismissing a notification clears only that one notification ([Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)). In iOS 26.2 Apple Reminders gained Urgent reminders that fire as Clock-style alarms through silent mode and Focus ([MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)). Todoist added full-screen urgent reminders on iOS ([Todoist Help](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)). These apps don't work because they remind. They work because **swiping the notification away does not count as dealing with it**.

For **starting**, the strongest mechanic shrinks the task. Goblin Tools' Magic ToDo turns one task into a checklist. A "spiciness" setting ranges from "a handful of reasonable chunks" to "a dozen-plus micro-steps", and any step can be broken down again ([datastudios explainer](https://www.datastudios.org/post/goblin-tools-magic-todo-s-task-breakdown-mechanism-and-pricing-explained)). Users call the steps "achievable and sensible" ([Goblin Tools, App Store AU](https://apps.apple.com/au/app/goblin-tools/id6449003064)). Goblin's weak spot is exactly Marc's need: it has **no reminders and no scheduling** ([ADHD productivity blog 2026](https://adhd-productivity.pages.dev/blog/best-ai-task-breaker-apps-adhd-2026)). Marvin goes further toward the first move. Its Smallest Step feature, still marked "Coming Soon", "splits a task into its tiniest first action", for example "Open document" for "Write report". Its Procrastination Wizard asks whether you are anxious or unmotivated before suggesting a strategy ([Marvin for Procrastinators](https://amazingmarvin.com/for/procrastinators/)). Routine players take the decision away completely. Routinery splits a routine into 1–5-minute timed steps and "a voice calls out what comes next" ([Routinery, App Store](https://apps.apple.com/us/app/habit-reminder-routine-timer/id1450486923)).

For **staying focused**, the pattern is one task on screen with time made visible. Llama Life gives each task its own countdown, shows an estimated finish time, plays a "gentle chime" when time is up, and asks extend or done ([Llama Life, App Store](https://apps.apple.com/us/app/adhd-organizer-llama-life/id6454469750); [Focus Bear review](https://www.focusbear.io/blog-post/review-of-llama-life-by-an-audhder)). Tiimo and Structured put the countdown on the Lock Screen and Dynamic Island through Live Activities ([Tiimo widgets & Live Activities](https://tiimoapp.com/product/widgets-live-activities)). Body-doubling services add another person: Focusmate's loop is "say hello at the beginning, declare your tasks, and say goodbye at the end" ([Focusmate FAQ](https://www.focusmate.com/faq)). Forest, the best-known focus app, "solves distraction, not task paralysis" ([getinflow, competitor](https://www.getinflow.io/post/best-alternatives-forest-app-adhd)). It does nothing for starting.

| Marc's problem | Apps that address it best | The mechanic that does the work | Evidence for the app itself |
|---|---|---|---|
| Forgets the task, or forgets to open the app | Due, Marvin Bug Me, TickTick, Apple Reminders Urgent | Repeat until an explicit Done or reschedule; alarm-grade delivery | Reviews and anecdote only |
| Can't start | Goblin Tools Magic ToDo, Marvin Smallest Step, Routinery | AI or guided breakdown, with the first step made tiny and concrete | Reviews and anecdote only |
| Can't stay on it | Llama Life, Tiimo, Routinery, Focusmate | One task, a visible countdown, a chime, extend-or-done; optional co-presence | Reviews; body doubling has only a 12-person VR study |
| Quits the tool | Finch, Structured, Habitica's later fixes | No punishment for gaps, retroactive logging, shame-free replanning | User reports; no controlled study |

None of these products cites a peer-reviewed study of its own efficacy. Routinery explicitly says it is not a medical device ([Routinery, App Store](https://apps.apple.com/us/app/habit-reminder-routine-timer/id1450486923)). The digital products with formal trials target something else. EndeavorOTC is a video game measured on a lab attention test, single-arm, with **27.1%** reaching a ≥30% symptom improvement ([Maple et al., CNS Spectrums](https://www.cambridge.org/core/journals/cns-spectrums/article/singlearm-pivotal-trial-to-assess-the-efficacy-of-aklt01-a-novel-digital-intervention-for-attention-in-adults-diagnosed-with-attention-deficit-hyperactivity-disorder/46F4D5CEAF7A8025FC3C9640F96DDB1F)). Inflow's waitlist-controlled RCT (N = 154) reduced symptoms but had **no significant effect on functional impairment** ([Antshel, McBride & Knouse 2025](https://journals.sagepub.com/doi/pdf/10.1177/10870547251384462)). Neither tells you how to get Marc to do the laundry.

## Reminders bring ADHD adults back faster but do not make them finish

The research that applies sits one level below the apps, in the techniques they borrow. Skills-based CBT for adult ADHD is built on one trusted list, a calendar checked daily, prioritising, and breaking tasks into first steps. It beats attention-matched controls: Safren's 86-adult RCT had **53% vs 23%** responders ([abstract](https://anhoriga.se/Artiklar-och-rapporter/2010/cognitive-behavioral-therapy-vs-relaxation-with-educational-support-for-medication-treated-adults-with-adhd-and-persistent-symptoms-a-randomized-controlled-trial)), and Solanto's 88-adult meta-cognitive therapy trial had **53% vs 28%** ([Am J Psychiatry](https://psychiatryonline.org/doi/abs/10.1176/appi.ajp.2009.09081123)). A 2024 component network meta-analysis of 43 trials found "organisational strategies" (organisation, planning, time management) roughly **doubled the odds of response (iOR 2.03)** ([Matsumoto et al., BMJ Mental Health](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683884/)). That evidence is **strong at package level and moderate at component level**. No trial has isolated any single app mechanic. Both landmark trials also included a weekly therapist session, and a self-guided app does not reproduce that.

The prospective-memory evidence shows *where* to put the help. In Fuermaier's study of 45 unmedicated adults with ADHD against 45 matched controls, the large deficit was in **task planning (d = 1.60)**. Recalling the plan (d = 0.03) and starting on an event cue were close to normal. The authors concluded that impairments "mainly emerged from deficient planning abilities" ([Fuermaier et al. 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/)). In general populations, if-then plans ("when X happens, I do Y") have a medium-to-large effect on goal attainment (**d = 0.65** across 94 tests) ([Gollwitzer & Sheeran 2006](https://kops.uni-konstanz.de/entities/publication/2e749bfb-8533-437c-8203-7e788c910c5f)). In ADHD they have only child lab studies behind them ([Gawrilow et al. 2011](https://www.socmot.uni-konstanz.de/sites/default/files/Gawrilow_Gollwitzer_Oettingen_Executive_Function_JSCP_2011.pdf)). A habit study found reminders "supported repetition but hindered habit development", while cues tied to an existing routine "led to increased automaticity" ([Stawarz, Cox & Blandford, CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/)). The design implication is that the app should do the planning for Marc at capture time (when, where, first step) and then fire the cue. More alarms help less than a better plan.

The one adult ADHD trial of reminders makes this concrete. In a micro-randomised trial of 109 adults in the self-guided myADHD programme, SMS reminders sped up logins but had **no effect on module completion, number of logins or practice of coping strategies** ([Nordby et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9149073/)). In a symptom-monitoring study only **22% replied to every SMS prompt** ([Schofield et al. 2026 scoping review](https://public-pages-files-2025.frontiersin.org/journals/digital-health/articles/10.3389/fdgth.2026.1746732/pdf)). Self-guided tools mostly lose their users. Inflow's feasibility study lost about 60% by week 7 ([Knouse et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9931323/)). Ireland's HSE adult ADHD app averaged about **9 minutes over 2.4 sessions**, with engagement peaking in the first two weeks. Its users said they would need "high levels of dopamine" just to engage ([Seery et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11847728)).

Together these give a three-part rule for Marc's system: **reach, land, shrink**. The server has to reach him, because he will not come to the app. The push has to land on one screen with one thing on it, not a backlog. That thing has to already be small, because the measured ADHD weak point is turning "do the taxes" into "open the envelope." The reward side of the literature supports making feedback immediate. Adults and children with ADHD discount delayed rewards more steeply (meta-analysis, N = 3,913) ([Jackson & MacKillop 2016](https://www.pubmed.gov/27722208/)), so the reward should come the moment he taps Start, not in a weekly summary.

## An iPhone PWA can nag Marc but cannot ring through Focus

Web Push is the only native way a home-screen web app can reach someone who has not opened it. It works only after the app is installed to the Home Screen and the user grants permission with a tap ([WebKit, Web Push for Web Apps](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)). Every push has to show a visible notification. Silent push is not allowed ([Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026)). The app also cannot schedule anything on the phone itself: iOS WebKit has no Background Sync, Periodic Sync or Notification Triggers, so **every reminder, every repeat and every end-of-timer alert must come from the server**. Declarative Web Push (iOS 18.4+) is the payload format to use. It needs only a `title` and a `navigate` URL that opens on tap, it can set `app_badge`, and "there is no penalty for service workers failing to display a notification" ([WebKit, Meet Declarative Web Push](https://webkit.org/blog/16535/meet-declarative-web-push/)). That matters because Marc's notes say a closed app opens to its root on a service-worker tap (WebKit 252544) and that `pushsubscriptionchange` never fires (WebKit 273063) ([PWA_PREP.md, verified 2026-10-27](/home/user/accountability/docs/PWA_PREP.md)).

The limits decide where fallbacks are needed. No source documents a time-sensitive or critical interruption level for web push, so pushes most likely arrive as ordinary notifications. If so, Focus will hold them back unless the web app is on that Focus's allowed list, and Notification Summary may batch them. That needs a device test. Custom action buttons ("Start", "Snooze") are reported not to work on iOS ([Webventures 2024](https://webventures.rejh.nl/blog/2024/web-push-ios-one-year/); [Apple Developer Forums](https://developer.apple.com/forums/tags/wwdc2022-10098)), so snooze and done have to live on the screen the push opens. Widgets, Lock Screen countdowns, Live Activities, Watch apps, alarms and app blocking are all native-only. Subscriptions die silently: endpoints have been seen to "expire in a week or two" with no error at send time ([Apple Developer Forums 728796](https://developer.apple.com/forums/thread/728796); [XenForo](https://xenforo.com/community/threads/lost-push-subscriptions-for-ios-pwa.215833/)). For someone with ADHD this is the worst failure, because a dead channel looks the same as a quiet day.

Scheduling is solved without knowing the Vercel plan. Vercel Hobby cron runs **at most once a day**, with up to an hour of slack ([Vercel docs](https://vercel.com/docs/cron-jobs/usage-and-pricing)). Supabase documents `cron.schedule('* * * * *', …)` plus `net.http_post` to call an Edge Function every minute, with credentials kept in Vault ([Supabase docs](https://supabase.com/docs/guides/functions/schedule-functions)). pg_net can just as well POST to a plain Vercel serverless endpoint every minute. That reuses the `web-push` sender already in `api/notify.js`, since Vercel is then only serving a request, not scheduling one. One risk is unverified: free Supabase projects reportedly pause after inactivity, which would silently stop pg_cron.

The Sarno app is closer to this than it looks. `push_subscriptions` already records `last_success_at`, `failure_count`, `disabled_at` and `last_error`. `notifications` already has a `reminder_due` type with a `push_done_at` retry signal. `reminder_due` is deliberately kept out of `PUSH_TYPES`, and pushes go out with `TTL: 3600` ([0003_notifications.sql](/home/user/sarno/SarnoPWA/supabase/migrations/0003_notifications.sql); [0006_notification_reliability.sql](/home/user/sarno/SarnoPWA/supabase/migrations/0006_notification_reliability.sql); [api/notify.js](/home/user/sarno/SarnoPWA/api/notify.js)). The real gap is time. `personal_todos.due` is a `date`, and Smart Add's tool schema says "Date only — there is no time column", so it folds times into the text ("Call the dentist - 5pm") ([0002_personal_todos.sql](/home/user/sarno/SarnoPWA/supabase/migrations/0002_personal_todos.sql); [api/smart-add.js](/home/user/sarno/SarnoPWA/api/smart-add.js)). Nothing can fire at 5pm until the database knows it is 5pm.

The non-push fallbacks rank by how hard they are to ignore and how little setup they need. Apple Reminders Urgent and Due's Critical Alerts are the only routes that break through silent mode and Focus. A web app has no API into Reminders, so the realistic path is a tip, or a user-installed Shortcut that runs "Add New Reminder." SMS is the most hard-to-ignore server channel. A US 10DLC number needs A2P registration; the Sole Proprietor path costs about **$2/month plus about $19 one-off** before per-message fees ([Twilio A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc); [Twilio support](https://support.twilio.com/hc/en-us/articles/1260803965530)). A subscribed ICS calendar feed with `VALARM`s can put fixed daily anchors on the Lock Screen with no push at all. But iPhone has a per-calendar "Remove Alerts" switch ([Apple Calendar guide](https://support.apple.com/en-au/guide/calendar/icl1022/16.0/mac/26)), and iOS polls subscribed feeds on its own schedule, so it suits stable anchors, not live nudges. Shortcuts Time of Day automations can "run without asking" ([Apple Shortcuts guide](https://support.apple.com/et-ee/guide/shortcuts/apd690170742/ios)), but one developer reported one not firing while the phone was locked ([Apple Developer Forums 665845](https://developer.apple.com/forums/thread/665845)).

## Twelve mechanics ranked for Marc's private reminders

The ranking weighs four things: how directly a mechanic attacks Marc's three problems, whether an iPhone PWA can actually do it, the strength of evidence, and setup cost. Setup counts because anything Marc must configure is itself a task he will not start. Evidence labels: **Strong** means several adult ADHD RCTs or meta-analyses agree. **Moderate** means one or two adult trials, or mixed-age meta-analyses. **Weak** means indirect, child-only or general-population evidence. **Anecdotal** means user reports and vendor practice only.

| # | Mechanic for Marc | Copied from | What the iPhone PWA can do | Fallback where it cannot | Evidence |
|---|---|---|---|---|---|
| 1 | **Server-scheduled push at a real time**, deep-linked to the task | Due, Structured (morning and overdue reminders), Tiimo (start reminders) | pg_cron every minute → function → Declarative Web Push with `navigate=/now?id=…`, short TTL, `app_badge`. Needs a `remind_at timestamptz` column | Not delivered under Focus unless the web app is allowed; for must-not-miss items, Apple Reminders Urgent or Due | Moderate: reminders speed return ([Nordby](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9149073/)) but do not raise completion alone |
| 2 | **Land on a one-step "Now" screen**: the task's first step in large text, plus Start, Done, Snooze 10 min, Later today, Tomorrow | Goblin Taskmaster, Llama Life, Marvin Smallest Step | Fully: an ordinary route, opened by `navigate` | Replaces the action buttons iOS ignores | Moderate: breakdown is part of CBT/MCT packages; problem-solving component iSMD 0.42 ([Matsumoto](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683884/)) |
| 3 | **Nag until done**: default every 10 min, up to 5 times (Due's default), quiet hours, only for items Marc stars | Due Auto Snooze, Marvin Bug Me, TickTick Constant Reminder | Fully, server-side: only Done or a reschedule stops it, not a dismissal | Cannot ring like an alarm; SMS escalation optional | Anecdotal (strong user praise; "mark done to shut it up" risk) |
| 4 | **Smart Add proposes when + cue + first step** at capture ("after school run, open the bill email") | Goblin Compiler, Todoist Ramble, Tiimo AI co-planner | Fully: extend the existing Claude tool schema with `remind_at`, `cue`, `first_step`; Marc confirms as today | None needed | Strong in general populations (d = 0.65); planning is the ADHD deficit (d = 1.60) |
| 5 | **"Break it down" on any task**, with a 1–5 granularity setting and the option to re-break a step; only step 1 shown on Now | Goblin Magic ToDo | Fully: server-side Claude call, editable checklist | None needed | Moderate as a CBT component; no trial of AI breakdown |
| 6 | **Start timer with visible countdown**, chime, extend-or-done; the server schedules the end push when he taps Start | Llama Life, Tiimo Focus timer, Routinery | In-app countdown and `speechSynthesis` work while the app is open; the end alert must be a server push | No Lock Screen or Dynamic Island countdown; the push and the badge stand in | Weak: timing deficits shown ([Marx 2021](https://eprints.soton.ac.uk/456003)), no adult timer trial |
| 7 | **Heartbeat on the push channel**: re-check `getSubscription()` on every open, show "Reminders: on / last confirmed", raise an alarm if no opens or acks in about 36 h despite sends | Engineering response to iOS subscription death | Fully, using existing `last_success_at`/`failure_count` plus a new `last_ack_at` | SMS to Marc ("Open Sarno once to reconnect reminders"), or an opt-in, content-free note to Yola | Observed failure mode ([Webscraft 2026](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en)) |
| 8 | **Two or three fixed daily anchors** ("Morning: pick your one thing", "After school run", "Evening reset"), timed to routines, not the clock | Structured morning reminder, Sunsama ritual (lite), CHADD event cues | Fully, as scheduled pushes | ICS feed with `VALARM` for the anchors as a second channel | Strong for daily review in CBT; batching to about 3 a day improved wellbeing ([Fitz et al. 2019](https://communities.springernature.com/posts/batching-notifications-can-improve-attention-well-being-and-productivity)) |
| 9 | **Escalate by changing the message, not the volume**: push 1 names the task, push 2 names the first step, push 3 offers "just 2 minutes", then stop quietly and fold the task into the next anchor | Marvin (Bug Me → Wizard), Duolingo novelty bandit | Fully: copy rotation in the sender | n/a | Weak: habituation shown in warning studies ([MISQ](https://misq.umn.edu/misq/article/49/4/1357/3281/The-Fog-of-Warnings-How-Non-Security-Related)); Duolingo engineered against it ([KDD 2020](https://sotaverified.org/papers/a-sleeping-recovering-bandit-algorithm-for)) |
| 10 | **Shame-free recovery plus an automatic Done list**: no red overdue state, missed items get "Do now / Later / Drop", log yesterday's wins after the fact, offer a breakdown after 3 reschedules | Structured Replan, Habitica "Record Yesterday", Marvin Procrastination Count, ADDitude Ta-Da list | Fully: domain logic and UI | n/a | Weak (avoiding harm); strong, consistent user voice |
| 11 | **Pre-filled routine player** for recurring basics ("leave the house", "evening reset"): 1–5-minute steps, a voice reads the next step, skip/stretch/+5 | Routinery, Brili | In-app only; the start push and end-of-step pushes come from the server | No Lock Screen progress | Anecdotal (Routinery 4.7 from about 18K ratings) |
| 12 | **"Starting now, join me?" ping to Yola**, camera-free, with an "I'm with you" presence marker and a gentle end check | Focusmate, Flow Club, Shimmer, Dubbii | Push to Yola already exists (direct-message path) | If nobody is free, a labelled simulated session or a recorded clip | None found to Weak (N = 12 VR study, human ≈ AI) ([Ara et al. 2025](https://arxiv.org/html/2509.12153v1)) |

Items 1 to 3 are the minimum viable loop and should ship together. A push that opens a list fails Nordby's lesson. A Now screen nobody is sent to fails Marc's memory. A single push with no repeat is what Apple Reminders users already find too easy to swipe away ([Reddit mirror, Mar 2026](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)). Items 4 and 5 move effort to planning time, where the evidence puts the typical adult ADHD deficit. They are cheap because Smart Add already has Claude, a confirm step and a privacy-tested context builder. Item 6 is the focus mechanic. The detail that matters is that the end-of-timer chime has to be a server push scheduled at the moment Marc taps Start, because the phone will not run the timer once the app is in the background. Item 7 is unglamorous and close to mandatory, because without it the whole system can stop and nobody will notice. Items 11 and 12 are worth doing only once the core loop has survived the two-to-three-week novelty drop that the HSE data and user reports describe.

### How the build fits Sarno's rules

The feature can stay Marc-only and private without touching anyone else's experience. Add `remind_at timestamptz`, `first_step`, `cue`, `nag` (boolean), `snoozed_until`, `reschedule_count`, `started_at` and `last_ack_at` to `personal_todos`, or to a sibling table under the same `user_id = auth.uid()` policies. Gate scheduling on a per-user `reminder_prefs` row (quiet hours, IANA time zone, nag interval, SMS opt-in), and give that row only to Marc. The scheduler selects only users with prefs enabled, claims due rows with `FOR UPDATE SKIP LOCKED`, and writes `reminder_due` rows with `channel='push'` and a dedupe key per attempt, so the existing `push_done_at` retry path applies. Yola and the sitters keep today's in-app-only reminders, because nothing schedules for them. The test that keeps `PUSH_TYPES` and `NOTIF_PUSH_TYPES` in step needs updating, because `reminder_due` becomes pushable per user rather than globally.

Three privacy points follow from the existing design. First, the `notifications` table already treats `title` and `body` as lock-screen text. Marc's to-do text is his own, but a "discreet" mode ("Your next thing is ready") costs nothing and helps when sitters are near his phone. Second, any SMS or Yola-facing heartbeat must carry **no task content**, only "reminders may be off." Third, the scheduler runs with the service role, so it should read only the columns it needs and never write task text into logs or `last_error`. Use a short TTL (15–30 minutes) for nags, so a "start now" push held overnight does not arrive stale at 7am, and keep the current hour-long TTL for anchors.

Marc will have to do a short one-time setup, and the app should show its status rather than assume it: notification permission granted, the web app added to his Focus allowed apps, Notification Summary off for Sarno, and optionally the calendar feed subscribed with alerts on. Yola or Marc can do this once, from a single checklist screen. Device tests still owed before relying on any of it: delivery under Focus and Summary, behaviour when locked or in Low Power Mode, whether pushes mirror to his Watch, whether Web Speech dictation works in the standalone app, and the iOS default for subscribed-calendar alerts.

## Shame, streaks, noise and setup kill ADHD tools before missing features do

The abandonment evidence is mostly user testimony, but it is consistent, and it points at four anti-patterns Marc's build should exclude outright.

**Shame and punishment.** Habitica takes HP for missed Dailies, and at zero HP the character dies, losing a level, all gold and a piece of equipment ([habitbox review](https://habitbox.app/blog/habitica-review)). Forest kills your tree if you leave the app ([Forest](https://forestapp.cc/llms-full.txt)). Duolingo's last-resort line, "These reminders don't seem to be working. We'll stop sending them for now", is widely read as passive-aggressive ([Taplytics](https://taplytics.com/blog/duolingo-sends-push-notifications-to-let-users-know-they-know-theyre-not-engaging-with-their-reminders)). Adults with ADHD report lower self-compassion and more perceived criticism (n = 1,203) ([Beaton et al. 2020](https://eprints.whiterose.ac.uk/165039)). Self-esteem and emotion regulation partly account for the link between ADHD and procrastination ([Bodalski et al.](https://mijn.bsl.nl/adhd-symptoms-and-procrastination-in-college-students-the-roles-/23602698)). The reward literature is about gains; a 2018 adolescent study found no general delay aversion when the outcomes were losses ([Taylor & Francis](https://www.tandfonline.com/doi/full/10.1080/09297049.2018.1508563)). Nothing supports loss mechanics for Marc. The forgiving pattern is what users credit for staying: Finch "doesn't yell at you, get upset at you, or punish you" ([r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1r7xlvj/snapshots/2026-02-18T17%3A10%3A27.886079Z)), and Structured lets users drag unfinished blocks down "rather than feel guilty" ([adhdproductivity.org](https://adhdproductivity.org/structured-review-for-adhd/)). Copy should never make Marc's absence the subject.

**Streak loss.** Duolingo's own team found that loss aversion kicks in at a 7-day streak and that **two freezes beat three** ([Lenny's Podcast summary](https://podcasts-distilled-hugo-content.pages.dev/lennys-podcast-product-career-growth/behind-the-product-duolingo-streaks-jackson-shuttleworth-group-pm-retention-team/)). That was measured on people who want a streak. For ADHD users the downside is lopsided. The most-upvoted r/ADHD account describes two weeks of hyperfocus, a missed day, a shame spiral and deletion, repeated across 15 trackers. The streak-free tracker that poster built lasted three months, "which is a first" ([r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1r7xlvj/snapshots/2026-02-18T17%3A10%3A27.886079Z)). A CSCW 2026 preprint argues ADHD struggles come from tools that assume "consistent self-regulation and linear time" ([Chen, Meng & Nie](https://arxiv.org/abs/2603.17258)). Count what happened (a Done list, totals) and never count consecutive days.

**Notification blindness.** Attention to repeated warnings falls over a working week and recovers only after breaks ([MISQ](https://misq.umn.edu/misq/article/49/4/1357/3281/The-Fog-of-Warnings-How-Non-Security-Related)). Clinicians override **49–96%** of interruptive alerts ([PMC12307096](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12307096/)). Due users admit marking things done "just to get it to shut up" ([ADDitude, via search](https://www.additudemag.com/reviews/post/adhd-organization-tools-you-will-use-everyday/)). That is why nagging in the ranked list is capped, limited to starred items, held to quiet hours, and escalates by changing the message rather than repeating it. It is also why the Now screen offers an honest "Not really, push it" next to Done. The opposite failure is real too: turning notifications off entirely *raised* anxiety in Fitz's field trial, so the answer is fewer, better pushes, not none.

**Setup overhead.** Structured takes about 15 minutes to set up, and its reviewer says minute-level planning "killed his early use" ([adhdproductivity.org](https://adhdproductivity.org/structured-review-for-adhd/)). Habitica is "a little messy and difficult to navigate" ([App Store](https://apps.apple.com/us/app/habitica-gamified-taskmanager/id994882113?see-all=reviews)). HSE app users were stopped by "not knowing where to start" ([Seery et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11847728)). Marvin's power comes from dozens of switchable strategies, and its own help centre warns it will not make anyone "a productivity monster overnight" ([Marvin Help](https://help.amazingmarvin.com/articles/1949435-will-marvin-fix-my-procrastination-problem)). For one user, strong defaults beat options: nagging on for starred items, a 10-minute interval, the first step shown, and anchors pre-filled. Motion adds a related warning: silent automatic reshuffling "can feel like a loss of control" ([toolfinder](https://toolfinder.com/comparisons/motion-vs-sunsama)). So any automatic move of Marc's tasks should be proposed, not imposed, the same confirm-first pattern Smart Add already uses.

## Conclusion

The research changes what the main feature is. The intuitive build is "send Marc reminders." The evidence says reminders alone change *when* he comes back, not *whether* he finishes. The value is in what the reminder carries, and the measured adult ADHD deficit is in planning, not recall. So the Claude call that turns "sort the car insurance" into "at 9:15 after drop-off, open the renewal email" may do more than any amount of nagging. It is also the piece Sarno can build most cheaply, because Smart Add already exists. The push is the delivery mechanism and the first step is what it delivers.

The second shift is about failure modes. For a user who forgets to open apps, the most dangerous bug is silence, not annoyance: an iOS subscription that quietly expires, a Supabase project that pauses, a Focus mode that swallows every push. Since no app or study can tell Marc whether this works for *him*, the system should treat itself as an n-of-1 experiment. Log sends, acknowledgements, starts and completions, review them with him after the first three weeks, and keep only what moved his numbers.

---

# Document: Best free ADHD apps by reviews

# Genuine reviews crown free tools that interrupt

For adults with ADHD, the free help with the strongest genuine evidence is not an ADHD app. It is what is already on the iPhone. **Clock alarms, Apple Reminders (which since iOS 26.2 can ring as Urgent alarms through silent mode and Focus) and a calendar** are named more often and upvoted more heavily than any dedicated app. In 1,055 comments across the 30 largest recent Reddit recommendation threads, alarms alone drew 40 comments and 276 upvotes. Four dedicated tools also have solid genuine evidence and give away the feature people praise. **Finch** is a gentle virtual pet. It is the most-mentioned app, with 768K ratings, but opinion splits over streak guilt. **ScreenZen** is a fully free app-delay tool and got the single most-upvoted recommendation (69). **Goblin Tools' Magic ToDo** breaks tasks down and is free on the website. **Free body doubling** covers Focusmate's 3 sessions a week, Discord and YouTube. Users explain in their own words why these work, and their answers come down to five mechanisms: the tool comes to you, it shrinks the first step, it rewards without punishing, it makes escaping harder, or another person is present. The ADHD-branded planners that lead "best ADHD app" lists (Tiimo, Llama Life, Inflow, Saner, Structured) barely appear in genuine conversation, with 0–6 mentions each. Each either has no free tier or charges for a basic such as recurring tasks. Most of those lists are written by competing vendors. For Marc, two earlier recommendations change. First, the paid Due and Pushover can give way to Reminders Urgent at $0. He loses only automatic repeat series and server-triggered alarms. Second, the planned two-week trial should start from an alarm that sends him into the tool, because "set it up, use it a week, forget it exists" is the commonest failure. All of this rests on self-selected testimony. No study shows that any consumer app improves adult ADHD outcomes over the long term.

## Alarms, Reminders and a calendar outrank every ADHD app in genuine reviews

The ranking below weighs evidence the way the research notes recommend. Genuine Reddit comments and recent App Store reviews count most. Dated reader surveys come next, then creator and journalist picks. Vendor content counts least. The Reddit evidence comes from the Arctic Shift archive, which serves original posts and comments with their scores and dates ([Arctic Shift](https://arctic-shift.photon-reddit.com)). Researchers took the 30 largest threads where ADHD users ask for or share tools, dated July 2025 to October 2026, and counted which tools 1,055 comments name. Developer launch posts were excluded. A mention is not always an endorsement, and the counts are relative, not absolute. Store star ratings are nearly useless for ranking. They sit between **4.3 and 4.95 for every app checked**, and some apps prompt for a rating before the user has gotten any value from the app ([Apple RSS, Tiimo](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1480220328/sortby=mostrecent/json)). The 50 most recent US reviews for each app, pulled on 28 October 2026, separate the apps far better.

| Rank | Tool | Cost to Marc | Strongest genuine evidence | Strength |
|---|---|---|---|---|
| 1 | **Clock alarms + Apple Reminders + Siri** | $0, built in | Alarms: 40 comments / 276 upvotes. "Setting an alarm right away" got 102 upvotes. Apple Reminders, Notes and Calendar are "free and work well together" (26). Listed in a 242-upvote app-stack post | Strong |
| 2 | **A calendar** (Apple, or Google synced to it) | $0 | Google Calendar: 37 comments in 15 threads (120 upvotes). "Routines and a calendar have been a godsend" (54) | Strong |
| 3 | **Finch** | $0 core | 34 comments / 124 upvotes. Top app comment (202) is about the free version. Streaks of 395 and 600+ days. But counter-comments got 67 and 77 | Strong, polarised |
| 4 | **ScreenZen** | $0, no paid tier | Top single recommendation (69), plus 30; 130 upvotes from 8 comments. Rated 4.86 from 52.6K; recent reviews average 4.56 | Strong, focus only |
| 5 | **Goblin Tools website** (Magic ToDo) | $0 on web (iOS app $0.99) | 14 comments / 58 upvotes; "Goblin.tools" got 44. Recent iOS reviews average 3.58, mostly pricing anger | Moderate |
| 6 | **Free body doubling** (Focusmate free, Discord, YouTube) | $0 (Focusmate: 3 sessions a week) | Four-year Focusmate users. Comments at 77 and 35. A Discord body-doubling post got 892 | Moderate |
| 7 | **Focus Friend** | $0 core | Ranked first in the 242-upvote stack post. Rated 4.83 from 9.6K; recent reviews average 4.64 | Moderate, young app |
| 8 | **Routinery** (free plan) | $0 for 2 routines, with ads | The OP of a 257-upvote thread credits it. Rated 4.72 from 18K | Moderate, capped |
| 9 | **Todoist / TickTick** (free tiers) | $0 tiers | Named often (20 and 17 comments) but upvoted little (28 and 38). Recent paywall complaints | Weak to moderate |
| 10 | **Structured** (free tier) | $0, no recurring tasks | "The only one I've been able to stick to". Recent reviews average 4.00, with complaints about recurring tasks being paid | Weak for Marc |

Sources for the table: the Reddit threads and comments cited in the sections below, and recent App Store review feeds ([ScreenZen](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1541027222/sortby=mostrecent/json); [Focus Friend](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6742278016/sortby=mostrecent/json); [Goblin Tools](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json); [Structured](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)).

The top of the ranking is not close. Phone alarms beat every dedicated app on upvotes, and the most practical advice in the largest 2026 r/ADHD thread on "tools that stuck after the novelty wore off" (568 upvotes, 547 comments) was not an app at all: **"Setting an alarm right away when I need to do stuff" (102)** ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou3xdln/)). The Apple built-ins win partly *because* they need no choosing. One user put it this way: "trying to find the best apps to help me, just becomes a distraction in itself. Now I use the apple ecosystem, reminders, notes and calendar. They're free and work well together" (26, r/ADHD, 1 July 2026) ([Reddit](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouuv2yp/)). A 242-upvote r/adhdwomen stack post keeps Apple Calendar, Reminders and Notes "constantly open on all my devices because I don't trust my memory", alongside "alarms and reminders for basically everything" in the Clock app ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/)). Siri capture shows up repeatedly: "Anytime I need to remember to do something I summon Siri, 'set a reminder to … when I get home'" ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3u241j/)). Google Calendar users describe putting "everything" in it, with bills "set until the end of time" (32), and syncing it into Apple Calendar to get iPhone notifications (18) ([Reddit](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouufaxd/); [Reddit](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouusgri/)). ADDitude's reader-recommendation list from 2022 followed the same pattern: Apple Reminders with location triggers, Siri ("much faster than doing it manually"), a shared calendar and a whiteboard ([ADDitude](https://www.additudemag.com/adhd-productivity-apps/)). Two independent samples, four years apart, landing on the same answer is the strongest consistency in the whole evidence base.

Paper and sticky notes technically score higher than any app (68 comments and 264 upvotes for paper). For Marc that matters less than it looks, because paper cannot interrupt him. The thread that praised sticky notes under the monitor (54) also produced the decisive reply: "those sticky notes become invisible after a day or two 🤣 It's cellphone alarms for me that work" ([Reddit](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/comment/n6wk16n/); [Reddit](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/comment/n7086ni/)). Apple Reminders' own store numbers (4.83 from 1.05 million ratings) reflect that it comes preinstalled, not that it suits ADHD ([App Store](https://apps.apple.com/us/app/reminders/id1108187841)). Its new Urgent alarms in particular have **no ADHD-specific user reviews yet**. Their high rank here rests on the mechanism users praise in alarms generally, not on reviews of the feature itself.

## What $0 actually buys, app by app

Free tiers differ more than marketing admits. Recent one-star reviews cluster around **basics put behind a paywall**: recurring tasks in Structured, custom reminders in Todoist, week and month views in TickTick, and a pricing switch in Goblin Tools ([Apple RSS, Structured](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json); [Apple RSS, Todoist](https://itunes.apple.com/us/rss/customerreviews/page=1/id=572688855/sortby=mostrecent/json); [Apple RSS, TickTick](https://itunes.apple.com/us/rss/customerreviews/page=1/id=626144601/sortby=mostrecent/json)). The table states what each free version includes, from official pricing or help pages where they could be read.

| App | Free version includes | Paywalled | Trap to avoid |
|---|---|---|---|
| **Apple Reminders / Clock / Calendar** | Everything, including Urgent reminders that sound as an alarm "even when the phone is silenced or a Focus is on", with Snooze and an optional Complete button on the alarm ([PhoneArena](https://www.phonearena.com/news/new-useful-features-hit-the-iphone-ios-26.2-released_id176598); [9to5Mac](https://9to5mac.com/2025/11/04/ios-26-2-alarms-and-timers-in-reminders/)) | Nothing | Users report the Urgent toggle appears only on iCloud lists ([Apple Community](https://discussions.apple.com/thread/256211741)) |
| **Finch** | Pet, daily goals and to-dos, mood and energy check-ins, journaling, breathing, push reminders, no ads; streaks can be switched off ([Headway](https://makeheadway.com/blog/finch-app-review/); [Reddit](https://www.reddit.com/r/adhdwomen/comments/1wklrkx/_/parirja/)) | Finch Plus ($5.99–$69.99): extra content, customisation, deeper stats ([App Store](https://apps.apple.com/us/app/finch-self-care-pet/id1528595748)) | The 7-day trial converts to a paid plan. The 3-day trial ends on its own ([Finch FAQ](https://help.finchcare.com/hc/en-us/articles/41672084300557-FAQs)) |
| **ScreenZen** | All of it: delay before an app opens, a "reason for opening" prompt, limits ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3teagg/)) | None | A new persistent notification and setup complexity are the recent complaints ([Apple RSS](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1541027222/sortby=mostrecent/json)) |
| **Goblin Tools** | The website is "free with no ads or paywalls": Magic ToDo, Compiler (turns a brain dump into a task list), Estimator and more ([goblin.tools About](https://goblin.tools/About)) | iOS app $0.99; some advanced features need Pro | The iOS app has recent anger over a move to subscription. Lookalike listings exist ([App Store lookalike](https://apps.apple.com/us/app/goblin-tools-ai-adhd-planner/id6739871366)) |
| **Focusmate** | 3 sessions a week, "no credit card required" ([Focusmate pricing](https://www.focusmate.com/pricing)) | Unlimited: $8/month annually | No official iOS app was found, so it runs in Safari |
| **Focus Friend** | Timer, Deep Focus Mode app locking, Live Activity, the pet ([App Store](https://apps.apple.com/us/app/id6742278016); [Good Good Good](https://www.goodgoodgood.co/articles/hank-green-focus-friend)) | Cosmetic Pro | None found |
| **Routinery** | 2 routines with a step-by-step player, per-step timers and voice; ads ([App Store](https://apps.apple.com/us/app/id1450486923)) | More routines, no ads ($36–$39.49/yr) | The cap bites after a trial lapses ([Reddit](https://www.reddit.com/r/ADHD/comments/1x0uriy/)) |
| **Forest / Flora** | Forest's timer and tree are now free on iOS. Flora is free ([Forest](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515); [Flora](https://apps.apple.com/us/app/flora-green-focus/id1225155794)) | Forest Plus, real-tree planting | Older listicles still call Forest a $3.99 app |
| **Todoist Beginner** | 5 projects, an automatic reminder at the task time, limited Ramble voice capture ([Todoist pricing](https://todoist.com/pricing)), and one urgent alarm reminder per task ([Todoist Help](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)) | Custom reminders, calendar layout; Pro $5–7/month | A recent reviewer still believes "even the simple reminders require payment" |
| **TickTick free** | 2 reminders per task, 9 lists, basic widgets, 5 habits ([TickTick upgrade](https://ticktick.com/about/upgrade)) | Week and month calendar views, more reminders; $49.99/yr | Whether Constant Reminder is free is **unresolved** |
| **Structured free** | Timeline, notifications, widgets, Live Activities, Pomodoro ([Structured Help](https://help.structured.app/en/articles/1897986)) | **Recurring tasks**, calendar import, AI | "Why do I have to pay to have reoccurring task… ITS A DAILY PLANNER" (27 Oct 2026) |
| **Tiimo** | "Basic planner, limited AI chats, and 1 profile" ([App Store](https://apps.apple.com/us/app/tiimo-visual-daily-planner/id1480220328)) | Most of what is praised | The monthly plan is "charged right away" ([Tiimo pricing](https://www.tiimoapp.com/pricing)). Recent reviews average 3.70 |

Several apps that often appear in ADHD lists have **no usable free tier at all**. Llama Life wants a card for a 7-day trial and "does not have a Free plan" ([Llama Life help](https://intercom.help/llama-life/en/articles/6456361-free-trial-and-paid-plans)). Brili is a 10-day trial, then $7.99 a month or more ([App Store](https://apps.apple.com/us/app/id1516036620)). Flow Club costs $40 a month after its trial ([Flow Club help](https://help.flow.club/en/articles/782785)). Fabulous carries the worst reputation: "I cancelled the free trial but was charged over and over again" ([Apple Discussions](https://discussions.apple.com/thread/256002729)). An r/adhdwomen commenter says it "specifically targets Adhd people and then uses our weak points against us" (17) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3ut5qd/)). Another warns "NEVER try Attainify… No easy way to quit after the free trial" (15) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3uk5t4/)). For a forgetful user who will not pay, the hidden cost of any "free trial" is the renewal date he will not remember. The safe rule is to never tap one. Opal's free tier is disputed: its help page says 3 recurring rules, while a competitor says 1 ([Opal help](https://help.opalapp.com/article/how-and-why-should-i-subscribe-to-opal-pro)). ScreenZen makes the question moot.

## Five mechanisms, in users' own words, do the work

The reasons users give for why a tool stuck are concrete, and they repeat across apps. Each top pick works through one or two of five mechanisms. Each mechanism also has a failure mode, and users describe those just as clearly.

### The tool comes to you, so forgetting to open it stops mattering

This is the mechanism behind ranks 1 and 2, and it answers Marc's hardest problem. A user in a 492-upvote thread wrote: "I've tried sooooo many task management apps and planners and literally ignore every notification" ([Reddit](https://www.reddit.com/r/ADHDers/comments/1oh5es3/)). Alarms fix that because, in another user's words, "alarms punch through, which I realize I need" ([Reddit](https://www.reddit.com/r/adhdmeme/comments/1tsx1ru/comment/oozryek/)). The working trick is to **rename the alarm to the task**: "I have started using my actual alarm and renaming it to whatever it is I need to remember" (13) ([Reddit](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllr1tn/)). One long-term success story uses "alarms for time sensitive stuff, and iOS's Reminders app for the stuff that's a little more nebulous" ([Reddit](https://www.reddit.com/r/ADHD/comments/1q8co2q/be_honest_do_any_of_you_actually_use_your_task/)). Reminders Urgent now merges the two. It is a Reminders item that rings like a Clock alarm through silent and Focus, and an optional setting adds a Complete button to the alarm screen ([MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/); [MacMost](https://macmost.com/urgent-reminders-with-alarms-on-iphone.html)). A Watch removes another step for those who have one: "If I do these things on my phone, I unlock my phone and IMMEDIATELY forget what I was going to do" ([Reddit](https://www.reddit.com/r/ADHD/comments/1mic1is/a_smart_watch_has_been_super_helpful_for_my_adhd/)). The failure mode is volume. One user said "set 10 alarms a day… made me feel like a hostage in my own house" (12), and another "I end up with like 20 alarms a day" (9) ([Reddit](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllqnk2/); [Reddit](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllpobx/)). Alarm-grade alerts work only while they stay rare.

Finch shows the same mechanism working inside a dedicated app. Its users' "remembering" comes from Finch's daily pushes, not from opening the app: "I have a daily push notification to take my meds… on the 1st I get one to pay my rent" (16) ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou43bfy/)). A 600-day user explains that "having it there kind of puts it on my 'radar'" (106) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1wklrkx/_/parmfuf/)). Routinery users get the same effect from a widget: "keep the widget on your Home Screen so you see the streaks!" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ir83y9/_/mdb5dcq/)).

### Shrinking the first step makes starting possible

Goblin Tools is the clearest example. "Goblin Tools is my go-to for turning 'do taxes' into something I can actually start" ([Reddit](https://www.reddit.com/r/ADHD/comments/1nqt8fr/adhd_productivity_tips_and_systems_ive_built_over/)). Another user describes typing "Clean bathroom", setting the "spice" level from 1 to 5 for how small the steps should be, and getting back "a list of steps" ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vciaiy/comment/p11jy0h/)). One recent iOS reviewer, writing amid the pricing complaints, still calls it "the only app I've had success with for making and accomplishing to-do lists" ([Apple RSS](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json)). Non-app versions of the same mechanism get some of the highest scores in the sample. A playlist of "6 minutes songs" that makes a chore finite earned **75 upvotes**, the top comment in the r/adhdwomen app thread ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3t2lhr/)). Forest works this way too: "telling myself I just need to plant one tree usually gets me started" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou4ejt3/)). Goblin has a gap and a failure mode. It has no reminders, so it helps only once Marc is already in front of a task. And one user "payed for goblin tools literally to not ever use it… it seemed like too much work" ([Reddit](https://www.reddit.com/r/ADHD/comments/1iokwlf/adhd_tax_got_me/)). The fix is to break a task down once, at the moment it is captured, and put step one into the reminder's title.

### Gentle rewards keep people coming back, until a streak breaks

Finch is the strongest dedicated-app signal in the evidence. The top app comment in the 568-upvote "stuck after the novelty" thread (202 upvotes) reads: "It's an app called Finch. I swear this is not an ad, I don't even use the paid version of it… every time you do a task you get energy points… The tasks are things like 'get out of bed' 'brush your teeth' 'drink water'" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou3znz7/)). The mechanism is caring for something outside yourself, with feedback that stays small. "I have a hard time taking care of myself, but I can take care of something else" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou43bfy/)). "It doesn't make a big deal of it… it's just a tiny little hammer" (23) ([Reddit](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1f82i/)). "The app never makes me feel guilty for missing a goal" (26) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1jtgtlt/_/mlv94vp/)). The results users report are long for this population: "My streak is 395 days and I also never used anything that long" (20), and "a 131-day streak of making my bed and I have NEVER make my bed" (87) ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou420xy/); [Reddit](https://www.reddit.com/r/adhdwomen/comments/1jtgtlt/_/mlu4nt0/)). Free users repeatedly say the free version is enough ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1wklrkx/_/parqim3/)).

The backlash is just as real and just as upvoted. "The tamagotchi element put me off! Self-care is hard enough without an electronic guilt trip!" (77). "It did not stick for me. I don't even remember the last I checked on it" (67). "I had an over 400 day streak! Then I missed a day and never touched it again" (19) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1jtgtlt/_/mlu7b4c/); [Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou43abf/); [Reddit](https://www.reddit.com/r/adhdwomen/comments/1wklrkx/_/pas0yqv/)). Streaks are what breaks these apps across the board. "The streak thing is brutal for ADHD brains 💀 I've deleted so many apps after breaking a 30+ day streak" is the top comment (**176**) in its thread ([Reddit](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1ck9y/)). The fix users report works on the free version: turn streaks off and keep "having 'Muffin' cheer for me when I do the most basic tasks" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou5vd9q/)). Finch is therefore a good optional add-on for Marc's daily basics such as meds and rent. It should not be his reminder system, because it depends on how he reacts to a cute pet, and a heavily upvoted minority of users react with guilt.

### Friction against escape protects focus without punishment

ScreenZen tops the single-recommendation scores because it slows the escape instead of banning it: "I gotta wait 3 minutes and after that it only works for 10 minutes. It's enough to reduce my time significantly" (69, r/ADHD, 1 July 2026) ([Reddit](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouuezg5/)). It "can delay an app opening, make you enter a reason for opening the app" (30) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3teagg/)). The same mechanism scored 121 in the "stuck" thread: "Timers that time me out and lock me off social media… the effort of switching them off is so much" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou3tdlc/)). Focus Friend combines friction with a pet. It "rewards you for setting a timer and then not using your phone" (19) ([Reddit](https://www.reddit.com/r/ADHD/comments/1pmhtie/_/nu0mxn4/)), and the 242-upvote stack post credits it with the "can't start a task without my phone in my hand" problem ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/)). Inferred, not observed: ScreenZen can also help with remembering. Its pause fires on the apps Marc already opens without thinking, and that pause is a moment he is guaranteed to see. No user in the notes reports using it that way.

### Another human present gets the hardest tasks started

Free body doubling has the longest retention claims in the notes. "Used focusmate daily for work and study for almost 4 years now" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou4bg49/)). "There's an expectation to set a clear goal, and then check in with each other at the end" (77) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1uhzdzx/_/oubpjm7/)). On the free cap: "you get three free sessions per week, which is enough for me… The trick is to schedule it before you need it" (35) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1uhzdzx/_/oubs52e/)). That trick turns the session into a calendar event, so the tool comes to Marc. Discord servers add mutual reminders: "if someone has disappeared for too long, we will ping them" (post, 892) ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1wptfdi/)). The barriers are shyness ("I'm too shy for FocusMate but I know it'll be effective for me") and taste, since the original poster of one thread found YouTube body doubling "ain't for me" ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1uhzdzx/_/ouc2wy0/); [Reddit](https://www.reddit.com/r/adhdwomen/comments/1uhzdzx/)). A CHADD-linked article notes "there hasn't been significant research to validate the benefits" ([CHADD Substack](https://chaddhelp4adhd.substack.com/p/could-a-body-double-help-you-increase)).

Under all five mechanisms sits one meta-finding: **apps that must be opened every day get abandoned**. "I set everything up, use it for maybe a week, and then completely forget it exists, the app just becomes another thing I have to manage" ([Reddit](https://www.reddit.com/r/ADHDers/comments/1r1zjk9/)). "The list turns into something I avoid opening because it just makes me feel behind" ([Reddit](https://www.reddit.com/r/productivity/comments/1uwa0cs/)). "I can't remember or care to use the tool that's supposed to help me remember and care!" ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1x3juq0/)). The most realistic stance came from the 284-upvote reply to the "what stuck" question: "None of them. I've accepted that it's much better for me to have a rotating arsenal of 'tools' that I know work for a bit and can swap out when I get bored" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou44x74/)). CHADD's long-standing test for choosing apps fits all of this: "if it takes five steps to enter a reminder about an appointment, it's not the app for someone challenged with cognitive demands" ([CHADD Adult ADHD blog](https://chaddadultadhd.blogspot.com/2015/05/choosing-apps-for-executive-function.html)).

## Vendor listicles invert the genuine ranking

Search results for "best ADHD apps" in 2025–2026 are dominated by companies ranking their own products. Saner.ai's "We tested 44 Apps and Here're the Best 9 in 2026" puts **Saner.AI at #1**, discloses "I work at Saner.ai" only in the body, and describes no test method ([Saner blog](https://blog.saner.ai/best-adhd-apps/)). The same company publishes near-duplicate "best ADHD planners", "best Tiimo alternatives" and "ADHD Reminder Apps: We tested 20" lists, each with Saner first ([Saner reminders](https://blog.saner.ai/best-adhd-reminder-apps/)). Focus Bear's posts put Focus Bear on top ([Focus Bear blog](https://www.focusbear.io/blog-post/5-game-changing-adhd-time-management-tools-you-cant-miss)). Toodledo's "Best Task Manager for ADHD (2026)" includes Toodledo in its top three ([Toodledo blog](https://blog.toodledo.com/best-task-manager-for-adhd-2026)). Routinery, Tiimo, Lifestack, Habi and Inflow all publish ranking pages in their own categories ([Routinery](https://www.routinery.app/blog/best-routine-apps-for-adhd); [Tiimo](https://tiimoapp.com/resource-hub/best-adhd-apps-2025); [Habi](https://habi.app/insights/best-adhd-planner-apps/); [Inflow](https://www.getinflow.io/post/best-alternatives-forest-app-adhd)). Below them sit anonymous pages.dev sites naming Tiimo the "best starting point" and tag-spam pages titled "Best Apps for ADHD Adults" on unrelated domains ([adhd-productivity.pages.dev](https://adhd-productivity.pages.dev/blog/best-habit-tracker-apps-adhd-2026); [internxt tag page](https://community.internxt.com/tag/adhd-apps/)). Even the more credible sources carry incentives. ADDitude's reader list discloses Amazon affiliate commissions ([ADDitude](https://www.additudemag.com/adhd-productivity-apps/)). Toolfinder's "Jessica McCabe's 5-App ADHD Stack" (Sunsama, Opal, Apple Reminders) is an unofficial directory page that her own channel does not confirm ([Toolfinder](https://toolfinder.com/stacks/how-to-adhd)). Third-party price pages contradict each other and the official ones. For example, "1 reminder per task on free" for TickTick conflicts with TickTick's own figure of 2 ([crm.org](https://crm.org/news/ticktick-review); [TickTick upgrade](https://ticktick.com/about/upgrade)).

The distortion has a consistent direction. Vendors cannot earn from Clock, Reminders or Google Calendar, so these lists leave out the tools genuine users credit most. They over-represent paid ADHD-branded planners: **Tiimo, Llama Life, Inflow, Saner, Focus Bear and Sunsama fill the listicles but have between 0 and 6 mentions each in 1,055 genuine comments**. Llama Life and Inflow have none. App Store pages add their own marketing, such as Opal's "94% of Opal members are less distracted" and Routinery's "Best ADHD App of 2025 (Forbes Health)" ([Opal](https://apps.apple.com/us/app/id1497465230); [Routinery](https://apps.apple.com/us/app/id1450486923)).

Reddit is not clean either. The OP of the 568-upvote "what stuck" thread was accused (147 upvotes) of undisclosed market research, and replied that they had "thought about possibly creating something" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou471r0/); [Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou4cphj/)). The 138-upvote "why I keep quitting every habit app" post ends with the OP building a product ([Reddit](https://www.reddit.com/r/ADHD/comments/1sb7u5c/)). A commenter pitched "SnakeStreak" with "free Lifetime Pro" ([Reddit](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouv4c7a/)), and an Opal recommendation used referral links ([Reddit](https://www.reddit.com/r/ADHD/comments/1ir83y9/_/md6zs5e/)). The defence is to treat original posts with suspicion and weight the replies. Replies are harder to seed in volume, and the replies here say the same thing across subreddits and years. Finch's signal survives this test better than any other dedicated app's. It recurs across independent threads in two subreddits from 2025 to 2026, with detailed praise and detailed complaints, which is the pattern of organic use rather than seeding.

## The new evidence trims Due, Pushover and the trial plan

The earlier reports for Marc built their mechanics from the apps with the best documented reminder designs, and several of those are paid. The persistence mechanic they emphasised still holds: a swipe should never count as done. What the review evidence changes is how to get it for free and which sources to trust.

**Due ($7.99) and Pushover ($4.99) are no longer needed for Marc's own must-not-miss items.** Reminders Urgent gives a free alarm that rings through silent mode and Focus and can offer Complete on the alarm screen ([9to5Mac](https://9to5mac.com/2025/11/04/ios-26-2-alarms-and-timers-in-reminders/)). Todoist's free Beginner plan can also mark one reminder per task urgent ([Todoist Help](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)). Something is lost. Due's Auto Snooze repeats a missed reminder on a schedule until it is marked done ([Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)). Apple's Urgent snooze is reportedly a fixed 9 minutes, though that figure comes only from secondary summaries. Pushover's real role in the earlier design was different: a server-triggered Critical Alert and a heartbeat channel for the Sarno web app ([Pushover API](https://pushover.net/api)). Nothing free replaces that. On a $0 budget, the alarm-grade layer has to be alarms Marc sets once on the phone, recurring Clock alarms and Urgent reminders. The web app's own push stays ordinary banners, and its heartbeat has to show inside the app. One limit noted earlier still applies: in January 2026 Urgent could not be set from Shortcuts ([MacPowerUsers forum](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)), so a server cannot create one for him.

**The earlier mechanic sources lean on apps genuine users barely mention.** The task-starting report drew its "one task, visible countdown" and "smallest step" models from Llama Life, Tiimo and Amazing Marvin. Some supporting claims came from sources this pass classes as low-trust: a Focus Bear review of Llama Life, an Inflow post on Forest and an anonymous pages.dev page on Goblin Tools. The mechanics may still be sound. But the apps with organic ADHD followings are Finch, ScreenZen, Goblin's website and the built-ins, and none of them is a timeline planner. The genuine evidence also adds a nuance to the earlier "no streaks, no loss mechanics" rule. The rule holds, given the 176-upvote streak complaint. But optional streaks and a gentle pet produce some of the longest retention reported anywhere (395 to 600+ days). The design lesson is that streaks should be off by default and possible to turn off, not banned outright. Similarly, the earlier report quoted a competitor saying Forest "solves distraction, not task paralysis". A genuine user says the opposite, that planting "one tree usually gets me started" ([Reddit](https://www.reddit.com/r/ADHD/comments/1ugzgp4/_/ou4ejt3/)).

**The two-week trial is still the right idea, but its tooling works against the evidence.** The plan pairs Daymark, the prototype web app installed to the Home Screen, with nudges from Clock or Reminders. Each morning Marc would set two alarms per timed if-then, labelled from seven rotating phrases. He would also plan a top 3 with first steps and estimates, and answer three reflection questions each evening ([COMBINED_PLAN.md §6](/home/user/accountability/docs/COMBINED_PLAN.md)). Two parts of that clash with what genuine users report. First, setting alarms by hand every morning is itself a daily task, and it fails CHADD's five-step test on day one. Recurring alarms and recurring Urgent reminders, set once, deliver the same nudge without that work. Second, Daymark is an app he must open daily, so the most common abandonment pattern ("use it for maybe a week, and then completely forget it exists") predicts the plan's own "mornings skipped on more than 4 days" rule will fire. The fix that fits the evidence is to make a recurring native alarm the entry point and label it with the action ("Open Daymark — pick ONE thing"). A better baseline would be to run the free setup below on its own first, so the trial measures whether Daymark adds anything beyond free built-ins. The plan's decision rules can stay as written. The earlier research's warning also still applies: in the one adult ADHD reminder trial, reminders sped up return but did not raise completion ([Nordby et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9149073/)). So every alarm label should name a first step, not just a task.

## A $0 iPhone setup Marc can finish tonight

The setup keeps to the pattern genuine users report keeping for years: one place for timed items, one dumping ground for everything else, and alerts that come to him. As one user summarised it: "calendar for anything with a time, one notes app for everything else" ([Reddit](https://www.reddit.com/r/productivity/comments/1virt35/comment/p2jhu11/)). The core is steps 1–5, which use only built-in apps and one free website. Steps 6–8 are optional add-ons, best added one at a time and swapped out when they get boring.

| Step | Do this once | Why it earns its place |
|---|---|---|
| 1. Daily anchors | In Clock, create 2–3 **repeating alarms** whose labels are actions, e.g. 8:30 "Open Reminders — pick ONE thing", 13:00 "One thing done? If not: just step 1", 20:30 "Meds + plug phone in" | Renamed alarms are the most-upvoted free fix, and they solve forgetting to open the app by naming it |
| 2. Must-not-miss items | In Reminders, use an **iCloud** list. For meds, appointments and bills, set a date and time and switch on **Urgent** (iOS 26.2+, allow alarms when asked). Turn on the Complete option for alarms in Settings > Reminders. Keep Urgent to about three a day | Rings through silent and Focus. Capping it avoids the "hostage" fatigue users describe |
| 3. Capture by voice | Say "Hey Siri, remind me to *[first step]* at 5pm" or "…when I get home". Phrase it as the first physical action ("open the insurance email"), not the project | Siri capture is zero-friction, and a first step turns a reminder into a start |
| 4. One calendar | Put every recurring bill, payday and appointment in Apple Calendar (or Google Calendar synced to it) on a repeat with no end date, and set default alert times in Calendar settings | Users credit "set until the end of time" bills and synced iPhone alerts |
| 5. Starting help | In Safari, open goblin.tools, tap Share > Add to Home Screen, and use Magic ToDo on any task that feels impossible (spice 3–5). Copy only step 1 into the reminder. Skip the $0.99 app and lookalike listings | Free breakdown that users say turns "do taxes" into something startable |
| 6. Focus (optional) | Install **ScreenZen** and add a wait and a "reason" prompt to the one or two apps he escapes into | Fully free, and the top single genuine recommendation |
| 7. Basics and kindness (optional) | Install **Finch**. Add 3–5 tiny goals (meds, water, get dressed) and its daily push. **Turn streaks off. Never tap a free-trial offer** | The strongest dedicated-app evidence. The guilt risk is handled by turning streaks off |
| 8. Company (optional) | Book a free **Focusmate** session in Safari for the week's worst task, *in advance*, so it lands in the calendar. Or put on a YouTube "study with me" or "clean with me" video | Users report 3 free sessions a week are enough |

Put the Reminders widget showing Today on the first Home Screen page, and move games and social apps off it. If Scheduled Summary is on, make sure Reminders, Calendar and Clock deliver immediately. If Marc wears an Apple Watch, use Siri on the watch for capture, so he never unlocks the phone and forgets why. Things to avoid entirely: any trial in Tiimo, Fabulous, Opal, Forest Plus or Finch's 7-day offer. Also avoid Llama Life, Brili, Flow Club and Attainify, which have no free tier or a hard-to-cancel trial. Do not build an elaborate Notion or Obsidian system, which one Obsidian fan's reply sums up as "I saw the list, got overwhelmed, and haven't ventured back yet" ([Reddit](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3tyjjh/)).

## Conclusion

The question "which ADHD app is best?" turns out to be slightly wrong for Marc. The answer is a delivery method more than an app. Genuine users keep tools that reach them without being opened and drop tools they have to visit, however clever. This also explains why the vendor rankings mislead. They compare features inside apps, while the deciding factor sits outside the app: whether anything rings, buzzes or appears on the Lock Screen at the right moment. For someone who will not pay, the iOS 26.2 Urgent reminder is the most important recent change in this space. It turns the one free app everyone already has into an alarm-grade, Due-like tool. Its ADHD track record is still unwritten, so it deserves to be watched rather than trusted blindly.

The second implication concerns Marc's own build. The free stack sets a hard baseline that any custom tool must beat. Any Sarno or Daymark feature must justify itself against recurring alarms plus Urgent reminders plus a Goblin breakdown, all at $0. The place a custom tool can plausibly add value is the one gap no free app covers: turning a captured task into a dated first step and putting that step straight into the alarm. The honest next step is to run the free setup for two weeks, count how often an alarm actually led to a started task, and build only to fix what it misses.
