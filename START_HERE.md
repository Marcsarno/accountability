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
- Git history is included (`.git`, branch `main`). Not yet pushed anywhere.
- GitHub repo exists and is empty: **HornerXpress/accountability-tracker**.
  Push with: `git remote add origin https://github.com/HornerXpress/accountability-tracker.git && git push -u origin main`
  (The previous cloud session could not push: Claude was not yet linked to the HornerXpress GitHub account.)
- Vercel: project import for that repo was started under the **HornerXpress** team. Settings:
  preset **Vite**, build `npm run build`, output `dist`. Once code is pushed, Vercel deploys on each push.
  Add a `vercel.json` with `Cache-Control: no-cache` for `/sw.js`, `/index.html`, `/manifest.webmanifest`
  and SPA rewrites before relying on updates.

## Next steps
1. Push to GitHub → Vercel deploys → open the URL in Safari on iPhone → Share → Add to Home Screen.
2. Run the device checklist in `docs/PWA_PREP.md` §4 and `docs/PHASE0.md` “Remaining experiments”.
3. Phase 1 (real private slice): pick backend (Supabase is the leading candidate), write the ADR
   listed in `docs/PHASE0.md`, then sign-in, schema/migrations and the private loop (A01–A08).
