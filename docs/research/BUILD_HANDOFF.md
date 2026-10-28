# Build handoff: Marc's ADHD feature in Sarno (2026-10-28)

Read this first after compaction. Research is finished; next step is building.

## Decisions Marc has made
- Build it **into Sarno** (`Marcsarno/Sarno`, app in `SarnoPWA/`), **for Marc only**. Yola and sitters see no change.
- **No paid apps or services, and no other apps.** Pushover, Due, Pushcut and SMS are out; no "try these apps first" trial.
- He wants **as many notifications as useful**.

## What the research concluded (reports in this folder, newest first)
1. `Why top ADHD apps work.md`: why Finch, Goblin Tools, Due, Structured, Routinery and iPhone alarms/Reminders work; 8 principles; **25-row build checklist**. Start here.
2. `Best free ADHD apps by reviews.md`: genuine-review ranking (alarms/Reminders win; vendor lists are biased).
3. `iPhone PWA notifications for ADHD.md`: iOS web push ceiling (from WebKit source), payload/headers, the escalation ladder, reminder science.
4. `ADHD task starting apps.md`: first pass; "reach, land, shrink".

The core promise: *when Marc gives a task a time, Sarno brings him its first step at that time, keeps coming back in different words until he decides, and never goes quiet without telling him.*

## Hard platform limits (iOS home-screen web push)
- Title, body, default sound, badge and a tap link only. No buttons, never Time Sensitive, silent switch = vibrate only, blocked by any Focus that doesn't allow Sarno.
- Every reminder and repeat must be sent by the server. Same-`tag` pushes stack (no replace), so combine simultaneous items on the server.
- Subscriptions die silently: re-check on every open, show delivery status.

## Sarno facts that shape the build
- Follow `SarnoPWA/CLAUDE.md` exactly. UI is generated from `tools/proto/markup.html`; logic lives in `src/logic.js`. Full test pipeline plus `test:sweep`.
- No deploys, no pushes to production, no SQL run without Marc's explicit OK. Migrations are written; Marc runs them.
- `personal_todos` (migration 0002) is date-only (`due date`). Needs `remind_at timestamptz` and friends.
- Push exists: `api/notify.js` (web-push, `TTL: 3600`, no `Urgency`), `public/push-sw.js` (sets `tag` assuming it replaces, which is wrong on iOS). `reminder_due` is an in-app-only type today.
- No scheduler yet: pg_cron + pg_net are available on Supabase but not enabled.
- Smart Add (`api/smart-add.js`, Claude) already creates reminders as proposals Marc confirms. Extend it with time + first step + breakdown.
- This session currently has **read-only** access to the Sarno repo; building needs push access to a working branch.

## Proposed rounds (from the chat, refine with the checklist)
1. Engine: `remind_at` + first step + star; pg_cron sender; nag ladder with rotating wording, quiet hours, Done/snooze/drop semantics; push fixes (Urgency, TTL, declarative payload, batching); Marc-only gating.
2. Screens: Now screen (first step, Done, snoozes showing clock times, Make it smaller, Drop), done list, delivery-status check, phone-settings checklist.
3. Smart Add plans for him: proposes time, cue and first step; one-step-at-a-time breakdown; three daily anchors.
4. Focus: countdown with server end-push; routine player for basics.
