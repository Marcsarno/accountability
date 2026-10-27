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
