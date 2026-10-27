# Start here (handoff to a new chat)

This is **Accountability Tracker** (working name *Daymark*), an iPhone-first PWA built from
`docs/Wave8_Handoff.md`. **Phase 0 (interactive prototype) is complete**: fictional local data,
simulations clearly labelled. Nothing has been tested on a real iPhone yet.

## Read in this order
1. `docs/Wave8_Handoff.md` — the product spec (scope, rules, acceptance cases A01–A32).
2. `docs/PHASE0.md` — what was built, design/architecture decisions, A01–A32 status.
3. `docs/PWA_PREP.md` — verified iOS PWA platform research (Oct 2026), incl. critic corrections.
4. `CLAUDE.md` — working rules for this codebase.

## Run
```bash
npm install
npm test            # 27 unit tests
npm run build && npm run e2e     # UI flow in Chromium
npm run dev         # local dev server
```

## Where things stand (2026-10-27)
- GitHub: **Marcsarno/accountability** (supersedes the earlier HornerXpress/accountability-tracker plan).
- Vercel: project **accountability** in the **marcsarno** team, linked to that repo. Every push deploys;
  the production branch gets the stable URL https://accountability-lilac.vercel.app (install the PWA
  from that one — installs and push are tied to the origin). Other branches get preview URLs, which
  sit behind Vercel sign-in (team deployment protection); the production domain above is public.
- `vercel.json` sets `Cache-Control: no-cache` on `/sw.js`, `/index.html`, `/manifest.webmanifest` so the
  update prompt sees new deploys, immutable caching on `/assets/*`, and an SPA fallback to `index.html`.

## Next steps
1. Open https://accountability-lilac.vercel.app in Safari on iPhone → Share → Add to Home Screen.
2. Run the device checklist in `docs/PWA_PREP.md` §4 and `docs/PHASE0.md` “Remaining experiments”.
3. Phase 1 (real private slice): pick backend (Supabase is the leading candidate), write the ADR
   listed in `docs/PHASE0.md`, then sign-in, schema/migrations and the private loop (A01–A08).
