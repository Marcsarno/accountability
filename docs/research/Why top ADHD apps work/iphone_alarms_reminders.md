# iPhone Clock alarms and Apple Reminders as ADHD memory tools: design teardown for a web-push reminder system

Research date: 2026-10-28. Method note: the Arctic Shift Reddit archive API timed out on every full-text query except one ("Timeout. Maybe slow down a bit", even with date windows and throttling), so most Reddit voice comes from one successful archive query (Oct 2026 r/ADHD comments) and from reddit.sentinel-team.org snapshots of r/ADHD threads. ADDitude had no dedicated article on labelling phone alarms. Vendor blogs (yougot.ai, affine.pro, alar.my, dev.to medication-app posts) showed up often in results; I left them out as evidence except where flagged.

## 1. The alarm experience in detail, and why it is harder to ignore than a banner

### Takeaway
A Clock alarm differs from a notification in four ways: Silent mode, the Ring/Silent switch and Do Not Disturb do not silence it; it keeps sounding until you act; you have to make an explicit stop-or-snooze choice; and Snooze brings it back automatically. A banner arrives once, quietly, and can be lost without any decision. Research on habituation shows that repeated identical alerts quickly lose attention, both neurally and visually, while alerts that vary their appearance hold attention longer. That explains why alarms work, and also why alarm overload eventually stops working.

### Cited Findings
- Apple (published 2 Apr 2026): "Do Not Disturb, the Ring/Silent switch, and Silent mode don't affect the alarm sound." Alarm options are Label ("name the alarm"), Sound (setting it to None makes the alarm vibrate only), Repeat ("Tap to set up a recurring alarm") and Snooze ("Turn on to see a Snooze option when the alarm sounds and set a Snooze Duration"). The page also notes that alarm haptics are disabled in StandBy. — [Apple Support: How to set and change alarms on your iPhone](https://support.apple.com/en-us/118444)
- The older Apple iPhone User Guide describes Snooze as giving "yourself nine more minutes", the classic fixed 9-minute snooze. — [Apple iPhone User Guide (iOS 13)](https://support.apple.com/guide/iphone/set-an-alarm-or-bedtime-schedule-iph2909d3a74/13.0)
- An AppleVis podcast transcript says iOS 26 lets you set a custom snooze duration in Clock; before that it was fixed at 9 minutes. The current Apple page's "set a Snooze Duration" wording is consistent with this. — [AppleVis comment](https://applevis.com/comment/195259); [Apple Support 118444](https://support.apple.com/en-us/118444)
- An Apple Community answer says an iPhone alarm "will only sound once, unless you have enabled Snooze". So the automatic repeat comes entirely from Snooze. — [Apple Community: Clock alarm problem](https://discussions.apple.com/thread/255144678)
- Habituation research: Vance, Anderson, Jenkins & Kirwan (MIS Quarterly 2018), using fMRI, eye-tracking and a three-week field study, found that people quickly habituate to repeated warnings, shown by lower neural activity and fewer eye fixations. A "polymorphic" warning, whose appearance changes, sustained attention significantly better over time. The study used security warnings. — reported via [BYU News](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications) and [NSF PAR](https://par.nsf.gov/biblio/10176932)
- In related NSF-funded work, habituation to a frequent non-security notification carried over to a one-time security warning. Constant low-value notifications reduce attention to the important one. — [NSF PAR award 1931108 listing](https://par.nsf.gov/search/award_ids:1931108)
- Fournier et al. (Computers in Human Behavior, 2026; 180 students, Stroop task): a single notification slowed cognitive processing for about 7 seconds. The authors attribute the effect to perceptual salience, learned conditioning and social relevance. Notification count and checking frequency predicted disruption better than screen time. I read only secondary coverage, not the paper. — [PsyPost](https://www.psypost.org/new-psychology-research-reveals-the-cognitive-cost-of-smartphone-notifications/)
- Prospective memory, the cognitive basis for why external cues matter: in a 2014 study of 25 adults with ADHD and 25 controls, the ADHD group showed a large impairment in *time-based* prospective memory (remembering at a given time with no external cue) but no group difference in *event-based* prospective memory (cue-triggered). — [Task dissociation in PM in ADHD (MetaTOC listing)](https://metatoc.com/papers/2052-task-dissociation-in-prospective-memory-performance-in-individuals-with-adhd)
- Event-based PM can also be impaired when the task demands more executive control. In a study with 18 adults per group, the ADHD group performed worse across both inhibitory-load conditions. — [Do inhibitory control demands affect event-based PM in ADHD? (Mainz)](https://bibliographie.ub.uni-mainz.de/en/catalog/publication-148568)
- In a 2018 study of 29 adults with ADHD, participants recalled and carried out fewer of their own real-life intentions than controls. — [Springer, ADHD Atten Def Hyp Disord 2018](https://link.springer.com/article/10.1007/s12402-018-0273-x)
- An r/ADHD user (14 Oct 2026) applied this framework themselves: time-based prospective memory means "you have to spontaneously generate the thought 'check the list' out of nowhere… Time-based prospective memory is reliably the weaker of the two in ADHD. A home screen widget, a desktop icon, a tab in Gmail…" (explaining why widgets failed them). — [r/ADHD comment](https://reddit.com/comments/1x5reha/_/pgp14op)

### Inferences
- An alarm turns a time-based memory task, which is weak in ADHD, into an event-based one: the alarm is the event. It also removes the need for executive control, because it does not wait for the user to look and it keeps going until they decide something. A banner still depends on the user glancing at the phone at the right moment and choosing to act.
- The 9-minute snooze matters because it removes a decision. The user does not have to remember to come back; the system comes back for them. Snooze is the "repeat until acknowledged" mechanism.
- Stop versus snooze forces a binary, conscious decision. A banner allows a third outcome, never noticing it at all, and this is where most failures happen.
- Habituation research suggests that a persistent, repeated reminder needs variation (in wording, timing or channel) or it becomes background noise. That is the theoretical basis for alarm fatigue (section 2).
- I could not verify what the Clock alarm looks like on screen in iOS 26 (full-screen over the Lock Screen when locked; a large banner or Live Activity when unlocked) from an Apple page. MacRumors does describe the Urgent-reminder alarm as having Snooze plus "slide-to-stop" (section 3).

### Gaps
- I found no HCI study that directly compares an alarm, meaning a persistent sound that needs action, with a banner notification for remembering intentions. The closest evidence is the habituation and warnings literature and the prospective-memory studies above.
- No adult-ADHD prospective-memory meta-analysis was found. The evidence is from individual studies, and a review statement that "all studies" on time-based PM in ADHD show deficits appeared only in a search snippet, not verified.
- I did not confirm from Apple the iOS 26 Clock UI changes (custom snooze length, whether Stop became "slide to stop").

## 2. How ADHD users set them up, in their own words

### Takeaway
Users report a consistent set of practices: many alarms through the day as time anchors; alarms named after the action; a different sound per kind of task; alarms tied to the moment they wake rather than to clock times; location reminders for "when I leave or arrive home"; and keeping a reminder uncleared until the task is done. The recurring failure is snooze and ignore. Built-in alarms are used for one or two critical items, such as medication, because giving everything the alarm treatment causes alarm fatigue.

### Cited Findings
- An r/ADHD user (15 Oct 2026): "i have alarms throughout the day because my general awareness of time (time blindness i guess) is so bad… they are roughly every 2-3 hours at random times (same every day, but like, 2:00pm, 4:11pm, 7:24pm, etc) ah i have one for 11pm on trash night and i also have one for 11pm to start chilling before going to bed". — [r/ADHD comment](https://reddit.com/comments/1x6l54c/_/pgw8opy)
- An r/ADHD user (19 Oct 2026) relies on Alexa scheduled announcements: "Every week it announces what bins need to go out for the following day. Took a few mins to setup but every week it says the announcement and I go 'oh yeh I forgot that'". They also have nightly and morning dish reminders and monthly chores. A spoken, ambient, recurring prompt is another non-banner channel. — [r/ADHD comment](https://reddit.com/comments/1x9sbnp/_/phoh4jc)
- An r/ADHD thread "Do reminders actually work for you or do you just ignore them?" (about Sept 2025, snapshot Apr 2026). The original poster says reminders "go off at the wrong moment and I either snooze them or ignore them". Commenters report repeatedly snoozing; silencing alerts and then forgetting; and one says giving other tasks the medication-alarm treatment "would just be too disruptive and I'd get alarm fatigue". Another clears a reminder only after doing the task, so the reminder stays visible. — [reddit.sentinel-team.org snapshot of r/ADHD post 1sfzayv](https://reddit.sentinel-team.org/posts/1sfzayv/snapshots/2026-04-10T20%3A30%3A07.765544Z)
- An r/ADHD thread "How can I set daily reminders/timers for tasks when my schedule changes a lot?" (about Aug 2025). The original poster has "seen people who set alarms for each daily task in the morning". One commenter says "alarms at fixed times just stopped working" when their wake time varied. Another uses "iPhone shortcut automations triggered by my first alarm of the day", saying fixed-time reminders "just get snoozed forever". A third groups alarms by date. — [reddit.sentinel-team.org snapshot of r/ADHD post 1s41s5h](https://reddit.sentinel-team.org/posts/1s41s5h/snapshots/2026-03-27T19%3A11%3A28.198901Z)
- An ADDitude reader tip: use different alarm sounds for different tasks so they don't blend into the background. Seen in search summary only, not opened. — [ADDitude: Get-Organized Tools](https://www.additudemag.com/adhd-organization-tools-you-will-use-everyday/)
- Naming each alarm with the action, e.g. "Take meds" or a wake alarm labelled "drink water", plus an "alarm stack" of sequential alarms. — [Muddle Mend ADHD Substack (blogger, not research)](https://muddlemendadhd.substack.com/p/quick-tip-hack-your-day-with-the)
- ADDitude has long promoted silent vibrating reminder watches (WatchMinder) for up to about 30 daily reminders such as medication. These are the hardware ancestor of Apple Watch taps. — [ADDitude store: WatchMinder](https://www.additudemag.com/product/watchminder-silent-alarm-reminder-watch-adhd)
- Location reminders: one ADHD user calls location-aware reminders "a vital part of my ADHD coping strategies", most useful "when leaving my home, Reminders will go off, giving me a chance to turn around". They also note the app could not find a specific store. — [Goodreads author blog: ADHD – Reminders Right Where You Need Them](https://www.goodreads.com/author_blog_posts/17902224-adhd-reminders-right-where-you-need-them?tab=book)
- On Apple Watch you can set a location reminder for arriving home or for getting into a car with a Bluetooth connection. — [Apple: Set and respond to reminders on Apple Watch](https://support.apple.com/en-mo/guide/watch/apdf10efb1bf/11/watchos)
- Siri location capture: Apple's example is "Remind me to go to the supermarket when I leave here", and you need home and work addresses on your Contacts card. — [Apple Support: Use Reminders (published 10 Oct 2026)](https://support.apple.com/en-gb/HT205890). Older forum reports say Siri on Apple Watch sometimes attached no location or defaulted to home. — [MacRumors forum](https://forums.macrumors.com/threads/siri-cannot-create-location-based-reminders-on-apple-watch.1928744)
- Apple Watch for ADHD (journalist first-person accounts): [iMore](https://imore.com/health-fitness/apple-watch/ive-been-using-my-apple-watch-to-manage-my-adhd-heres-whats-been-working-for-me-plus-time-management-tips-that-could-help-almost-anyone); [Go Make Things: Apple Watch and ADHD medication reminders](https://gomakethings.com/articles/apple-watch-and-adhd-medication-reminders/). I did not open these, so no quotes.

### Inferences
- The setups people describe share three properties: (a) the cue carries the instruction, through labelled alarms and distinct sounds; (b) the cue fires at a natural transition, such as waking, leaving home or arriving, rather than an arbitrary clock time; (c) the user reserves interrupt-level alerts for a few high-stakes items and uses softer channels for the rest.
- "Snoozed forever" and "I get alarm fatigue" are the same failure seen from two sides. Too few persistent alerts and tasks are missed; too many and the user habituates.

### Gaps
- I could not retrieve the phrase "hostage in my own house" or similar alarm-overload testimony. Arctic Shift full-text search kept timing out and web search did not find it. Treat that framing as unverified.
- I found no user reports on Reminders widgets specifically. The one relevant comment says home-screen widgets fail because they need spontaneous checking: [r/ADHD](https://reddit.com/comments/1x5reha/_/pgp14op).
- No quantitative data on how many alarms ADHD users typically set.

## 3. Apple Reminders in iOS 26: Urgent reminders and related features

### Takeaway
iOS 26.2 (December 2025) let any reminder with a due time be marked **Urgent**. It then rings as a real alarm through Silent mode and Focus, with Snooze and slide-to-stop and a Lock Screen Live Activity. A setting replaces Snooze with **Complete**, so you can mark it done from the alarm. iOS 26.4 (around March 2026) added an **Urgent smart list**. There are constraints: you need iCloud Reminders, the alarm rings only on the device Find My uses as your location, Reminders needs alarm permission, and at first there was no Shortcuts or API support. Early reactions from power users and journalists are very positive.

### Cited Findings
- Apple: "In iOS 26.2, you can mark a reminder as urgent and Reminders will schedule an alarm when that reminder is due." "Alarms will activate even when your device is silenced or a Focus is on." "Alarms for urgent reminders will only activate on the device that Find My uses as your location." "To mark reminders as urgent, you need to set up iCloud Reminders." "Make sure you allow Reminders to access alarms in the Settings app." (Page published 10 Oct 2026.) — [Apple Support: Use Reminders on your iPhone](https://support.apple.com/en-gb/HT205890)
- If Date and Time are not set, turning on Urgent defaults them to the next hour, according to the Apple support page as summarised by search. — [Apple Support (en-ie)](https://support.apple.com/en-ie/102484)
- MacRumors (Tim Hardwick, 27 Jan 2026), how it works:
  - Setup: Settings > Apps > Reminders > allow Alarms; then in a reminder's info view, turn on Time and the **Urgent** switch.
  - When it fires, the iPhone sounds an alarm with a **Snooze** button (blue, to tell it apart from Clock alarms) and **slide-to-stop**.
  - Stopping or snoozing leaves a notification with options to complete or reschedule. Completing that way opens Reminders and needs another tap.
  - The **Complete for Alarm** toggle (Settings > Apps > Reminders > Urgent Reminders) replaces Snooze with Complete, which marks the reminder done immediately.
  - Alarms sound under Focus and when muted.
  - [MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)
- 9to5Mac (Ryan Christoffel, 27 Feb 2026): at the due time "the iPhone sounds an alarm" with 9-minute Snooze and Stop. iOS 26.4 adds a dedicated **Urgent** smart list near the top of Reminders, collecting every Urgent task across lists. He calls it his favourite new Reminders feature in a long time and says the snooze system plus the Live Activity have stopped him forgetting urgent tasks. He suggests the Urgent list as an antidote to an overwhelming Today list. — [9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)
- 9to5Mac also says 26.4 adds new ways to mark items Urgent. A lower-quality site says this means long-press or a Quick Toolbar control; I could not confirm it. — [search summary of 9to5Mac/aggregators](https://9to5mac.com/?p=1046357)
- Early user reaction from the Mac Power Users forum, Jan 2026: jcarucci called it "a great feature" and said the snooze and Lock Screen Live Activity are "even better than what you get with Due", planning to move Due alarms to Reminders. nationalinterest said it would let them drop another app. Complaints: Urgent could not be set from Shortcuts, nor apparently via AppleScript or the API. — [MPU Talk: Alarm Reminders in iOS 26](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079)
- Bugs and limits from users in Apple Community threads: the Urgent toggle missing after updating; reportedly not shown for Local (non-iCloud) lists; the Urgent alarm stuck on an old iPhone 16 after moving to an iPhone 17 (consistent with the Find My location-device rule); and an "Allow Alarms for Urgent Reminders" popup that would not dismiss. — [Urgent toggle missing](https://discussions.apple.com/thread/256211741); [tied to iPhone 16](https://discussions.apple.com/thread/256215590); [stuck popup](https://discussions.apple.com/thread/256214012)
- Tom's Guide headline: "iOS Reminders will be impossible to ignore thanks to this iOS 26.2 addition". I could not retrieve the body. — [Tom's Guide](https://www.tomsguide.com/phones/iphones/ios-reminders-wii-be-impossible-to-ignore-thanks-to-this-ios-26-2-addition-and-thats-great-news-for-me)
- Third parties are copying the pattern: Todoist documents an "urgent reminder" for its iOS app. — [Todoist help](https://www.todoist.com/es/help/articles/add-an-urgent-reminder-with-the-todoist-ios-app-WeBYdY5ra)
- Other Reminders behaviour (Apple):
  - Location reminders fire on arriving or leaving, and need Location Services.
  - All-day reminders notify at 9:00 by default.
  - Flagged smart list.
  - Tags for automatic organisation.
  - Siri on iPhone and Watch can create reminders.
  - [Apple Support](https://support.apple.com/en-gb/HT205890)

### Inferences
- Apple essentially admitted that a reminder notification is not enough for things that matter, and grafted Clock alarm behaviour onto Reminders: interrupt-level sound, Snooze as automatic repeat, Live Activity persistence, and an explicit outcome (Complete). "Complete for Alarm" closes the loop at the moment of the alert, so there is no second step for the user to forget.
- The Urgent smart list is an overload control: a short list of only the things that ring, separate from the guilt pile of everything else.
- The iCloud and Find My rules mean the alarm rings on exactly one device. This deliberately avoids alarms ringing on every device at once.

### Gaps
- I found no Apple newsroom statement about Urgent reminders, and no ADHD-specific user reactions on Reddit or ADDitude to Urgent reminders (archive search failed).
- Apple Watch behaviour of Urgent alarms (whether it taps or rings the Watch) and Mac behaviour were not confirmed from a reliable source.
- I found no iOS 27 information. iOS 27 would be the 2026 release, current as of this research date, but no sources on Reminders changes in it came up.
- No confirmed Urgent snooze length beyond 9to5Mac's "9-minute".

## 4. Why built-ins win for ADHD users, and how they fail

### Takeaway
The built-ins win because they are already there with nothing to set up, they are trusted to fire, they can interrupt at alarm level (only Clock, and now Urgent Reminders, ring through Silent mode and Focus), and Siri allows capture in seconds. They fail in three ways: plain reminder banners get ignored or snoozed forever; too many alarms cause habituation and alarm fatigue; and the Reminders list grows into an unreviewed backlog. Users repeatedly say iPhone Reminders has "good scheduling but zero accountability".

### Cited Findings
- Apple documents that only alarms bypass Silent mode and DND: "Do Not Disturb, the Ring/Silent switch, and Silent mode don't affect the alarm sound". Urgent reminders get the same exemption ("activate even when your device is silenced or a Focus is on"). — [Apple 118444](https://support.apple.com/en-us/118444); [Apple HT205890](https://support.apple.com/en-gb/HT205890)
- Reddit voice (via search summary of r/ADHD mirror threads):
  - Apps "assume you'll remember to check them", and phone alarms rather than notifications worked better.
  - iPhone Reminders has good scheduling but "zero accountability".
  - Constant snoozing can train you to ignore alarms.
  - [r/ADHD mirror snapshot](https://reddit.sentinel-team.org/posts/1rn77k0/snapshots/2026-03-13T19%3A10%3A13.708674Z); [r/ADHD mirror snapshot](https://reddit.sentinel-team.org/posts/1runq1f/snapshots/2026-03-16T18%3A35%3A43.761028Z). These come from search summaries; the pages were not opened individually, so they are lower confidence.
- Ignoring and alarm fatigue in users' own words, in the r/ADHD "Do reminders actually work…" thread. — [snapshot](https://reddit.sentinel-team.org/posts/1sfzayv/snapshots/2026-04-10T20%3A30%3A07.765544Z)
- Fixed-time reminders "just get snoozed forever". — [snapshot](https://reddit.sentinel-team.org/posts/1s41s5h/snapshots/2026-03-27T19%3A11%3A28.198901Z)
- Widgets and passive lists fail because they rely on spontaneous checking (time-based PM). — [r/ADHD comment, 14 Oct 2026](https://reddit.com/comments/1x5reha/_/pgp14op)
- Before Urgent, power users paid for third-party nag apps (Due, Alarmed with repeat "nag" settings) to get repeat-until-done behaviour. — [MPU Talk](https://talk.macpowerusers.com/t/alarm-reminders-in-ios-26/44079); [Easterseals Tech: Alarmed app](https://www.eastersealstech.com/2022/08/30/stay-on-task-with-alarmed-app/)
- 9to5Mac's author presents the Urgent list as relief from an overwhelming Today list, the guilt-pile problem. — [9to5Mac](https://9to5mac.com/2026/02/27/ios-26-4-gives-reminders-best-new-feature-the-one-thing-it-was-missing/)

### Inferences
- "Already there and trusted" matters on its own. ADHD users abandon apps they have to remember to open. Clock is the one app they are sure will make noise, so a new system starts with a trust deficit and has to earn it with reliable delivery.
- The failure modes point to a budget: a small number of interrupt-level items, each named for its action, plus a mechanism to keep the rest from piling up.

### Gaps
- No survey data quantifies "most often credited". The claim that alarms and Reminders are the tools ADHD adults most often credit rests on recurring anecdotes, not a measured ranking.

## 5. Transferable lessons for a web-push reminder system (home-screen web app on iPhone)

### Takeaway
A web app cannot ring like an alarm: no sound through Silent mode or Focus, no full-screen takeover, no Snooze or Stop on the alert, no Vibration API. It can copy the parts that do not depend on sound:
- Action-named titles.
- Server-side repetition until acknowledged, with escalation and varied wording.
- A single-purpose "now" screen with Done and Snooze when the alert is opened.
- An explicit acknowledgement that closes the loop.
- A small "urgent" budget and list.
- Instructions for the user to set iOS Banner Style to Persistent and allow the app through their Focus.

For true alarm-level items, the honest design is to hand off to the built-ins: tell the user to create a Clock alarm or Urgent reminder, or offer a share or Siri path to create one.

### Cited Findings
- Constraints on iPhone home-screen web apps, from the project's verified notes (2026-10-27):
  - Web Push works only for Home Screen apps (iOS 16.4+).
  - 4 KB payload; TTL required.
  - No silent push.
  - Declarative Web Push payload on iOS 18.4+ (`title`, `navigate`, `body`, `app_badge`).
  - `pushsubscriptionchange` does not fire, so subscriptions can die silently.
  - No Vibration API.
  - Testing must cover "Focus & Notification Summary".
  - [/home/user/accountability/docs/PWA_PREP.md](file:///home/user/accountability/docs/PWA_PREP.md), lines 13–27, 78
- Alarm properties and what drives them:
  - Bypassing Silent mode and DND is reserved for alarms. [Apple 118444](https://support.apple.com/en-us/118444)
  - Apple extended it only to its own Urgent Reminders, which needs an explicit "Alarms" permission. [Apple HT205890](https://support.apple.com/en-gb/HT205890); [MacRumors](https://www.macrumors.com/how-to/set-alarm-style-iphone-reminders-in-ios-26-2/)
- Repetition without variation habituates; varied ("polymorphic") alerts sustain attention. — [BYU/MISQ](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications)
- Event-based and transition-anchored cues work better than arbitrary times for ADHD, both in research and in user practice. — [MetaTOC 2014 study](https://metatoc.com/papers/2052-task-dissociation-in-prospective-memory-performance-in-individuals-with-adhd); [r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1s41s5h/snapshots/2026-03-27T19%3A11%3A28.198901Z)

### Inferences (design mapping: alarm property → web-push approximation)
| Alarm or Urgent property | Web-push approximation | Feasible? |
|---|---|---|
| Rings through Silent mode and Focus | Not possible. Ask the user to add the app to their Focus allowed list and use Persistent banner style (iOS Settings > Notifications > app); offer "make this a real alarm" via Clock or Urgent Reminders for the critical 1–3 items | No (only partly, via user settings) |
| Sound continues until action | Server re-sends at intervals until acknowledged (e.g. +9 min, then escalate), capped to avoid fatigue | Partial (discrete pings, not continuous sound) |
| Snooze is automatic repeat | Server-side snooze. Unacknowledged counts as snoozed; the "now" screen has Snooze 9 min / Done | Yes (server-side) |
| Stop vs Snooze forces a decision | Opening the notification goes to a full-screen "now" view with one task, Done, Snooze, Reschedule, no other navigation | Yes (in app, after the tap) |
| Label carries the instruction | Title is the verb plus the object ("Take meds", "Bins out"), never "Reminder" or the app name; keep within the 4 KB payload | Yes |
| Complete from Alarm | Done in the app records an acknowledgement and stops the repeat chain. iOS web push action buttons were not verified, so assume one tap opens the app | Partial |
| Live Activity, Lock Screen persistence | Not available to web apps (unverified in this pass); the app badge (`app_badge`) can show outstanding count | Partial (badge only) |
| Apple Watch tap | Web push notifications mirror to the Watch only if iOS forwards them under the user's settings (not verified here); no web haptics | Uncertain |
| Urgent smart list / overload control | Separate "urgent" lane with a hard cap (e.g. 3 a day) and a quiet backlog that is not pushed | Yes |
| Location "when I get home" | Not available from a web app in the background; hand off to Siri or Reminders | No |
| Varying the alert to resist habituation | Rotate wording, escalate tone on each repeat, vary timing slightly | Yes |

- Reliability is the trust foundation. Because subscriptions can silently die, the system needs a heartbeat ("last delivered / last seen") and should alert the user, or a family member, when push is broken. Otherwise the reminder silently fails, which is the opposite of what makes the Clock trusted. ([PWA_PREP.md](file:///home/user/accountability/docs/PWA_PREP.md), line 16)

### Gaps
- Not verified in this pass: whether iOS web push in 26.x supports notification action buttons, `requireInteraction`, Time Sensitive interruption level, or forwarding to Apple Watch. These decide how close to "Complete for Alarm" and "Watch tap" a web app can get and need on-device testing.
- Whether a Persistent banner style plus allowing the app in a Focus meaningfully reduces missed reminders is untested; there is no research on it.
