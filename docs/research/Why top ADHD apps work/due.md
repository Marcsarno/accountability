# Due (iOS reminders & timers): why "the most annoying app" works for forgetful and ADHD users

Research date: 2026-10-28. Current build: Due 26.6, released 2026-10-25, US price $7.99, 4.67★ from 2,826 US ratings. The seller is listed as "Due Apps LLP" ([App Store lookup API](https://itunes.apple.com/lookup?id=390017969&country=us); [App Store listing](https://apps.apple.com/us/app/due-reminders-timers/id390017969)). The brief names the developer as "Phocus / Lin Junjie". The current App Store seller name is "Due Apps LLP", and I found no source in this session that names "Phocus", so treat that label as unverified.

Source-quality legend used below: **[Official]** = dueapp.com, the Zendesk help centre or the App Store description (marketing or documentation by the developer). **[Dev voice]** = the developer's own blog or essays. **[User]** = App Store reviews or Reddit. **[Press]** = independent reviews. Note that the MacStories "most annoying app" piece is *sponsored* content written by the developer.

Method notes:
- I pulled 500 US App Store reviews (Sep 2021 to 25 Oct 2026) from Apple's public RSS feed ([feed](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)). The rating split in that sample was 377×5★, 47×4★, 22×3★, 21×2★, 33×1★. Individual reviews have no URLs, so every review quote below cites the feed and gives the review date and title.
- I pulled all 65 Help Centre articles through the Zendesk API (`dueapp.zendesk.com/api/v2/help_center/en-us/articles.json`). Many were updated between 9 and 27 Oct 2026 for the Due 26.5 redesign.
- Important: a shared scratch folder briefly held review files from a different app (Structured) because of a write race. I re-downloaded everything into a clean folder and used only reviews with Due version numbers (21.x–26.x). If any other researcher's Due notes quote "v4.6.x" or "v3.29.x" reviews, those are Structured reviews, not Due.

---

## 1. Full interaction design: create, list, notification, snooze, done, reschedule, recurring

### Takeaway
Every part of Due is built so that capture takes seconds and *postponing is as cheap as completing*. The same 12-button Quick Access Times grid sets a date, reschedules, bulk-moves and snoozes, both in the app and inside an expanded notification. Every reminder must have a due time; there are no undated to-dos. Recurrence can count from the due date or from completion. The app is intentionally *not* a calendar: a reminder is the "prepare for it" nudge, not the event itself.

### Cited Findings
**Creating a reminder: natural-language parsing**
- The App Store pitch reads: "Type or say 'Dentist 3p Thu' or 'Meeting in 1h 20m'. Due spots the date, and one tap sets it." — [Official: App Store description via lookup API](https://itunes.apple.com/lookup?id=390017969&country=us)
- How parsing works: you type "Collect passport next Monday 4pm". Due underlines the date it found, and the *first* Quick Access Times button changes to **Set to "next Monday 4pm"** with the resolved date underneath. Tapping it sets the due date and removes the date words from the title (the title becomes "Collect passport"). A small **Keep** button then appears so you can put the words back. If you never tap Set to, the words stay underlined and you can tap them later to choose **Set to** or **Set & Remove**. Parsing never applies silently: the user confirms with one tap. — [Official: Zendesk "Type the date as part of the reminder", updated 2026-10-27](https://dueapp.zendesk.com/hc/en-us/articles/203530719-Type-the-date-as-part-of-the-reminder-natural-date-parsing)
- Accepted forms: "4pm", "4:00 PM", "16:00"; "Aug 22", "22 August", "8/22"; "in 20 mins", "in 6 months"; short forms "in 1h 20m", "2.5 hours", "3p Thu". The short forms "work in every language Due supports". Parsing can be turned off in Settings > Reminder Editor > Parse Dates. — [Official: same article](https://dueapp.zendesk.com/hc/en-us/articles/203530719-Type-the-date-as-part-of-the-reminder-natural-date-parsing)
- An independent 2019 review called natural-language entry "far faster and intuitive" than "scrolling through three different wheels". — [Press: Peer Reviewed (Matt VanOrmer), 2019-08-02](https://www.peerreviewed.io/blog/2019/8/2/due-an-excellent-reminder-app-for-students)

**Quick Access Times (the date/time picker)**
- "Twelve Quick Access Times—all fully customizable—make setting or postponing reminders a piece of cake." — [Official: App Store description](https://itunes.apple.com/lookup?id=390017969&country=us)
- The grid is "a grid of quick access times that you can tap to add time to (or subtract it from)", and you can "personalize the grid with your shortcuts". The reviewer said "There's something liberating about not caring about where you need to tap to confirm a reminder." — [Press: MacStories Due 2 review, Federico Viticci, ~Jan 2015](https://www.macstories.net/reviews/due-2-review-effective-reminders/)
- Buttons can be absolute (e.g. "9:30 AM", "6:30 PM") or relative (e.g. "+10 min", "+1 hr", "+1 day"). You can tap a button more than once to stack it, or tap a time and then nudge it. — [Official: Zendesk "Mark a reminder done or snooze it from a notification", updated 2026-10-27](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761-Mark-a-reminder-done-or-snooze-it-from-a-notification); [Official: Zendesk "Bulk Edit Reminders"](https://dueapp.zendesk.com/hc/en-us/articles/63067783391129-Bulk-Edit-Reminders)
- The dueapp.com homepage describes "12 customizable buttons … add or subtract time from the current date". — [Official: dueapp.com](https://www.dueapp.com/)
- An App Store review from 2024-02-06 (4★) praised "how the time selector intuitively works … fast to set meaningful reminder times". — [User: App Store RSS](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)
- The default 12 presets are **not documented** in any source I found (see Gaps).

**The reminder list, overdue handling, widgets**
- The 2015 layout listed items "from upcoming to future" under relative day headers ("tomorrow", "next 7 days"). A short swipe completes and a long swipe deletes. — [Press: MacStories 2015](https://www.macstories.net/reviews/due-2-review-effective-reminders/)
- The Apple Watch complication shows only overdue reminders "by design": the count, plus up to two of the most recently overdue titles. It acts "as a passive 'notification' for overdue reminders each time you look at your watch". The help text says Due will then "relentlessly let you know that something needs to be done through notifications and auto snooze." — [Official: Zendesk "Complication not showing upcoming reminders"](https://dueapp.zendesk.com/hc/en-us/articles/360039592391-Complication-not-showing-upcoming-reminders)
- The Lock Screen widget "Recent & Upcoming" (Due 26.5, Oct 2026) looks at reminders due from yesterday to the end of tomorrow and shows the ones closest to *now*, "a reminder that has just become overdue or one coming up soon, whichever is closer". — [Official: Zendesk "Lock Screen Widgets", 2026-10-09](https://dueapp.zendesk.com/hc/en-us/articles/63067784247065-Lock-Screen-Widgets)
- Bulk edit (Due 26.5, Oct 2026) lets you select many reminders and reschedule them. An absolute Quick Access Time sets all of them to the same date. A relative one ("+1 hr", "+1 day") "moves each reminder from its own due date". You can also set Auto Snooze, mark done or delete in bulk, with a single Undo for the whole change. — [Official: Zendesk "Bulk Edit Reminders"](https://dueapp.zendesk.com/hc/en-us/articles/63067783391129-Bulk-Edit-Reminders)
- Users had asked for this for years. "Oftentimes I have 4 different notifications going off but something else has come up and rather than postponing them all one at a time I want to push them all back by an hour" (2025-04-29, 5★). After it shipped: "Bulk editing so that if you're going on a vacation, you can select whatever number of tasks … and postpone them" (2026-10-24, 5★). — [User: App Store RSS](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)
- "All reminders in Due requires a due date." Undated to-dos are not supported. — [Official: Zendesk "Can I create todos without alerts or due date?"](https://dueapp.zendesk.com/hc/en-us/articles/204235295-Can-I-create-todos-without-alerts-or-due-date)
- The Mac app has a "Logbook" view of completed items (⌘3). — [Official: Zendesk "Change/Add keyboard shortcuts"](https://dueapp.zendesk.com/hc/en-us/articles/360054916251-Change-Add-keyboard-shortcuts)

**The notification and its actions**
- By default the app name is the notification title and the reminder text is the body. In Due 24.2 (Feb 2024) a setting was added to put the reminder name in the title instead. The title "can only show one line of text", so long names truncate. The trigger for the change was CarPlay, where Critical Alerts show only the title, so drivers heard just "Due". — [Dev voice: dueapp.com blog, 2024-02-21](https://www.dueapp.com/blog/notification-title-due-ios-24_2.html)
- Expanding the notification (touch and hold) shows **Mark Done** and, under it, three one-tap snooze buttons, which default to **+1 hour, +3 hours, +1 day**. Each can be changed to "At Time" or "From Now". With **Custom Snooze** on, the full Quick Access Times grid appears inside the notification. Grid taps only *change* the time; nothing is snoozed until you tap **Snooze**, whereas the three preset buttons act immediately. If the title contains a link, the actions include "Open" and "Mark Done and Open Link". — [Official: Zendesk, updated 2026-10-27](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761-Mark-a-reminder-done-or-snooze-it-from-a-notification)
- History: Due 2 (2015) added actionable notifications (mark done, snooze 1 hour) ([MacStories](https://www.macstories.net/reviews/due-2-review-effective-reminders/)). Due 2.3 (Mar 2016) raised this to three configurable snooze options ([Dev voice: "More Snooze, Less Due", 2016-03-03](https://medium.com/due-app-diary/more-snooze-less-due-fbc12a2cf8ad)).

**Three alert types**
- **Standard** plays once, vibrates only in Silent mode, and gets through a Focus only if Time Sensitive is allowed. **Critical** is a banner with a red "Critical" label; it plays once, breaks through Silent and Focus, and has a custom volume. **Prominent** is "an alarm, like the ones from Apple's stock Clock app": full-screen when locked, a banner when in use, and it "keeps sounding until you Mark Done or Stop". Prominent requires iOS 26. The three types are mutually exclusive per item. — [Official: Zendesk "Standard, Critical & Prominent Alerts", 2026-10-19](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference); [App Store description](https://itunes.apple.com/lookup?id=390017969&country=us)
- The developer advises restraint: "Critical and Prominent Alerts are loud and intrusive by design, so it is worth keeping them for the reminders that genuinely need them." He also notes they can clash with Clock alarms. — [Official: same article](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)
- With a muted device and Standard alerts, "you'll only receive a vibration". — [Official: Zendesk "ringer switch"](https://dueapp.zendesk.com/hc/en-us/articles/203530759-Does-sound-work-when-my-ringer-switch-is-set-to-silent)

**Recurring reminders and editing repeats**
- Quick repeats are daily, weekdays, weekly, monthly and yearly. Custom repeats cover every N days/weeks/months/years, chosen weekdays, "3rd Friday", "last weekday", and so on. **From: Due Date or Completion**: "If you change the water filter two weeks late, the next change is still 3 months after the day you did it." For completion-based repeats, the next *date* is the completion date plus the interval, but the *time of day* comes from the reminder's own due time. "The shortest repeat is every day. There is no every-N-minutes or every-N-hours repeat"; for that, use a reusable timer. — [Official: Zendesk "Repeat a reminder", 2026-10-27](https://dueapp.zendesk.com/hc/en-us/articles/203530769-Repeat-a-reminder-daily-weekly-monthly-on-certain-days-or-after-you-complete-it)
- Postponing one occurrence keeps the pattern. Example: postponing a reminder due on the 27th to the 28th still produces the next one on the 27th, two months later. The prompt offers "Always only this occurrence", "Only this occurrence" and "All future occurrences". A warning triangle appears when the due date no longer fits the pattern. — [Official: Zendesk "Modifying due dates for repeating reminders"](https://dueapp.zendesk.com/hc/en-us/articles/24002229975577-Modifying-due-dates-for-repeating-reminders)

**"Prepare for it" instead of pre-alerts**
- "The reminders in Due are the reminders before the event, instead of the event itself. So our reminder in Due would really be 'Prepare for meeting', set to sound at 3pm, instead of 'Meeting' set at 4pm itself." — [Official: Zendesk "Can I setup pre-alerts before due time?"](https://dueapp.zendesk.com/hc/en-us/articles/204235285-Can-I-setup-pre-alerts-before-due-time)
- "Due is a reminders app—not a calendaring app." The suggested workflow for a dentist appointment on Thursday at 4:15 is to set a reminder two days before at lunchtime, then postpone it by another day when it fires. — [Official: Zendesk "Set a pre-alert before an event"](https://dueapp.zendesk.com/hc/en-us/articles/360038444231-Set-a-pre-alert-before-an-event)

**Other surfaces**
- Siri ("Hey Siri, start Laundry timer in Due"), Control Center, Shortcuts, widgets, the Watch app, and a Mac app sold separately. There is no account: "We don't store, and we can't access, your reminders … you don't need internet to receive reminders." — [Official: App Store description](https://itunes.apple.com/lookup?id=390017969&country=us)
- Due 26.5 (Oct 2026) brought an all-new Watch app with a Quick Access Times picker (tap a time, then confirm the resulting time). — [Official: Zendesk "The Apple Watch App and Quick Access Times"](https://dueapp.zendesk.com/hc/en-us/articles/63067787911833-The-Apple-Watch-App-and-Quick-Access-Times)

### Inferences
- The design principle is **symmetry of cost**: "done" and "not now, but at X" are each one or two taps, from the same surface, using the same picker. Snoozing never costs more than dismissing, so the user has no reason to pick the destructive option (swipe away) just to make the noise stop.
- The "Set to …" confirmation and the visible "date banner" give the user feedback without making them read a calendar. They see the *resulting* time, never a picker state.
- The developer's own 2016 snooze defaults (+3 h, 10:30 AM, 10:30 PM; see Q3) show a deliberate model. Snooze targets should be *meaningful moments* ("tonight", "tomorrow morning"), not arbitrary short delays that just bring the interruption back.
- Requiring a due time for every item enforces the "every item has a next nag time" invariant that the persistence engine depends on.

### Gaps
- The factory defaults of the 12 Quick Access Times are not documented in any source I reached. The help centre gives only examples ("9:30 AM", "6:30 PM", "+10 min", "+1 hr", "+1 day"). App Store screenshots or a device would confirm them.
- Exact list sorting and grouping in the 26.5 redesign (e.g. whether there is an "Overdue" section at the top) is undocumented. The 2015 description is the only detailed one, and it predates several redesigns.
- I could not view the "Overview of Due" walkthrough video (embedded, not text).

---

## 2. Auto Snooze in exact detail

### Takeaway
Auto Snooze re-fires an overdue reminder at a fixed interval (1, 5, 10, 15, 30 or 60 minutes), counted on a fixed cadence from the due time. It stops only when the user marks the reminder done, reschedules or snoozes it, or turns auto snooze off for that item. On iOS it is a *finite* burst: 5 repeats by default, configurable up to 10. The app re-arms it "indefinitely" whenever you open Due or act on any Due notification. Prominent alerts delay the clock until you respond.

### Cited Findings
- "Auto Snooze* keeps nudging you about a missed reminder until you mark it done or reschedule it. Choose between every 1, 5, 10, 15, 30 and 60 minutes." Footnote: "* By default, auto snooze repeats 5 times, and can be configured to repeat up to 10 times. Due can auto snooze any overdue items indefinitely when you launch Due or act on any of its notifications." — [Official: App Store description, Due 26.6, Oct 2026](https://itunes.apple.com/lookup?id=390017969&country=us)
- On Mac, "By default, all reminders created in Due for Mac have an auto snooze interval of every 5 minutes". Auto snooze is configurable per reminder, can be disabled per reminder, and repeats "until you mark it complete, reschedule it, or turn off its auto snooze". The same (old) page says "iOS only supports auto snooze intervals of every minute and every hour". That is now outdated, or more precisely it describes the *free* tier (see next bullet). — [Official: Due for Mac Help "Fine-tuning reminders" (undated, legacy)](https://www.dueapp.com/support/osx/fine-tuning-reminders.html)
- On iOS, the default for *new* reminders lives in Settings > Defaults For New Reminders > Auto Snooze and does not change existing reminders. Per reminder, the setting is the **Zzz** button at the top of the editor. If a reminder set to 5/10/15/30 minutes fires *every minute* instead, "you could be missing a receipt". Restoring the purchase "restores Every 5 / 10 / 15 / 30 minutes auto snooze". So 1-minute and 60-minute are the base intervals and 5/10/15/30 are a paid unlock. — [Official: Zendesk "Reminders not respecting auto snooze setting", 2026-10-09](https://dueapp.zendesk.com/hc/en-us/articles/203299799-Reminders-not-respecting-auto-snooze-setting)
- In 2015 the 5/10/15/30-minute options were one of four features behind a $2.99 in-app purchase for existing owners. — [Press: MacStories 2015](https://www.macstories.net/reviews/due-2-review-effective-reminders/)
- **How the interval is counted (fixed cadence from the due time):** In the developer's iOS 10 bug write-up, a reminder due at 9:10 with 5-minute auto snooze "did not fire at 9:10; instead, three notifications came in at once at 9:20", i.e. the 9:10, 9:15 and 9:20 slots. A second report: due 10 AM with 10-minute autosnooze produced "three notifications at once at 10:20 AM". — [Dev voice: Due App Diary, 2016-09-23](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8); [2016-09-21](https://medium.com/due-app-diary/preliminary-findings-on-notifications-randomly-not-firing-in-ios-10-6df649f9a969)
- A user describes the same cadence for timers: "I set a timer for 30minutes and an Auto Snooze of 1 minute … I get notified at 31 min, 32 min, 33 min, and so on." (2021-11-26, 5★) — [User: App Store RSS](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)
- **Implementation history (why it is a finite burst):** iOS 10's User Notifications framework removed "the ability to repeat a notification from a specific date, at a regular time interval … This feature is critical for the auto snooze feature in Due to work." The developer expected that "some tradeoffs should be expected" and "some changes to the way auto-snooze work". — [Dev voice: 2016-09-21](https://medium.com/due-app-diary/preliminary-findings-on-notifications-randomly-not-firing-in-ios-10-6df649f9a969); [2016-09-23](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8)
- **Interaction with Prominent alerts:** "Auto Snooze works with all three alert types. The one difference: a Prominent alert keeps sounding until you attend to it, so its Auto Snooze interval only starts counting once you do." — [Official: Zendesk alert-types article](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)
- **Stopping a Prominent alert vs marking it done:** Stopping (slide to stop, the ✕ on the banner, or the side/lock button) a reminder *with* Auto Snooze makes it "fire again at the next Auto Snooze interval". Without Auto Snooze it "will not fire again". For a timer, Stop *ends* the timer even with Auto Snooze on, so you must tap Snooze instead. In the hardware-button table, iPhone Side/Volume/Action buttons stop the alert and the reminder re-fires at the next interval. For the Apple Watch, the flattened table maps the Side button / Digital Crown rows to "Marked done. It won't alert again." The Camera Control / Watch Ultra Action button does not stop it. "On Apple Watch, the button under Mark Done reads Stop, even when the reminder will snooze. watchOS sets that label." — [Official: Zendesk "Use Prominent Alerts", 2026-10-27](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793-Use-Prominent-Alerts)
- Timer Prominent alerts have their own "Snooze Duration": by default "Match Timer Duration" (a one-hour timer comes back an hour later), or a fixed 1–60 minutes. "This option is for timers only. Reminders snooze according to their own Auto Snooze setting." — [Official: same article](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793-Use-Prominent-Alerts)
- **Interaction with Critical alerts:** Critical plays once per notification and breaks through Silent/Focus, so every auto-snooze repeat of a Critical reminder is itself a Critical alert. "You do not need to stop the alert sound manually." — [Official: Zendesk alert-types article](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)
- **Apple Watch:** notifications go to the Watch *or* the iPhone, not both. They go to the Watch only when the iPhone is locked and the Watch is unlocked and on the wrist. — [Official: Zendesk "No alerts on Apple Watch"](https://dueapp.zendesk.com/hc/en-us/articles/217010886-No-alerts-on-Apple-Watch)
- "Continue Playing Sound on Apple Watch" (default off) plays the critical sound on the Watch only, for selective-critical items whose sound is "None". The intent is a silent iPhone with an audible wrist. — [Official: Zendesk "Use Critical Alerts"](https://dueapp.zendesk.com/hc/en-us/articles/15781461032473-Use-Critical-Alerts)
- **Multi-device side effect:** iOS background sync depends on iOS waking the app. A reminder completed on the iPhone can keep nagging on the iPad. The official mitigation is to "consider disabling Auto Snooze on the device(s) you're less likely to have with you". On iOS 27 a Shortcuts automation can sync "every time Due sends you a notification. Auto Snooze keeps going". — [Official: Zendesk "Background sync not working", 2026-10-09](https://dueapp.zendesk.com/hc/en-us/articles/204235325-Background-sync-not-working)
- Bulk edit can set Auto Snooze on many reminders at once. — [Official: Zendesk "Bulk Edit Reminders"](https://dueapp.zendesk.com/hc/en-us/articles/63067783391129-Bulk-Edit-Reminders)

### Inferences
- **The state machine as documented:** `scheduled → due (fires at T) → overdue-nagging (fires at T+i, T+2i, … up to N repeats, N=5 default, max 10) → [done | rescheduled/snoozed (new T, nag count resets) | auto-snooze off]`. Opening the app or acting on *any* Due notification re-arms the bursts for *all* overdue items ("indefinitely"). For Prominent alerts, T+i is measured from when the user stops the alarm, not from the original T.
- The finite 5/10-repeat burst is almost certainly a workaround for iOS's local-notification model. After iOS 10 the app must pre-schedule discrete notifications instead of one repeating trigger, and iOS caps how many local notifications an app can have pending (64 is the commonly cited figure from Apple's documentation; I did not re-verify it in this session). An app that is never opened cannot add more. This also explains several user complaints in Q4 (nagging "stops" after a while, or "I don't get notifications until I open the app again").
- Because the cadence is anchored to the due time and not to the last interaction, the reminder never drifts later on its own. That makes "how late am I?" legible: the 3rd ping at a 5-minute interval means 10 minutes overdue.

### Gaps
- No source states whether the iOS default interval for new reminders is 5 minutes (the Mac default is documented as 5 minutes, and several reviewers say "every five minutes", but the iOS factory default is not documented).
- No source states whether snoozing via a notification button (+1 hour etc.) also resets the repeat counter. It is logically implied, because the snooze creates a new due time, but this is unconfirmed.
- The Watch-button rows in the Prominent table were flattened in the API text, so "Side button → marked done" vs "Digital Crown → marked done" cannot be cleanly separated. Check the live article.

---

## 3. The developer's philosophy: persistence, "prepare for it", speed, pricing

### Takeaway
Lin Junjie built Due in 2010 for himself to "quickly capture *what* needs to be done, and *when*". He added Auto Snooze after realising "it was easy to miss notifications", and he embraces being "annoying". His design writing repeatedly optimises for fewer app launches (act from the notification or the wrist), meaningful snooze targets, and one-person-business longevity. His pricing is a paid-up-front app plus an optional "Upgrade Pass" whose unlocks are permanent. He explicitly says he is "not a fan" of subscriptions that remove features.

### Cited Findings
- "'Annoying' is probably not a word a developer would like his app to be associated with … I certainly don't mind." "The truth is, I created Due in 2010 for myself." Its first version was to "quickly capture *what* needs to be done, and *when* it needs to be done." "When I realized it was easy to miss notifications, I added Auto Snooze. It repeatedly notifies me of overdue reminders until I act on them." "It has helped people living with ADHD and early dementia." — [Dev voice, *sponsored* post: MacStories "I Made the Most Annoying App. And People Loved It." (undated)](https://www.macstories.net/sponsored/i-made-the-most-annoying-app-and-people-loved-it-sponsor/)
- **Snooze design reasoning (2016):** "I've since increased my first snooze option from +1 hour to +3 hours. I realised that if I cannot, or do not want to, act on a reminder right now, it's unlikely for me to be able to do so in an hour's time. Bumping reminders by +1 hour means I end up getting interrupted by the same reminder an hour later, and have to bump it again." His other two options were "10:30 AM … to the next morning, and 10:30 PM for reminders I only intend to act on before the end of today." Goal: "I find myself having to launch Due less often." — [Dev voice: "More Snooze, Less Due", 2016-03-03](https://medium.com/due-app-diary/more-snooze-less-due-fbc12a2cf8ad)
- On the Watch: "Apps on Apple Watch are slow … the Apple Watch is plenty good for notifications … it makes more sense to improve the user experience by improving what users can do with notifications." — [Dev voice: same post](https://medium.com/due-app-diary/more-snooze-less-due-fbc12a2cf8ad)
- On the iOS 10 four-action notifications: "I found myself able to manage my reminders without launching Due as often, which meant less disruption to whatever I was doing on my phone." He also documented users' confusion that the actions became hidden behind "View" / 3D Touch: "one step forward in functionality, but also one step back in usability." — [Dev voice: 2016-09-17](https://medium.com/due-app-diary/ios-10-notifications-one-step-forward-one-step-back-fe712469184e)
- **Reliability as identity:** In 2016 he paused feature work to chase iOS 10 notification bugs ("Like me, I know many of you depend on Due daily") and filed four radars. In 2017 he arranged for his partner to be able to ship the update "in the event that I was no longer around". — [Dev voice: 2016-09-23](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8); [2017-08-03 "A Huge Load Off"](https://medium.com/due-app-diary/a-huge-load-off-878ad6a882a6)
- Open data: the 2017 JSON database meant "users can easily obtain a plain-text backup … or even create their own tools". — [Dev voice: "Due Status Update 2017"](https://medium.com/due-app-diary/due-status-update-2017-a654cdfcd2d1)
- **"Prepare for it":** "The reminders in Due are the reminders before the event, instead of the event itself … 'Prepare for meeting', set to sound at 3pm." — [Official: Zendesk](https://dueapp.zendesk.com/hc/en-us/articles/204235285-Can-I-setup-pre-alerts-before-due-time); "Due is a reminders app—not a calendaring app." — [Official: Zendesk](https://dueapp.zendesk.com/hc/en-us/articles/360038444231-Set-a-pre-alert-before-an-event)
- **Restraint with loud alerts:** keep Critical and Prominent "for the reminders that genuinely need them … Using them sparingly keeps them effective." — [Official: Zendesk](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)
- **Pricing philosophy (2020):** Paid upgrades had "subsidised" free compatibility updates. On subscriptions: "Since I am not a fan of this model, I don't intend to impose this on my customers." The Upgrade Pass is a yearly subscription whose unlocked features stay unlocked after it lapses, and it works "almost exactly like an in-app purchase if you want it to". The aim is "the longevity of the business … The longevity of Due is too important for me to leave it to luck today." — [Dev voice: "The Future of Paid Upgrades", dueapp.com blog, 2020-04-29](https://www.dueapp.com/blog/future-of-paid-upgrades.html)
- Current terms (Oct 2026): buying Due gives "every feature in the app today" plus "every new feature released within a year". The optional Upgrade Pass covers later features, "Every feature that you have unlocked will remain available to you, forever", and bug-fix/compatibility updates are always free. "If you bought Due back in 2010 for your iPhone 3G running iOS 4, that very same app in 2026 is now optimized for iPhone 18 Pro Max running iOS 27." There is no iOS trial. — [Official: App Store description](https://itunes.apple.com/lookup?id=390017969&country=us); [Zendesk "What is the Upgrade Pass?"](https://dueapp.zendesk.com/hc/en-us/articles/360053244591-What-is-the-Upgrade-Pass); [Zendesk "Is there a trial available?"](https://dueapp.zendesk.com/hc/en-us/articles/360054013952-Is-there-a-trial-available)
- The help centre says Due "is made by one independent developer, with a partner on the Mac app". — [Official: Zendesk "How do I get a refund?", 2026-10-14](https://dueapp.zendesk.com/hc/en-us/articles/63227774872601-How-do-I-get-a-refund)
- Privacy: "There's no account to sign up for. We don't store, and we can't access, your reminders and timers." Due 26.6 also changed support logs to "show a code instead of shortened titles". — [Official: App Store description + 26.6 release notes](https://itunes.apple.com/lookup?id=390017969&country=us)
- Third-party endorsement: John Gruber (Daring Fireball, 2024-12-29, a sponsorship thank-you post) wrote that he has relied on Due "for 14 years and counting" and that its "conception and presentation of 'reminders' works for me and my way of thinking". — [Press (sponsor context): Daring Fireball](https://daringfireball.net/linked/2024/12/29/due)

### Inferences
- The philosophy is "the notification is the product". Most design effort goes into what can be done *without opening the app*: the snooze grid in the notification, Watch snooze and the Lock Screen widget. The app itself is a fast editor.
- The developer separates *capturing* (fast, natural language, a time is always required) from *nagging* (relentless but cheap to defer), and rejects becoming a calendar or task manager. Users mirror this: Due is the "MUST do" list, alongside Things/OmniFocus (Q4).
- Pricing matters for ADHD users specifically because a subscription is itself a recurring obligation to remember. Reviewers single out "one-time payment instead of a 'subscription plan'" (Q4).

### Gaps
- I found no formal, non-sponsored interview with Lin Junjie. The "most annoying app" essay is sponsored and undated.
- The Medium archive (news.dueapp.com redirects to medium.com/due-app-diary) returned 403. I read only the 6 posts in its RSS feed (2016–2017).
- The Upgrade Pass price is not stated in any official source I reached. Reviewers report $4.99/year for iOS and $9.99/year for Mac (see Q4); treat these as user-reported.
- I could not find a reliable source for the "Phocus" company name.

---

## 4. What users (especially ADHD users) love and hate, in their own words

### Takeaway
Users love three things. **Persistence** ("nag me until I relent"). **Cheap postponement** (one-tap snooze to a meaningful time from the lock screen or Watch). **Reliability built up over many years**, with many reviewers reporting 10+ years of use. ADHD reviewers say the repeat is what catches the "I'll do it in a minute… forgot" gap and hyperfocus.

The recurring hates fall into five groups:
- Multi-device sync, where a reminder completed on one device keeps nagging on another.
- Silent failures, where nagging stops until you open the app.
- Watch buzz storms when several reminders fire together.
- No pre-alerts, notes, lists or undated to-dos.
- Paywalled features for older buyers, and (Oct 2026) the 26.5 UI redesign.

Fatigue and "done to shut it up" are acknowledged by users, who manage them by keeping Due for a *small* set of must-do items.

### Cited Findings
All user quotes below are from the US App Store RSS feed ([source](https://itunes.apple.com/us/rss/customerreviews/page=1/id=390017969/sortby=mostrecent/json)) unless another link is given. Format: date, stars, review title.

**Love: persistence catches the ADHD "lapse"**
- "Just now, I got a reminder to take my medication. I went into the bathroom, got distracted, and forgot my med. Due reminded me again so I got back up and took it." (2024-02-04, 5★, "Amazing for people with ADHD")
- "When I am hyper focused I may not even notice a reminder go off, and without the immediate repeating reminders I will never disengage enough … Now I can get alerts 4+ times realize I'm not going to do it right now, and then immediately reschedule." (2022-05-30, 5★, "A must for persons with Add/adhd")
- "repeating reminders if you don't acknowledge the reminder (so if your phone beeps, you look at the reminder, and then intending to do it get distracted … it'll beep again in just a little bit)." (2023-11-11, 5★, "If you have ADHD, you want this!")
- "I set reminders and calendar appointments in the native apps … the notifications always disappear into the ether. I see them once, and then with my ADHD, I forget about it within just a few seconds." (2025-01-23, 5★, "Super Helpful for ADHD")
- "I need to be reminded of my reminders (lol) until the task is done, or I postpone, and start the reminding process over again…repeat, repeat, repeat." (2025-01-20, 5★, "Essential")
- "the persistent reminders every five minutes is so helpful … my memory is like that of a worm's. Also, the one-time payment instead of a 'subscription plan' is super important." (2025-09-02, 5★)
- "great for people like me who easily fall into the clear and 'ok ill do it in a minute' trap only to forget a few minutes later." (2022-11-22, 5★)
- "My husband … was setting reminders in his phone, but if they would remind him at the wrong time he would clear it and forget about it. I love how this app lets you snooze." (2025-08-21, 5★)
- "Fantastic Dementia help … My medicine reminders are set to keep reminding me every 15 minutes until I mark it done." (2023-08-16, 5★)
- "Due works for me because it keeps refreshing the reminder so it stay at the top of notifications." A former Android user. (2021-11-29, 5★)

**Love: postponing is a decision, and it is cheap**
- "If I push something into the future I have to make a constant choice, which is a very healthy way of deciding what to do at a given moment." (2022-02-17, 5★, "Perfect for ADHD")
- "I love the ability to snooze a reminder from the lock screen, either from a selection of customizable times (e.g., 9am, 2pm) or a customizable AMOUNT of time (e.g., 3 hrs, 6 hrs)." The same reviewer liked repeats "from the date due … or from the completion date". (2026-03-13, 5★, severe ADHD)
- "4 options on the notification: DONE and 3 time snoozes … where I have mine at 1h, 3h, 5pm." (2026-02-04, 5★, "Great ADHD bug-me app")
- "It's quick enough I can just snooze it or do it." (2025-11-21, 5★)
- "I realized that DUE has always worked so well for me because of how frictionless it is." The reviewer was diagnosed with ADHD as an adult. (2026-05-07, 5★)

**Love: trust and reliability (the "outsourced memory" effect)**
- "they are only worth it if you can FULLY TRUST that once you put it in the app, it WILL remind you … It's like telling a close trusted friend 'hey, can you call me on Tuesday'." (2026-10-21, 5★, "11+ years with this app!")
- "I can reliably ignore my watches alerting me, knowing that I will be notified in another five minutes." (2024-01-16, 5★)
- "Frees up a lot of mental load knowing I'll be reminded shortly and can quickly snooze with the preset adjustments." (2026-08-01, 5★)
- "I have offloaded so much to it that I no longer have to always remember." (2023-01-22, 5★)

**Love: the "most annoying" framing, adopted by users**
- "Congrats on making the only annoying app I use!" (2023-04-21, 5★, "A seriously annoying app")
- "The most annoying app ever in a good way." (2026-09-10, 5★)
- "Due is like the Terminator. it just keeps coming!" (2023-03-05, 5★)
- "Persistent to a fault it won't let you forget anything!" (2025-12-04, 5★)

**How power users scope it (and avoid fatigue)**
- "I use Things for most of my task management … Due is still indispensable for anything I ABSOLUTELY CANNOT AFFORD TO FORGET. Auto snooze is a game changer." (2023-07-18, 5★)
- "By keeping only time-sensitive reminders, it ensures you're not overloaded with notifications or becoming desensitized to them." (2025-03-03, 5★)
- "At first I had set each task with audible alarms and snooze timing, but soon learned that drove me crazy since I use Due for so many different tasks. Now, just the time-sensitive tasks are set that way." (2024-07-17, 5★, "Great tool for ADHD")
- "I only put a few reminders in at a time or it would annoy me too often." (2021-11-25, 5★, ADHD)
- "Critical Alerts … enables you to separate those absolutely important do-or-die reminders from other nudges." (2023-06-21, 5★, adult ADHD)

**The fatigue / "marked done to shut it up" failure mode, in users' words**
- "Do I become numb to the alerts sure; but also; it's the most important app for me." (2025-12-20, 5★, "My ADHD GTD Tickler….and 'Annoyer'")
- "It positions you either check off the reminder because you actually fulfilled the task or it will force you to face up and lie about the reminder you you didn't do and you checked it off." (2023-03-06, 5★)
- "No way to forget to do it now as long as I don't mark it done before I actually complete the task." (2023-08-16, 5★, dementia)
- "does an excellent job in making sure you don't mark it 'done' until it's actually done." (2024-01-05, 5★)
- "worth its weight in gold for those of us that NEED the reminders while not being too annoying or what I call becoming numb to my tasks." (2023-05-25, 5★)
- Requests for gentler cadences: "change the auto-snooze feature to every 2-3 hours. It would reduce my alarm fatigue." (2025-03-27, 5★)
- Accidental completion: "A couple of times I have hit the 'complete' check mark button or swiped sideways by accident. Then the whole reminder is gone and you can't bring it back." (2023-07-17, 4★)
- Hyperfocus still defeats it sometimes: "i heavily rely on due.app to remember things. but… sometimes i completely miss its alarms because i'm hyper-focused. this is very very true when i am emotional." — [User: r/ADHD, 2025-05-08](https://www.reddit.com/r/ADHD/comments/1khtf1d/hardwired_highreliability_system_to_check_1_daily/)

**Hate: silent failure / nagging stops**
- "I randomly stop getting notifications until I open the app again. I usually only dismiss alerts via notifications … I keep forgetting to take meds." (2026-01-31, 1★)
- "iOS would just randomly put the app to sleep so you would go all day without realizing you weren't being bugged." The workaround was a daily Shortcuts automation that opens Due. (2022-12-08, 5★)
- "If I miss my reminders for a day which are set to remind me daily, the reminder won't prompt me at all." (2022-12-16, 2★)
- "if you mute the notifications enough they stop appearing and I forget about what I was supposed to do." (2021-10-31, 4★)
- "after setting up a recurring task and completing the task on the first day, it didn't alert me on second day … the task had a zzzz indicator." (2026-09-15, 5★); "received no alerts or notifications. Went back and all tasks said zzz." (2023-06-20, 1★)

**Hate: multi-device and Watch**
- "if you clear a reminder on your phone it will still ding every 5 minutes on your iPad until you open it on the iPad." (2024-12-22, 4★); also 2026-07-17 (4★) and 2022-08-18 (4★): "Background syncing happens about 50% of the time."
- Watch storms: "If you have stacked reminders (say 5 reminders at 9 AM) … It buzzes you, 5 separate times … every 5-10 seconds for nearly a minute at every reminder or snooze period." Support's answer was "it's Apple's system". (2026-06-08, 2★)
- "it doesn't take my snooze … it keeps notifying the reminder until I respond on the iPhone." (2023-11-19, 4★)
- "when you open the app, incomplete reminder notifications disappear from the lock screen." (2024-03-19, 3★)

**Hate: missing features (philosophy friction)**
- No pre-alerts: "I want to have an alarm before the event without using silly hacks." (2025-12-12, 2★); "I would need to set 5 different reminders for that." (2024-06-06, 2★); also 2021-09-13 (3★) and 2026-07-20 (4★).
- No notes or lists: 2022-09-25, 2023-10-19, 2024-05-11, 2026-08-14.
- No sub-daily repeats: "it doesn't allow you to repeat a task by minute/hour only by day." (2025-10-13, 2★)
- No undated to-dos: "the ability to make reminders in a separate list with no alert … Until then, I am stuck with the native reminders app." (2024-04-09, 3★)
- Vibration-only nags are too weak: "it does a single 'thud' which you likely won't even feel most of the time." (2022-11-23, 1★); "each initial nudge was the alarm sound, and not a vibration reminder." (2023-12-08, 4★)

**Hate: pricing changes and the 26.5 redesign**
- "Charging an extra $4.99 a year for something I already purchased is insane." (2026-02-12, 1★)
- "it has now gone to $4.99 yearly for iPhone and iPad. The Mac has also gone to $9.99 a year." (2024-03-09, 1★)
- "I paid … the one time 5.00 upgrade pass … changed to a subscription service." (2026-10-23, 4★)
- 2023-02 (Due 23.2): a wave of reviews ("Now charging for alarms???", "sneaky thieflike") about features appearing locked one year after purchase. Some reviewers later updated: "The developer responded … corrected the bug" and "Thank you for making dark theme free again".
- "Lost prominent reminders I already paid for with previous sub." (2026-05-27, 3★)
- 26.5 redesign (Oct 2026): "NEW UI IS TERRIBLE … go back to the old, simple, minimalistic ui" (2026-10-21, 1★); "There are all kinds of weird buttons everywhere … none of the useful features (eg undo!!) are anywhere to be found" (2026-10-14, 1★); "a fever dream of '+' signs" (2026-10-10, 1★). Others welcomed it: "contrast is better … just plain easier and more pleasant to read" (2026-10-24, 5★).
- Pricing praised by others: "for only 4.99/yr? Brilliant." (2025-01-20); "far more useful than any of the invariably expensive purpose-built ADHD apps I've tried." (2025-01-06, 5★, ADHD)

**Press and independent framing**
- Due's own listing calls the behaviour "impossible to forget anything" (marketing). Independent reviewers (MacStories 2015, Peer Reviewed 2019) praise speed and auto snooze. MacStories noted only ~80% background-sync reliability back in 2015. — [MacStories](https://www.macstories.net/reviews/due-2-review-effective-reminders/); [Peer Reviewed](https://www.peerreviewed.io/blog/2019/8/2/due-an-excellent-reminder-app-for-students)

### Inferences
- The love/hate split maps onto the state machine. Users love the *persistence loop* and hate anything that breaks it silently: the finite repeat cap, iOS app sleep, cross-device state drift. ADHD users cannot audit whether the nagger is still armed, so a silent stop is worse than no app ("I keep forgetting to take meds").
- "Done to shut it up" is real but self-managed. Successful users (a) keep the nag list short and high-stakes, (b) reserve audible or critical alerts for a few items, and (c) rely on cheap snooze-to-meaningful-time so that lying with "done" is never the *easiest* option. Due has no built-in guard (no "are you sure?", no done-confirmation, no deferred-count signal). The only mitigation is that snooze is just as cheap as done.
- Persistence *enables* healthy ignoring: "I can reliably ignore my watch … knowing that I will be notified in another five minutes." The repeat lowers the cost of not acting on the first ping, which reduces anxiety rather than adding to it.

### Gaps
- Reddit coverage is thin. The Arctic Shift API returned "Timeout. Maybe slow down a bit" for most comment searches. One relevant r/ADHD post praising Due (2026-05-06, "the only task tracking app I've managed to consistently use … since 2014") was [removed] by moderators, so its text is unavailable. WebSearch with site:reddit.com returned no threads.
- I did not find ADDitude coverage of Due specifically. The review sample is US-only and recent-biased (500 reviews back to Sep 2021).

---

## 5. Transferable lessons for a web-push implementation (iPhone home-screen PWA, no native alarms)

### Takeaway
Copy Due's *state machine and snooze UX*, not its alarm tier. A server-driven system can actually fix Due's two biggest failure modes, the silent repeat cap and cross-device drift, because the server owns the schedule and sends each repeat. It cannot break through Silent mode or Focus the way Critical or Prominent alerts do, and it may not get rich in-notification snooze grids. So the fallback is fast in-app "snooze to meaningful time" screens reached by tapping the notification.

### Cited Findings
- Due's core loop: a due time is required, then the reminder fires, then it repeats every *i* minutes (1/5/10/15/30/60), anchored to the due time, until done / rescheduled / auto-snooze off. The default is 5 repeats, max 10, re-armed when the user interacts. — [App Store description](https://itunes.apple.com/lookup?id=390017969&country=us); [Mac help](https://www.dueapp.com/support/osx/fine-tuning-reminders.html); [Dev voice 2016](https://medium.com/due-app-diary/update-on-notifications-randomly-not-firing-in-ios-10-and-the-general-sluggishness-5b5a424312d8)
- Notification snooze defaults are +1 hour / +3 hours / +1 day ([Zendesk](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761-Mark-a-reminder-done-or-snooze-it-from-a-notification)). The developer's personal choice is +3 h / 10:30 AM / 10:30 PM, because "+1 hour means I end up getting interrupted by the same reminder an hour later" ([Dev voice 2016](https://medium.com/due-app-diary/more-snooze-less-due-fbc12a2cf8ad)).
- Due's alert sounds come through Silent mode only for Critical and Prominent alerts. Standard alerts only vibrate when muted. — [Zendesk](https://dueapp.zendesk.com/hc/en-us/articles/203530759-Does-sound-work-when-my-ringer-switch-is-set-to-silent); [Zendesk alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009-Standard-Critical-Prominent-Alerts-What-s-the-Difference)
- Due's iOS sync relies on silent pushes that wake the app, and "the final call on when and whether to wake up Due … depends on iOS". — [Zendesk "Background sync not working"](https://dueapp.zendesk.com/hc/en-us/articles/204235325-Background-sync-not-working)
- The project's own iOS PWA facts (verified 2026-10-27): Web Push works in Home Screen apps only (16.4+); the permission request and `subscribe()` must run inside a tap; the payload is limited to 4 KB with a required TTL; "no silent push (permission revoked)"; Declarative Web Push on iOS 18.4+ uses `{title, navigate, body}` plus `app_badge`; `pushsubscriptionchange` is not fired, so subscriptions can die silently. — local file `/home/user/accountability/docs/PWA_PREP.md` (lines 13–16)

### Inferences
**State machine to copy (server-side, per reminder):**
`scheduled(dueAt)` → at dueAt send push #0 → `nagging{n, nextAt = dueAt + n·interval}` → send push n until `n = cap`. Then either stay `overdue-quiet` with the item pinned and badged in the app, or step down to a slower interval. Exits:
- `done` (stops everything)
- `snoozed(newDueAt)` (resets n = 0)
- `rescheduled(newDueAt)` (resets n = 0)
- `nagOff`

Store `lastDeliveredAt`, `lastSeenAt` and `snoozeCount`. Anchor `nextAt` to `dueAt`, not to send time, so lateness stays legible ("3rd reminder = 10 min late").

**Defaults worth starting from:**
- Interval 5 minutes for "must-do" items, matching Due's Mac default and what ADHD reviewers cite.
- An optional 15–60 minute interval for gentler items, since users ask for longer cadences to avoid fatigue.
- Cap around 5 rapid repeats, then either fall back to a slower cadence (e.g. every 30–60 minutes) or stop and keep the item visibly overdue in the app and on the badge.
- Because the server sends every repeat, the app can choose an indefinite slow nag. Due cannot, because of local-notification limits. Do not hit Due's "nagging silently stopped" failure.

**Snooze UX:**
- Offer about 3 one-tap snoozes that land on *meaningful moments*, not just +N. For example "+1 h", "this evening 6:30 PM", "tomorrow 9:30 AM", which is Due's +1 h / +3 h / +1 day logic plus the developer's 10:30 AM / 10:30 PM idea.
- Add a 12-button grid (absolute times plus relative "+10 min / +1 hr / +1 day") that stacks on repeated taps and shows the *resulting* time before confirming.
- If iOS web push cannot render action buttons, the notification tap should `navigate` straight to a single-purpose "Done / Snooze" sheet for that reminder. One tap from the notification to a decision, with no list browsing in between.

**Capture:**
- Require a time on every nag-able item.
- Parse "3p Thu" / "in 1h 20m" but always confirm with a visible "Set to …" chip and keep the original words recoverable (Due's Keep / Set & Remove).

**Recurrence:**
- Support "from due date" and "from completion".
- When completing a postponed recurring item, keep the original time of day.
- Offer "this occurrence only" as the default.

**Done-to-shut-it-up guardrails** (Due lacks these, so they are opportunities):
- Make snooze exactly as cheap as done.
- Provide Undo after done, since a user lost reminders to accidental swipes.
- Optionally show a gentle "snoozed 4× today" count, without shame wording.
- Encourage a short "must-do" list: Due's own advice is to use loud tiers sparingly.

**Wording:**
- Due's register is plain and imperative: "Mark Done", "Snooze", "Stop", "Reschedule".
- Notification titles should carry the reminder text itself, since only one title line is guaranteed (Due's 2024 change). Put the action word first and keep it under about 40 characters.

**Multi-device:**
- The server is the single source of truth, so "done on one device stops all" is solvable, unlike Due's iPad drift.
- Collapse simultaneous reminders into one push (or use the same `tag`) to avoid Due's 5-buzz Watch storm.

**What cannot be replicated (be honest in the UI):**
- No Critical or Prominent equivalent. Web push cannot sound through Silent mode or break through Focus or Do Not Disturb, and cannot ring continuously or take over the full screen.
- No Watch-specific controls.
- No silent background sync.
- Delivery timing is at the mercy of APNs and the subscription can die silently. Label this in the UI (per the project's `Banner tone="sim"` convention, where applicable). For truly critical items (medication), advise pairing with a native Clock alarm.

### Gaps
- I did not verify, in this session, whether iOS Home Screen web push renders notification `actions` buttons, honours `requireInteraction` or `renotify`, or collapses by `tag`. The project's PWA_PREP.md lists only title/navigate/body/app_badge for the declarative format. This needs a device test before relying on in-notification snooze buttons.
- There is no published data on optimal nag intervals or caps for ADHD users; the 5-minute / 5-repeat numbers are Due's defaults plus user anecdote, not evidence from trials.
