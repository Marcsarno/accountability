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
