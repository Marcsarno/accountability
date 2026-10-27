# Accountability Tracker (working name: Daymark) — Phase 0 prototype

An original daily accountability planner: **a manageable commitment, an honest result, a practical
next attempt** — private by default, with one optional trusted partner. This is the Phase 0
interface prototype from the Wave 8 handoff: fictional local data, every missing real capability
labelled as a simulation.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173 (no service worker in dev)
npm run build && npm run preview   # production build with service worker, http://localhost:4173
```

Testing on an iPhone needs HTTPS on a **stable** origin (installs and push are tied to the origin).
Use a named tunnel or a preview deploy, open it in Safari, then … → Share → Add to Home Screen with
“Open as Web App” on. See `docs/PWA_PREP.md` §4 for the device checklist.

## Scripts

| Command | What it does |
|---|---|
| `npm test` | Domain/acceptance unit tests (Vitest) — A02–A21, A28 logic |
| `npm run e2e` | Drives the fresh-user path through the real UI in Chromium (needs `npm run build`) |
| `npm run shots [-- dir]` | Screenshots every screen at 402×874 and 320×568, light/dark, plus desktop; fails on console errors or horizontal overflow |
| `npm run contrast` | Checks 23 token pairs × light/dark against WCAG thresholds |
| `npm run assets` | Regenerates icons and 22 iOS splash screens from code |

## Layout

```
src/domain/     pure model: time (Temporal), capacity, recurrence, commands, review, notices, fixture
src/app/        store (IndexedDB persistence, simulated clock/online), PWA update prompt
src/screens/    Today, Inbox, Review, Partner, PeerView, Settings, sheets
src/ui/kit.tsx  sheet, toast, outcome marks, capacity bar, brand art
src/styles/     tokens.css (OKLCH light/dark/contrast), app.css
src/sw.ts       precache + declarative-push-compatible handlers (Phase 4)
scripts/        assets, shots, e2e, contrast
docs/           PWA_PREP.md (platform research), PHASE0.md (decisions + test record)
```
