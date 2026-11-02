# Accountability tracker research (complete)

All the research and design documents behind the accountability tracker (working name Daymark), in
full and unedited, in one file. This file has no ADHD reminder research in it; that is in separate
reports.

## Contents
1. **Wave 8 handoff:** the product spec and research summary. It covers the evidence, scope,
   requirements A01–A32, the data contract, acceptance tests, build phases and open questions.
   Source: your uploaded zip, unchanged.
2. **Phase 0 record:** what the prototype built, its design and architecture decisions, the A01–A32
   status, and the experiments still to run. Source: zip, unchanged.
3. **PWA prep:** verified iPhone PWA platform research for the tracker (October 2026), including
   corrections from a review pass. Source: zip, unchanged.
4. **Polish plan:** a review of the deployed prototype. It lists 8 bugs and 11 weak areas. Waves 1–3
   are done; waves 4–8 are on hold.
5. **Combined plan:** merges the accountability research with the Oct 28 ADHD planning hand-off, for
   building into Sarno.
   - It came **before Marc's later decisions**, so two of its ideas no longer stand: the two-week trial
     with other apps (Marc ruled out other apps) and the other parent as a partner (do not assume it;
     Marc stresses privacy between him and Yola).
   - Its server-side nudge design also conflicts with Sarno's privacy rules (see the Sarno brief).

## Not in this file
- **Waves 1–7 of the original research:** landscape, methods, product comparison, journeys, failure
  analysis, technical spec, and product and concepts. The Wave 8 handoff links to them as private
  ChatGPT pages; they were never in the zip or the repo. Wave 8 summarises their conclusions; to give
  the Sarno session the originals, export them from ChatGPT.
- **The Daymark prototype code:** in the `Marcsarno/accountability` repo (`src/domain` for the
  rules, `src/screens` for the screens).
- **README, START_HERE and CLAUDE.md:** guides to running the prototype, not research.


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
