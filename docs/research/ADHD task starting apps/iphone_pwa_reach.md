# iPhone Home-Screen Web App (PWA) Reach in 2026: Capabilities, Limits and Fallbacks for Reminding a Forgetful User

Scope: a private family PWA (React/Vite on Vercel, Supabase backend, already sending Web Push to installed iPhones) that has to prompt one adult with ADHD to start tasks. Research date: 2026-10-28.

Evidence labels used below:
- **[doc]**: documented by Apple, WebKit or the vendor.
- **[obs]**: observed or reported by developers or users.
- **[spec]**: speculation or inference.
- **[project]**: from the project's own consolidated research doc, `/home/user/accountability/docs/PWA_PREP.md` (verified 2026-10-27). It is internal and secondary.

A source date is given wherever it matters.

Coverage limits: I made 16 search/fetch calls. Several primary pages (Apple Shortcuts guide, Twilio pricing, the progressivewebapps.com iOS push page) were unreachable or thin. Those points are in the Gaps sections, not stated as fact.

## Web Push on iOS home-screen web apps (16.4 through 26/27): delivery, permission, Focus, interruption level, actions, sound, silent push, expiry, Declarative Web Push

### Takeaway
Web Push is the only native way an iOS home-screen web app can reach a user who has not opened it. It works when the app is closed, but only after the user installs the app and taps to grant permission. You can only send plain, visible notifications. There is no silent push, no documented time-sensitive or critical interruption level, and action buttons do not work reliably. Subscriptions can die silently, so the server must detect dead endpoints, and the app needs a non-push fallback channel.

### Cited Findings
**Availability and permission**
- [doc] Web Push for Home Screen web apps shipped in iOS/iPadOS 16.4 (March 2023). It only works after the site is added to the Home Screen, and nothing prompts the user to do that. — [WebKit blog, Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/); [Synthetixis, 2026-08-31](https://synthetixis.com/writing/pwa-ios-2026)
- [doc] iOS 26 / Safari 26.0: any site added to the Home Screen opens as a web app by default, with or without a manifest. The user can switch off "Open as Web App", which makes the icon a plain bookmark with no push. Web Push is still unavailable in an ordinary Safari tab on iPhone/iPad. — [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/); [Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026); [project] PWA_PREP.md §1
- [doc/project] The permission request and `pushManager.subscribe()` must run inside a user-gesture (tap) handler. Push uses VAPID, a 4 KB payload limit and a required TTL. — [project] PWA_PREP.md §1; [Safari 26 search summary](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)

**Silent push**
- [doc] Silent push is not allowed: subscriptions require `userVisibleOnly: true`, so every push must show a notification. — [Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026)
- [obs] With service-worker push, a push handler that fails to show a notification is reportedly treated as silent, and Safari may revoke the subscription "after a few instances". This threshold comes from developer reports, not Apple. — [Webscraft, updated 2026-10-19](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en). Apple's forum suggests wrapping the work in `event.waitUntil()`. — [Apple Developer Forums 728796](https://developer.apple.com/forums/thread/728796)

**Declarative Web Push (iOS/iPadOS 18.4+, macOS Safari 18.5)**
- [doc] Declarative Web Push lets a site "request a Web Push subscription and display user visible notifications without requiring an installed service worker." The payload opts in with `"web_push": 8030`. The `notification` object requires a non-empty `title` and a `navigate` URL (opened on tap). The example also shows `body`, `lang`, `dir`, `silent: false` and `app_badge`, and "most other optional NotificationOptions members" are allowed. A service worker can optionally rewrite the notification, and the original declarative notification is the fallback. "There is no penalty for service workers failing to display a notification." Published 2025-03-27 by Brady Eidson, testable on iOS 18.4. — [WebKit blog, Meet Declarative Web Push](https://webkit.org/blog/16535/meet-declarative-web-push/)
- [doc] Removing a service worker, for example through ITP website-data deletion for sites not visited recently, does not remove a declarative subscription. — [WebKit blog 16535](https://webkit.org/blog/16535/meet-declarative-web-push/)
- [doc] The Declarative Web Push post says nothing about action buttons, sound or time-sensitive delivery. — [WebKit blog 16535](https://webkit.org/blog/16535/meet-declarative-web-push/)

**Tap routing and `pushsubscriptionchange`**
- [project, citing WebKit bugs] When the app is closed, a tap on a notification opens the app root (WebKit 252544), and only one `openWindow` call is allowed. Declarative `navigate` is the dependable routing path. `pushsubscriptionchange` is not fired (WebKit 273063). — PWA_PREP.md §1 (verified 2026-10-27)

**Action buttons**
- [obs, conflicting] Developers report that iOS shows only a "View" action and ignores custom `actions` ([Apple Developer Forums, wwdc2022-10098 tag](https://developer.apple.com/forums/tags/wwdc2022-10098)), and a 2024 one-year review says "you can not show actions" ([Webventures, 2024](https://webventures.rejh.nl/blog/2024/web-push-ios-one-year/)). One vendor blog claims action buttons and images work but cites nothing ([Frizbit](https://frizbit.com/blog/ios-web-push-notifications/)). A 2026 guide quotes WonderPush docs saying iOS web push is text-only, while noting that source may be stale ([Webscraft 2026](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en)).

**Delivery when closed**
- [doc, secondhand] A 2026 summary says Safari 17.5 fixed several issues that kept Web Push notifications from appearing when the web app or Safari was not already running. — [progressivewebapps.com summary via search](https://progressivewebapps.com/background/ios-web-push/). The page itself returned HTTP 530, so this is unverified.
- [obs] A 2026 guide says delivery is less stable on iOS than on Android and that no public delivery-rate data exists. It advises measuring your own. — [Webscraft 2026](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en)

**Subscription death (see the reliability section)**
- [obs] Endpoints have been seen to "expire in a week or two" and disappear with no warning. — [Apple Developer Forums 728796](https://developer.apple.com/forums/thread/728796); [XenForo thread](https://xenforo.com/community/threads/lost-push-subscriptions-for-ios-pwa.215833/)

### Inferences
- [spec] There is no source showing a web-push field for `interruption-level` (time-sensitive/critical), and none appears in the Declarative Web Push key list. Web pushes therefore most likely arrive as ordinary "active" notifications. If so, a Focus mode will hold them back unless the user adds the web app to that Focus's allowed apps, and Notification Summary may batch them. Since installed web apps appear as separate apps in Settings > Notifications, a per-app allowance is plausible, but I have not verified it. Needs a device test.
- [spec] Sound and vibration: no source describes custom sounds. Expect the default notification sound only, controlled by the user's per-app setting. `silent: false` is the only sound-related key in WebKit's example.
- Practical design: use the Declarative Web Push payload (survives service-worker eviction, no silent-push penalty). Put the task deep link in `navigate`. Keep the text short and specific. Do not depend on action buttons ("Start now" / "Snooze") on iOS; open the app to a one-tap screen instead.

### Gaps
- I found no Apple or WebKit statement on whether web push can be time-sensitive, critical or passive, or how Focus/Notification Summary treat home-screen web apps. This needs a device test (PWA_PREP.md §4 item 3 already lists Focus & Summary).
- Action buttons on iOS 26/27: sources conflict and none is newer than 2024 or primary. No WebKit Bugzilla entry was found.
- I found no 2025–2026 primary data on delivery rates, latency when the phone is locked or in Low Power Mode, or APNs coalescing of web pushes.
- iOS 27 betas: nothing push-specific found.

## App Badging API on iOS home-screen apps

### Takeaway
It works. `navigator.setAppBadge()` / `clearAppBadge()` are supported for Home Screen web apps (16.4+), and Declarative Web Push can set the badge directly with `app_badge`, so the icon count can change while the app is closed.

### Cited Findings
- [doc] The Badge API works for Home Screen web apps. — [Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026); added in iOS 16.4 per [WebKit blog 13878](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- [doc] Declarative push payloads may include `app_badge` "for web apps that support the Badging API". — [WebKit blog 16535](https://webkit.org/blog/16535/meet-declarative-web-push/)

### Inferences
- [spec] The badge needs notification permission, as with native iOS badges. A badge is a weak cue for someone with ADHD, because it habituates fast. It works best as a "you have N unstarted tasks" summary, not as the main reminder.

### Gaps
- I did not confirm whether the user can turn badges off separately per web app in Settings > Notifications. This is likely, as with native apps, but unverified.

## What iOS PWAs cannot do: widgets, Lock Screen, Live Activities, Watch, background timers, local scheduled notifications, critical alerts

### Takeaway
An iOS home-screen web app cannot run in the background or schedule its own notifications. Every timed reminder has to come from a server push. Native-only surfaces are out of reach: widgets, Lock Screen widgets, Live Activities/Dynamic Island, Watch complications, alarms and critical alerts.

### Cited Findings
- [doc/project] No Background Sync, Periodic Background Sync or Notification Triggers on iOS WebKit. All reminders must be scheduled on the server. — [Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026) (Background Sync has no WebKit implementation); [project] PWA_PREP.md §1
- [doc] Push needs `userVisibleOnly`, so the app cannot wake itself in the background to do work. — [Synthetixis 2026](https://synthetixis.com/writing/pwa-ios-2026)
- [project] The manifest ignores `shortcuts` (app-icon quick actions) and `share_target` on iOS. — PWA_PREP.md §1

### Inferences
- [spec, high confidence] I found no WebKit or Apple documentation exposing WidgetKit, Lock Screen widgets, ActivityKit (Live Activities/Dynamic Island), watchOS complications, AlarmKit or critical alerts (which need an Apple entitlement) to web apps. None of the 2026 overviews list them as supported. In practice, the closest web-app route to the Lock Screen and Apple Watch is an ordinary push notification. iOS by default mirrors iPhone notifications to a paired Watch, but I have not verified this for web-app pushes.
- [spec] Notification Triggers (scheduled local notifications) was a Chromium origin trial that was abandoned. No browser ships it, and WebKit never did. Treat it as unavailable everywhere.
- Consequence: a "start timer" inside the PWA cannot alert the user when it ends unless the server sends a push at the end time. Schedule an "end-of-timer" push server-side when the timer starts.

### Gaps
- I did not fetch primary sources for each native-only feature. The statements above rest on their absence from all WebKit release notes and overviews, not on an explicit "not supported" statement. Notification Triggers status was not re-verified this session.
- I found no source on whether web-app notifications appear on Apple Watch.

## Workarounds and fallbacks: calendar feeds, Shortcuts automations, Reminders, SMS/email, iMessage

### Takeaway
The strongest non-push channels are a subscribed calendar feed, Shortcuts automations and SMS. Calendar alerts may be removed by default on subscription and need a device test. Shortcuts time-of-day automations can run without confirmation but are reported to be unreliable while the phone is locked. SMS from a 10DLC number needs US A2P 10DLC registration; the Sole Proprietor path fits a family app and costs a few dollars a month. Email is the weakest prompt for a forgetful user.

### Cited Findings
**(a) Calendar subscription (webcal/ICS)**
- [doc] When you subscribe to a calendar in Apple Calendar on the Mac, "Remove" checkboxes for alerts and attachments are offered. Apple's guide says to "deselect the appropriate Remove checkboxes" to keep alerts. The wording implies they start checked, but the guide does not say so. — [Apple Calendar for Mac User Guide (Calendar 16, macOS 26)](https://support.apple.com/en-au/guide/calendar/icl1022/16.0/mac/26); [older version](https://help.apple.com/calendar/mac/10.11/en.lproj/icl1022.html)
- [doc/obs, older] On iPhone, each subscribed calendar has a "Remove Alarms/Alerts" switch (older path: Settings > Mail, Contacts, Calendars > Subscribed Calendars). Turning it on mutes alerts for that calendar on that device only. — [Chron](https://smallbusiness.chron.com/disabling-alarms-calendar-iphone-78756.html); [Hebcal](https://www.hebcal.com/home/?p=563). Menu paths are from older iOS.
- [obs, old] An iOS 9/10-era report says a subscribed Google calendar's alarms were dropped because the phone's default alert was "None". — [Apple Developer Forums 64720](https://developer.apple.com/forums/thread/64720)
- [obs, 2012] A user reported that the iPhone did not honor the Mac "Remove alerts" choice. — [Apple Discussions 2602980](https://discussions.apple.com/thread/2602980)
- [obs] A subscription added on iOS may not sync through iCloud to other devices, and one added on the Mac via iCloud does. — [iPhoneLife](https://iphonelife.com/content/how-to-add-delete-sync-calendar-subscriptions)

**(b) Apple Shortcuts personal automations**
- [doc] A new personal automation normally sends a notification asking the user to run it. "You can also edit a personal automation to run without asking." — [Apple Shortcuts User Guide](https://support.apple.com/et-ee/guide/shortcuts/apd690170742/ios)
- [obs] On iOS 18 the setting is "Run Immediately", with a separate "Notify When Run" toggle. Sending messages still asks for confirmation, and some trigger types do not support Run Immediately. — [MacRumors forum](https://forums.macrumors.com/threads/shortcuts-app-how-to-not-get-notification-when-personal-auto-running.2442802); [switchingtomac](https://www.switchingtomac.com/iphone-shortcuts-for-beginners/)
- [obs] A developer reported that a Time of Day automation did not fire while the device was locked. No confirmed fix. — [Apple Developer Forums 665845](https://developer.apple.com/forums/thread/665845)
- [obs] ADHD-focused write-ups use Time of Day and leaving-home automations as routine prompts. — [Muddle Mend ADHD Substack](https://muddlemendadhd.substack.com/p/iphone-shortcuts-automation-routine); [Frank's Easy Tech Corner](https://frankseasytechcorner.substack.com/p/using-apple-shortcuts-and-automation)

**(c) Apple Reminders**
- No source found for a web API to Apple Reminders (see Gaps).

**(d) SMS via Twilio (US)**
- [doc] "Anyone sending SMS/MMS messages over a 10DLC number from an application to the US must register for A2P 10DLC", including individuals and hobbyists. — [Twilio docs, A2P 10DLC](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc)
- [doc] Registration options:
  - **Sole Proprietor** (no Tax ID; students, hobbyists, trials): 1 campaign, about 1,000 segments/day to T-Mobile (about 3,000 across carriers).
  - **Low-Volume Standard**: Tax ID such as an EIN required; 2,000/day to T-Mobile.
  - **Standard**: Tax ID required; volume set by Trust Score.
  - Unregistered traffic faces added carrier fees, lower throughput and more filtering.
  - Toll-Free numbers are outside 10DLC and can be used after Toll-Free verification. Twilio Verify is an alternative for OTP-only use.
  — [Twilio docs](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc)
- [doc, amounts conflict] Sole Proprietor fees: one-time brand fee of $4 or $4.50 (Twilio sources disagree), one-time $15 campaign vetting, and a $2/month campaign fee. Limits: 1 campaign, 1 phone number, 1 MPS. — [Twilio support 1260803965530](https://support.twilio.com/hc/en-us/articles/1260803965530); [Twilio registration overview](https://pages.twilio.com/10DLC-HelpArticles-WW); [Twilio Starter vs Standard comparison](https://support.twilio.com/hc/en-us/articles/4407882914971-Comparison-between-Starter-Low-Volume-Standard-and-Standard-registration-for-A2P-10DLC). Per-message and number rental fees are extra and were not verified this session.
- [obs, 2026] An agency guide says carrier filtering of 10DLC is now real-time. — [dev.to A2P 10DLC survival guide 2026](https://dev.to/alfredo_romero_fc4afdcb68/a2p-10dlc-survival-guide-for-voice-agencies-2026-carrier-filtering-is-now-real-time-29mp) (vendor blog, low weight)

### Inferences
- **Calendar** [spec]: An ICS feed generated from Supabase, with a `VALARM` (DISPLAY, `TRIGGER:-PT0M`) on each "start task" block, is the only fallback that can surface a lock-screen alert with no server push and no app open. Whether iOS keeps the alarm depends on the per-calendar Remove Alerts switch, possibly on by default, and maybe on the default alert time. The user must turn alerts on once. iOS polls subscribed calendars on its own schedule (often hours), so late changes (reschedules within the hour) will not arrive in time. The feed suits fixed daily anchors, not dynamic nudges. Device-test required. Since an ICS URL is a bearer secret, use an unguessable token and include no private reflection or notes. This is consistent with the project rule that private content must never reach previews.
- **Calendar alternative** [spec]: Writing events into the user's iCloud calendar over CalDAV with an app-specific password keeps alerts reliably but is heavier and riskier. Not researched.
- **Shortcuts** [spec]: A Time of Day automation set to Run Immediately can run "Open URLs" (the PWA URL) or "Show Notification". Whether "Open URLs" opens the home-screen web app or Safari is unverified and likely Safari. "Show Notification" from Shortcuts is a local notification, which makes it a useful server-independent backup for fixed daily anchors. Reports that automations do not fire while locked make this a supplement, not the main channel. Focus-mode-change and arrive/leave triggers are also available, but I did not verify their run-immediately status.
- **Reminders** [spec]: A web app has no API into Apple Reminders. The only route is a user-installed Shortcut that receives data from a URL/text and runs "Add New Reminder", which brings Reminders' own reliable local alerts. This needs the user to run it or an automation. Not verified.
- **SMS** [spec]: For one family recipient, Sole Proprietor 10DLC (about $2/month plus small one-time fees plus per-message costs) or a verified Toll-Free number is the cheapest compliant path. SMS is the most "un-ignorable" fallback for someone who mutes app notifications. Reserve it for escalation, such as no app-open or "started" acknowledgement N minutes after the push, to limit cost and habituation.
- **Email**: weak for prompting task starts; only useful for a daily digest. (Inference, no source.)
- **iMessage**: no official API for sending iMessages from a server was found. Apple Messages for Business is a business-chat product requiring Apple approval (not verified this session). Practical alternatives are SMS, or a family member manually texting. (Inference.)

### Gaps
- I did not establish iOS 26's actual default for "Remove Alerts" on a new webcal subscription, or iOS's refresh interval for subscribed calendars. Device test needed.
- I found no Apple-authored source for current iOS 26 Shortcuts automation behaviour: which triggers allow Run Immediately, whether "Open URLs" can launch a home-screen web app, and whether locked-phone automations fire.
- Twilio per-message US pricing and the current brand fee ($4 vs $4.50) are unconfirmed for 2026. The pricing page was not fetched.
- Apple Reminders, iMessage and Messages for Business: no sources fetched.

## Server scheduling for timed pushes: Vercel Cron, Supabase pg_cron/pg_net and Edge Functions, QStash

### Takeaway
Vercel Hobby cron runs only once a day, with up to an hour of timing slack, so it cannot drive reminders. Pro allows per-minute schedules. On the stack already in use, the best choice is Supabase pg_cron plus pg_net calling an Edge Function every minute, which sends pushes for anything due. Upstash QStash is a good alternative for scheduling one message per reminder.

### Cited Findings
- [doc] Vercel Cron: 100 cron jobs per project on both Hobby and Pro. Hobby runs at most once per day, and a 1 am job may fire any time from 1:00 to 1:59. A more frequent expression fails at deploy. Pro allows a minimum interval of once per minute with per-minute precision. — [Vercel docs, Cron usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing). Third-party pages that list 2 (Hobby) and 40 (Pro) appear outdated; [Crontap](https://crontap.com/blog/vercel-cron-hourly-limit-and-how-to-beat-it) says the limit became 100 on all plans in January 2026.
- [doc] Supabase documents scheduling Edge Functions with `cron.schedule('* * * * *', …)` and `net.http_post` (pg_cron + pg_net), with the project URL and key kept in Supabase Vault. — [Supabase docs, Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions)
- [doc] pg_cron on Supabase supports sub-minute jobs ("1–59 seconds") from pg_cron v1.5.0. — [Supabase docs, pg_cron](https://supabase.com/docs/guides/database/extensions/pgcron)
- [doc, partially conflicting] QStash: the official pricing page lists active schedules as free up to 1,000, then $0.01 per active schedule. Free-tier message limits disagree between sources (500/day vs 1,000/day). Pay-as-you-go is commonly quoted as $1 per 100k messages. — [Upstash QStash pricing](https://upstash.com/pricing/qstash.md); [toriihq](https://www.toriihq.com/articles/how-to-monitor-spending-upstash)

### Inferences
- Recommended pattern [spec]: keep a `reminders` table with a due time in UTC plus the user's IANA time zone. A pg_cron job every minute, or every 30s, calls an Edge Function. It selects rows that are due and not yet sent with `FOR UPDATE SKIP LOCKED`, sends Declarative Web Push with a short TTL (e.g. 10–30 min, so stale "start now" nudges are dropped) and `Urgency: high`, and records the result. Escalation rows (SMS after X minutes with no acknowledgement) use the same loop. This needs no paid Vercel plan.
- Vercel Hobby is acceptable for hosting the PWA, but its cron should only be used for daily housekeeping. [spec]
- Free Supabase projects pause after inactivity, which would stop pg_cron. This is from training knowledge and was not verified this session. Check before relying on the free tier.

### Gaps
- Supabase plan limits on Edge Function invocations and the free-project pause policy as of 2026 were not verified.
- The QStash free-tier message cap is unresolved.

## Known iOS PWA push reliability problems (2025–2026)

### Takeaway
Silent subscription loss is the main reported failure. Endpoints stop delivering after days or weeks, after reinstalling or updating, or after a push that showed nothing. iOS never fires `pushsubscriptionchange`, so the app cannot tell the server. All the evidence is anecdotal; there is no published root cause or fix from Apple.

### Cited Findings
- [obs] Subscriptions expired "in a week or two" and disappeared from the installed PWA with no sign. — [Apple Developer Forums 728796 (iOS 16.4 era)](https://developer.apple.com/forums/thread/728796)
- [obs] The server still held the subscription and sends returned no error, but the device received nothing and no longer considered itself subscribed. — [XenForo community](https://xenforo.com/community/threads/lost-push-subscriptions-for-ios-pwa.215833/)
- [obs] With FCM, the iOS device token changed on its own and notifications stopped. — [Apple Developer Forums 745759](https://developer.apple.com/forums/thread/745759)
- [obs] A 2026 guide (updated 2026-10-19) says "disappearing" subscriptions persisted into iOS 17 and 18 with no clear cause. It also says long inactivity can invalidate endpoints (410/404) and that re-subscribing after logout needs a new user gesture. It recommends checking subscription validity on every app open. This is developer-reported, not measured. — [Webscraft 2026](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en)
- [project] `pushsubscriptionchange` is not fired (WebKit 273063). Subscriptions can silently die, for example after OS updates. Mitigations: re-check `getSubscription()` on each launch, track last-delivered and last-seen times on the server, delete on HTTP 410, and send a TTL above 0 with a valid `Urgency`. — PWA_PREP.md §1
- [doc] Deleting the home-screen icon removes the web app and its data. Reinstalling creates a new subscription, which needs a new permission tap. (Inferred from Home Screen app = separate storage, [project] PWA_PREP.md §1; reinstall resubscribe is listed as a device test in §4.)
- [doc] Declarative Web Push subscriptions survive ITP removal of the service worker. — [WebKit blog 16535](https://webkit.org/blog/16535/meet-declarative-web-push/)

### Inferences
- [spec] For an ADHD user, a dead push channel fails silently: no reminders arrive and nobody notices. Build a "heartbeat":
  - The server records the last app open and the last acknowledged notification.
  - If there has been no open or acknowledgement for about 24–48 h despite sent pushes, switch to SMS: "Your reminders may be off — open Daymark once to reconnect."
  - Optionally alert the family member who manages the app.
- [spec] Show the push state in the app (installed / permission / subscription last confirmed), and offer a one-tap "re-enable reminders" that calls `subscribe()` again inside the tap.

### Gaps
- No 2025–2026 WebKit Bugzilla entry specifically about subscription expiry was found this session. Bug numbers come only from the project doc.
- I found no Reddit 2025–2026 threads in this session's results, and no data on how often subscriptions die on iOS 26/27.
