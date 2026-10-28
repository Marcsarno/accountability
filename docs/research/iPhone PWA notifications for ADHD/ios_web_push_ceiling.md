# iOS web push ceiling for a Home Screen web app (late 2026: iOS 26.x, iOS 27.0.x)

Research date: 2026-10-28. Labels used throughout: **[Documented]** = Apple/WebKit official text; **[Source]** = read directly in WebKit source on the `main` branch, fetched 2026-10-28 (shipping iOS builds come from release branches, so a very recent `main` change may not be in iOS yet); **[Observed]** = developer reports; **[Inference]** = my reasoning, not verified on a device.

Context correction for the earlier round: iOS 27 has shipped. A WebKit Bugzilla comment dated 2026-10-25 reports testing on **iOS 27.0.1**, and Apple's iPhone User Guide offers an iOS 27 version. Safari 27.0 release notes are dated 2026-09-17. So the current target is iOS 26.x and 27.0.x, not iOS 27 betas.

## 1. Which Notification options iOS actually honours (incl. exact Declarative Web Push JSON)

### Takeaway
On iOS, a web push notification can only carry **title, body, the default sound or no sound, the app badge number, and a tap URL**. The system adds a fixed subtitle, "from <web app name>", and always uses the web app's own icon. `image`, `badge` (monochrome icon), `actions`, `requireInteraction`, `renotify`, `vibrate`, `timestamp` and custom sounds are not implemented at all. `icon` and `tag` are parsed but have no visible effect. Same-tag notifications **stack**; nothing replaces them automatically. A JS-based push that fails to show a notification within 30 s counts as a strike, and after 3 strikes WebKit deletes the subscriptions. Non-mutable declarative pushes never count as strikes. This makes Declarative Web Push the most reliable format.

### Cited Findings
**Declarative JSON format (parser in WebKit main, 2026-10-28) [Source]**
- The parser recognises exactly these keys: top-level `web_push` (must equal the number `8030`), `notification` (object, required), `mutable` (bool) and `app_badge`. Inside `notification` it recognises `title`, `body`, `navigate`, `dir`, `lang`, `tag`, `icon`, `silent`, `data` and a legacy `mutable`. No other keys are parsed (no `image`, `actions`, `badge`, `requireInteraction`, `renotify`, `vibrate`, `timestamp`). — [NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp)
- Validation rules in the same file:
  - `navigate` must be a string that parses as a valid URL, or parsing fails.
  - `title` must be a non-empty string.
  - `icon`, if present, must be a valid URL string.
  - `silent` must be a boolean.
  - `dir` must be a valid NotificationDirection.
  - `data` can be any JSON value; it is stored as a JSON string.
  - A type error in any field rejects the whole payload with a SyntaxError. — [NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp)
- **`app_badge` is read only from the top level** of the JSON (`outerObject.getValue(appBadgeKey)`). It may be a string of ASCII digits or a non-negative number. This changed in WebKit bug 293457, "Relocate 'app_badge' entry from the 'notification' dictionary to the top level JSON", which landed 2025-05-22 as commit 295319@main. The bug page names no Safari release. — [NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp); [WebKit bug 293457](https://bugs.webkit.org/show_bug.cgi?id=293457)
- The original WebKit blog example (2025-03-27) put `"app_badge": "1"` **inside** `notification`. Current main ignores it there. Inside `notification`, `app_badge` is not one of the keys read, so it is silently ignored rather than an error. — [Meet Declarative Web Push, WebKit blog, 2025-03-27](https://webkit.org/blog/16535/meet-declarative-web-push/); [NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp)
- **`mutable` is read at the top level first.** A `mutable` inside `notification` is still accepted, with the code comment "Eventually we should remove this branch as supporting mutable inside the notification object is non-standard (webkit.org/b/297389)". — [NotificationJSONParser.cpp](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationJSONParser.cpp); [WebKit bug 297389](https://bugs.webkit.org/show_bug.cgi?id=297389)
- The blog post says `title` and `navigate` are required. It says "Most of the optional members of the NotificationOptions dictionary can also be specified". If the service worker's replacement notification fails, "the fallback is used". It says you can test it on "iOS 18.4, iPadOS 18.4, and on the macOS 15.5 beta". — [Meet Declarative Web Push, 2025-03-27](https://webkit.org/blog/16535/meet-declarative-web-push/)
- The internal `NotificationData` struct has only these fields: `navigateURL`, `title`, `body`, `iconURL`, `tag`, `language`, `direction`, `data`, `silent`, plus bookkeeping fields. — [NotificationData.h](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationData.h)
- In WebKit's `NotificationOptions.idl` and `Notification.idl`, `image`, `badge`, `vibrate`, `timestamp`, `renotify`, `requireInteraction`, `actions`, `maxActions` and `sound` are all **commented out**. They are unimplemented and dropped when passed to `showNotification()`. — [NotificationOptions.idl](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationOptions.idl); [Notification.idl](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/Notification.idl)

**How webpushd turns that into an iOS notification (`WebPushDaemon::showNotification`) [Source]**
- Fields set on `UNMutableNotificationContent`:
  - `title` and `body`.
  - `subtitle` = "from %@", filled with the web clip's title.
  - `badge` = app_badge, only if present.
  - `categoryIdentifier = "webpushdCategory"`. That category is registered with **`actions:@[]`**, so there are no buttons.
  - `icon` = `UNNotificationIcon iconForApplicationIdentifier:`, which is the web app's own icon. **The `icon` URL from the payload is not used.**
  - `sound = [UNNotificationSound defaultSound]` when `platformShouldPlaySound()` is true. On iOS that is when `silent` is absent or false; on macOS sound requires `silent:false` explicitly.
  
  — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)
- Fields that are **never set**: `interruptionLevel` (so the default "active" level applies, never `timeSensitive` or `critical`), `threadIdentifier`, `attachments` (no images), `relevanceScore` and `filterCriteria`. — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)
- Each `UNNotificationRequest` uses `notificationData.notificationID` as its identifier. That is a fresh UUIDv4 per notification (`WTF::UUID::createVersion4()`). **Two pushes with the same `tag` therefore produce two separate notifications that stack; the OS does not replace one with the other.** `tag` is used only to filter `getNotifications({tag})`. `close()` maps to `removeDeliveredNotificationsWithIdentifiers`. — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm); [NotificationData.h](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationData.h)
- A **non-mutable** declarative push is shown straight from webpushd ("we can just display its notification right now"). The service worker and web app are not launched. — [WebPushDaemon.mm `handleIncomingPushImpl`](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)

**Silent-push strikes [Source]**
- `silentPushTimeoutForProduction = 30_s`. A non-declarative push whose service worker has not called `showNotification` within 30 s calls `incrementSilentPushCount`. — [NotificationData.h](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/notifications/NotificationData.h); [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)
- The constant `maxSilentPushCount = 3` carries the comment "If an origin processes more than this many silent pushes, then it will be unsubscribed from push". In `PushService::incrementSilentPushCount`, once the count reaches the threshold, the log reads "Removing all subscriptions associated with … since it processed %u silent pushes" and `removeRecordsImpl` runs. — [WebPushDaemonConstants.h](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/Shared/WebPushDaemonConstants.h); [PushService.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/PushService.mm)
- Source comment: "Declarative push messages can never result in a silent push timeout, so don't push them onto the m_potentialSilentPushes queue." — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)
- Apple's documentation: "Safari doesn't support invisible push notifications… If you don't, Safari revokes the push notification permission for your site." — [Apple: Sending web push notifications in web apps and browsers](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)

**MDN browser-compat-data for Safari iOS (main, fetched 2026-10-28) [Documented, third-party]**
- Values for `Notification`:
  - Supported since 16.4: `body`, `data`, `dir`, `close`, click and close events.
  - Mirrored from desktop Safari, where they are `false`: `actions`, `badge` (impl bug webkit.org/b/280160), `image`, `renotify`, `requireInteraction`, `timestamp`, `vibrate`, `maxActions`.
  - `icon` is listed as "The property can be set, but has no effect" (impl bug webkit.org/b/280162).
  - `navigate` is mirrored from Safari 18.5.
  - BCD also lists `silent`, `tag`, `lang` and `title` as `false`, which contradicts the source (they exist in the IDL). Treat BCD as partly stale.
  
  — [mdn/browser-compat-data api/Notification.json](https://github.com/mdn/browser-compat-data/blob/main/api/Notification.json)
- BCD still marks `notificationclick_event` and `pushsubscriptionchange_event` as unsupported on Safari iOS. For notificationclick this is contradicted by the bug reports in section 5. — [ServiceWorkerGlobalScope.json](https://github.com/mdn/browser-compat-data/blob/main/api/ServiceWorkerGlobalScope.json)

### Inferences
- **Maximum noticeability per notification** comes down to:
  - a short, specific title (the subtitle line is spent on "from Daymark");
  - a body;
  - default sound, by leaving `silent` absent or false;
  - a badge number;
  - a `navigate` deep link.
  
  Nothing else can be added from the web side. Nothing can make a banner stay on screen: `requireInteraction` is not implemented, but the user can set Banner Style to Persistent (section 2).
- **To replace rather than stack** (e.g. a single "3 things overdue" notification), use one of two approaches:
  - (a) send `mutable: true` at the top level and have the service worker call `getNotifications({tag})` and `close()` on the old one before `showNotification`. This trades away the declarative strike-immunity: if the SW fails, the declarative fallback is still shown, so it is probably still safe. The source enqueues a potential-silent-push only when `!notificationPayload`, so a mutable declarative push is likely also immune [Inference from the line-780 condition].
  - (b) Accept stacking. For ADHD nagging, stacking may even help, because the Lock Screen count grows.
- **For a reliability-first sender**, every push should be declarative (`web_push: 8030`) with `app_badge` at the **top level**. For iOS versions that may predate bug 293457 shipping, it does no harm to also include `app_badge` inside `notification`: older parsers read it there and newer ones ignore it [Inference].
- Long `data` payloads count toward the 4 KB limit; keep them small.

### Gaps
- I could not confirm which iOS release first shipped top-level `app_badge` (bug 293457, May 2025). It is most likely iOS 26.0, but that is unverified.
- `supportsBuiltinNotifications(identifier)` gates the direct-display path. I did not read its body, so I can't say whether any iOS web-app configuration falls back to launching the SW.
- I did not find whether the silent-push counter ever resets or decays. PushDatabase source was not retrievable at the path tried.

## 2. What the user can set for a web app on iOS 26/27 (Time Sensitive, Focus, Summary, banner style, sounds, Watch, CarPlay)

### Takeaway
A Home Screen web app gets its own entry under Settings > Notifications, like any app. The user can allow it through a Focus, set Immediate Delivery rather than Scheduled Summary, make banners **Persistent**, show previews always, and allow badges and sounds. They cannot enable **Time Sensitive** (the code never requests it) and cannot pick a custom sound. Notifications mirror to a paired Apple Watch. CarPlay is undocumented.

### Cited Findings
- Apple's Focus guide: "Note: You can allow or silence notifications from specific web apps you've added to your Home Screen." The same page notes that the Focus-level "Time Sensitive Notifications… allows all apps to send time-sensitive notifications immediately". — [Apple Support: Allow or silence notifications for a Focus on iPhone (current guide offers iOS 27/26)](https://support.apple.com/guide/iphone/allow-or-silence-notifications-for-a-focus-iph21d43af5b/ios)
- Apple's per-app notification settings guide covers:
  - "Allow time-sensitive notifications: **If the app supports it**, turn on Time Sensitive Notifications."
  - "Choose a notification sound: **If the app supports it**, tap Sounds, then select a sound."
  - "Under Alerts, choose whether notifications appear on the Lock Screen, in Notification Center, or as banners."
  - "Show a badge… Turn on Badges."
  - "If you use Scheduled Summary, under Notification Delivery choose Immediate Delivery or Scheduled Summary."
  - "Prioritize Notifications" (Apple Intelligence Priority Notifications) under Lock Screen Appearance.
  - "Show Previews (if it appears)… Always / When Unlocked / Never."
  
  — [Apple Support: Change notification settings on iPhone](https://support.apple.com/guide/iphone/change-notification-settings-iph7c3d96bab/ios)
- WebKit's iOS 16.4 announcement (2023-02-16):
  - "They show on the Lock Screen, in Notification Center, and on a paired Apple Watch."
  - Focus lets users "precisely configure when or where to receive them".
  - Users "manage those permissions per web app in Notifications Settings".
  - Badge permission is "granted in exactly the same way as other apps".
  
  — [WebKit: Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- webpushd never sets `interruptionLevel` (so no `.timeSensitive`) and only ever uses `UNNotificationSound defaultSound`. [Source] — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)
- Developer discussions in 2025–26 list "Time Sensitive alerts that break through Focus" as a reason to go native for reminders. [Observed/opinion] — [GitHub issue: Is PWA web push on iPhone good enough for reminders?](https://github.com/HADKASHI/medical-management-app/issues/3)

### Inferences
- The **Time Sensitive Notifications toggle will not appear** for a web app, and even if it did, no notification is marked time-sensitive. A Focus will therefore silence the web app **unless the user adds it to that Focus's "Allow Notifications From" list**, which Apple documents as possible for web apps. That list is the single most important setup step for an ADHD user who uses Focus or Sleep. [Inference from source + Apple docs]
- **Recommended one-time settings** for the user, all documented as general per-app controls:
  - Settings > Notifications > [web app name]: Allow; Lock Screen + Notification Center + Banners.
  - **Banner Style: Persistent**. This is the user-side substitute for `requireInteraction`.
  - Sounds on; Badges on.
  - Show Previews: Always.
  - Notification Delivery: **Immediate Delivery**, if Scheduled Summary is on.
  - Prioritize Notifications on, if Apple Intelligence priority notifications are used.
  - Add the app to every Focus's allowed apps (including Sleep and Work).
  
  On the Watch: Watch app > Notifications > mirror iPhone alerts. That this mirroring applies per web app on the Watch is inferred from WebKit's "paired Apple Watch" statement.
- Sound is always the system default notification sound. Haptics follow system settings.

### Gaps
- No Apple or WebKit statement and no tester report covers web push notifications in **CarPlay**. CarPlay shows notifications only from CarPlay-entitled app categories, so web apps very likely do not appear there [Speculation].
- There is no on-device screenshot or report confirming the exact iOS 26/27 settings pane for a web app, e.g. whether "Banner Style" and "Notification Grouping" appear. These are standard for every app, but this is unverified for web clips.
- Whether Apple Intelligence "Summarize Notifications" or "Reduce Interruptions" (iOS 18.4+) can bury web app notifications is not documented for web apps specifically.

## 3. Apple-side throttling, rate limits, TTL, Urgency, Topic/collapse

### Takeaway
Apple publishes **no numeric per-device rate limit**. The only signal is HTTP 429 `TooManyRequests` ("too many consecutive requests to the same device token"). Apple stores undelivered notifications for up to the TTL (maximum 30 days), but "the number… stored while the device is offline is limited". `Urgency: high` asks for immediate delivery. `Topic` (≤32 chars) coalesces stored pushes: a newer one replaces an older undelivered one with the same Topic. It does not replace notifications already on screen.

### Cited Findings
- Apple's documentation on the headers [Documented]:
  - `TTL`: "If the push service can't deliver a notification immediately, it may store the notification for 30 days or fewer… attempts to deliver the notification the next time the device activates and is available online… The number of notifications the push services stores while the device is offline is limited."
  - `Topic`: "Optional identifier that the push service uses to coalesce notifications. Use a maximum of 32 characters from the URL or filename-safe Base64 characters sets."
  - `Urgency`: "Indication of whether to send the notification immediately or prioritize the recipient's device power considerations for delivery… `very-low`, `low`, `normal`, or `high`. To attempt to deliver the notification immediately, specify `high`."
  - Authorization: "Don't refresh your JWT more frequently than once per hour."
  - HTTP/1.1 pipelining: "Don't send more than 100 unacknowledged push requests over the connection."
  
  — [Apple: Sending web push notifications in web apps and browsers](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)
- Status codes from Apple's push service [Documented]:
  - 201 success; 400 bad request; 403 auth error; 404 invalid `:path`; 405 not POST.
  - **410 "The device token has expired."**
  - 413 payload too large (**4 KB**).
  - **429 "The server is receiving too many requests for the same destination."**
  - 500 internal error; 503 shutting down.
  - `reason` codes: `BadTtl` ("TTL header is either missing or isn't a positive number"), `BadUrgency`, `BadWebPushRequest`, `BadWebPushTopic`, `VapidPkHashMismatch`, `IdleTimeout`, `BadAuthorizationHeader`, `BadJwtToken` (incl. "expiration… more than one day into the future"), `BadVapidPublicKey`, `BadPath`, `MethodNotAllowed`, `PayloadTooLarge`, `TooManyRequests` ("too many consecutive requests to the same device token"), `InternalServerError`, `ServiceUnavailable`, `Shutdown`.
  
  — [Apple doc (same)](https://developer.apple.com/documentation/usernotifications/sending-web-push-notifications-in-web-apps-and-browsers)
- No public threshold exists for the APNs per-device 429. In the Apple forums the answer was that it is server-specific. Continuing to push after 429s is reported to risk temporary blocking. [Observed, native APNs] — [Apple Developer Forums 95283](https://developer.apple.com/forums/thread/95283); [StackOverflow mirror: what rate triggers TooManyRequests](https://kiwix.lema.org/stackoverflow.com_en_all_2023-11/questions/45362504/what-rate-of-push-notifications-triggers-toomanyrequests-error)
- webpushd limits itself to `maxTopicCount = 64` push topics device-wide. This is a per-device subscription-count limit, not a message-rate limit. [Source] — [PushService.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/PushService.mm)
- webpushd holds an "incoming push" OS transaction for 10 s (`s_incomingPushTransactionTimeout`) and gives the SW 30 s to show a notification. [Source] — [WebPushDaemon.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/WebPushDaemon.mm)

### Inferences
- For one user and a handful of reminders per hour, 429 is very unlikely, but it is undocumented. Avoid bursts: never send several pushes to the same endpoint within seconds, and back off on 429. [Inference]
- **Urgency `high`** should be set on every reminder. `normal` or lower lets APNs defer for power, especially in Low Power Mode. Apple's documentation does not describe Low Power Mode behaviour explicitly. [Inference; Low Power Mode effect unverified]
- **TTL 3600** means a reminder sent while the phone is off or offline for more than 1 h is dropped. That is reasonable for time-bound nags, but daily-plan pushes could use a longer TTL. Because offline storage is "limited" (native APNs keeps roughly the latest one per app), a backlog will not replay in full. Use `Topic` on recurring nag types (e.g. `Topic: overdue`) so only the newest is kept. [Inference]
- `TTL: 0` (deliver-now-or-drop) is rejected with `BadTtl`, which requires a positive number. [Documented]

### Gaps
- There is no documented notification "budget" per day for web push, and I found no 2025–26 test measuring degradation at N pushes/hour.
- I found no official statement on Low Power Mode, Focus or Sleep interacting with Urgency for web pushes.
- I have not verified whether web.push.apple.com honours Topic coalescing for already-delivered notifications. It should not, per RFC 8030.

## 4. Subscription death: causes, error codes, detection and recovery

### Takeaway
Subscriptions die silently and `pushsubscriptionchange` is **never fired** (WebKit statement, 2024; BCD still "false" in 2026). Known or likely killers:
- 3 silent-push strikes (source-confirmed);
- deleting the web app or clearing its data;
- revoking permission;
- some OS updates (observed);
- historic Web.app bugs, fixed around iOS 17.5.

The ITP 7-day storage cap does **not** apply to Home Screen web apps in the same way. Apple documents 410 for an expired token, but a dead or blocked subscription can still return **201**. Detection therefore has to be client-driven.

### Cited Findings
- WebKit engineer Ben Nham (2024-05-09): WebKit does not fire PushSubscriptionChangeEvent ("IDL exists… but is unused"). Some earlier subscription losses were Web.app bugs: Web.app handled a push but reported the site lacked permission, which made WebKit delete the subscription. These were "fixed around iOS 17.5 RC". A 2024-07-30 commenter had to resubscribe after updating to iOS 17.6. Bug status: NEW (open). — [WebKit bug 273063](https://bugs.webkit.org/show_bug.cgi?id=273063)
- 3 silent pushes cause removal of all subscriptions for that origin. [Source] — [WebPushDaemonConstants.h](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/Shared/WebPushDaemonConstants.h); [PushService.mm](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/webpushd/PushService.mm)
- Apple forum thread 728796 (2023–2025) [Observed]:
  - "We receive 3 or 4 notifications and then they suddenly stop arriving" (Sep 2023), which is consistent with the 3-strike rule if `waitUntil` is missing.
  - An endpoint "expires in a week or two, and it just disappears" (Jun 2023).
  - Pushes stopped "after some 100s" on iOS 18.1.1/18.3 (Feb 2025), attributed to a missing `event.waitUntil()`.
  - The fix reported was reinstalling the web app or resubscribing.
  - No Apple staff reply.
  
  — [Apple Developer Forums 728796](https://developer.apple.com/forums/thread/728796)
- A 201 was returned from web.push.apple.com for a subscription that had been replaced, where the developer expected 410. A permission-blocked subscription still has a "valid" endpoint. [Observed] — [Apple Developer Forums 719990](https://developer.apple.com/forums/thread/719990); see also [WebKit bug 249766](https://bugs.webkit.org/show_bug.cgi?id=249766)
- ITP: "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use". Use of the app resets it; the 7-day cap covers IndexedDB, LocalStorage and Service Worker registrations (2020-03-24). [Documented] — [WebKit: Full Third-Party Cookie Blocking and More](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
- 2026 guides conflict on whether the 7-day eviction touches installed web apps, and advise treating the subscriber list as decaying with cleanup on 410/404. [Observed, secondary] — [webscraft.org 2026](https://webscraft.org/blog/pwa-pushspovischennya-na-ios-u-2026-scho-realno-pratsyuye?lang=en); [synthetixis.com 2026](https://synthetixis.com/writing/pwa-ios-2026)
- Safari 27.0 (2026-09-17) fixes "service worker registrations to be unregistered when the main script is missing" and "…when failing to retrieve stored imported scripts". A broken SW deploy (e.g. a missing `sw.js` or a 404 on an imported chunk) can therefore now unregister the SW. [Documented] — [WebKit Features for Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)

### Inferences
- **Detection without `pushsubscriptionchange`.** Three steps:
  - (1) On every app open and every `visibilitychange`→visible, call `pushManager.getSubscription()`. If it is null or the endpoint changed, `subscribe()` again. Re-subscribe is allowed without a gesture once permission is granted; observed reports suggest a gesture may be needed after loss, so show a one-tap "Reconnect reminders" button when `Notification.permission !== 'granted'` or `subscribe()` throws.
  - (2) Upsert the endpoint to Supabase with `last_seen_at`.
  - (3) **Delivery receipts:** with `mutable: true`, or a plain SW push handler, have the SW `fetch()` an ack endpoint. With pure non-mutable declarative push the SW never runs, so receipts need a different signal: the app open triggered by `navigate`, or a tap-through query param.
  
  A server-side heartbeat could flag "no ack/open in X hours" and escalate through a non-push channel (SMS, email, or a family member). [Inference]
- **Avoid strikes:** use declarative payloads. If a SW `push` handler exists, always `event.waitUntil(showNotification(...))` and never early-return. [Source-based]
- **Avoid self-inflicted death on Vercel:** keep `sw.js` and imported scripts stable and present across deploys, given the Safari 27 auto-unregister fixes. [Inference]
- On 410, 404 or 403 with VapidPkHashMismatch, delete the subscription and flag the user for re-subscribe on next open. [Documented codes + inference]

### Gaps
- There is no authoritative list of what makes Apple return 410 for a web push endpoint (uninstall? permission off?). Observed behaviour conflicts (201 vs 410).
- I could not confirm whether deleting the Home Screen icon immediately revokes the APNs topic.
- I found no 2026 report quantifying subscription loss after iOS 26.x→27 updates specifically.

## 5. Notification tap behaviour (navigate / openWindow), known bugs

### Takeaway
Deep-linking from a tap now works with the app closed on iOS 26.0 and 27.0.1, according to bug reporters. The long-standing "opens root instead of URL" bug (WebKit 263687) remains formally open but is unreproducible on current iOS. Declarative `navigate` is the no-JS route. Use absolute, in-scope URLs.

### Cited Findings
- WebKit bug 263687, "notificationClick openWindow goes to PWA root instead of url given":
  - Reproduced on iOS 17.0.3 (2023-10-25), rdar://117817784.
  - 2025-12-02: "could not reproduce on iOS 26.0", with both `openWindow()` and `navigate()` working.
  - 2026-10-25: could not reproduce on **iOS 27.0.1**; with the app closed, `openWindow()` opened the in-scope URL including its query string and resolved with a client.
  - Status still NEW.
  
  — [WebKit bug 263687](https://bugs.webkit.org/show_bug.cgi?id=263687)
- WebKit bug 252544 (Feb 2023): "Initial ServiceWorkerWindowClient in a Home Screen web app launched to handle notificationclick handler is inert for a short period". It is RESOLVED FIXED, but a 2024 comment on bug 268797 calls it prematurely closed. `focus()` on a backgrounded client rejected (2023). — [WebKit bug 252544](https://bugs.webkit.org/show_bug.cgi?id=252544); [bug 268797 mailing list](https://lists.webkit.org/pipermail/webkit-unassigned/2024-May/1166592.html)
- A 2023 forum report says an absolute URL in a click handler opened a new Safari tab, while a relative URL only opened the app. This was likely an out-of-scope URL. [Observed] — [Apple Developer Forums 728796](https://developer.apple.com/forums/thread/728796)
- Declarative `navigate` is "a URL that will be navigated to by the browser upon activation". [Documented] — [Meet Declarative Web Push](https://webkit.org/blog/16535/meet-declarative-web-push/)

### Inferences
- Use `navigate: "https://<origin>/?n=<id>#view"` (absolute, in manifest scope) and have the app read the param on load to open the right sheet and log a tap-through. This gives a delivery/engagement signal even with non-mutable declarative push. [Inference]

### Gaps
- I found no independent 2026 write-up confirming declarative `navigate` deep-links into a closed iOS 26/27 web app. The evidence is bug comments only.

## 6. New capabilities in iOS 26/27 relevant to reminders

### Takeaway
Nothing new for notifications shipped in Safari 26.0 or 27.0. iOS 26 makes every Add to Home Screen a web app by default and removes installability requirements. Safari 27 adds only SW static routing and SW robustness fixes. There are still no Notification Triggers, Periodic or Background Sync, Time Sensitive, actions, images, widgets or Live Activities for web apps. Badging works from the page and via declarative `app_badge`.

### Cited Findings
- Safari 26.0 (2025-09-15):
  - "By default, every website added to the Home Screen opens as a web app"; the user can turn off "Open as Web App".
  - "there are now zero requirements for 'installability' in Safari".
  - Automatic inspection and pausing of service workers, useful for debugging Web Push.
  - No notification or push API changes.
  
  — [WebKit Features in Safari 26.0](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- Safari 27.0 (2026-09-17): the "Service Worker static routing API", SW unregistration fixes, and no Web Push, Notification, Badging or manifest items in the release notes. — [WebKit Features for Safari 27.0](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/)
- Safari 27 "Notify Me" (monitor a website for changes) is a Safari browser feature, not a web-platform API for web apps. [Secondary] — [MacRumors: iOS 27 Safari features](https://www.macrumors.com/guide/ios-27-safari/); [Memeburn macOS 27 Safari](https://memeburn.com/macos-27-safari-features-ai-tabs-extension/)
- BCD for Safari iOS (2026-10-28):
  - `navigator.setAppBadge` and `clearAppBadge` supported since 16.4 ("Passing `0`… will clear the badge instead of displaying an unnumbered dot").
  - `getNotifications` 16.4.
  - `periodicSync` and `sync` mirror desktop, where they are unsupported.
  - `pushsubscriptionchange` false.
  
  — [BCD Navigator.json](https://github.com/mdn/browser-compat-data/blob/main/api/Navigator.json); [BCD ServiceWorkerRegistration.json](https://github.com/mdn/browser-compat-data/blob/main/api/ServiceWorkerRegistration.json)
- BCD notes that the `Notification` constructor needs a "web app saved to the home screen… manifest must have a non-default `display` value". This may be stale given Safari 26's "zero requirements" change; keep `display: standalone` anyway. — [BCD Notification.json](https://github.com/mdn/browser-compat-data/blob/main/api/Notification.json)

### Inferences
- **Badge as a passive nag.** The badge persists until cleared, so it is the one "always visible" channel. Set `app_badge` to the open-item count on every push, and set it from the app on open/close. [Inference]
- Users can install **multiple copies** of the web app with different identities (WebKit 2023), each with its own subscription. This is a possible trick for separate notification channels, e.g. a "Meds" copy allowed through Sleep Focus with different banner style. That works only if both copies subscribe and the server targets them separately. — [WebKit 16.4 post](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/) [Inference on usefulness]

### Gaps
- I did not find WWDC26 session details (WebKit for Safari 27, session 204) beyond the release notes. There is no evidence of upcoming web push features in iOS 27.x betas.
