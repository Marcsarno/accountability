# Reminder and notification flows in the apps adults with ADHD use to remember and start tasks

Research date: 2026-10-28. Dates in brackets are the date of the source, or the date of the help article's last update. **[UNVERIFIED]** marks a claim from a secondary or fan source, or from an AI search summary I could not open myself. The previous round's notes (`../ADHD task starting apps/capture_breakdown_reminders.md`) cover the high-level summaries of Due Auto Snooze, Marvin Bug Me, TickTick Constant Reminder and Apple Urgent. These notes go deeper into exact behaviour, defaults and wording.

Source access: I read Due's full help centre through its public Zendesk API (65 articles, most updated 2026-10). I read Todoist's help centre the same way, and Finch's help centre for notification mentions. Some sites blocked fetching: webnots, alternativeto, tiimo.nolt.io, habitica.fandom (HTTP 402) and red.ks32.dev (not in this session's allowed network domains). Claims from those sites are marked unverified.

---

## 1. Notification types and timing (advance notice, at-time, halfway, end, overdue, daily summary, morning planning, evening review)

### Takeaway
Only Due, Apple Reminders and Todoist give a reminder that fires again and again, from a single setting, until you act. The "planner" apps (Structured, Tiimo, TickTick, Routinery) add **day-framing** notifications instead: a morning plan, a daily summary at a set time, "review today", and an overdue roll-up. Tiimo and Routinery add **in-activity** cues: start, halfway or time remaining, end, and a voice saying what's next. No app does all of these. A PWA can combine at-time + repeat-until-done (Due) with morning plan / evening review (Structured, Tiimo) and start/halfway/end cues (Tiimo, Routinery).

### Cited Findings

**Due (iOS, v26.6, Oct 2026)**
- Due treats the reminder as the moment to *prepare*, not the event itself: "The reminders in Due are the reminders before the event… our reminder in Due would really be 'Prepare for meeting', set to sound at 3pm, instead of 'Meeting' set at 4pm." There is no separate "pre-alert" field. [2020-12-03] — [Due Help: Can I setup pre-alerts before due time?](https://dueapp.zendesk.com/hc/en-us/articles/204235285) (read via Zendesk API)
- A newer article shows a workaround for an event: keep the event reminder (e.g. "Dental appointment, Thursday at 4:15 pm"), set a pre-alert "two days before, at lunch time", and "postpone the reminder by another day when it fires". [2026-10-19] — [Due Help: Set a pre-alert before an event](https://dueapp.zendesk.com/hc/en-us/articles/360038444231)
- Due has three alert types per item: **Standard** (banner that plays once; respects Silent and Focus; gets through a Focus only if Time Sensitive is allowed), **Critical** (banner with a red "Critical" label; plays once; breaks through Silent and Focus; volume can be set per item), and **Prominent** (a Clock-style alarm: full screen when the phone is locked, a banner otherwise; "keeps sounding until you Mark Done or Stop"). [2026-10-19] — [Due Help: Standard, Critical & Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009)
- Due's own guidance on when to use each type: Standard for "everyday to-dos that can wait until you next check your phone". Critical for e.g. "a daytime medication reminder while your phone is on silent". Prominent for "reminders that absolutely cannot be delayed or missed", such as a cooking timer, "leaving on time for a flight", or time-critical medication. It also warns: "Critical and Prominent Alerts are loud and intrusive by design… Using them sparingly keeps them effective." [2026-10-19] — [Due Help: alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009)
- Timers: "precise to the second, with Auto Snooze too". With Prominent Alerts (25.5, Nov 2025), timers "stay visible and update in real time on your Lock Screen and Dynamic Island". — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- Due's description of how it is meant to work: "you set a reminder for a certain date and time and forget about it until it becomes due. Then, Due will relentlessly let you know that something needs to be done through notifications and auto snooze." [2026-10-09] — [Due Help: Complication not showing upcoming reminders](https://dueapp.zendesk.com/hc/en-us/articles/360039592391)

**Apple Reminders (iOS 26.2+)**
- The **Urgent** toggle on a timed reminder schedules an alarm through AlarmKit. Turning it on asks for permission to "schedule alarms and timers" (first seen in iOS 26.2 beta 1). [2025-11-04] — [9to5Mac](https://9to5mac.com/2025/11/04/ios-26-2-alarms-and-timers-in-reminders/)
- **Early Reminder** is a separate menu that sends an extra notification "minutes, hours, or even days before" the scheduled time. I could not confirm the exact list of offsets or how it interacts with Urgent. **[UNVERIFIED: search summary of how-to sites]** — [MacRumors how-to](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/); [iOSHacker](https://ioshacker.com/how-to/enable-alarm-for-urgent-reminders-on-iphone)

**Todoist (help updated 2026-10-26)**
- There are four reminder types. **Automatic** ("added by default whenever a date and time is scheduled to a task", with the offset from Reminders settings), **Custom** (a date and time, or a time before the due time), **Recurring** (e.g. `ev Tuesday 7:00`) and **Location** (arrival or departure). Each can be delivered as a mobile, desktop or email notification. [2026-10-26] — [Todoist Help: Introduction to reminders](https://www.todoist.com/help/articles/introduction-to-reminders-9PezfU)
- A custom date-and-time reminder on a recurring task fires **only once**, for that occurrence. To be reminded on every occurrence, you need a recurring reminder or a before-task reminder. [2026-10-26] — [Todoist Help: Introduction to reminders](https://www.todoist.com/help/articles/introduction-to-reminders-9PezfU)
- The automatic reminder offset example in an older version of the help text is "30 minutes beforehand", and you can pick "No automatic reminder". **[Older mirror text; the current default offset is not stated]** — [Todoist help mirror](https://gmail.todoist.com/Help/Reminders)
- Location reminders: choose arrival or departure, then "drag [the blue circle] to change the radius". They need "Allow all the time" location access, Precise Location and **Time-Sensitive Notifications** turned on, and they are delivered on mobile only. — [Todoist Help: location reminders](https://todoist.com/help/articles/use-location-reminders-in-todoist-uGcwH2AJ6)

**TickTick**
- **Daily Notification** (also called the "daily report"): Settings → Sounds & Notifications → enable "Daily Notification" and choose a time. It gives an overview of today's tasks, showing what's done and what isn't, and can skip weekends. [2020-12-08; menu path may have changed] — [TickTick blog: 20 lesser-known features](https://blog.ticktick.com/2020/12/08/20-lesser-known-ticktick-features/)
- The current features page says the daily reminder "will remind you to organize today's tasks and start a new day". **[search summary]** — [TickTick features](https://ticktick.com/features)
- **Default Reminder** for tasks with a time can be set to "on time", 15 minutes before or 30 minutes before. [2020-12-08] — [TickTick blog](https://blog.ticktick.com/2020/12/08/20-lesser-known-ticktick-features/)
- Live Activities gained landscape and StandBy support for iOS 27. [2026-10-08] — [Releasebot: TickTick](https://releasebot.io/updates/ticktick)

**Structured (iOS/Android)**
- Default alerts for timed tasks are "At the start of a task and at the end of a task" on Apple. On Android there is also one 1 hour before. All-day tasks default to **8:00 am** on the day. Preset offsets are **1, 5 or 15 min before**, or a custom time, up to a **maximum of 3 h before** on Apple ("due to Apple's restrictions"). Customising alerts **requires Structured Pro**. — [Structured Help: Customize Notifications on Apple Devices](https://help.structured.app/en/articles/1870914)
- **Planning reminders** (Structured 4.4.8+). The morning planning reminder will "send you a reminder in the morning to revisit your upcoming schedule and plan your day". The overdue reminder fires "once you have more than 3 unfinished tasks in a row". The settings path is Settings → Notifications & Alerts → Planning Reminders. The article doesn't give a default time. — [Structured Help: How to Set Planning Reminders](https://help.structured.app/en/articles/9179330)

**Tiimo**
- Settings live under Me → Settings → Notifications. You "Toggle ON the reminders you want, like morning check-ins or motivational nudges". "Time of day reminders" let you "set the time for each notification". **Review today** "appears daily at the time you set", "stays visible until completed" and resets each day. **Review your week** "will be scheduled for Sunday" at a time you set. — [Tiimo FAQ: Notifications](https://tiimoapp.com/faq/notifications)
- The product page shows a sample notification: "Review your day – Celebrate your wins and move unfinished…" (truncated image alt text). — [Tiimo: Widgets & Live Activities](https://tiimoapp.com/product/widgets-live-activities)
- Start, halfway and end activity notifications: an App Store user describes "notifications for beginning, halfway, and end of a task". An AlternativeTo listing reports reminders "halfway through and at the end of activities", and Tiimo marketing reportedly shows "Meeting is halfway through!". **[UNVERIFIED: user review and third-party listing; not in Tiimo's current FAQ]** — [search summary citing Tiimo App Store](https://apps.apple.com/us/app/id1480220328?l=en-us); [AlternativeTo (blocked)](https://alternativeto.net/software/tiimo/about/)
- Version notes (year not shown, most likely 2026): 3.67.0 (Sep 28) "Clearer Live Activity timers with custom task icons", and Watch Focus sessions with countdowns, subtasks, pause and extra time. 3.68.0 (Oct 5) fixed "Notifications on Watch". 3.58.0 (Jun 29) "refreshed notifications". — [Tiimo, App Store](https://apps.apple.com/us/app/id1480220328?l=en-us)

**Routinery**
- Routine start: "Set the weekdays and time; the reminder arrives then." Each step "runs on its own timer while a voice calls out what comes next". Overrun: "Sink into one thing and the voice pulls you out, so an afternoon doesn't vanish." 3.30.3 (Oct 15, presumably 2026): "pick the exact time you receive time-of-day reminders". 3.29.33 (Aug 13): Lock Screen widgets can start routines. — [Routinery, App Store](https://apps.apple.com/us/app/routinery-routine-planner/id1450486923)
- A user review [2023-01-08, adult ADHD/ASD] says "audio & voice notifications are available at a variety of intervals" for task start, time remaining and end. — [Routinery, App Store](https://apps.apple.com/us/app/routinery-routine-planner/id1450486923)

**Llama Life (web/iOS)**
- Settings → "Alarm Type" when a task timer ends. **Visual**: the window "will flash continuously when the timer is up until you click anywhere". **Audio (default)**: "sound once". **Nag**: plays "once every minute until turned off". **Continuous**: "sound constantly until you turn it off". There are also optional **Chimes**, a soft chime at a chosen interval (e.g. every 5 min) to help you refocus mid-task. — [Llama Life Help: Using alarms](https://intercom.help/llama-life/en/articles/6456183-using-alarms)

**Amazing Marvin**
- Reminders can be set from a task (bell icon). Quick options: **In 10m, In 30m, In 1h, Afternoon, Evening, Tonight, Tomorrow 9am, Pick…**. If the task has a time, the offsets are **At time, 10m before, 30m before, 1h before, 1d before**. Tasks with a time in the title (e.g. "Call Anna 14:00") also get "Custom…". You can add **standalone reminders** (☰ → Reminders, or Shift+R). With "Create reminders automatically", a reminder is created whenever a time appears in a title. — [Marvin Help: Reminders](https://help.amazingmarvin.com/articles/1950238-reminders)
- On desktop and web, reminders "show only while Marvin is open in a browser tab or the desktop app". Mobile gets push only when you're logged in. — [Marvin Help: Reminders](https://help.amazingmarvin.com/articles/1950238-reminders)
- I found no documented daily planning or daily review *notification* in Marvin. A third-party blog says the Week Review strategy "appears in the Day View every Monday", which is an in-app prompt, not a push. **[third-party]** — [search summary citing macautomationtips](https://macautomationtips.com/my-four-step-amazing-marvin-planning-process/)

**Focus Bear "Late No More" (macOS)**
- Staged alerts before calendar events: one at **15 min** that is easy to dismiss, then one at **2 min** that is "not easy to dismiss". The alert "changes colour" and "starts playing annoying motivating sound effects". If you ignore the popups you get "verbal alerts or a song". The goal is to join about 2 minutes early. It is Mac-only; Windows and mobile are only planned (launch about 3 years ago). — [Product Hunt: Late No More](https://www.producthunt.com/p/focus-bear/late-no-more?page=1)
- Support docs: the alert offers "I don't need to attend" (dismisses this alert *and all later alerts* for that event) or **Attend Meeting**, which asks for a meeting intention, then a notes window ("No notes required" / "Save notes"). When the meeting ends, a follow-up question pops up. — [Focus Bear Support: Joining a meeting](https://support.focusbear.io/portal/en/kb/articles/joining-a-meeting)
- The App Store listing describes "escalating reminders, visual then spoken"; another support page says "text alert popups 2 minutes before". **[search summary]** — [Focus Bear App Store](https://apps.apple.com/CA/app/id1476964367); [Focus Bear Support: Quit/restart Late No More](https://support.focusbear.io/portal/en/kb/articles/quit-restart-late-no-more)

**Duolingo**
- The core notification is a **daily practice reminder**. The text is chosen from "pools of hand-written templates" with user-specific slots, by a bandit algorithm. The reward is "a lesson within two hours of the reminder being sent". [KDD 2020] — [Yancey & Settles, KDD 2020 (PDF)](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- A fan/analysis site splits notifications into "routine notifs" (sent in the learner's habit window; "practiced at 6pm yesterday, push at 5:30pm today") and "save notifs" (only when a streak or league is about to be lost, e.g. a 10:00 PM "Last chance"). It also says "two pushes a day max", which its own example day contradicts by showing five. **[UNVERIFIED, undated fan teardown]** — [Deconstructor of Fun: Duolingo notifications](https://duolingo.deconstructoroffun.com/mechanics/notifications)
- A Jan 2026 third-party guide says the app has a "Smart Scheduling" toggle plus a manual "Reminder Time". **[third-party]** — [Lingoly](https://lingoly.io/turn-on-duolingo-practice-reminder/)

**Finch**
- Reminders are set per goal: when creating a goal, tap "more options" to customise "time of day, notifications, etc." [2026-10-08] — Finch Help: Creating and Completing Goals (read via the Zendesk API of the [Finch help centre](https://help.finchcare.com/hc/en-us))
- Finch relies on the Home Screen widget as a passive reminder: "a fun reminder to check in with your Finch". [2026-09-18] — Finch Help: The Finch Widget (via [Finch help centre](https://help.finchcare.com/hc/en-us))
- Pause Mode lets you choose how many days to pause "and whether to set a reminder". [2026-10-08] — Finch Help: Pause Mode (via [Finch help centre](https://help.finchcare.com/hc/en-us))
- With Goal Buddies, "You'll both get reminders and encouragement." [2025-08-06] — Finch Help: Goal Buddies (via [Finch help centre](https://help.finchcare.com/hc/en-us))

**Habitica**
- Reminders are set per Daily (time of day, only on days the Daily is active). The Android settings have a "Daily Reminder" section plus per-type push toggles (messages, inactivity, weekly summary). An older iOS setting shows the number of Dailies left as the app badge. **[fan wiki and 2016-era blog via search summary]** — [Habitica blog: Android task reminders](https://blog.habitrpg.com/post/146468903807/habitica-android-update-task-reminders); [Habitica Wiki: Tasks](https://habitica.fandom.com/wiki/Tasks)

### Inferences
- Notification jobs worth covering, with the app that shows each one:
  - prepare-for (Due's "reminder = prepare" model)
  - at-time
  - repeat-until-done (Due, Marvin)
  - start / halfway / end of a time block (Structured defaults to start + end; Tiimo halfway, unverified)
  - morning plan (Structured, Tiimo, TickTick daily notification)
  - overdue roll-up (Structured's >3 unfinished)
  - evening "review today" (Tiimo)
  - weekly review (Tiimo, Sunday)
- Structured's default of **start + end alerts** for every timed task, with no setup, is the cheapest way to get both transition cues.
- Tiimo's "Review today… stays visible until completed" is a persistent in-app card, not a repeating push. A PWA can copy this as a Home Screen badge plus a pinned card.

### Gaps
- Apple's exact Early Reminder offsets in iOS 26, and whether an Early Reminder on an Urgent reminder also rings as an alarm.
- Tiimo's exact per-activity notification options (before / start / halfway / end). The official FAQ doesn't list them, and the third-party pages that do couldn't be fetched.
- The default time of Structured's morning planning reminder, and when its overdue check runs.
- Habitica's current iOS reminder settings (the fan wiki is blocked with HTTP 402).
- Routinery's start-reminder repeat options. A 2022 review mentions a "reminder frequency" (the author used 1-minute intervals), but I found no option list. — [MakeUseOf, 2022-07-29](https://www.makeuseof.com/review-routinery-app-wellness-habits/)

---

## 2. Repeat/nag behaviour: intervals, number of repeats, what stops it (done vs dismiss), escalation steps

### Takeaway
The best nag designs separate **Stop** (silence this ring) from **Done** (end the series). Due, Marvin and TickTick only end the series on completion or reschedule. Due's spec is the most complete: an interval of 1/5/10/15/30/60 min, a repeat cap (default 5, maximum 10, or indefinite when you interact with Due), and Prominent Alerts that keep ringing and only start the snooze interval once you respond. Late No More is the only app found that escalates *modality*: popup, then colour, then sound, then voice or song.

### Cited Findings

**Due**
- Auto Snooze "keeps nudging you about a missed reminder until you mark it done or reschedule it". Intervals: "every 1, 5, 10, 15, 30 and 60 minutes". "By default, auto snooze repeats 5 times, and can be configured to repeat up to 10 times." "Due can auto snooze any overdue items indefinitely when you launch Due or act on any of its notifications." — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- There is a default for new reminders at Settings → Defaults For New Reminders → Auto Snooze, and a per-reminder override with the **Zzz** button in the editor. The default "affects only newly created reminders". Without a valid Upgrade Pass receipt, reminders set to "Every 5 / 10 / 15 / 30 minutes" fire "every minute instead", and restoring the purchase "restores Every 5 / 10 / 15 / 30 minutes auto snooze". [2026-10-09] — [Due Help: Reminders not respecting auto snooze setting](https://dueapp.zendesk.com/hc/en-us/articles/203299799)
- 26.3 (Apr 2, 2026) added a "Sync and Refresh Notifications" Shortcuts action that can "let overdue reminders auto-snooze indefinitely". On iOS 27, a Shortcuts automation can sync Due "every time Due sends you a notification", so "Auto Snooze keeps going" without opening Due. [2026-10-09] — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969); [Due Help: Background sync not working](https://dueapp.zendesk.com/hc/en-us/articles/204235325)
- Prominent + Auto Snooze: "a Prominent alert keeps sounding until you attend to it, so its Auto Snooze interval only starts counting once you do". [2026-10-19] — [Due Help: alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009)
- If you **stop** a Prominent Alert instead of marking it done: a reminder with Auto Snooze "will fire again at the next Auto Snooze interval". A reminder without Auto Snooze "will not fire again". A **timer** ends. The hardware buttons differ: iPhone Side/Volume/Action stops the ring and re-fires at the next interval; Apple Watch Side button or Digital Crown **marks it done**; Camera Control and Watch Ultra Action "doesn't stop the alert". [2026-10-27] — [Due Help: Use Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793)
- The timer Prominent Alert snooze duration defaults to **"Match Timer Duration"**, so a 1-hour timer comes back an hour later. It can be set from 1 to 60 min. Due's example is a "Pick up laundry" timer set to 10 min, giving "a gentle nudge every 10 minutes until you mark it done". [2026-10-27] — [Due Help: Use Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793)
- Due warns that a Due alert and a Clock alarm at the same moment can cut each other off. [2026-10-19] — [Due Help: alert types](https://dueapp.zendesk.com/hc/en-us/articles/58240771866009)

**Apple Reminders Urgent**
- The alarm screen shows "Slide to stop" and "a distinctive blue snooze button". "Complete for Alarm" (Settings → Reminders) replaces Snooze with a large **Complete** button. After you stop or snooze, a view shows a countdown, **Reschedule** and a delete control. [2025-12-17] — [MacMost](https://macmost.com/urgent-reminders-with-alarms-on-iphone.html)
- Snooze is fixed at **9 minutes** and can't be changed, unlike Clock. A Live Activity stays until you complete, reschedule or delete the reminder and "can't slide to remove". Tapping Complete on it may open Reminders, needing a second tap. **[UNVERIFIED: search summaries of Lifehacker (Dec 9, 2025), Make Tech Easier and webnots; I couldn't open the originals]** — [Make Tech Easier](https://maketecheasier.com/iphone-reminders-adds-alarm/); [webnots](https://www.webnots.com/how-to-set-alarm-for-reminders-on-iphone/)
- Ordinary (non-urgent) Apple reminders don't repeat until done (prior round). — [Reddit mirror, Mar 2026](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)

**Todoist Urgent**
- "They trigger a full-screen alarm that cuts through silent and Do Not Disturb modes". On iOS: "tap Complete or slide right to turn the alarm off". On Android it "keep[s] ringing until you press Stop". It works only with time-based reminders, not location. It is on top of normal reminders, and an orange **URGENT** badge appears beside the reminder. [2026-10-19] — [Todoist Help: urgent reminder](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra) (read via Zendesk API)
- **Plan change (resolves the prior round's conflict):** "Urgent reminders are available on all plans. On the Beginner plan, you can mark your one reminder as urgent. With Pro or Business, you can add multiple urgent reminders to a task", plus a `!13:00!` title shortcut. [2026-10-19] — [Todoist Help: urgent reminder](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)

**TickTick Constant Reminder**
- The feature was renamed and expanded on 2026-05-20 ("Enable them in the reminder settings for tasks, habits, and countdowns"). On 2026-06-03 it could be enabled separately for tasks, habits and anniversaries. Reminders "continue until the task is completed, postponed, or otherwise handled". — [Releasebot: TickTick](https://releasebot.io/updates/ticktick)
- "Constant Reminders … cannot be swiped away" (user, Mar 2026). — [Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)

**Amazing Marvin**
- Ordinary reminders can repeat "Just once" or every **5, 10, 15 or 30 minutes**. This is separate from Bug Me. — [Marvin Help: Reminders](https://help.amazingmarvin.com/articles/1950238-reminders)
- Bug Me: "Marking the task done stops it." "Dismissing a notification only clears that one reminder." Keep going for Today, 3 days, 7 days or Until done. Outside the "Only bug me" days and hours, "A reminder due outside that window waits until the window opens again." There are default "Bug me every" and "Keep nagging for" values, but the article doesn't say what they are. — [Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)

**Llama Life**: Nag = once every minute until turned off; Continuous = until turned off. The default is a single sound. — [Llama Life Help](https://intercom.help/llama-life/en/articles/6456183-using-alarms)

**Focus Bear Late No More**: a 15-min soft alert, then a 2-min hard-to-dismiss alert, then colour change, then sound effects, then voice or song if ignored. "I don't need to attend" cancels the rest of the series. — [Product Hunt](https://www.producthunt.com/p/focus-bear/late-no-more?page=1); [Focus Bear Support](https://support.focusbear.io/portal/en/kb/articles/joining-a-meeting)

**Routinery**: a user-quoted review says the routine alarm "overrides your phone's notification and volume settings to set off a max volume, extremely obnoxious alarm and it is the DEFAULT SETTING. you have to switch it off for every routine". The developer replied, "We'll review this for improvement." **[UNVERIFIED: search summary of a non-US App Store page; undated]** — [Routinery App Store (CA)](https://apps.apple.com/ca/app/id1450486923)

**Duolingo "sunsetting"**: after a long run of ignored reminders the app sends "These reminders don't seem to be working. We'll stop sending them for now." **[secondary; no official Duolingo source found]** — [Medium/Debugger: "Duolingo needs to chill"](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0); [ngrow.ai analysis](https://www.ngrow.ai/blog/decoding-duolingo-analyzing-the-effectiveness-of-their-push-notification-strategy)

**Structured**: no repeat or nag. A request for a "Sticky Reminder with snooze options" (a persistent popup with snooze, dismiss and complete) was marked **Rejected** (1 vote, 2024-08-28). — [Structured feedback](https://feedback.structured.app/p/sticky-reminder-with-snooze-options)

### Inferences
- PWA nag state machine (all server-side, since iOS PWAs can't schedule local notifications):
  - Settings: `interval ∈ {1,5,10,15,30,60}` and `cap ∈ {5 default, 10, ∞}`.
  - Cap reset: an *interaction* (opening the app or tapping any notification action) re-arms the cap. This is Due's "indefinitely when you launch Due or act on any of its notifications" rule.
  - Ends only on `done` or `rescheduled`. A plain dismiss or swipe changes nothing (Marvin, TickTick).
  - Quiet window: queue, don't drop (Marvin's "Only bug me").
- Due's design detail matters: the interval restarts **from the user's response**, not from the original fire. Otherwise rings stack up.
- Late No More's staged escalation (soft early warning, then hard prompt near the deadline, then a modality change) can be partly copied in a PWA. Vary the **title and wording** and the **sound** per stage (Web Push can't choose the sound on iOS). Escalate to a *different channel*, e.g. an email or SMS fallback, or an Apple Reminders Urgent alarm the user pre-created via a Shortcut. A PWA can't produce voice or alarms in the background.
- Duolingo's sunsetting is the opposite of an ADHD nag, but there is a lesson in it: after N days of total non-response, change strategy (ask, reduce, or switch channel) rather than keep the same cadence.

### Gaps
- TickTick Constant Reminder's interval and repeat count. No official documentation found.
- Apple Urgent's snooze length (9 min) and whether the Live Activity can be dismissed are only confirmed through secondary summaries.
- Marvin's default Bug Me values.
- I found no app that publishes data on the best nag interval for ADHD users.

---

## 3. Snooze and reschedule options (from the notification and in-app)

### Takeaway
Due offers the richest snooze straight from the notification: Mark Done, three one-tap snoozes (**+1 hour, +3 hours, +1 day** by default, editable as "At Time" or "From Now"), and an optional full grid of 12 **Quick Access Times** on which you can tap several times to add them up. Marvin's in-app quick list (**10m / 30m / 1h / Afternoon / Evening / Tonight / Tomorrow 9am / Pick…**) is the best set of human time labels. Apple (iOS 26.5) is moving toward showing the **exact resulting time** ("Remind Me at 3:00 PM") rather than vague labels.

### Cited Findings
- **Due notification actions:** expand the notification and you get **Mark Done**, then snooze options that "At first… are +1 hour, +3 hours, and +1 day". These act on one tap. With **Custom Snooze** on, the notification shows the Quick Access Times grid (e.g. "6:30 PM", "+10 min"). These "only change the time, and nothing is snoozed until you tap Snooze", and "the date banner shows the new time". Settings → Notifications → Notification Snooze lets you edit each option as "At Time or From Now". "Offer to Open Links" swaps some snooze buttons for **Open** / **Mark Done and Open Link**. [2026-10-27] — [Due Help: Mark a reminder done or snooze it from a notification](https://dueapp.zendesk.com/hc/en-us/articles/4985891284761)
- **Quick Access Times:** "Twelve Quick Access Times—all fully customizable". — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- **Due Watch app (26.5):** Mark Done or Reschedule. Tap a Quick Access Time and "the time the reminder will move to shows at the bottom: tap it to confirm". Combining several times is a paid feature (bought on or after 1 Oct 2025, or with an Upgrade Pass). [2026-10-09] — [Due Help: Apple Watch app and Quick Access Times](https://dueapp.zendesk.com/hc/en-us/articles/63067787911833)
- **Due 25.8** (Dec 9, 2025) added an option to hide "Open Link" buttons, under Settings → Notification Snooze. — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- **Due Bulk Edit** (26.5) lets you select many reminders to "reschedule, set auto snooze, mark done or delete them together". [2026-10-09] — Due Help: Bulk Edit Reminders (via [Due help centre](https://dueapp.zendesk.com/hc/en-us/categories/200306449-Due-for-iOS-watchOS))
- **Due natural-language date:** typing "Collect passport next Monday 4pm" makes the first Quick Access button read `Set to "next Monday 4pm"`. Tapping it strips the date words from the title. [2026-10-27] — [Due Help: natural date parsing](https://dueapp.zendesk.com/hc/en-us/articles/203530719)
- **Apple Reminders iOS 26.5:** long-pressing a Reminders notification may show the exact return time, e.g. "Remind Me at 3:00 PM" instead of "Remind Me This Afternoon". **[UNVERIFIED: third-party retailer blog based on the RC, 2026-05-06]** — [Zeera Wireless](https://zeerawireless.com/blogs/news/ios-26-5-reminders-snooze-update)
- **Apple Urgent alarm:** Snooze (fixed 9 min **[UNVERIFIED]**) or Complete via "Complete for Alarm", then Reschedule from the follow-up view. [2025-12-17] — [MacMost](https://macmost.com/urgent-reminders-with-alarms-on-iphone.html)
- **Todoist:** one default snooze interval set at Settings → Reminders → "When snoozed…". An older mirror says the default is **5 min on iOS** and **30 min on Android** **[UNVERIFIED, older mirror]**. Web and desktop have no snooze. [2026-10-26] — [Todoist Help](https://www.todoist.com/help/articles/introduction-to-reminders-9PezfU); [mirror](https://gmail.todoist.com/Help/Reminders)
- **Marvin:** quick reminder options "In 10m, In 30m, In 1h, Afternoon, Evening, Tonight, Tomorrow 9am, Pick…". Desktop notification buttons are configurable: **Dismiss, Snooze, Mark Done, Track Time**. — [Marvin Help: Reminders](https://help.amazingmarvin.com/articles/1950238-reminders)
- **TickTick:** snoozing to "a few minutes, hours, or the next day" (prior round). On iPhone the snooze and complete buttons only appear after unlocking and pulling down or long-pressing the notification. **[Apple Community user, date not captured]** — [Android Authority](https://www.androidauthority.com/keep-coming-back-to-ticktick-3719344/); [Apple Discussions](https://discussions.apple.com/thread/253800201)
- **Any.do (peer):** iOS notification → Snooze / Focus / Done. Snooze choices are **15 minutes, 1 hour, 3 hours, Tomorrow, Custom**. **[search summary]** — [Any.do support](https://support.any.do/notifications-settings/)
- **Structured:** no snooze from the notification. The sticky-snooze request was rejected (2024-08-28). — [Structured feedback](https://feedback.structured.app/p/sticky-reminder-with-snooze-options)

### Inferences
- PWA spec for notification actions: Web Push on iOS supports `actions`, but I haven't verified support on iOS 26. Assuming it works, offer **Done**, **+10 min**, **+1 h** and **More…**. "More…" opens a sheet with Marvin-style labels (*Tonight*, *Tomorrow 9am*, *Pick*), each showing the **resulting clock time** (the Apple 26.5 and Due date-banner pattern).
- Make snooze presets editable as "From Now" (+1 h) or "At Time" (6:30 PM), as Due does.
- If iOS PWA notification actions are unreliable, tapping the notification should open straight onto a one-screen Done / Snooze sheet. Due's design keeps it to a single tap either way.

### Gaps
- TickTick's current snooze list on iOS. No official source found.
- Whether iOS Web Push notification action buttons work on iOS 26 for Home Screen PWAs. Out of scope here; check the PWA research notes.

---

## 4. Wording and tone (real examples; how wording varies)

### Takeaway
There are three tonal families. **Neutral and utilitarian**: Due, Apple, Todoist use the task title as the notification, plus button labels. **Warm coach**: Tiimo's "Review your day – Celebrate your wins…" and Finch's "no guilt, no pressure". **Gamified loss aversion**: Duolingo's streak framing, deadline countdowns and passive-aggressive "Just saying". Duolingo's research shows that **varying the template matters**: recently used templates lose impact (a "novelty effect"). For ADHD, the most-cited failure is identical, swipe-able messages becoming invisible.

### Cited Findings
- **Duolingo template examples (KDD 2020, Table 1):**
  - "You're on fire / Continue your 109 day Spanish streak on Duolingo." (eligibility: 3+ day streak)
  - "Streak wager reminder / You're on day 2 of your 7-day streak wager! Now get to day 3!"
  - "Ready for your trip? / Take 5 minutes to practice Italian now" (travel-motivated users)
  - Templates have eligibility rules. "the more often and recently a template is used for a given user, the less impact it will have". The bandit gave **+0.5% DAU** and **+2% new-user retention** over the baseline.
  - Templates are translated into 25 UI languages, and template performance differs by language.
  - — [Yancey & Settles, KDD 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- **Duolingo blog [2020-09-03]:** "Time for [language]" "works very well for Chinese learners" but is "usually not the best option for English learners". Before the bandit, "notifications were selected from the pool at random". — [Duolingo blog: Hi, it's Duo](https://blog.duolingo.com/hi-its-duo-the-ai-behind-the-meme/)
- **Duolingo streak and save wording [UNVERIFIED fan teardown, undated]:**
  - "Ready for today's lesson?"
  - "Got 3 minutes before work? Earn 20 XP and keep that streak going."
  - "It would be a bummer to lose that 36 day streak. Just saying."
  - "🔥 Last chance! / Your 36 day streak ends in 10 minutes. One lesson saves it."
  - "🏃 Last chance to get promoted! / You're on your way up to the next league. Earn more XP now!"
  - — [Deconstructor of Fun](https://duolingo.deconstructoroffun.com/mechanics/notifications)
- **Duolingo, other:** "Your streak is in danger!" / "Your practice session is waiting!" **[blog, unverified]** — [Web Designer Depot](https://webdesignerdepot.com/the-art-of-duolingo-notifications-the-subtle-manipulation-of-language-learners/). Sunsetting message: "These reminders don't seem to be working. We'll stop sending them for now." **[secondary]** — [Debugger/Medium](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0)
- **Tiimo:** "Review your day – Celebrate your wins and move unfinished…" — [Tiimo product page](https://tiimoapp.com/product/widgets-live-activities). Tiimo frames its notifications guide as "Set reminders that help without creating alert fatigue." — [Tiimo FAQ](https://www.tiimoapp.com/faq). "Meeting is halfway through!" **[UNVERIFIED]**
- **Finch:** "We use streaks, gentle reminders, and mini-goals… And when things feel tough, your birb is always there to cheer you on." [2026-10-08] — [Finch Help: Our Approach to Self-Care](https://help.finchcare.com/hc/en-us/articles/37935669335309-Our-Approach-to-Self-Care). Mission: "no guilt, no pressure — just small, meaningful steps". [2026-10-08] — Finch Help: Our Mission (via [Finch help centre](https://help.finchcare.com/hc/en-us)). A review says the reminders "feel like pet care rather than self-care demands", and Metafilter notes "you may break a streak but your birb will neither go hungry nor get hurt". **[secondary]** — [Metafilter](https://metafilter.com/207203/Habit-forming-for-good-with-Finch)
- **Finch notification text:** a Reteno gallery labelled Finch shows "Hi Alex! Got 5 minutes? Time for a tiny French lesson." (published 2025-07-21). This looks mislabelled (a language lesson, not Finch), so I discount it.
- **Todoist** (help copy, not notification copy): "Perfect timing! That reminder's given you enough time to wrap up and prepare for your next task." [2026-10-19] — [Todoist Help: urgent](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra). Sept 2026 marketing: "Not everything needs to be red… Make one thing impossible to miss." [2026-10-23] — Todoist "September 2026" changelog (via [Todoist help centre](https://www.todoist.com/help))
- **Routinery:** "Sink into one thing and the voice pulls you out, so an afternoon doesn't vanish." The voice "calls out what comes next". — [Routinery App Store](https://apps.apple.com/us/app/routinery-routine-planner/id1450486923)
- **Due:** the notification is the reminder title. Labels are "Mark Done", "+1 hour", "+3 hours", "+1 day", "Snooze", "Open Link". Prominent alerts use "Mark Done" / "Stop"; on Apple Watch "the button under Mark Done reads Stop, even when the reminder will snooze. watchOS sets that label". [2026-10-27] — [Due Help: Use Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793)
- **Structured:** the overdue reminder fires after more than 3 unfinished tasks in a row. The article's image captions only say "planning reminder", "overdue tasks", "overdue reminder"; there is no text. — [Structured Help](https://help.structured.app/en/articles/9179330)

### Inferences
- For a private ADHD PWA, use **task-first titles**: the verb and object in the title (e.g. "Start: email Sam"), with the tiny first step and time context in the body ("2-min start · due 3:00 PM").
- **Rotate the body wording** across repeats. Duolingo's novelty finding says rotation slows habituation. For example:
  - repeat 1: neutral
  - repeat 2: the first micro-step
  - repeat 3: the time cost ("10 min to finish before 4")
  - final: a choice prompt ("Do it, move it, or drop it?")
- Avoid guilt and loss framing, following Finch's "no guilt, no pressure". Keep Duolingo's *specificity*: concrete numbers, deadlines and "one lesson saves it"-style smallest actions.

### Gaps
- I couldn't get verbatim Finch, Tiimo, Structured, TickTick or Habitica notification bodies. App Store screenshots and reviews didn't contain them in fetchable text.
- No official Duolingo source for the 2025–26 streak-saver wording or timing.

---

## 5. Defaults vs settings (what is on by default; how much setup is needed)

### Takeaway
Defaults decide outcomes:
- **Due**: auto-snooze on new reminders (5 repeats); Standard alerts; Critical and Prominent are opt-in and need permissions.
- **Structured**: start + end alerts on every timed task, 8 am for all-day tasks; customising needs Pro.
- **Todoist**: an automatic reminder whenever a task has a time.
- **Llama Life**: a single chime; Nag is opt-in.
- **Routinery**: a max-volume alarm by default, per a user report.
- **Marvin**: Bug Me is a feature you must first enable, then turn on per task.

### Cited Findings
- **Due:** the Auto Snooze default for new reminders is set at Settings → Defaults For New Reminders. — [Due Help](https://dueapp.zendesk.com/hc/en-us/articles/203299799)
- **Due Critical / Prominent:** device setting Off / All Reminders (or All Timers) / Specific Reminders (or Specific Timers). The first time, Due asks for permission ("schedule alarms" for Prominent; Critical Alert permission for Critical). Per-item setting via long-press in the list or editor → Alert Type. An indicator icon shows only for items with it enabled individually. — [Due Help: Use Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793); [Due Help: Use Critical Alerts](https://dueapp.zendesk.com/hc/en-us/articles/15781461032473)
- **Due on silent, by default:** "you'll only receive a vibration if your device is muted when a reminder is due." [2026-05-21] — [Due Help: ringer switch](https://dueapp.zendesk.com/hc/en-us/articles/203530759)
- **Due Prominent** "may require the Upgrade Pass" depending on purchase date, and needs Due 26.4+ for reminders (25.5+ for timers). **[search summary of Due Help]** — [Due Help: Use Prominent Alerts](https://dueapp.zendesk.com/hc/en-us/articles/52208554848793)
- **Structured:** start and end alerts on by default for timed tasks; 8:00 am for all-day tasks; Pro needed to customise. — [Structured Help](https://help.structured.app/en/articles/1870914)
- **Todoist:** automatic reminders apply whenever a task gets a date and time (offset in settings; "No automatic reminder" turns them off). Urgent needs a one-time "Enable Urgent Reminders" prompt plus the iOS alarms permission. — [Todoist Help](https://www.todoist.com/help/articles/introduction-to-reminders-9PezfU); [Todoist Help: urgent](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)
- **Apple Urgent:** per reminder, off by default, permission prompt on first use. "Complete for Alarm" is off by default (Snooze shows). — [9to5Mac](https://9to5mac.com/2025/11/04/ios-26-2-alarms-and-timers-in-reminders/); [MacMost](https://macmost.com/urgent-reminders-with-alarms-on-iphone.html)
- **Llama Life:** the audio alarm "sound once" is the default. Nag and Continuous are opt-in. — [Llama Life Help](https://intercom.help/llama-life/en/articles/6456183-using-alarms)
- **Marvin:** Bug Me must be enabled in ☰ → Features first (prior round), then turned on per task. Mobile push needs you logged in to the mobile app. — [Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)
- **TickTick:** Constant Reminder is a per-reminder toggle (tasks, habits, countdowns or anniversaries). Prior-round sources list it as a Premium perk. — [Releasebot](https://releasebot.io/updates/ticktick); [Android Authority](https://www.androidauthority.com/keep-coming-back-to-ticktick-3719344/)
- **Tiimo:** the user chooses which reminder types to toggle; times are set for Time-of-day, Review today and Review week. — [Tiimo FAQ](https://tiimoapp.com/faq/notifications)
- **Routinery:** the max-volume alarm is reportedly the default and must be switched off per routine. **[UNVERIFIED]** — [Routinery App Store (CA)](https://apps.apple.com/ca/app/id1450486923)
- **Duolingo:** Smart Scheduling toggle or a manual time. **[third-party Jan 2026]** — [Lingoly](https://lingoly.io/turn-on-duolingo-practice-reminder/)

### Inferences
- For a user who forgets to open apps, every timed item should default to **at-time + auto-repeat (5 × 10 min, Due-like)** with no setup. Add a quiet window (e.g. 22:00–08:00, Marvin-style queueing) and **start + end** cues for time blocks (Structured).
- A heavier "must not miss" level should be opt-in per item and used sparingly, following Due's guidance. In a PWA it can only be a faster interval, wording escalation, or a hand-off to Apple Reminders Urgent.
- Routinery's reported default max-volume alarm shows the risk of an over-aggressive default: users turn it off routine by routine.

### Gaps
- The out-of-box Auto Snooze interval for new reminders in Due isn't stated. The help article implies 1-minute is the interval available without an Upgrade Pass, but that is inference.
- The default times for Structured's planning reminder and TickTick's daily notification.

---

## 6. What ADHD users report actually works vs. what they learn to ignore

### Takeaway
What works: alerts that **can't be swiped into nonexistence** (TickTick Constant, Due Auto Snooze), **very short tasks**, and reminders that come with **a second step not requiring re-opening the app**. Some users deliberately set extreme cadences (every minute) because they know they'll forget immediately. What fails: identical repetitive phone reminders ("subconsciously ignoring"), swipe-away banners, and brief default sounds. Physical and visible cues sometimes outlast phone alerts but also become "wallpaper".

### Cited Findings
- r/ADHD thread "Do visible external reminders work better than phone reminders?" (about Jan 2026):
  - "I start subconsciously ignoring repetitive phone reminders after a while."
  - "if i can swipe it away once, it basically never existed."
  - A medication reminder works because "it is a 2 second task".
  - Phone reminders work only with "a second step that does not rely on me opening the app again".
  - "Visual reminders win over phone notes any given day."
  - — [Reddit mirror, snapshot 2026-06-05](https://reddit.sentinel-team.org/posts/1twhie6/snapshots/2026-06-05T21%3A20%3A56.551596Z)
- r/ADHD "How do you actually handle reminders?" (about Sep 2025): "Physical sticky notes work until they become wallpaper and my brain just filters them out completely". Another user relies on a calendar reminder "the day in advance, and maybe one a couple hours in advance". — [Reddit mirror, snapshot 2026-04-03](https://reddit.sentinel-team.org/posts/1sau2f6/snapshots/2026-04-03T16%3A51%3A00.928384Z)
- A Due user with ADHD in the family [2025-06-14]: "I can set a laundry reminder that goes off every minute because I know I'm gonna look at it and immediately forget 800 times." — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- Another Due user [2021-11-26] wants an app for when "you need a little bit of nagging to get it done" and credits Auto Snooze. — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- TickTick is praised for ADHD because constant reminders "cannot be swiped away" [Mar 2026]. — [Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)
- A Tiimo user [2021-02-08]: the default notification sound is too brief to pull attention. The developer said: "You are definitely not the first one to request a more persistent alarm." — [Tiimo, App Store](https://apps.apple.com/us/app/id1480220328?l=en-us)
- A Tiimo feedback board request asks for an alarm that "rings and vibrates and takes over your screen until it's addressed". **[UNVERIFIED: search summary; page blocked]** — [tiimo.nolt.io](https://tiimo.nolt.io/185)
- Routinery user [2023-01-08, late-diagnosed adult ADHD/ASD]: voice notifications at start, time remaining and end are "SO HELPFUL for my executive function issues". — [Routinery, App Store](https://apps.apple.com/us/app/routinery-routine-planner/id1450486923)
- Late No More, Product Hunt comments: the maker reports being 2 minutes early for most meetings. A user says it stopped them being the team's running joke about lateness. A user with ADHD names time blindness. **[self-selected launch comments]** — [Product Hunt](https://www.producthunt.com/p/focus-bear/late-no-more?page=1)
- Habituation claim: a vendor blog cites a 2022 *Frontiers in Digital Health* study in which SMS reminders raised engagement for adults with ADHD in week 2 but not after. **[UNVERIFIED: secondary vendor citation; original not checked]** — [dev.to/wellnestapp](https://dev.to/wellnestapp/why-most-medication-apps-fail-adhd-brains-3hea)
- Prior round: signs of marking tasks done just to silence nags (Due). — see `../ADHD task starting apps/capture_breakdown_reminders.md`

### Inferences
- Design priorities for one adult with ADHD who forgets to open apps:
  - **Persistence that ignores swipes**: re-fire until Done or Reschedule.
  - **One-tap resolution from the notification** (Done / +10 min / Tomorrow), so acting doesn't need a second app session.
  - **Make the task tiny** in the notification body.
  - **Vary** wording and timing to slow habituation.
  - A **visible ambient cue**: app badge count, as in Habitica and Due; widgets aren't available to PWAs.
- Guard against "done to silence it". After a nag-silencing Done, a later light check ("Did 'email Sam' actually happen?") could catch fake completions. This is speculative; I found no app doing it.
- Escalation should change **modality or channel**, not just repeat (Late No More). In a PWA the realistic options are a different title and tone, more frequent repeats near a deadline, or an opt-in hand-off to an Apple Reminders Urgent alarm or SMS for genuinely critical items.

### Gaps
- No quantitative data from any vendor on nag effectiveness, opt-out rates or habituation for ADHD users.
- YouTube transcripts and ADDitude reviews were not reached in this round.
- I couldn't access Reddit directly; I used mirror snapshots, with dates estimated from "posted N days before snapshot".
