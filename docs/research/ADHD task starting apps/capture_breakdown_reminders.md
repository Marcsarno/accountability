# Capture, breakdown and persistent-reminder apps for adults with ADHD: mechanics to rebuild

Scope: Goblin Tools, Due, Amazing Marvin, Todoist, TickTick, Lunatask, Saner.ai, Apple Reminders. Stays on capture, breakdown, remembering and starting. Researched 2026-10-28. Older items carry their date. Where a claim only came from a search-engine summary and I did not fetch the page, I say so.

Peers that turned up as strong comparisons: Apple Reminders' new **Urgent** alarm reminders (iOS 26.2+), Todoist's **Urgent reminders** (iOS 26) and **Ramble** voice capture (Jan 2026), and TickTick's **Constant Reminder / "annoying alert"**. All three are persistent or alarm-grade reminders that ADHD users compare with Due.

---

## 1. Capture: how fast and messy can capture be?

### Takeaway
The best capture flows accept one messy line or a spoken ramble and work out the date, time and list. Due parses "Dentist 3p Thu". Todoist Ramble turns continuous speech into several tasks with corrections like "Actually, I meant…". Goblin Compiler and Saner turn a brain dump into a list. Fast entry points are native-only (widgets, Control Center, Siri, Watch, share sheet), and an iOS PWA has none of them, so in-app capture has to be one tap from launch.

### Cited Findings
**Due (iOS/watchOS/macOS)**
- Natural-language entry parses strings like "Dentist 3p Thu" and "Meeting in 1h 20m". Version 26.5 added durations like "Laundry 2.5 hours". There are 12 customisable quick-access times for setting or postponing a reminder in one tap. — [Due, App Store listing](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- Home Screen and Lock Screen widgets. You can add reminders and start timers from Control Center, automate with Shortcuts, and start, pause or stop timers with Siri ("Hey Siri, start Laundry timer in Due"). — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- The developer built Due in 2010 for "quickly capture what needs to be done and when". Reminders can be rescheduled without opening the app (blog dated 2021-10-18). — [Due blog, "I made the most annoying app"](https://www.dueapp.com/blog/most-annoying-app.html)

**Todoist: Ramble (voice to tasks, GA January 2026)**
- How it works: tap the waveform icon in Quick Add, speak, and tasks appear in a live preview. Say "Actually, I meant…" to edit or "Remove that" to delete a suggestion. Finish with "that's all" or the Add tasks button. — [Todoist Help: Ramble](https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF)
- It extracts task name, description, date/time, project, section, label and priority. Deadline and duration are paid-only. It does **not** create sub-tasks, custom reminders or urgent reminders. "Thursday afternoon" sets the do-date. "Must be finished on Friday" sets a deadline. — [Todoist Help: Ramble](https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF)
- Limits: Free/Beginner gets 10 sessions a month (a session only counts if at least one task is found). Pro and Business are unlimited. It needs internet, and LLMs process the input. — [Todoist Help: Ramble](https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF)
- Search summaries say it is powered by Gemini 2.5 Flash Live and supports about 38 languages. Launch coverage dated 2026-01-21. — [TechCrunch](https://techcrunch.com/2026/01/21/todoists-app-now-lets-you-add-tasks-to-your-to-do-list-by-speaking-to-its-ai/) (page not fetched; model name from search summary)

**Goblin Tools: Compiler**
- Compiler "turns a messy brain dump into an organized action list". The suite also includes Magic ToDo, Estimator, Taskmaster ("works through a to-do list one step at a time"), Consultant, Professor, Judge, Formalizer and Chef. — [Goblin Tools, App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064); [datastudios explainer](https://www.datastudios.org/post/goblin-tools-magic-todo-s-task-breakdown-mechanism-and-pricing-explained)
- The App Store listing does not mention voice input. Widgets and notifications "may come some time in the future" (v2.1.1). — [Goblin Tools, App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064)

**Saner.ai**
- Pitched as an ADHD assistant that extracts tasks from notes and email, breaks projects into steps, and "proactively plans your day and checks in". These descriptions come mostly from aggregators and from Saner's own blog. — [Tooliverse review 2026](https://tooliverse.ai/tools/saner-ai); [Saner blog (vendor)](https://blog.saner.ai/ai-for-adhd/)
- All plans include a mobile app and a Chrome extension. Connectors cover Gmail, Google Calendar, Google Docs, Outlook and Slack (beta), syncing every 30 minutes. The pricing article doesn't mention voice capture or a share sheet. — [eesel.ai, Saner pricing (edited 2026-10-14)](https://www.eesel.ai/blog/saner-ai-pricing)

**Amazing Marvin**
- Quick-add shortcuts typed inline: `*` marks priority, frog or reward; `~30m` or `ca. 1h` adds an estimate; `due` and `+` schedule it; `!Section` files it. — [Marvin Help: strategies/shortcuts page](https://help.amazingmarvin.com/en/articles/1949399-what-are-strategies)

**Lunatask**
- Pitched as external memory ("Lunatask remembers everything for you"), with quick note, email and browser integration. The ADHD page doesn't describe iOS widgets. — [Lunatask ADHD page](https://lunatask.app/adhd); [Lunatask pricing](https://lunatask.app/pricing)

**Apple Reminders (baseline)**
- Siri can add reminders, but as of early 2026 it **cannot** mark one urgent ("and mark it urgent" does nothing). — [Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-reminders-wii-be-impossible-to-ignore-thanks-to-this-ios-26-2-addition-and-thats-great-news-for-me); [MacRumors how-to](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)

**Web/PWA limits relevant to capture (project doc, verified 2026-10-27)**
- The iOS PWA manifest ignores `shortcuts` and `share_target`, so there are no home-screen quick actions and no Share Sheet target. — local file `/home/user/accountability/docs/PWA_PREP.md`

### Inferences
- Mechanics worth copying: (a) a **single text field that parses date and time** the way Due does ("3p Thu", "in 20m"); (b) **one-tap preset times** (Due's 12 quick times) instead of a date picker; (c) a **brain-dump box** that an LLM splits into separate tasks, with a preview to accept or reject each one (Ramble's live preview, Goblin Compiler); (d) voice capture with spoken corrections.
- A web app can do (a), (b) and (c) fully. (d) needs the Web Speech API or a recorded clip sent to a server for transcription. Treat Web Speech support in an iOS standalone PWA as unverified and test it on a device. Widgets, Lock Screen, Control Center, Siri, Watch and the share sheet are native-only.
- Partial workaround (my inference, unverified): an Apple Shortcut ("Dictate text" → "Get contents of URL" POST to the app's API) can be added to the Home Screen, the Action Button or Siri. That gives voice capture without opening the PWA. It needs a server endpoint and some auth token.
- Because the user forgets to open apps, every capture surface should land in one inbox that the app shows first on launch.

### Gaps
- I didn't confirm whether Web Speech API dictation works in an iOS 26 Home Screen web app.
- I found no primary detail on Saner.ai's mobile capture (voice, share sheet, widget). The pricing article says nothing about it.
- Lunatask's iOS widget and Siri support aren't documented on the pages I fetched.

---

## 2. Breakdown: how do apps split a task into first steps?

### Takeaway
Goblin Tools' Magic ToDo is the reference. You type a task and an AI returns a checklist. A "spiciness" slider sets granularity (more spice means smaller, more numerous steps), and each step can be broken down again. Marvin approaches the same problem with a guided "Procrastination Wizard" and a planned "Smallest Step" feature that only produces the first tiny action. Todoist's Ramble does not create sub-tasks.

### Cited Findings
**Goblin Tools: Magic ToDo**
- A single slider controls granularity, from "a handful of reasonable chunks" at low settings to "a dozen-plus micro-steps" at maximum. — [datastudios explainer](https://www.datastudios.org/post/goblin-tools-magic-todo-s-task-breakdown-mechanism-and-pricing-explained)
- One r/ADHD user (Aug 2024, via a mirror) types a task, hits the magic wand, and "9 subtasks pop in". They found the steps reasonable even for industry-specific work. — [r/ADHD mirror](https://cal1.lr.ggtyler.dev/r/ADHD/comments/1ervz6i/what_adhd_apps_do_you_use/li79ths/?context=3)
- App Store reviewers say it makes list-writing "a breeze" and gives "achievable and sensible steps". Complaints: the app crashes, and Estimator times can be badly off (dishes and laundry estimated at more than 5 hours). — [Goblin Tools, App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064)
- Estimator "gives rough time estimates for tasks". Taskmaster works through a list one step at a time. — [App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064)
- It uses AI models from several providers, both open and closed. Outputs "should be treated as guesswork". Accounts now keep history, sync lists and share them. — [goblin.tools/About](https://goblin.tools/About)
- Limits: Goblin "solves 'what should I do'" but has no timer, no reminders and no scheduling. Breakdowns are sometimes "excessive". — [ADHD productivity blog, 2026](https://adhd-productivity.pages.dev/blog/best-ai-task-breaker-apps-adhd-2026); [Saner blog review](https://blog.saner.ai/goblin-tools-review/) (Saner is a competitor and reportedly a Goblin sponsor, so not neutral)
- Search summaries describe the scale as 1 to 5 chili peppers, and say you click any sub-step to break it down further. I didn't fetch the primary page for either claim. The wand-per-item model is consistent with the Reddit comment above.

**Amazing Marvin**
- **Procrastination Wizard**: an interactive guide that asks what feels hard, works out whether you are *anxious* (too activated) or *unmotivated* (not activated enough), and suggests a strategy for each. — [Marvin "For Procrastinators"](https://amazingmarvin.com/for/procrastinators/)
- **The Smallest Step** (marked "Coming Soon" on the page) "splits a task into its tiniest first action", e.g. "Open document" for "Write report". — [Marvin "For Procrastinators"](https://amazingmarvin.com/for/procrastinators/)
- Related starting aids: Time Estimates (so a task feels less intimidating), Beat the Clock (race your own estimate), Focus Music, gamification and points, Accountability Pledges (money at stake), satisfying completion sounds and animations. For awareness there are frogs (dreaded tasks), "Weighing On Me", Procrastination Count (exclamation marks per reschedule) and mood tracking. — [Marvin "For Procrastinators"](https://amazingmarvin.com/for/procrastinators/)
- Marvin's own help centre warns that storing tasks in Marvin "is not going to transform you into a productivity monster overnight". — [Marvin Help](https://help.amazingmarvin.com/articles/1949435-will-marvin-fix-my-procrastination-problem)
- A comparison site (search summary) says the Wizard is not on mobile. — [Saner blog review of Marvin](https://www.saner.ai/blogs/amazing-marvin-review) (not fetched; competitor source)

**Saner.ai**
- Breaks "overwhelming projects into bite-sized, manageable steps". The source is an aggregator. Pricing docs only say "Task system". — [Tooliverse](https://tooliverse.ai/tools/saner-ai); [eesel.ai](https://www.eesel.ai/blog/saner-ai-pricing)

**Lunatask**
- No breakdown feature. Instead it ranks tasks automatically by importance, estimate, started-ness and age, puts started tasks first, and applies a work-in-progress limit. — [Lunatask ADHD page](https://lunatask.app/adhd)

**Todoist**
- Ramble doesn't create sub-tasks. Task Assist (Pro and Business) is the AI helper for tasks. — [Todoist Help: Ramble](https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF); [Todoist pricing](https://www.todoist.com/pricing)

### Inferences
- Mechanics to rebuild: (1) a "Break it down" button on any task that calls an LLM with a granularity level (1–5) and returns an editable checklist; (2) re-break any step; (3) **show only the first step big** ("Open the laundry basket"), with the rest collapsed (Marvin's Smallest Step idea, and Goblin Taskmaster's one-at-a-time mode); (4) an optional estimate per step, framed as a guess because Goblin's estimates are often wrong; (5) a short anxious/unmotivated check (Wizard-lite) that picks a strategy such as a smaller step, a timer race or a reward.
- All of this works in a web app. It needs a server-side LLM call, so an API key is kept server-side. Generated steps are task content. The project rule that private reflection and notes must not reach previews/snapshots should cover step text if steps can hold personal detail.
- Goblin's main weakness (no reminders, no scheduling) is exactly what the target user needs, so breakdown should be wired straight into the reminder and "do now" flow.

### Gaps
- I couldn't retrieve Goblin's own Magic ToDo instructions (the About page doesn't cover mechanics). The exact chili levels, the prompt and the per-level step counts are unverified.
- No evidence found that the Smallest Step feature has shipped in Marvin as of Oct 2026.
- No controlled study of AI task breakdown and ADHD task initiation was found.

---

## 3. Reminders that work for forgetful users (repeat-until-done, escalation, nag vs noise)

### Takeaway
The core mechanic is **repeat until an explicit Done (or a deliberate reschedule)**. Swiping a notification away must not count as handling it. Due repeats at a chosen 1/5/10/15/30/60-minute interval, 5 times by default and up to 10. Marvin's Bug Me nags every 5m–3h until done, within allowed hours, for Today, 3 days, 7 days or Until done. In 2025–26 iOS added alarm-grade reminders: Apple Reminders "Urgent" (26.2), Todoist urgent reminders (iOS 26), and Due's Critical and Prominent Alerts. These break through silent mode and Focus. A web app can't do that. ADHD users praise nagging, but there are signs of habituation and of marking tasks done just to silence them.

### Cited Findings
**Due**
- Auto Snooze repeats missed reminders at 1, 5, 10, 15, 30 or 60-minute intervals, 5 times by default and configurable up to 10. Overdue items can keep auto-snoozing when you launch Due or act on a notification. It keeps nudging until you mark the item done or reschedule it. — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- **Critical Alerts** get through silent mode and Focus. **Prominent Alerts** (iOS 26+) "ring like an alarm until acted on". Timers support auto snooze too. — [Due, App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- Developer's reason (2021): "When I realized it was easy to miss notifications, I added Auto Snooze. It repeatedly notifies me of overdue reminders until I act on them." — [Due blog](https://www.dueapp.com/blog/most-annoying-app.html)
- User voice (search summaries of forum posts, not fetched): swiping a notification away means "it'll go off again every ten minutes until you say the task is done". Another user admits marking things complete "just to get it to shut up". — via search results incl. [ADDitude ADHD tools page](https://www.additudemag.com/reviews/post/adhd-organization-tools-you-will-use-everyday/) (exact source page unconfirmed)
- A Reddit thread (Mar 2026, mirror) calls Due more insistent than Apple Reminders. — [Reddit mirror snapshot 2026-03-16](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)

**Amazing Marvin: Bug Me**
- Turn on via ☰ → Features → Bug Me, then pick "Bug me until done" on a task or project. Intervals are **5m, 15m, 30m, 1h, 3h or Custom**. "Keep going" can be Today, 3 days, 7 days or Until done. "Only bug me" restricts which days and hours it may nag; a reminder due outside that window waits for it to reopen. If there's no scheduled reminder, the first nag comes one interval after you set it. Bug Me can run alongside scheduled reminders. — [Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)
- "The ONLY way to get Marvin to stop bugging you about the Task is to mark it as done". Dismissing clears only that one notification. Delivery is push through the Marvin mobile app. — [Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)
- If tasks still aren't getting done, the help article points to the Procrastination Wizard. That's escalation from nagging to strategy. — [Marvin Help: Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)

**TickTick: Constant Reminder / "annoying alert"**
- Makes a reminder "repeat every few minutes until dismissed". Suggested for medication and high-stakes appointments. — [Lifestack, TickTick for ADHD](https://lifestack.ai/blog/ticktick-for-adhd); [Zapier](https://zapier.com/blog/ticktick-app-of-the-day/)
- Snoozing to "a few minutes, hours, or the next day" stops dismissed reminders from vanishing (contrasted with Google Tasks). Android Authority lists Constant Reminder as a Premium perk. — [Android Authority](https://www.androidauthority.com/keep-coming-back-to-ticktick-3719344/)
- Reddit (Mar 2026, mirror): "Constant Reminders … cannot be swiped away". — [Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)

**Todoist: Urgent reminders (iOS only)**
- A full-screen alarm "even if your device is locked, in Silent mode, or in Focus mode". Time-based reminders only, not location. Needs Todoist for iOS 26 / v26.1.17+. Help pages conflict on plans: one says Beginner can mark one relative reminder urgent and Pro/Business can mark all; an older version says Pro/Business only. — [Todoist Help: urgent reminder](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)

**Apple Reminders: Urgent (iOS 26.2+)**
- Mark a timed reminder Urgent and it fires as a Clock-style alarm even when the phone is silenced or in Focus. From the alarm you can slide to stop, snooze or **complete**. Alarms only ring on the device Find My uses as your location, and only for the reminder's creator. — [MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/); [Apple Support](https://support.apple.com/en-gb/HT205890)
- The snooze length can't be changed. — [MakeTechEasier](https://maketecheasier.com/iphone-reminders-adds-alarm/)
- iOS 26.4 (Feb 2026) added an "Urgent" Smart List. — [9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)
- Standard (non-urgent) Apple reminders don't repeat until done. Users find Due more insistent. — [Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)

**Lunatask**
- Notifications for scheduled tasks and habits (e.g. a daily medication reminder). No nag or repeat mechanic is documented. — [Lunatask ADHD page](https://lunatask.app/adhd)

**Goblin Tools**
- No reminders or notifications (possibly in future). — [App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064)

**Nagging vs noise (weak evidence)**
- Practitioner and vendor blogs argue that repeated identical alerts habituate ("background noise by day four") and that "more of the same stimuli … accelerates habituation". They suggest varying tone or channel, tying reminders to context, and "fewer, more reliable reminders through high-priority channels". None cite a controlled study, and several sell reminder products. — [mipyip blog](https://a-website-called-mipyip.pages.dev/blog/nag-bot); [yougot.ai, ADHD alarm fatigue](https://www.yougot.ai/blog/neurodivergent/adhd-strategies/adhd-alarm-fatigue)

**Web/PWA limits (project doc, verified 2026-10-27)**
- iOS Web Push only works for Home Screen web apps (16.4+). There's no Background Sync, Periodic Sync or Notification Triggers, so **every reminder and every repeat must be scheduled and sent by a server**. There's no silent push, subscriptions can silently die, and taps route to the app root when it's closed unless declarative `navigate` is used. — `/home/user/accountability/docs/PWA_PREP.md`

### Inferences
- Rebuild in the PWA: **server-side "nag until done"**. Store `interval` (5/10/15/30/60), `maxRepeats` (default 5, as in Due) or `until` (today / 3 days / until done, as in Marvin), plus **quiet hours** (Marvin's "Only bug me"). The server keeps sending push until the task state is `done` or it's rescheduled. Opening or dismissing the notification doesn't stop it.
- To reduce "mark done to shut it up": put **Snooze 10m / Later today / Tomorrow** in the app's landing screen for that task. That screen comes from the notification `navigate` URL. Web Push action buttons on iOS are not confirmed. Also log fake completions honestly, e.g. a "Done? / Not really, push it" choice.
- Escalation ladder, adapted from Marvin: after N ignored nags, change the message. Offer the first micro-step from the breakdown ("Just do: open the laundry basket") or a 2-minute timer instead of repeating the same text. Vary the wording to blunt habituation (weak evidence).
- Hard limit: a web app **can't** produce Critical Alerts, Prominent Alerts or alarm-style full-screen ringing through silent mode or Focus. Those need native entitlements and AlarmKit-style APIs. For truly must-not-miss items, the PWA should offer a fallback: "Also add as an Urgent reminder in Apple Reminders" (e.g. via a Shortcut or a manual tip). Label clearly what the PWA can and can't do.

### Gaps
- No primary data on how often Due users disable Auto Snooze, or on long-term effectiveness. The evidence is reviews and anecdotes.
- Due's default interval wasn't stated (only the options and the default count of 5). The "every ten minutes" anecdote suggests users often pick 10m.
- I couldn't confirm TickTick's exact constant-reminder interval or whether it's paywalled in 2026 (sources conflict).
- I didn't verify whether iOS Web Push supports notification action buttons or `interruption-level: time-sensitive` for web apps. I believe it doesn't, but that's unconfirmed.

---

## 4. How each app reaches the user (notifications, widgets, Lock Screen, Watch, email)

### Takeaway
The apps that reach forgetful users best (Due, Apple Reminders, Todoist urgent) combine repeating push with Lock Screen and Home Screen widgets, Watch actions and alarm-grade alerts. These are all native iOS. An iOS PWA gets plain Web Push and an app badge only: no widgets, no Watch app, no critical alerts.

### Cited Findings
- **Due**: push with Auto Snooze; Critical and Prominent Alerts; Home and Lock Screen widgets; Control Center; Apple Watch (done, snooze, add, timers; watchOS 10+); Siri; Shortcuts; macOS. — [Due App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- **Apple Reminders**: notifications, Urgent alarms that ring on the Find My device, and an Urgent Smart List (26.4). — [MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/); [9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)
- **Todoist**: push; urgent full-screen alarms (iOS); Wear OS Ramble; the 2026 changelog mentions widget fixes. — [Todoist urgent reminders](https://www.todoist.com/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra); [Todoist Ramble](https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF)
- **TickTick**: push with constant reminders; email reminders reported as a Premium add. — [Android Authority](https://www.androidauthority.com/keep-coming-back-to-ticktick-3719344/); pricing search summary via [aicores](https://aicores.io/pricing/ticktick)
- **Amazing Marvin**: Bug Me and reminders as mobile push (you must be signed in to the mobile app). — [Marvin Bug Me](https://help.amazingmarvin.com/en/articles/8950753-bug-me)
- **Saner.ai**: "checks in" (aggregator wording). Delivery channel isn't documented in sources found. — [Tooliverse](https://tooliverse.ai/tools/saner-ai)
- **Goblin Tools**: none (no notifications or widgets yet). — [App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064)
- **iOS PWA**: Web Push (Home Screen app only); Declarative Web Push payloads (iOS 18.4+) with `navigate` and `app_badge`; no widgets, shortcuts or share target. — `/home/user/accountability/docs/PWA_PREP.md`

### Inferences
- For a user who "forgets to open apps", the PWA must rely on (1) server-scheduled push with nag-until-done, (2) the app badge showing the overdue or now count, and (3) a fixed daily "start of day" push that deep-links to a single "do this first" screen. Email or SMS from the server is a possible second channel when push dies silently (PWA_PREP notes subscriptions can die without notice), and it varies the stimulus.
- Widgets and the Lock Screen are out of reach without a native wrapper. A home-screen-icon badge is the only ambient surface.

### Gaps
- No source quantified how much widgets or Watch actually improve recall for ADHD users.

---

## 5. What ADHD users praise and complain about

### Takeaway
Users praise **persistence** (Due, TickTick constant reminders, Marvin Bug Me) and **instant breakdown that gets them unstuck** (Goblin). They complain about **complexity and setup cost** (Marvin), **nagging that gets dismissed or faked** (Due), **inaccurate AI estimates and crashes** (Goblin), and tools that **only cover one step**: Goblin has no reminders, and Apple Reminders doesn't repeat by default. A lot of the "best ADHD app" content online is vendor-written (Saner.ai especially) and should be discounted.

### Cited Findings
- Due reviews: "absolutely invaluable" for a neurodivergent family (2025-06-14); "the procrastinator's best friend" (2021); "need a little bit of nagging to get it done… Auto Snooze" keeps them on task (2021). Rated 4.7/5 from about 2.8K ratings. — [Due App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969)
- Due complaint (search summary of forum post): marking things complete "just to get it to shut up". — via [ADDitude](https://www.additudemag.com/reviews/post/adhd-organization-tools-you-will-use-everyday/) search result (unverified page)
- Goblin praise: ADHD and OCD reviewer says list-writing is "a breeze"; procrastinator says "achievable and sensible steps"; r/ADHD user says steps are reasonable even for niche work. Complaints: crashes, absurd time estimates. Rated 4.5/5 from 227 ratings (AU). — [App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064); [r/ADHD mirror](https://cal1.lr.ggtyler.dev/r/ADHD/comments/1ervz6i/what_adhd_apps_do_you_use/li79ths/?context=3)
- Goblin went viral with ADHD communities on TikTok and Reddit in 2023 (r/adhdwomen thread dated 2023-05-22). — [r/adhdwomen mirror](https://lr.us.psf.lt/r/adhdwomen/comments/13oreld/to_whoever_mentioned_goblintools_in_a_comment)
- Marvin: its own help centre tempers expectations. Reviewers say it "leans hard into behavioral psychology" but the Wizard isn't on mobile (search summaries). — [Marvin Help](https://help.amazingmarvin.com/articles/1949435-will-marvin-fix-my-procrastination-problem); [listicler](https://listicler.com/tools/amazing-marvin) (not fetched)
- TickTick: Reddit user calls it flexible for ADHD because constant reminders can't be swiped away (Mar 2026). — [Reddit mirror](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z)
- Lunatask: reviewers note a very small, mostly solo team (slower features), and that encryption limits conveniences like server-side search. The vendor page's own claims (4.7/5, "best ADHD planner", journaling health claims) are uncited. — [Saner blog, Lunatask alternatives (competitor)](https://blog.saner.ai/best-lunatask-alternatives); [Lunatask ADHD page](https://lunatask.app/adhd)
- Saner.ai: user quote on aggregators, "instantly capture… automatically organize… saved me hours". Cons: no Gantt, no auto time-blocking, uncertain long-term archive. Much "best AI for ADHD" content is published by Saner itself. — [G2](https://www.g2.com/products/saner-ai); [Saner blog](https://blog.saner.ai/ai-for-adhd/)

### Inferences
- The one-person ADHD use case favours **few settings with strong defaults**. Marvin's power comes from toggling dozens of strategies, which is also a setup burden. Pick 3–4 strategies and switch them on by default (nag until done, first-step-only view, estimate and timer race, a frog marker or procrastination count).
- A visible **procrastination count** (Marvin) is cheap to build in the domain layer and gives honest signal, e.g. after 3 reschedules, offer a breakdown.

### Gaps
- I couldn't fetch reddit.com directly. Reddit evidence comes from mirrors and search summaries and is anecdotal.
- No ADDitude article with first-hand testing of Due or Goblin was fetched.

---

## 6. Pricing (2026) and evidence claims

### Takeaway
Everything here is cheap: Due is a $7.99 one-off, Goblin is free on the web, and most subscriptions are $5–$8 a month. No app has peer-reviewed evidence for ADHD outcomes. The evidence is testimonials, developer anecdote and vendor marketing.

### Cited Findings
- **Due**: $7.99 paid app; Annual Upgrade Pass $4.99; tips $3/$5/$10. v26.6 is current (Oct 2026). #10 paid Productivity. Developer cites App Store reviews from ADHD and early-dementia users and makes no medical claims. — [Due App Store](https://apps.apple.com/us/app/due-reminders-timers/id390017969); [Due blog 2021](https://www.dueapp.com/blog/most-annoying-app.html)
- **Goblin Tools**: web is free, with no ads or paywalls, and existing features won't be paywalled. App is $1.99 on the AU storefront (likely AUD). Goblin Tools Pro is $5.99/month or $59.99/year (AU storefront; adds sync). Other sources give US$1–$3.99 for the app and $3/month for Pro, so regional and over-time variation applies. — [goblin.tools/About](https://goblin.tools/About); [App Store (AU)](https://apps.apple.com/au/app/goblin-tools/id6449003064); [datastudios](https://www.datastudios.org/post/goblin-tools-magic-todo-s-task-breakdown-mechanism-and-pricing-explained)
- **Amazing Marvin**: single Pro plan at $8/month or $96/year (the page also claims "Save 33%", which doesn't add up). 14-day trial with no card. 50% student discount. "Pay what you can" on request. No free plan. After the trial you can't add or complete tasks. — [Marvin pricing](https://amazingmarvin.com/pricing/)
- **Todoist**: Beginner free; Pro $7/month or $5/month billed yearly ($60); Business $10 or $8 per user. Beginner gets task reminders and limited Ramble. Pro adds custom reminders, unlimited Ramble and Task Assist. — [Todoist pricing](https://www.todoist.com/pricing)
- **TickTick**: Premium is quoted at US$49.99/year (page dated Oct 2026) or $35.99/year / $3.99/month (Capterra and App Store tracker). Sources conflict. — [aicores](https://aicores.io/pricing/ticktick); [Capterra](https://www.capterra.com/p/170641/TickTick/pricing/)
- **Lunatask**: Free (2 areas, 7 daily habits); Premium $6/month annual or $8/month; Lifetime $300 (not via the App Store). Free includes auto-prioritisation, time blocking, task timers and the WIP limit. — [Lunatask pricing](https://lunatask.app/pricing)
- **Saner.ai**: Free (30 AI requests a month, 100 notes); Starter $12/month or $8/month yearly; Standard $20/month or $16/month yearly (100 AI requests a day). External models are billed per token. — [eesel.ai (2026-10-14)](https://www.eesel.ai/blog/saner-ai-pricing)
- **Apple Reminders**: free, built into iOS. Urgent alarms need iOS 26.2+. — [MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)
- **Evidence**: no controlled study of any of these apps' ADHD outcomes was found. Lunatask's page makes uncited health claims about journaling. Habituation advice comes from vendor blogs without studies. — [Lunatask ADHD](https://lunatask.app/adhd); [yougot.ai](https://www.yougot.ai/blog/neurodivergent/adhd-strategies/adhd-alarm-fatigue)

### Inferences
- Price isn't the barrier. The reason to build a PWA is integration (capture → breakdown → nag → first step in one loop) and privacy, not cost. For must-not-miss alarms, Due ($7.99) or free Apple Reminders Urgent is the pragmatic complement.

### Gaps
- I couldn't confirm the US storefront prices for the Goblin Tools app or Pro in late 2026.
- I couldn't confirm TickTick's 2026 US Premium price or whether Constant Reminder is gated.
- No independent evidence base (RCTs, usability studies) was found for any app's ADHD claims.

---

## Summary: mechanics ranked for the PWA (inferences from the above)

| Mechanic | Source app | Web-feasible on iOS PWA? |
|---|---|---|
| Nag-until-done with interval, max-repeats or until, and quiet hours | Due Auto Snooze, Marvin Bug Me, TickTick | Yes, server-scheduled Web Push; must be in a Home Screen app; subscriptions can die |
| Alarm through silent mode or Focus (Critical, Prominent, Urgent) | Due, Apple Reminders 26.2, Todoist iOS | **No**; native only. Point to Apple Reminders Urgent as a fallback |
| Natural-language date entry plus one-tap preset times | Due, Todoist | Yes |
| Brain dump → split into tasks with accept/reject preview | Goblin Compiler, Todoist Ramble, Saner | Yes (server LLM) |
| Voice capture with spoken corrections | Todoist Ramble | Partly; Web Speech or uploaded audio, unverified on iOS PWA; Shortcut workaround |
| AI breakdown with granularity slider, re-break a step, first step only | Goblin Magic ToDo, Marvin Smallest Step, Goblin Taskmaster | Yes (server LLM) |
| Rough estimate plus race-the-clock timer | Goblin Estimator, Marvin Beat the Clock | Yes (foreground timer; background timer alerts need server push) |
| Procrastination count, frog or dread marker, anxious/unmotivated wizard | Marvin | Yes |
| Widgets, Lock Screen, Watch, Siri, Control Center, share sheet | Due, Apple | **No** (Shortcuts-to-URL partial workaround for capture) |
| App badge for overdue count | n/a | Yes (`app_badge` in declarative push) |
