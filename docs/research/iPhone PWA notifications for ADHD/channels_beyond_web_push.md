# Channels beyond web push for reaching an iPhone user (late 2026)

Research date: 2026-10-28. Scope: one private adult user with ADHD, a React/Vite PWA on Vercel with a Supabase backend, and an owner who wants the widest possible notification reach. Labels used: **[Doc]** is vendor or Apple documentation, **[Obs]** is forum or user reports, **[Spec]** is my own inference. Where a WebFetch of a primary page returned only the title (Apple's AlarmKit article, Tom's Guide), the claim rests on the search-result summary of that page, and the note says so.

## Shortcuts as a bridge (Time of Day automation, then Get Contents of URL, then Create Alarm, Reminders or Calendar)

### Takeaway
Shortcuts has a **Create Alarm** action for the Clock app, and has had it since 2018. Time of Day personal automations can be set to run without asking. Together these give a no-native-code route to real alarms, which ring through silent mode, built from server data. Two things are not documented: whether every action works while the phone is locked, and whether a Shortcut can mark a reminder **Urgent** (as of Jan 2026 users said it could not). Treat this channel as useful but fragile, and test it on the device.

### Cited Findings
- Apple added three Clock actions to Shortcuts, **Create Alarm, Toggle Alarm and Start Timer**, in a 2018 Shortcuts update [Doc/press, 2018]. — [Cult of Mac](https://www.cultofmac.com/how-to/shortcuts-21-weather-timer-actions); [TechCrunch](https://techcrunch.com/?p=1739696)
- Create Alarm "creates an alarm in the Clock app" and **always creates a new alarm**. To change an existing alarm you use Get All Alarms and then Toggle Alarm [Obs, Shortcuts expert reference]. — [Matthew Cassinelli: Create Alarm](https://matthewcassinelli.com/actions/create-alarm/)
- Toggle Alarm refers to alarms by time rather than by label in the variable list, which makes it awkward to pick alarms by name [Obs]. — [Apple Community](https://discussions.apple.com/thread/255277417)
- In Apple's guide, personal automations can run without confirmation: open the automation, turn off **Ask Before Running**, and tap Done. Apple's list of triggers that can run automatically includes Time of Day and Alarm [Doc]. — [Apple Support: enable or disable a personal automation](https://support.apple.com/guide/shortcuts/apd602971e63/ios)
- A user reported that an alarm-triggered automation set to run immediately started asking for confirmation again after iOS 18.2 [Obs, ~Dec 2024]. — [MacRumors forum](https://forums.macrumors.com/threads/automation-set-to-run-immediately-keeps-asking-for-confirmation-since-18-2.2445766)
- A beginner's guide says that if prompts still appear, "one of the selected actions still requires confirmation or permission" [Obs]. — [zero-duplicates guide](https://zero-duplicates-website.pages.dev/blog/iphone-shortcuts-automation-guide)
- **Locked phone:** Apple does not document which actions run while the phone is locked. In a June 2025 thread, a commenter says some actions run only when unlocked and that the list "isn't documented". In that thread, time-triggered locked runs fetched and processed data, but a later third-party-app step failed. One 00:01 run failed while Sleep Focus was on [Obs, iOS 18, Jun 2025]. — [Automators forum](https://talk.automators.fm/t/why-do-some-time-triggered-shortcuts-run-on-a-locked-iphone-and-others-fail/18608)
- Other reports describe Time of Day automations that fail because "the iPhone is locked" when they try to open an app such as Safari or Numbers [Obs]. — [Apple Community 253426055](https://discussions.apple.com/thread/253426055); [Apple Community 255525435](https://discussions.apple.com/thread/255525435)
- An Apple developer forum thread asks whether a Time of Day automation runs if the phone has not been picked up for hours. A reply says some actions "don't really do anything when the phone is locked" [Obs]. — [Apple Developer Forums 665845](https://developer.apple.com/forums/thread/665845)
- **Urgent reminders** (new in iOS 26.x, reported with iOS 26.2): marking a reminder Urgent schedules an alarm at the due time. These alarms "will activate even when your device is silenced or a Focus is on" [Press/Doc summary]. — [Tom's Guide (iOS 26.2)](https://www.tomsguide.com/phones/iphones/ios-reminders-wii-be-impossible-to-ignore-thanks-to-this-ios-26-2-addition-and-thats-great-news-for-me); [Apple Support: Use Reminders](https://support.apple.com/kb/ht4970)
- In the same thread, a user said snoozing an urgent reminder keeps it on the Lock Screen as a Live Activity and re-alerts after 9 minutes [Obs, 17 Jan 2026]. — [MacPowerUsers forum](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)
- **Shortcuts could not set Urgent** as of 18 Jan 2026. Users could not find a way to mark a reminder urgent from a Shortcut, and "the API doesn't seem to accept urgent:true" [Obs, Jan 2026]. — [MacPowerUsers forum](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)
- iOS 26.4 added an Urgent smart list and new ways to mark a reminder urgent. Coverage I found does not say whether Shortcuts can do it [Press, ~spring 2026]. — [9to5Mac](https://9to5mac.com/?p=1046357) (via search summary); [mirror article](https://automated-website.pages.dev/article/ios-264-makes-apples-best-new-reminders-feature-easier-to-use)

### Inferences
- [Spec] The most dependable recipe needs no native app. A Time of Day automation (Ask Before Running off), perhaps 3–6 times a day, runs a Shortcut that does: Get Contents of URL (a Supabase Edge Function returning JSON for the next few hours' anchors), then Get All Alarms and delete or turn off old "Daymark" alarms, then Create Alarm for each anchor. The alarm then rings like a Clock alarm, with sound in silent mode and through Focus, because it is a Clock alarm.
- [Spec] Create Alarm always adds a new alarm. Without cleanup the Clock app fills with stale alarms, so the Shortcut has to label and prune its own. Pruning by label is awkward, as noted above.
- [Spec] Apple Calendar "Add New Event" with an alert and Reminders "Add New Reminder" with a due-time alert are long-standing Shortcuts actions. Their alerts are ordinary notifications, so they respect silent mode and Focus unless the reminder is Urgent, and Urgent seemed not to be settable from Shortcuts as of Jan 2026.
- [Spec] The first run must be done unlocked so iOS can ask for network and Clock permissions. After that, test on a locked phone overnight before relying on it.

### Gaps
- I found no Apple documentation, for iOS 26, of which Shortcuts actions run on a locked device, and no confirmation that Create Alarm runs without a prompt when locked. This needs a device test.
- I could not confirm whether iOS 26.4–26.x (or iOS 27, if released) added an "Urgent" parameter to Add New Reminder.
- I found no documented limit on how many Time of Day automations can exist or how often they run. Each is a fixed daily time, and there is no "every N minutes" trigger (background knowledge, unverified).

## AlarmKit (iOS 26)

### Takeaway
AlarmKit, announced at WWDC 2025 with iOS 26, lets **native third-party apps** schedule alarms and countdown timers that **override silent mode and Focus**, with Lock Screen and Dynamic Island UI and Live Activity countdowns. It needs explicit user authorization (`NSAlarmKitUsageDescription`). No web API exposes it. A PWA can reach it only through a native wrapper, for which Capacitor plugins exist.

### Cited Findings
- Apple's AlarmKit documentation states that an alarm overrides the device's Focus and silent mode if necessary. WWDC25 session 230 notes say the alert "breaks through the silent mode and the current focus" [Doc, Jun 2025; via search summary because the fetched page returned only the title]. — [Apple: Scheduling an alarm with AlarmKit](https://developer.apple.com/documentation/alarmkit/scheduling-an-alarm-with-alarmkit); [WWDC25 session 230](https://developer.apple.com/wwdc25/230); [WWDC Notes](https://wwdcnotes.com/documentation/wwdc25-230-wake-up-to-the-alarmkit-api/)
- Authorization is requested explicitly, or automatically when the first alarm is created. The app must include `NSAlarmKitUsageDescription` in Info.plist, and the user can change the permission later in Settings. If authorization is denied, alarms are not scheduled [Doc/Obs]. — [WWDC Notes](https://wwdcnotes.com/documentation/wwdc25-230-wake-up-to-the-alarmkit-api/); [DEV Community write-up](https://dev.to/arshtechpro/wwdc-2025-wake-up-to-the-alarmkit-api-ios-26-4e67)
- MacRumors (11 Jun 2025): iOS 26 makes third-party alarm and timer apps better through AlarmKit [Press]. — [MacRumors](https://www.macrumors.com/2025/06/11/ios-26-third-party-alarm-apps/)
- AlarmKit can drive a countdown timer shown as a Live Activity [Obs, developer blog]. — [Nil Coalescing: countdown timer with AlarmKit](https://nilcoalescing.com/blog/CountdownTimerWithAlarmKit/)
- Before AlarmKit, standard UserNotifications alerts stayed silent in silent mode or Focus unless the app held the Critical Alerts entitlement, which Apple rarely grants [Obs]. — [DEV Community](https://dev.to/arshtechpro/wwdc-2025-wake-up-to-the-alarmkit-api-ios-26-4e67); [r/iOSProgramming Dec 2024](https://redlib.hyperreal.coffee/r/iOSProgramming/comments/1h7x53c/apple_wont_allow_proper_3rd_party_alarm_apps)
- Capacitor plugins wrap AlarmKit. **@capgo/capacitor-alarm** uses AlarmKit on iOS 26+ (`createAlarm`, `checkPermissions`, `getAlarms`), and the plugin's major version tracks the Capacitor version (v8 for Capacitor 8). **Capawesome's Alarm plugin** "creates real system alarms and timers", using AlarmKit on iOS 26+ [Doc, 2026]. — [Capgo alarm docs](https://capgo.app/docs/plugins/alarm); [Capgo GitHub](https://gh.hhj520.top/Cap-go/capacitor-alarm); [Capawesome alarm](https://capawesome.io/docs/sdks/capacitor/alarm/)
- Note: some localized Capgo pages say "iOS 16+". The English docs say iOS 26+, which is likely current [Obs, doc inconsistency]. — [Capgo DE](https://capgo.app/de/docs/plugins/alarm/)

### Inferences
- [Spec] AlarmKit is the strongest legitimate interrupt available to a self-built app without special approval. Unlike Critical Alerts, it needs no Apple entitlement request, only user consent. It suits a few daily "anchor" alarms, not every task. Alarm-grade interruptions will cause habituation if overused.
- [Spec] Safari and WebKit expose no alarm API. A home-screen PWA cannot use AlarmKit (it is native-only).
- [Spec] AlarmKit alarms are scheduled on the device. A wrapper app would need to sync the schedule when opened, or on a silent push or background refresh, which iOS throttles. So the user must open the wrapper app from time to time, or the server must send a push that makes the user open it.

### Gaps
- I could not fetch Apple's page text, so these are unconfirmed: the exact per-app alarm limit, whether a widget or Live Activity extension is strictly required, and watchOS availability. Sources disagree, and one search summary said there is no AlarmKit on watchOS.
- I found no write-up of scheduling AlarmKit alarms remotely by push. It appears to require app code to run.

## Minimal native companion app (wrapper or tiny native app), and distribution for one family

### Takeaway
A tiny Capacitor (or SwiftUI) companion that loads or embeds the PWA unlocks local notifications, **Time Sensitive** notifications (a capability you enable yourself, with no Apple approval), AlarmKit alarms, widgets and Live Activities. **Critical Alerts** need Apple's approval, which is granted only for health, safety, security or emergency use, so a family planner is unlikely to qualify. For distribution, free provisioning expires every 7 days. The $99/yr Developer Program with TestFlight or ad hoc avoids App Store review and guideline 4.2 entirely.

### Cited Findings
- **Time Sensitive:** in Xcode you add the "Time Sensitive Notifications" capability, which sets the entitlement to YES, and then set `interruptionLevel = .timeSensitive`. No Apple approval is described [Doc, third-party]. — [Oracle Responsys docs](https://docs.oracle.com/en/cloud/saas/marketing/responsys-develop-mobile/ios/advanced-notifications.htm); [Pushwoosh](https://help.pushwoosh.com/hc/en-us/articles/27979836066717-How-do-I-configure-and-use-Time-Sensitive-notifications-for-my-iOS-app)
- A developer's Time Sensitive notifications did not work until the entitlement was set to YES in the .entitlements file [Obs]. — [Apple Developer Forums 703568](https://developer.apple.com/forums/thread/703568)
- Time Sensitive notifications break through Focus but respect the ringer/mute switch, and need no special entitlement approval [Obs, third-party guide]. — [newly.app](https://newly.app/articles/critical-alerts-entitlement)
- Apple introduced the Time Sensitive interruption level at WWDC21 (session 10091) [Doc]. — [WWDC Notes 10091](https://www.wwdcnotes.com/notes/wwdc21/10091)
- **Critical Alerts:** you request them through Apple's form (developer.apple.com/contact/request/notifications-critical-alerts-entitlement). A rejected developer quoted Apple: "Because Critical Alerts are disruptive, they are meant to be used for a very restricted number of purposes." Third-party guides say approval covers health, safety, security and emergency uses only. Some developers report weeks without a response [Obs, forums 2018–2025]. — [Apple Dev Forums 106042](https://developer.apple.com/forums/thread/106042); [Apple Dev Forums 792320](https://developer.apple.com/forums/thread/792320); [Apple Dev Forums 794822](https://developer.apple.com/forums/thread/794822); [newly.app](https://newly.app/how-to/critical-alerts-entitlement)
- **Free provisioning:** a Personal Team profile "expires 7 days after it was created" and the app then stops launching. Paid-team profiles last about a year. Free accounts are commonly limited to 3 sideloaded apps (one source gives a different figure of 10 App IDs per rolling period) [Obs]. — [mintlify Impactor docs](https://mintlify.com/claration/Impactor/concepts/provisioning-profiles); [Sideloadly FAQ](https://sideloadly.io/faq); [Corellium](https://support.corellium.com/features/apps/sideloadly)

### Inferences
- [Spec] Free provisioning probably cannot use Time Sensitive, push (APNs) or similar capabilities, because Personal Teams lack many capabilities (background knowledge, unverified). The 7-day re-sign is also a poor fit for a user who forgets things. The realistic path is the **$99/yr Apple Developer Program** with TestFlight (internal testers, builds valid 90 days) or ad hoc distribution to the registered device. Neither goes through App Store review, so guideline 4.2 ("minimum functionality", which rejects thin web wrappers) does not apply. These TestFlight and ad hoc details are background knowledge, not verified in this session.
- [Spec] Effort: a Capacitor shell around the existing Vite build, plus `@capacitor/local-notifications`, an AlarmKit plugin and push, is plausibly **1–3 developer-days** for someone who knows the web stack and has a Mac with Xcode. Widgets and Live Activities need Swift extension targets, which adds days. I found no real-project effort data, so these numbers are speculation.
- [Spec] The companion app need not replace the PWA. It can be a "notifier" that registers for APNs pushes from Supabase with interruptionLevel time-sensitive, and schedules AlarmKit alarms for the day's anchors.

### Gaps
- I found no first-hand effort reports from 2025–2026 for Capacitor and AlarmKit projects.
- Not verified from Apple pages this session: TestFlight's 90-day build expiry and ad hoc device limits (100 per device type per year).

## SMS, voice calls and iMessage escalation

### Takeaway
SMS or a phone call through Twilio is a strong last-resort escalation. A ringing phone call is the most noticeable non-native channel, but it is still silenced by the mute switch and Focus unless the caller is in Favorites, allowed in Focus, or calls twice within three minutes (background knowledge). US delivery requires toll-free verification or A2P 10DLC registration, even for one recipient. Costs are about $2 a month for the number plus fractions of a cent per SMS. Programmatic iMessage only works through unofficial Mac relays such as BlueBubbles, which is fragile and not sanctioned by Apple.

### Cited Findings
- Toll-free SMS on Twilio requires carrier verification. The submission asks for business name, website, message samples, opt-in flow and use cases [Obs, consultant]. — [Telphi Consulting](https://www.telphiconsulting.com/blog/twilio-toll-free-verification-cost)
- Twilio Verify pricing page: $0.0083 per SMS (US), plus $0.05 per successful verification for Verify (a separate product) [Doc]. — [Twilio Verify pricing](https://static0.twilio.com/en-us/verify/pricing)
- Third-party 2026 breakdowns give about $0.0075–$0.0083 per US SMS segment plus carrier surcharges, and about $2.00–$2.15 a month for a toll-free number [Obs, aggregators, conflicting]. — [Apidog 2026](https://apidog.com/blog/twilio-sms-api-cost); [Telphi](https://www.telphiconsulting.com/blog/twilio-toll-free-verification-cost)
- Apple offers no public iMessage API. BlueBubbles runs on a Mac and exposes iMessage through a local REST API with webhooks. The Mac must stay on, and a dedicated Apple ID on the relay is recommended. One source claims Apple will cut off non-compliant apps (unverified) [Obs, vendor blog]. — [Sendblue blog](https://www.sendblue.com/blog/send-imessage-programmatically); [OpenClaw BlueBubbles doc](https://cdn.jsdelivr.net/npm/openclaw@2026.5.7/docs/channels/bluebubbles.md)

### Inferences
- [Spec] For one family user, a cheap path is an Edge Function cron that calls Twilio Programmable Voice (`<Say>` TwiML) when an anchor goes unacknowledged for N minutes. Add the Twilio number to the user's Contacts and Favorites, and allow it in Focus, so the call breaks through. Twilio voice is roughly a cent or two per minute in the US (background knowledge, unverified this session).
- [Spec] SMS gains nothing in noticeability over web push. It obeys the same silent mode and Focus rules, and its value is reaching a phone whose PWA push subscription has silently died.
- [Spec] An iMessage relay offers little over SMS for this purpose and adds ToS risk and an always-on Mac. Not recommended.
- [Spec] Alternative: an AppleScript or Shortcuts "Send Message" on a family Mac. It is equally fragile.

### Gaps
- I could not verify the official Twilio toll-free verification rules for sole-proprietor or personal use, or whether a "sole proprietor 10DLC" brand is cheaper. Both need checking on Twilio's docs.
- Official Twilio US voice per-minute price not fetched.

## Calendar subscription (webcal ICS with VALARM)

### Takeaway
A webcal subscription is a weak anchor channel on iPhone. Refresh timing is not under the publisher's control and is set on the subscribing device. Whether iOS honours VALARM alerts in subscribed feeds is inconsistent in reports. Alerts are ordinary notifications, so they do not break through silent mode or Focus. Useful mostly as passive visibility in the Calendar app and widgets.

### Cited Findings
- The refresh interval for a subscribed calendar is set on the Mac (Get Info, then Auto-refresh: every 5 minutes, hourly, daily). The guide gives no equivalent iPhone control [Obs, third-party guide]. — [nocal.app](https://nocal.app/help/apple-calendar/subscribe-on-iphone-and-mac)
- A user reported an iPhone ignoring the "strip alarms" option set in iCal and still ringing alarms from subscribed calendars, which suggests iOS can fire feed VALARMs [Obs, 2012-era]. — [Apple Community 2602980](https://discussions.apple.com/thread/2602980)
- A developer reported subscribed calendars not updating after iOS 14, fixed by adding "//" to the webcal URL [Obs, 2020]. — [Apple Developer Forums 663160](https://developer.apple.com/forums/thread/663160)
- Mac Calendar lets you set "Ignore alerts" per calendar through Get Info [Doc, older macOS]. — [Apple Calendar help](https://help.apple.com/calendar/mac/10.11/en.lproj/icl1012.html)

### Inferences
- [Spec] A better route to calendar alerts is having the Shortcut (section 1) write events with alerts into a local or iCloud calendar through "Add New Event". Event alerts stay non-breakthrough, but timing is deterministic.
- [Spec] The iPhone-side default refresh is, by common reports, slow (often hourly or longer, set under Settings > Calendar > Accounts > Fetch). Last-minute changes would arrive late.

### Gaps
- I found no iOS 26 documentation or reports confirming the default alert behaviour or refresh interval for subscribed calendars.

## Amplifiers: email, Apple Watch, AirPods (Announce Notifications)

### Takeaway
These do not create new reach. They mirror existing notifications. Apple Watch wrist taps are a real amplifier for ADHD users because haptics on the wrist are hard to miss, even in silent mode. Announce Notifications reads them aloud on AirPods or CarPlay. Email adds little.

### Cited Findings
- I found no sources in this session specific to Watch or AirPods behaviour in iOS 26. Sources for those claims were not retrieved.

### Inferences
- [Spec, background knowledge] When the iPhone is locked, notifications go to a paired Apple Watch and follow the iPhone's per-app notification settings. A Watch taps even when the iPhone is in silent mode. Focus syncs to the Watch, so Focus-blocked notifications are blocked there too, unless Time Sensitive or Critical.
- [Spec, background knowledge] Announce Notifications (Settings > Notifications > Announce Notifications) reads messages through AirPods or Beats with Siri. It is per-app and covers apps with Time Sensitive or direct-message notifications. Whether web-app (PWA) notifications are eligible for Announce is unverified.
- [Spec] Email is the weakest channel for someone who "forgets to open apps". It is fine for a weekly digest, not for timed anchors.

### Gaps
- Unverified: whether home-screen web-app notifications support Announce Notifications or appear on Apple Watch in iOS 26. This needs a device test or an Apple source.

## Third-party nag services drivable by API (Pushover, Pushcut, ntfy)

### Takeaway
**Pushover is the cheapest way to get alarm-grade delivery from a server without building an app.** It costs $4.99 once on iOS and includes 10,000 messages a month free. Its **iOS Critical Alerts**, approved by Apple in 2020, play through mute and Do Not Disturb or Focus, and emergency priority repeats until acknowledged, with a callback to Supabase. **Pushcut** ($1.99/mo Pro) adds `isTimeSensitive` notifications and buttons that run Shortcuts, which is a good fit for "tap to log". **ntfy's** iOS app lacks time-sensitive and critical alerts and lags its Android app, so it is not recommended for iPhone.

### Cited Findings
- Pushover pricing: **$4.99 USD one-time per platform**, no subscription for individuals [Doc]. — [Pushover pricing](https://pushover.net/pricing)
- Pushover API: **10,000 messages a month free per account**. Sending to one user counts as one message whatever the device count. Above the limit the API returns HTTP 429 [Doc]. — [Pushover API](https://pushover.net/api)
- Priorities: -2 (no alert), -1 (quiet), 0 (normal), 1 (bypasses Pushover quiet hours, always sound and vibration), **2 emergency: "repeats until acknowledged"** with `retry` (≥30 s) and `expire` (≤10,800 s, i.e. 3 h), capped at 50 retries. A `receipt` and an optional `callback` URL report acknowledgement, and `cancel_by_tag` cancels [Doc]. — [Pushover API](https://pushover.net/api)
- Pushover iOS **Critical Alerts** (announced 26 Feb 2020 after Apple approved the entitlement) bypass the mute switch and Do Not Disturb. They are **off by default** and enabled in app settings ("Critical Alerts for high-priority") with an iOS approval dialog and a chosen volume [Doc]. — [Pushover blog](https://blog.pushover.net/posts/2020/2/ios-critical-alerts)
- Pushcut webhook JSON supports `isTimeSensitive`, `sound` (incl. `loud`, custom), `actions` and `defaultAction` (run a named `shortcut`, a HomeKit scene, a URL, or a background HTTP request), `delay` ("1h 5m"), `scheduleTimestamp`, and an `id` for update or cancel. Dynamic titles and text require Pro [Doc]. — [Pushcut JSON help](https://pushcut.io/help/json)
- Pushcut pricing: Free (3 rich notifications; webhooks limited to "pre-defined notifications without dynamic content"); **Pro $1.99/mo, $17.99/yr or $39.99 lifetime**; Automation Server Extended $2.49/mo or $22.49/yr. Automation Server requests are limited to 100 or 5,000 a day, depending on plan [Doc]. — [Pushcut site](https://pushcut.io/); [App Store](https://apple.co/38UCsFa)
- Pushcut's Automation Server (an always-on iOS or iPadOS device running Pushcut) can run shortcuts "as server actions without user interaction" and schedule delayed executions [Doc]. — [Pushcut JSON help](https://pushcut.io/help/json)
- ntfy on iOS: self-hosted servers must relay through ntfy.sh (`upstream-base-url`) for instant APNs delivery. Critical alerts and time-sensitive notifications are the "most-upvoted iOS feature request" (issues #1235, #332). The iOS app is "significantly behind" Android. One secondary source reports a sound regression on iOS 26.2+ [Obs/Doc, 2025–2026]. — [ntfy iOS stabilization plan (mirror of GitHub issue 1680)](https://ddprojects.chickenkiller.com/binwiederhier/ntfy/issues/1680); [Atlas research Jun 2026](https://laoujin.github.io/Atlas/research/2026-06-09-self-hosted-vs-cloud-push-notification-gateways-for-docker-home-labs-2026/self-hosted-gateways-ntfy-gotify-apprise/)
- Pushsafer is another service advertising iOS Critical Alerts that bypass mute, DND and quiet hours [Doc]. — [Pushsafer](https://www.pushsafer.com/en/critical-alerts)

### Inferences
- [Spec] **Pushover priority 2 with Critical Alerts enabled is the closest thing to an AlarmKit alarm that a server can trigger without a native app.** It repeats every 30 s or more until acknowledged, rings in silent mode and Focus, and the callback lets Supabase mark the anchor "seen" and stop escalating. Total cost $4.99.
- [Spec] Pushcut is better for **actionable** nudges. Time Sensitive gets through Focus (not mute), and buttons can run a Shortcut or POST to Supabase ("Done", "Snooze 15") without opening the PWA. For $17.99/yr the server can also send scheduled, dynamic notifications.
- [Spec] Privacy: Pushover and Pushcut see notification text. Send neutral text ("Anchor: morning check-in") and keep private reflection and goal labels out of payloads. This matches the repo rule that private notes never reach previews or snapshots.
- [Spec] Overusing critical or emergency alerts will cause habituation and annoyance. Reserve them for 1–3 daily anchors and for escalation after a missed time-sensitive nudge.

### Gaps
- I could not confirm whether Pushcut's `isTimeSensitive` works on the free tier or needs Pro.
- I could not confirm whether Pushover Critical Alerts still behave identically on iOS 26 (no 2025–2026 Pushover post found), though nothing suggested a change.

## Comparison and recommended combination

### Takeaway
Best combination for one private iPhone user, in order of build: **(1)** keep PWA web push as the baseline. **(2)** Add **Pushover** ($4.99) for 1–3 daily anchors at emergency priority with Critical Alerts, plus an acknowledgement callback to Supabase. This is the highest noticeability for the least effort. **(3)** Optionally add a **Shortcuts Time-of-Day automation** that fetches the day's anchors and creates Clock alarms, a free backup that does not depend on any push service. **(4)** Add a **Twilio voice call** as a last-resort escalation, with the number in Favorites. **(5)** Build a **Capacitor companion app** ($99/yr, TestFlight) only if these prove insufficient. It adds AlarmKit, Time Sensitive and Live Activities, and removes the third-party services from the data path.

### Cited Findings
(Matrix built from the sources cited in the sections above; ratings are my judgment.)

| Channel | Breaks silent mode? | Breaks Focus? | Reliability | Setup effort | Cost | Privacy |
|---|---|---|---|---|---|---|
| PWA web push | No | No (unless app allowed in Focus) | Medium | Done | Free | Own server; Apple push relay |
| Pushover priority 2 + Critical Alerts | **Yes** ([blog](https://blog.pushover.net/posts/2020/2/ios-critical-alerts)) | **Yes** | High; repeats until acknowledged ([API](https://pushover.net/api)) | Low (one HTTP call) | $4.99 once | Third party sees text |
| Pushcut Time Sensitive + action buttons | No | Yes (Time Sensitive) | High | Low–medium | $0–$1.99/mo ([pricing](https://pushcut.io/)) | Third party sees text |
| Shortcuts automation creating Clock alarms | **Yes** (Clock alarm) | **Yes** | Medium; locked-phone and prompt quirks ([Obs](https://talk.automators.fm/t/why-do-some-time-triggered-shortcuts-run-on-a-locked-iphone-and-others-fail/18608)) | Medium (manual setup on phone) | Free | Fetches from own server |
| Urgent reminders | Yes ([Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-reminders-wii-be-impossible-to-ignore-thanks-to-this-ios-26-2-addition-and-thats-great-news-for-me)) | Yes | High if created | Not automatable from Shortcuts as of Jan 2026 ([MPU](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)) | Free | Local |
| Native companion with AlarmKit | **Yes** ([Apple](https://developer.apple.com/documentation/alarmkit/scheduling-an-alarm-with-alarmkit)) | **Yes** | High once scheduled | High (Mac, Xcode, Swift or Capacitor) | $99/yr | Own stack |
| Native companion with Time Sensitive | No | Yes | High | High | $99/yr | Own stack |
| Twilio SMS | No | No | High delivery | Medium (toll-free or 10DLC verification) | about $2/mo + ~$0.008/SMS | Carrier and Twilio see text |
| Twilio voice call | Only if caller is allowed or Favorite (Spec) | Only if allowed (Spec) | High | Medium | about $2/mo + per-minute | As above |
| Webcal ICS with VALARM | No | No | Low–medium (refresh lag) | Low | Free | Calendar data on device |
| Email | No | No | High delivery, low attention | Low | Free | Provider sees text |

### Inferences
- [Spec] Pushover is the best value: one dependency, $4.99, and genuine alarm-grade behaviour. Its main risks are that the user must enable Critical Alerts once, and that a third party sees message text, which neutral wording mitigates.
- [Spec] The Shortcuts route is the best free complement, because it produces OS-native Clock alarms with no third-party service. Its weaknesses are fragility after iOS updates, and that the Shortcut must be built by hand on the phone. Test it on a locked phone.
- [Spec] A native AlarmKit companion is the "end state" if the family later wants no third parties. It is not worth building first.

### Gaps
- No controlled reliability data, such as delivery-rate measurements, exists for any of these channels for iOS 26. All reliability ratings are qualitative.
