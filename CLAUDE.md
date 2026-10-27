# Daymark

Phase 0 prototype of the accountability planner in the Wave 8 handoff. Read `docs/PHASE0.md`
(decisions + A01–A32 status) and `docs/PWA_PREP.md` (iOS PWA facts, verified 2026-10-27) first.

- Domain logic lives in `src/domain` and must stay framework-free and unit-tested. Add or update a
  test with the matching A-number for any behaviour change.
- Every mutation goes through `dispatch` in `src/domain/commands.ts` with a command key.
- In the store, every state change goes through `commit()` (`src/app/store.tsx`), which also starts the
  IndexedDB write. Never `setState` app state directly, and never save from an effect.
- Sheets use `Sheet` from `src/ui/kit.tsx`: the main action goes in `footer`, forms pass `dirty` so closing
  asks before discarding. Never re-run mount effects on callback identity (see `useLatest`).
- Never declare components inside another component's render; hoist them (they remount and lose focus).
- Never let private reflection, notes or goal labels reach `buildPreview`/snapshots.
- Label anything simulated in the UI (`SimPill`, `Banner tone="sim"`).
- Colours only via tokens in `src/styles/tokens.css`; run `npm run contrast` after changing them.
- Before finishing UI work: `npm test && npm run build && npm run e2e && npm run shots`, then look at the PNGs.
- Playwright: use the preinstalled one via `createRequire` (see scripts); Chromium only, not WebKit.
