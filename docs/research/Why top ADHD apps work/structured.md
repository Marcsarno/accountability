# Structured (structured.app): why it is widely used and liked, including by adults with ADHD, and why people abandon it

Research date: 2026-10-28. Scope: the iOS app "Structured: Daily Planner Todo" (id1499198946) by unorderly GmbH, Berlin.

**About the sources:**
- **App Store reviews.** "RSS sample" means the 500 most recent US App Store reviews from Apple's public feed (`https://itunes.apple.com/us/rss/customerreviews/page=N/id=1499198946/sortby=mostrecent/json`, pages 1–10). They were pulled on 2026-10-28 and span 2026-02-09 to 2026-10-27, app versions 4.4.x to 4.6.6. Stars: 310 five, 56 four, 36 three, 31 two, 67 one. Each quote below is cited as (date, stars, version).
- **Shared scratch folder.** Another agent was writing review files to the same scratch folder, and those files included reviews of the "Due" app. Those files were discarded. Only data re-fetched into an isolated folder is used here. The exception is a few quotes marked "earlier pull", dated 2025-04 to 2025-09 and older than the clean sample. They come from my first fetch of the same Structured feed and were kept only because they carry Structured version numbers (4.4.x–4.5.x; Due uses 26.x) and describe Structured features.
- **Feedback board.** Data comes from the public Featurebase API behind feedback.structured.app (`/api/v1/submission?q=…`, `/api/v1/comment?submissionId=…`). Vote counts and statuses are as of 2026-10-28.
- **Reddit.** The Arctic Shift API timed out for r/ADHD, r/adhdwomen and all comment searches, so the Reddit voice is thin. It comes mostly from r/structuredapp and r/productivity.
- **Third-party reviews.** These are flagged for bias where it applies. HabitBox sells a competing app. CoolCuration's site generally uses affiliate links, although that review says it has none.

---

## 1. The core experience, screen by screen

### Takeaway
Structured is one vertical, colour-coded timeline per day. Each task is a pill with an icon at its start time, and its height reflects its duration. A "now" marker moves down the day, and blocks fill in as time passes. Around that core are:
- an Inbox for unscheduled items
- all-day tasks
- start and end alerts by default
- widgets and Live Activities
- a free Energy Monitor
- a Pro-only "Replan" triage flow for missed tasks, prompted in the morning or evening

The design idea is "one screen that shows the shape of the day". Nearly every secondary feature feeds that one screen.

### Cited Findings
**Positioning and scale**
- The App Store description (late Oct 2026) says: "Most planners give you a blank page. Structured gives you a timeline. You see your whole day laid out, with every task, event, and routine in order. It's time blocking made simple." It also says: "Built for ADHD minds, busy professionals, and students who need more than a to-do list." — [iTunes lookup API / App Store description](https://itunes.apple.com/lookup?id=1499198946&country=us)
- App Store metadata: average 4.79 from 168,107 US ratings; current version 4.6.6 (2026-10-22); first released 2020-04-09; seller unorderly GmbH; price free. — [iTunes lookup API](https://itunes.apple.com/lookup?id=1499198946&country=us). The App Store page showed 4.6.7 released "2h ago" on 2026-10-28 and lists an Editors' Choice award. — [App Store](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)
- The marketing claims are inconsistent across pages:
  - The App Store description says "400,000+ five-star ratings · Trusted by 1.5 million active users". — [iTunes lookup](https://itunes.apple.com/lookup?id=1499198946&country=us)
  - The website says "15M+ downloads", "500K+ Pro users", "600K+ tasks daily" and "join more than 1 million happy planners". — [structured.app](https://structured.app)
  - The 400K figure is presumably global across stores; the US App Store alone shows 168K ratings. Treat all of these as marketing.
- The 4.6.5 release notes (Oct 2026) list support for a foldable "iPhone Duo" (layouts adapt as it folds, and the Focus Timer is "designed for book and tabletop positions"). They also list a "Smart Task Icons 2.0 beta" under Settings → Advanced. — [iTunes lookup releaseNotes](https://itunes.apple.com/lookup?id=1499198946&country=us)

**Timeline and task creation**
- Each task has a start time and a duration and sits on a vertical timeline. A marker moves down the timeline to show the current time and what's next. — [HabitBox review, Oct 2026 (competitor; documentation-based, not hands-on)](https://habitbox.app/blog/structured-app-review)
- The timeline is a single vertical column. Completed tasks strike through and fade. — [CoolCuration UK review, 22 Aug 2026](https://coolcuration.com/structured-app-review-uk)
- A user describes the live fill: "easy to plan block to block and the blocks get gradually colored / filled as the time goes on in real time so you can see visually how much you have left to do x task" (2026-08-12, 5★, 4.5.3). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- A user describes the gap calculation: "i love how it does the calculations of how many minutes you have between each task so it really helps with time blindness" (2026-08-01, 5★, 4.5.3). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- A user lists the per-task fields: "you can do and customize such as the color, the icon, name, time, for how long, subtasks, notes, and that all in one task! That may sound like a lot but it is very very easy to understand" (2026-09-30, 5★, 4.6.4). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- Task creation is a step-by-step modal (title → "continue" → time and duration), and it draws complaints:
  - "God forbid I take half a second to process what I want to write, and it automatically shifts into the continue and time schedule" (2026-03-18, 1★, 4.4.6).
  - "The continue button on the ad task modal looks disabled because of the lack of contrast… There's no way to go from nine in the morning to five in the afternoon without having to click 10+ times" (2026-05-15, 3★, 4.4.9).
  - — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- An r/structuredapp post titled "Love the app, but the event time selector is a nightmare" (2025-06-10, score 12) says "A minor error can result in a tedious correction process… adjusting the start time often inadvertently alters the [end]". — [Reddit](https://reddit.com/r/structuredapp/comments/1l7rm0u/love_the_app_but_the_event_time_selector_is_a/)
- The board's top request, "Drag to adjust duration" (resize a block by dragging its ends), has 340 votes, dates from Feb 2023, and is still in "Inbox", not built. — [feedback board](https://feedback.structured.app/p/drag-to-adjust-duration)
- "Display how full a day is in top bar" (41 votes) is Completed: the day strip shows how busy each day is. — [feedback board](https://feedback.structured.app/p/display-how-full-a-day-is-in-top-bar)

**Inbox and all-day tasks**
- The Inbox holds unscheduled tasks and is free. All-day tasks are free too. — [HabitBox](https://habitbox.app/blog/structured-app-review); [CoolCuration](https://coolcuration.com/structured-app-review-uk)
- Users love the Inbox:
  - "The Inbox is probably what made it click for me. I can just throw everything I need to remember in there (as it comes to me, not at once)" (2026-09-21, 5★, ADHD user).
  - "LOVEEEEEE how I can add 'unstructured tasks' under the inbox feature!! … All of my mental loops can be jotted down" (2026-04-04, 5★).
  - — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- Users also find the Inbox painful:
  - "I LOVE This App, but the Inbox Is HORRIBLY PAINFUL!… on a phone if you have a lot of items sitting there" (2026-09-07, 1★).
  - "I wish I could drag and drop inbox items right into the timeline… inbox items are buggy- slow to open up" (2026-09-08, 4★, "visual person with ADHD, inattentive type").
  - — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- Missing Inbox features:
  - "Repeating Tasks in Inbox" has 290 votes since Nov 2022 and is still in Inbox. — [feedback board](https://feedback.structured.app/p/repeating-tasks-in-inbox)
  - "Due Dates" for inbox items was Rejected (Jan 2024). — [feedback board](https://feedback.structured.app/p/due-dates-2)
  - Users still ask for it: "I desperately want a due date feature for my inbox tasks" (2026-08-01, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- The widget doesn't show all-day task names: "the widgets show only an icon for all day activities… The icon isn't enough to remember what the activity is" (2024, Inbox). — [feedback board](https://feedback.structured.app/p/add-text-to-all-day-activities-on-widgets)

**Alerts**
- The iOS help article says a task's default alerts are at start, at end, and 5 minutes before start. The Android article says start, end and 1 h before. You can't set an alert more than 3 hours before a task, which the Apple article blames on Apple's technical restrictions. You can enable Time-Sensitive Notifications so alerts break through Focus modes. Some alert customisation needs Pro. — [Help: How to Customize Notifications](https://help.structured.app/en/articles/330434); [Help: Apple devices](https://help.structured.app/en/articles/1870914); [Help: Android](https://help.structured.app/en/articles/1871106)
- "Alert unlimited time before task", which asked to go past the 2 h 59 min limit, was Rejected (40 votes). — [feedback board](https://feedback.structured.app/p/alert-unlimited-time-before-task)
- "Clean notifications for a certain task when it is completed" has 21 votes and is in Inbox. Completing a task does not clear its remaining queued notifications. — [feedback board](https://feedback.structured.app/p/clean-notifications-for-a-certain-task-when-it-is-completed)
- A user describes a start prompt: "I love the prompts word. It asks me if I have started my task" (2026-07-26, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Live Activity, widgets and Focus timer**
- Live Activities, interactive widgets and a Pomodoro focus timer are listed as free. — [App Store description](https://itunes.apple.com/lookup?id=1499198946&country=us)
- "Start Live Activities Automatically" (when one task ends, show the next) was Rejected in Aug 2023. — [feedback board](https://feedback.structured.app/p/start-live-activities-automatically)
- An Oct 2026 review suggests focus mode still has to be started per task: "a hassle to get the focus now feature by clicking manually on each task" (2026-10-19, 4★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "Add countdown to next task in widget" (61 votes) is still in Inbox. — [feedback board](https://feedback.structured.app/p/add-countdown-to-next-task-in-widget)
- Users value the widget: "the widget makes remembering my next task or event so easy by just glancing at it" (2026-03-04, 5★). A blind ADHD user praises the "lock screen, and home screen, widgets, and control center control buttons, but especially the sound per task feature, where each task can have a different sound. Perfect way of staying on task without having to look at the screen" (2026-08-22, 4★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Energy Monitor**
- Each task gets Energy Points that add to or subtract from a daily Energy Limit. The amount depends on the task's length and a chosen consumption type, and is calculated "like a function, not like a sum". Recharging tasks such as meditation carry a lotus symbol and give energy back. It needs Structured 3.4+ on iOS and is not on Web. — [Help: How to Use the Energy Monitor](https://help.structured.app/en/articles/998530)
- Requests to enter energy points by hand were Rejected repeatedly, in 2024 (17 votes) and May 2026. The May 2026 request said "for people with chronic illness… the duration-based algorithm is not accurate at all." — [feedback: Energy](https://feedback.structured.app/p/energy-2); [feedback: Energy Monitor](https://feedback.structured.app/p/energy-monitor)

**Replan (missed tasks)**
- Replan is described in [the blog post "Stay Structured With Replan", 2 Jun 2025](https://structured.app/blog/replan):
  - It is opened by long-pressing a date, or by prompts set in Settings for morning, evening or a custom time, with an optional notification.
  - It walks through each unfinished task with swipe actions:
    - up: reschedule onto today or tomorrow
    - left: Inbox
    - right: complete
    - down: delete
  - Recurring and all-day tasks are excluded by default.
  - It is Pro only and Apple only.
- Help articles confirm Replan needs version 4.2+ and Pro, and that imported calendar events are never included. — [Help: What Is Replan?](https://help.structured.app/en/articles/4526850); [changelog 4.2, May 27 2025](https://feedback.structured.app/changelog/structured-42-replan)

**Morning briefing**
- The morning briefing belongs to a separate sister app. "Awake", launched 2025-09-15 for iOS 26 and built on AlarmKit, makes users complete "missions" to stop the alarm. It then shows a Morning Briefing with weather, calendar and the day's Structured tasks. Awake Premium costs $6.49/mo or $19.99/yr. — [TechCrunch, 15 Sep 2025](https://techcrunch.com/2025/09/15/awakes-new-app-requires-heavy-sleepers-to-complete-tasks-in-order-to-turn-off-the-alarm); [Help: Getting Started With Awake](https://help.structured.app/en/articles/5103746)
- On the shared feedback board, "Morning Briefing: Sleep Summary" (474 votes) and "Wake Up Check" (312 votes) are Completed. "Morning Briefing: Energy Monitor" is Planned. — [feedback](https://feedback.structured.app/p/morning-briefing-sleep-summary-based-on-apple-health); [feedback](https://feedback.structured.app/p/wake-up-check); [feedback](https://feedback.structured.app/p/morning-briefing-energy-monitor)

**AI**
- Structured AI is Pro. It takes plain-language requests and drafts a schedule. CoolCuration says it "rearranges well but does not check for overcommitment". — [CoolCuration](https://coolcuration.com/structured-app-review-uk)
- One user found a side benefit: "when AI writes my tasks, and it looks like I won't be done until 11pm, I realize I've over tasked myself!" (2026-06-26, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

### Inferences
- The product is **one primary surface** (the day column). Capture (Inbox), recovery (Replan), awareness (alerts, widget, Live Activity) and self-regulation (Energy) all feed or reflect it. That coherence probably explains a lot of the "simple" praise, even though the feature list is long.
- The weak point is the **cost of entering items**: a multi-step modal, a fiddly time picker, no drag-to-resize. The friction lands exactly where an ADHD user has the least spare executive function.

### Gaps
- I could not confirm from a primary source that Structured has its own "plan your day" morning reminder, separate from the Replan morning prompt and Awake's briefing.
- I could not confirm whether Live Activities now auto-advance. The 2023 rejection may be stale.
- I found no official description of haptics or the check-off animation. One user asks for "confetti, fireworks… customizable completion effects" (2026-10-21, 4★, [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)), which suggests the current check-off is understated.
- I did not obtain screenshots, so the screen-level layout is assembled from text.

---

## 2. Why the timeline works for time blindness (design details)

### Takeaway
Users with ADHD consistently describe the same mechanism: seeing time as space. Blocks have height, they fill in as time passes, the free minutes between tasks are shown, and a "now" line moves down the day. Add start and end alerts that tell them when to switch, and the fact that moving a block is cheap and shame-free. Colour and icons make it pleasant enough to open, and some users say that matters a great deal to them.

### Cited Findings
**What ADHD users say the timeline does**
- "I have ADHD and time blindness, so I struggle to visualize and estimate my time like normal people. With this, I am visually able to see all the time in my day, and it keeps me on track with alerts/notifications for the start and end of a task so I know when to wrap up… You can keep your to do list in it too, and drag and drop it into your schedule when you're ready. My whole brain is in this." (2026-07-20, 5★, three-year user) — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "The ability to visualize my chunks of time to provide myself with structure while I work and also move things easily and shame-free as I don't quite follow my plan? Perfection." (2026-02-24, 5★, AuDHD) — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "when I slip, this app really helps me get back on track without guilt for missing an item or even a day… if I miss a single item [in Fabulous] I break my streak and that works against me" (2026-03-17, 5★, "bad attention issues") — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "I don't always follow my schedule exactly but this app is so easy to use… And it feels pressure free. It's there when I need to use it." (2026-05-19, 5★, ADHD) — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "There's something very satisfying and motivating about being able to see the accomplishments through the day" (2026-10-10, 5★) and "the satisfaction of checking tasks off is amazing" (2026-06-22, 5★) — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Colour, look and calm**
- "You can personalize the app with different colors which is extremely helpful with my adhd" (2026-10-26, 4★). "I love the aesthetic of it and the simplicity so I don't feel like my planner is another task I have to do" (2026-07-20, 5★, ADHD). "because I love colors and themes I started playing in it… organize my long time waited tasks. As a game." (2026-06-17, 5★). "The more 'physical', colorful, and less grid-like this app can be, the better for folks like me" (2026-09-08, 4★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- No ads is mentioned as an ADHD plus: "no ads, which is great for my ADHD" (2026-02-22, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Gaps, energy and reality checks**
- Energy Monitor users with chronic illness or limited energy: "The energy feature helps me pace myself with my chronic health problems and scheduling in breaks ahead of time" (2026-05-29, 5★). "reminds me that there's only so much energy I have in a day" (2026-06-01, 5★). "showing if you overdid it with tasks on certain days" (2026-05-20, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**What users ask for that the timeline doesn't do**
- "for people like me with my particular ADHD I suffer from time blindness and require nudging every hour… You could build a chime within Structure" (2026-04-18, 4★, paying subscriber). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- "Task Overtime" (extend a running task and push the following tasks along) has 246 votes, dates from Jan 2023, and is still in Inbox. A commenter says a friend "switched to recalm ai only for this auto re-scheduling feature". — [feedback board](https://feedback.structured.app/p/task-overtime)
- "Reset/restart scheduled tasks" ("start now" button, 49 votes) is also in Inbox. — [feedback board](https://feedback.structured.app/p/resetrestart-scheduled-tasks)

**Accessibility recognition**
- Structured was a finalist in the Inclusivity category of the 2026 Apple Design Awards. — [CoolCuration](https://coolcuration.com/structured-app-review-uk) (not verified on apple.com)
- It was a finalist for iPad App of the Year in the App Store Awards 2025. — [heise](https://heise.de/-11085369) (via search snippet)
- The app ships VoiceOver, Voice Control, a dyslexia-friendly font and multiple languages. — [App Store description](https://itunes.apple.com/lookup?id=1499198946&country=us)

**ADHD claims vs evidence**
- Third-party reviewers note that the ADHD claims rest on user experience, not studies. The FAQ says "many people" find it helpful for ADHD, and no studies are cited. — [CoolCuration](https://coolcuration.com/structured-app-review-uk)
- The company's research page cites one 2024 PsyArXiv preprint (Grüning, Krawiec, Riedel, Mehlig) on personality and the "productivity boost from using Structured". It is not peer-reviewed and is co-authored by insiders. — [structured.app/research](https://structured.app/research); [HabitBox](https://habitbox.app/blog/structured-app-review)

**Sentiment among ADHD reviewers**
- In the RSS sample, 82 of 500 reviews mention ADHD, ADD, AuDHD, neurodivergence or time blindness. They are overwhelmingly positive: 54 five-star, 12 four-star, 2 three-star, 5 two-star, 9 one-star. — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json) (own keyword count)

### Inferences
- The mechanics that carry the time-blindness benefit are:
  1. duration rendered as height
  2. visible gaps in minutes
  3. a moving now-line with a progress fill
  4. start **and** end alerts, where the end alert is the underrated "wrap up" cue
  5. moving a block costs one drag and leaves no penalty or streak loss
- "Shame-free" comes from the *absence* of streaks, red overdue badges and nagging. That is a design choice users explicitly contrast with streak apps such as Fabulous.
- Making the planner look nice is not decoration for this audience. Several ADHD users say it is why they open the app at all.

### Gaps
- There is no controlled evidence that visual timelines improve ADHD outcomes. Only testimonials and a vendor-co-authored preprint were found.

---

## 3. The makers' philosophy (unorderly GmbH)

### Takeaway
Structured is a small Berlin studio's product, led by Leo (Leonard) Mehlig. It shipped in April 2020. Its public philosophy is expressed mainly through product choices and release copy rather than interviews:
- a timeline instead of a blank list
- gentle, non-punitive recovery ("give yourself a break, but not forget about it")
- heavy responsiveness to a public feedback board

The premise that they "rejected snooze/nag" is only partly true. The main Snooze (223 votes) and Nagging Reminders (130 votes) requests are still open in "Inbox" after nearly four years. The requests that were formally *Rejected* were persistent full-screen alarms and sticky pop-ups, and the stated reason was Apple platform limits, not a design principle. They have since built exactly that kind of alarm in a separate app (Awake, AlarmKit, 2025).

### Cited Findings
**Company and founder**
- unorderly GmbH; App Store address Mainzer Str. 22, 12053 Berlin; first release 2020-04-09. — [iTunes lookup](https://itunes.apple.com/lookup?id=1499198946&country=us); search summary of [App Store listing](https://apps.apple.com/app/id1499198946)
- heise describes Structured as developed by Leo Mehlig "together with his team in Berlin". — [heise, App Store Awards 2025 finalists](https://heise.de/-11085369)
- TechCrunch calls Mehlig the "indie developer behind Structured". He built Awake "because of high demand from Structured users" and started it after Apple announced AlarmKit: "I saw the Alarm Kit, I was like, 'OK, now we need to build this.'" The team had planned an alarm all along but "basically sidelined it". He also said "there had to be something better than a standard alarm clock for people who struggle to get up in the morning." — [TechCrunch, 15 Sep 2025](https://techcrunch.com/2025/09/15/awakes-new-app-requires-heavy-sleepers-to-complete-tasks-in-order-to-turn-off-the-alarm)
- The research page names David J. Grüning as "the researcher behind Structured". Co-authors are Jakub Krawiec, Frederik Riedel and Leonard Mehlig. — [structured.app/research](https://structured.app/research)
- Reviews mention integrations with "one sec" (Frederik Riedel's app) and Awake. — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json), 2026-06-27 5★

**Tone of the Replan copy**
- "Just move it to your inbox, to give yourself a break, but not forget about it." "Out of sight, but not out of mind." "Can you feel that peace of mind?" "Well done – you're back on track!" — [Structured blog, 2 Jun 2025](https://structured.app/blog/replan)

**Feedback-driven development**
- The board's all-time top request was "(Auto-)Move Incomplete Tasks" (2,517 votes, Nov 2022). It is now Completed as Replan, which shipped in 4.2 (May 2025). Comments show it was **rejected at some point before being built** ("Why was this rejected?" Mar 2024; "Rejecting this is a nonsense", Sep 2024). — [feedback board](https://feedback.structured.app/p/auto-move-uncompleted-tasks)
- Comments on that thread from ADHD users:
  - "I use Structured because I have ADHD… not having auto-moving uncompleted tasks is the BIGGEST flaw in this app. A person with ADHD is not going to remember to move their tasks every day if incomplete." (2023-09-21)
  - "Frankly, this is a bug not a feature… Now it just… never appears anywhere unless I remember to look back at that day?" (2023-01-26)
  - "I stopped using Structured because I am missing this feature" (2024-05-23)
  - A counter-view: "One of the reasons I've settled on Structured is because it DOESN'T automatically roll over incomplete tasks. I like that I have to do it manually and make the choice" (2023-09-14)
  - Another: "auto-rescheduling of recurring daily tasks can also feel like bug… returning from a holiday or illness can be overwhelming" (2023-01-27)
  - — [feedback board](https://feedback.structured.app/p/auto-move-uncompleted-tasks)

**Snooze and nagging**
- "Snooze Notifications" (Nov 2022, 223 votes) is **Inbox**, not rejected and not built. Comments include "This is the one single things stopping me from using Structured as my main calendar" (2025-03-29) and "Continuous reminders… continuing until the task is actively completed" (2025-04-29). — [feedback board](https://feedback.structured.app/p/snooze-notifications)
- "Nagging Reminders" ("While working on a task, Structured regularly reminds you to complete it", Nov 2022, 130 votes) is **Inbox**. Comments include "As an ADHD person, this is one thing I'm missing… for now I'll stick with Due" (2024-02-18) and "Make this toggleable or it might be annoying!" (2022-11-17). — [feedback board](https://feedback.structured.app/p/nagging-reminders)
- "Automatic/Recurrent reminder of task every XX minutes" (e.g. medication) has 8 votes and is in Inbox. — [feedback board](https://feedback.structured.app/p/automaticrecurrent-remainder-of-task-every-xx-minutes)
- Requests that were **Rejected**:
  - "Alarm request alternative to notification" (persistent alarm that must be engaged with; Mar 2024). The team replied: "this is not possible, as Apple does not allow apps to access the alarms function… We have recently been in direct contact with Apple regarding this request, and they have personally told us that this is not possible." A Nov 2025 user pointed out that iOS 26 AlarmKit now permits it. In Mar 2026 another wrote: "those tiny reminders are easy to miss." — [feedback board](https://feedback.structured.app/p/alarm-request-alternative-to-notification)
  - "Sticky Reminder with snooze options" (Aug 2024). — [feedback board](https://feedback.structured.app/p/sticky-reminder-with-snooze-options)
  - "Alarm Notification for Android" (full-screen, must be dismissed; Aug 2024). — [feedback board](https://feedback.structured.app/p/alarm-notification-for-android)
  - "Show overdue Reminders in today's view" (Nov 2023). — [feedback board](https://feedback.structured.app/p/show-overdue-reminders-in-todays-view)
- One German user asked to drop countdown pressure: "wenn die Uhrzeit abläuft stresst es mich" ("when the time runs out it stresses me"). Rejected, Aug 2026. — [feedback board](https://feedback.structured.app/p/countdown)

**Other refusals**
- "Customizing the time increments" (15-minute snapping) was Rejected in 2024. A separate post says dragging uses 5-minute intervals, "too finicky". — [feedback board](https://feedback.structured.app/p/customizing-the-time-increments); [feedback board](https://feedback.structured.app/p/customizable-task-drag-intervals)
- r/structuredapp: "I don't understand why Structured is so opposed to just creating an option for a standard weekly view" (2025-03-05). — [Reddit](https://reddit.com/r/structuredapp/comments/1j45ll1/just_create_a_standard_weekly_view_please/)

**Responsiveness as perceived by users**
- "The owners are incredibly responsive to App Store reviews, feedback" (2026-09-22, 5★). "the team actually takes user feedback into consideration" (2026-07-09, 5★). "Thank you for listening to feedback and adding the focused timer" (2026-06-21, 5★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- A critic disagrees: "they're going to copy and paste the same response ive been seeing to any critiques" (2026-02-24, 1★). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

### Inferences
- The "no snooze" stance looks more like platform caution plus backlog prioritisation than ideology. Their own later move (Awake, built on AlarmKit with escalating "missions") shows they accept forceful reminders for a specific moment, waking up. They have not brought that force into the planner itself.
- The deeper philosophy seems to be **user-controlled recovery over automatic rollover**: triage each missed task by swiping rather than silently carrying it forward. That avoids pile-ups ("100 instances of Read") but makes recovery depend on the user acting.

### Gaps
- I found no long-form founder interview on why they chose a timeline, why the app is minimal, or how they think about ADHD. Searches for "Leo Mehlig interview" returned nothing relevant.
- I found no official statement explaining why Snooze has sat in Inbox since 2022.
- I could not verify the Apple Design Award 2026 finalist status on apple.com.

---

## 4. What users love and hate, in their own words

### Takeaway
**Love:**
- seeing the day
- start and end alerts
- the Inbox brain-dump
- colours and icons
- shame-free rescheduling
- the energy monitor
- lifetime purchase availability

**Hate:**
- By a wide margin: **recurring tasks are paywalled**, together with general paywall resentment, steep lifetime price rises, and AI being pushed.
- Next: **entry friction** (the step-by-step modal, a bad time picker, "takes forever to plan my day").
- Then: **reliability** (notifications that silently stop, a slow and battery-hungry Mac app, sync bugs).
- Then: **missing things** (snooze, search, month view, two-way calendar sync, due dates).

### Cited Findings
**Overall shape of the RSS sample (own keyword counts, approximate)**
- 98 of the 500 reviews are 1–2★.
- Among those, 59 mention pay, paywall, subscription, premium, Pro or price, and 34 match recurring, repeat, "every day" or daily. The narrower word "repeat" alone appears in 22 of the 98.
- 13 low reviews mention notifications, alerts or alarms. 12 mention crash, bug, sync, slowness or battery. 11 mention AI.
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Recurring tasks paywalled (the dominant complaint)**
- "why do h have to pay to have reoccurring task bro ITS A DAILY PLANNER ITS IN THE NAME??" (2026-10-27, 1★, 4.6.6)
- "can't make ANY repeating alarms without paying for it, so if you want to have a schedule you have to set up the app yourself manually EVERY. SINGLE. DAY. which completely defeats the purpose" (2026-02-26, 1★)
- "besides your bedtime and wake time, you can't set anything else to repeat on multiple days without Pro" (2025-07-31, 2★, 4.5.3, from an earlier pull of the same feed)
- "As a Person with severe ADHD… Without the Structured Pro plan, I can't repeat some of the tasks that I need to do on a daily basis" (2025-06-11, 1★, earlier pull)
- "I can't put anything on repeat which actually beats the whole purpose" (2026-08-25, 1★, returning user)
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Setup and entry overhead**
The brief mentions a "minute-level planning killed my use" complaint. I found no review saying that verbatim. The closest sentiments:
- "it genuinely takes forever to plan my day out" (2026-07-19, 2★)
- "very annoying to plan all events one by one and takes forever" (2026-04-11, 2★)
- "it takes me about 3 to 4 times as long to put a task on a schedule compared with using something like Apple's calendar" (2026-03-31, 1★)
- "Takes a long time to schedule on everything and just really complicated to keep up on" (2026-04-06, 3★)
- From a neurodivergent user: "it seems like I have to pick a date and a time in a choosing and it's just too much at one time like I wish I could do something simple and then add the level of detail that I want instead of it asking me 50 million questions like an Outlook calendar… overstimulation" (2025-09-29, 3★, earlier pull)
- "They say you should only schedule the big things, but if I don't schedule the little things too, they won't get done" (2026-03-17, 5★). The same granularity that helps some users costs others.
- "they expect you to start the day you download the app" (2026-07-12, 4★)
- An ADHD user overloaded by dual systems: "I put things into Apple calendar but then I'm looking at Structured and I find it's just throwing me off" (r/structuredapp, 2025-10-16)
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json); [Reddit](https://reddit.com/r/structuredapp/comments/1o7wjko/what_works_for_you/)
- Some users lost minute precision: "I can no longer choose the exact time for an activity for example I can no longer choose 16:17 it will be 15 or 30" (Oct 2025). — [feedback board](https://feedback.structured.app/p/exact-minute)

**Notification reliability**
- "For about a week, the alerts helped me stay on track. HOWEVER, after that first week, I stopped getting alerts" (2026-09-09, 1★)
- "it simply stops working if you don't update it immediately when it needs one. It stops giving notifications" (2025-06-11, 2★, earlier pull)
- "I'm sick and tired of not getting my notifications from this app because I have to constantly update it or open/log in" (2025-07-13, 1★, earlier pull)
- "notifications on when my task should be starting. Sometimes they ring sometimes they don't" (2025-05-21, 5★, earlier pull)
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- Counterpoint: "reliable notifications" (2026-09-17, 5★). — same

**Abandonment and switching (in their words)**
- Things: "jammed in some AI nonsense, and made the user interface horribly unresponsive on the Mac… Not exactly ideal for impatient ADHD users… Moving to Things" (2025-07-28, 2★, earlier pull)
- Planny: "lack of two-way calendar sync… That's why I use the lifetime version of Planny" (2026-10-23, 1★)
- Battery and heat: "the app has been consuming a massive amount of battery… even when it is completely closed" (2026-10-19, 2★, macOS 27) and "phone… run extremely hot" (2025-05-05, 2★, earlier pull)
- Due: "for now I'll stick with Due" over nagging reminders. — [feedback](https://feedback.structured.app/p/nagging-reminders)
- r/productivity: "I really like the look and feel of the Structured app and the timeline style time blocking. Unfortunately it freezes on me a lot, so I'm looking for alternatives." (2026-03-05) — [Reddit](https://reddit.com/r/productivity/comments/1rl5lv1/structuredstyle_planner_with_calendar_integration/)
- "I've been using Structured on and off for about 4 years… always circle back" (r/structuredapp, 2025-10-02). Users churn in and out. — [Reddit](https://reddit.com/r/structuredapp/comments/1nw1h1i/do_you_have_a_hybrid_digitalanalog_system/)
- Replan friction: "Replan is maybe THE most complicated way to move incomplete tasks… There's two things that always get me to stop using Structured in the end: no two-way sync with Apple Reminders… no auto-moving" (2025-06-06). — [feedback board](https://feedback.structured.app/p/auto-move-uncompleted-tasks)
- "If I miss the Replan notification, unfinished tasks often get lost" (Apr 2026). — [feedback](https://feedback.structured.app/p/add-an-option-to-automatically-move-unfinished-tasks-to-the)
- "only tasks from the previous day can be rescheduled… So if you forget to reschedule every day, the tasks are lost" (Sep 2025). — [feedback](https://feedback.structured.app/p/reschedule-all-uncompleted-tasks-from-the-past-not-just-those)
- Android Replan request: "the tediousness of rescheduling every individual task has me only using Structured for repeating daily tasks atm… I have ADHD" (141 votes, Planned). — [feedback](https://feedback.structured.app/p/replan-for-android)

**AI resentment**
- "please heavily consider removing the ai… there's no need to sacrifice our planet" (2025-06-09, 2★, earlier pull)
- "the pointless AI features being pushed constantly" (2025-04-18, 1★, earlier pull)
- "it wouldn't let me view my own information unless I gave unlimited permission for OpenAI to access my account" (2025-06-01, 1★, single unverified claim)
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Missing features named repeatedly**
- Search: "a search feature has been sought after… for at least three years" (2025-06-29, 4★, earlier pull) and "Structured absolutely needs a search function" (2026-09-17, 5★).
- A full month view (2026-10-24, 4★).
- A simple checklist-style to-do list (2025-07-08 teacher, 5★, earlier pull).
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

**Love, beyond Section 2**
- "There are less than 10 apps that have changed my Home Screen layout, and this became one about 3 weeks after downloading it and hasn't moved since" (2026-09-21, 5★, ADHD)
- "I downloaded like 6 different planning apps to audit before beginning university and i deleted all but this one" (2026-08-12, 5★)
- Lifetime option: "To actually own something in 2026" (2026-08-19, 5★)
- — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)

### Inferences
- Many of the 1★ reviews come from people in their first minutes or days. They hit the recurring paywall before experiencing the timeline benefit. Several 5★ reviewers are multi-year users. This is a monetisation and onboarding problem more than a core-design problem.
- For a forgetful adult, the critical failure modes are (a) alerts that silently stop and (b) missed tasks that vanish unless Replan is acted on. Both are trust failures that make users stop relying on the tool.

### Gaps
- Reddit coverage of r/ADHD and r/adhdwomen failed (API timeouts), so the ADHD-community Reddit voice is under-represented.
- I did not reach adhdproductivity.org; the search returned no page from that domain.

---

## 5. Free vs Pro in late 2026

### Takeaway
**Free:** the timeline, Inbox, all-day tasks, subtasks, notes, icons and colours, drag and drop, default alerts, widgets, Live Activities, focus timer, Energy Monitor and cross-device sync.

**Pro:**
- recurring tasks (except, reportedly, wake and bedtime)
- calendar and Reminders import
- Replan
- custom notifications and sounds
- custom palette and premium icons
- Structured AI

**US prices** (checked by a third party on 10 Sep 2026): $6.99/mo, $29.99/yr, $99.99 lifetime. The lifetime price has tripled since mid-2024.

### Cited Findings
- The App Store description lists FREE as: visual timeline with drag and drop; Inbox; sync across iPhone, iPad, Watch and Mac; subtasks with notes; "Pomodoro focus timer, Live Activities, and interactive widgets"; colours and icons; accessibility. It lists PRO as: "Connect your calendars and Reminders", "Build recurring tasks and routines", "AI-powered day planning", "Replan: automatically reschedules missed or forgotten tasks", "Custom notifications". Pro comes "monthly, annually, or as a lifetime purchase". — [iTunes lookup](https://itunes.apple.com/lookup?id=1499198946&country=us)
- Free also includes all-day tasks, reminders and the energy monitor. Pro also includes a custom colour palette and premium icons. — [HabitBox (competitor)](https://habitbox.app/blog/structured-app-review); [CoolCuration](https://coolcuration.com/structured-app-review-uk)
- The App Store lists these US in-app purchases: Monthly $2.99, $6.99, $7.99; Yearly $9.99, $29.99 (twice), $34.99, $39.99, $49.99; Lifetime $99.99. Legacy and variant SKUs coexist. — [App Store page, fetched 2026-10-28](https://apps.apple.com/us/app/structured-daily-planner/id1499198946)
- Current US price is $6.99/mo, $29.99/yr, $99.99 one-time (checked 10 Sep 2026). Lifetime history: $29.99 (Jun 2024), then $49.99, then $64.99, then $99.99. Yearly went from $9.99 to $29.99. — [HabitBox](https://habitbox.app/blog/structured-app-review)
- UK prices are £5.99/mo, £17.99/yr, £59.99 lifetime, with legacy £2.99/£9.99 tiers also listed. On Google Play, recurring tasks are sold separately for £4.99. A "Structured Scholarship" gives a free year of Pro to people who can't afford it. — [CoolCuration, 22 Aug 2026](https://coolcuration.com/structured-app-review-uk)
- Users react to the price rises:
  - "saved up for the lifetime for Pro. I'm extremely sad and upset seeing the lifetime rose so much in price" (2025-06-13, 1★, earlier pull)
  - "you have to subscribe or pay 100$ to have repeating tasks" (2025-07-12, 1★, earlier pull)
  - "I believe I got the pro plan early on for something like $20" (2025-07-08, 5★, earlier pull)
  - — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- On the trial, a July 2025 board post says "The free trial should be at least 7 days… in just 3 days" (Rejected). That implies a 3-day trial at the time. — [feedback board](https://feedback.structured.app/p/free-trial-and-features)
- Upsell frequency is reported differently:
  - "Interrupts your session continually asking if you'd like to upgrade" (2025-06-08, 1★, earlier pull)
  - "I only get the occasional pop up… once or twice a day maybe" (2025-06-03, 5★, earlier pull)
  - — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- Platform gaps: Replan and Reminders import are Apple-only, and Structured AI isn't on Web. — [HabitBox](https://habitbox.app/blog/structured-app-review)

### Inferences
- Structured monetises the exact features a forgetful user most needs for routines (repeat) and recovery (Replan). The free tier is a visual day canvas plus alerts.

### Gaps
- I could not confirm the current trial length or whether free users get any recurring tasks beyond wake and bedtime. One 2025 review claimed "Can only add 3 events per day with the free version". That contradicts all other sources and is likely wrong or specific to imported events.

---

## 6. Transferable lessons for a private ADHD planner (one adult; iPhone; family web app)

### Takeaway
**Worth copying:**
1. A single vertical "today" view with duration-as-height, a moving now-line, block fill and visible free-minute gaps.
2. Start **and** end alerts on by default.
3. A zero-field brain-dump Inbox.
4. Swipe-to-triage recovery with warm, non-judgemental copy.
5. Colour and icon personalisation.
6. No streaks and no red-overdue shaming.

**Worth avoiding:**
1. Recovery that only happens if the user responds to a prompt.
2. A multi-step create modal and a fiddly time picker.
3. Paywalling repeats.
4. Notification setups that silently die.

**Worth adding where Structured is weak:** a carry-forward roll-up that doesn't depend on opening the app, an optional escalating re-alert for a chosen few tasks, "task overtime / start now", and one-tap repeat.

### Cited Findings (evidence behind each lesson)
- **Start and end alerts as wrap-up cues.** Users credit "alerts/notifications for the start and end of a task so I know when to wrap up". The defaults are start, end and 5 minutes before. — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json); [Help](https://help.structured.app/en/articles/330434)
- **Gap minutes and the progress fill are named time-blindness aids.** — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json) (2026-08-01, 2026-08-12)
- **Missed tasks must not vanish.**
  - It was the #1 request by an order of magnitude (2,517 votes).
  - ADHD users said "A person with ADHD is not going to remember to move their tasks every day".
  - Even after Replan shipped, users report "If I miss the Replan notification, unfinished tasks often get lost" and "if you forget to reschedule every day, the tasks are lost".
  - — [feedback](https://feedback.structured.app/p/auto-move-uncompleted-tasks); [feedback](https://feedback.structured.app/p/add-an-option-to-automatically-move-unfinished-tasks-to-the); [feedback](https://feedback.structured.app/p/reschedule-all-uncompleted-tasks-from-the-past-not-just-those)
- **But don't flood the user.** "100 instances of 'Read' in the inbox". Auto-rescheduling recurring tasks "can also feel like bug… returning from a holiday or illness can be overwhelming". Some users like having to choose. — [feedback](https://feedback.structured.app/p/auto-move-uncompleted-tasks)
- **Gentle escalation is wanted by some ADHD users.** Snooze has 223 votes and Nagging has 130, with comments like "As an ADHD person, this is one thing I'm missing". Others warn "Make this toggleable or it might be annoying!". A rejected request says "those tiny reminders are easy to miss". — [feedback](https://feedback.structured.app/p/snooze-notifications); [feedback](https://feedback.structured.app/p/nagging-reminders); [feedback](https://feedback.structured.app/p/alarm-request-alternative-to-notification)
- **Entry friction drives people away** ("takes forever", "3 to 4 times as long", "50 million questions"). The most-voted board request is drag-to-resize (340 votes). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json); [feedback](https://feedback.structured.app/p/drag-to-adjust-duration)
- **Shame-free and streak-free helps people keep coming back.** "helps me get back on track without guilt for missing an item or even a day" (contrasted with Fabulous streaks). — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- **Overrun is unhandled.** "Task Overtime" has 246 votes and "start now" has 49, both unbuilt. — [feedback](https://feedback.structured.app/p/task-overtime); [feedback](https://feedback.structured.app/p/resetrestart-scheduled-tasks)
- **Completed tasks keep their pending notifications.** The request to clear them has 21 votes and is in Inbox. — [feedback](https://feedback.structured.app/p/clean-notifications-for-a-certain-task-when-it-is-completed)
- **Glanceable surfaces matter for someone who forgets to open apps.** Widget praise ("remembering my next task… just glancing at it"), and requests for a countdown in the widget (61 votes) and for widget text on all-day items. — [RSS sample](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json); [feedback](https://feedback.structured.app/p/add-countdown-to-next-task-in-widget); [feedback](https://feedback.structured.app/p/add-text-to-all-day-activities-on-widgets)

### Inferences
**Copy:**
- Copy the timeline rendering: height = duration, a now-line, fill-as-time-passes, "N min free" between blocks.
- Default every timed task to start + end alerts.
- Keep a title-only capture path. Time, icon and colour should be optional and set later, e.g. by dragging from the Inbox onto the timeline.

**Recovery should be a default, not a prompt:**
- At the day boundary, unfinished one-off tasks should land automatically in a visible "carried over" group at the top of today, with a count.
- Offer swipe triage (do today / later-inbox / done / drop) when the user next looks.
- Exclude routine and recurring items from the carry-over by default, so nothing piles up.
- Never show red, "overdue" or streak-loss language. Mirror Structured's "give yourself a break, but not forget about it" tone.

**Escalation, sparingly:**
- Offer opt-in, per-task escalation (re-alert after N minutes until acknowledged) for the two or three things that truly matter, such as medication or school pickup. Global nagging is what users fear.
- On an iPhone web app, notification delivery is the weakest link. Structured's reliability complaints show users quietly stop trusting a planner once alerts silently fail.
- This means a delivery health check and a visible "last reminder delivered" indicator are worth building.

**Avoid:**
- Gating repeats.
- A wizard-style create flow.
- Minute-precise time pickers. Snap to 5 or 15 minutes and drag.
- Bolted-on AI.
- Feature creep that dilutes the single view.

**Add:**
- "Start now" and "running over → push the rest" as one-tap actions. These are long-requested and unbuilt in Structured.
- Clear the remaining alerts when a task is completed.

### Gaps
- There is no quantitative retention data for Structured (e.g. day-30 retention of ADHD users) in public sources.
- I could not verify how Structured handles the case where the user never opens the app for several days. Board posts suggest tasks older than a day fall out of Replan's reach, but there is no official doc confirming the look-back window.
