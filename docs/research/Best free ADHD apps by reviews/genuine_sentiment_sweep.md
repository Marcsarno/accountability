# Genuine ADHD user sentiment: which apps adults say actually helped (cross-source sweep, researched 2026-10-28)

**How the Reddit evidence was gathered.** reddit.com, old.reddit.com and `site:reddit.com` web search were all blocked (HTTP 403, and the search tool refuses reddit.com). Redlib mirrors returned 429/503. Instead I used the **Arctic Shift Reddit archive API** (https://arctic-shift.photon-reddit.com), which serves original Reddit posts and comments with ids, scores and timestamps.
- **Collection.** A title search for "app"/"apps" since 2024-10-01 across r/ADHD, r/adhdwomen, r/ADHD_Programmers, r/adhd_anxiety, r/productivity, r/ADHDers, r/AdultADHD, r/adhdmeme and r/ADHD_partners returned 2,234 posts.
- **Thread selection.** From those I picked the **30 largest threads in which genuine users ask for or share recommendations**, dated 2025-07-11 to 2026-10-14. I left out the many "I built an ADHD app" developer posts.
- **Counting.** That gave **1,055 comments**. I counted how many comments name each app with keyword regexes.
- **Caveats on the counts.**
  - A mention is not always an endorsement.
  - The "paper" bucket includes pen, notebook, journal and planner.
  - Score is Reddit net upvotes at archive time.
  - The sample leans toward 2026.
- **Links.** Every Reddit link below is the original permalink. Each was retrieved from the archive, not live Reddit.

## Q1. Which apps do Reddit ADHD communities name most often and most positively, and why?

### Takeaway
The most-credited tools are **free, general-purpose, built-in or near-built-in tools**, not ADHD-branded apps:
- paper or notebooks
- phone alarms
- Google Calendar
- Apple Reminders, Notes and Calendar
- sticky notes
- Google Keep

Among dedicated apps, four stand out:
- **Finch**: free, the most-mentioned dedicated app, but it splits opinion.
- **ScreenZen**: free; the highest-upvoted single recommendation in the sample.
- **Obsidian**: free.
- **Goblin Tools**: free on the web.

**TickTick and Todoist** are named often but mostly with lukewarm scores. **ADHD-branded paid apps (Tiimo, Structured, Llama Life, Inflow, Saner)** are barely mentioned by genuine users.

### Cited Findings
**Mention counts (30 threads, 1,055 comments).** Each row is comments naming the tool / threads it appears in / summed upvotes on those comments. All figures come from my analysis of the Arctic Shift archive data, whose source threads are linked throughout this section.

| Tool | Comments | Threads | Upvotes | Free? |
|---|---|---|---|---|
| Paper / notebook / planner / journal | 68 | 18 | 264 | Free or cheap |
| Phone alarms (incl. Alarmy) | 40 | 16 | 276 | Free |
| Google Calendar | 37 | 15 | 120 | Free |
| Finch | 34 | 15 | 124 | Free core, optional Plus |
| Notion | 24 | 11 | 32 | Free tier |
| Sticky notes / Post-its | 22 | 11 | 117 | Free or cheap |
| Todoist | 20 | 11 | 28 | Free tier |
| Apple Notes / "Notes app" | 20 | 8 | 63 | Free |
| AI chatbots (ChatGPT, Gemini, Claude) | 18 | 8 | 51 | — |
| TickTick | 17 | 10 | 38 | Free tier |
| Obsidian | 16 | 9 | 101 | Free |
| Body doubling (as a technique) | 16 | 7 | 88 | — |
| Pomodoro (generic) | 14 | 10 | 25 | — |
| Goblin Tools | 14 | 8 | 58 | Free web |
| Siri / Alexa voice reminders | 13 | 7 | 49 | — |
| Apple / phone Calendar | 10 | 5 | 68 | Free |
| Google Keep | 8–9 | 7 | — | Free |
| Apple Reminders | 8 | 6 | 36 | Free |
| ScreenZen | 8 | 4 | 130 | Free |

- **Rarely mentioned:** Alarmy 7, Habitica 6, Tiimo 6, Opal 6, Focus Friend 4, Sunsama 4, Forest 3, Structured 3, Llama Life 0, Saner.ai 1, Focus Bear 1, Inflow 0.
- **Google Keep note:** my strict match counts 8–9 comments. The loose regex gave 39, but most of those were the verb "keep".

**ScreenZen (free blocker): the most-upvoted single tool recommendation in the sample.**
- "ScreenZen app I've recently used over the last few weeks, to effectively block Reddit and other websites or apps… I gotta wait 3 minutes and after that it only works for 10 minutes. It's enough to reduce my time significantly." Score 69, r/ADHD, 2026-07-01. — [Reddit 1uka63k/ouuezg5](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouuezg5/)
- "I use ScreenZen (free), it makes it very easy to block or limit any app. It can delay an app opening, make you enter a reason for opening the app…" Score 30, r/adhdwomen, 2026-08-15. — [Reddit 1vow3lc/p3teagg](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3teagg/)

**Google Calendar: "everything goes in it", recurring bills and paydays, colour coding.**
- "i use google calendar for everything… i color code for all areas of life… my bills… are set until the end of time." Score 32, r/ADHD, 2026-07-01. — [Reddit 1uka63k/ouufaxd](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouufaxd/)
- "Google Calendar is a lifesaver. I actually synced it with my Apple Calendar so that I can receive notifications on my iPhone." Score 18, r/ADHD, 2026-07-01. — [Reddit 1uka63k/ouusgri](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouusgri/)

**Apple built-ins (free), chosen because the hunt for apps is itself a distraction.**
- "My experience is that trying to find the best apps to help me, just becomes a distraction in itself. Now I use the apple ecosystem, reminders, notes and calendar. They're free and work well together." Score 26, r/ADHD, 2026-07-01. — [Reddit 1uka63k/ouuv2yp](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouuv2yp/)
- A highly upvoted post (score 242) listing an ADHD "app stack" includes "Apple Calendar, Reminders, and Notes (free) — constantly open on all my devices because I don't trust my memory" and "Clock app on my phone — alarms and reminders for basically everything." r/adhdwomen, 2026-08-15. — [Reddit 1vow3lc](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/)
- Siri plus Reminders for zero-friction capture: "Anytime I need to remember to do something I summon Siri, 'set a reminder to … when I get home'…" Score 10, 2026-08-15. — [Reddit 1vow3lc/p3u241j](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3u241j/)
- "siri reminders are my entire life!! i have one for everything." r/ADHDers, 2026-02-11. — [Reddit 1r1zjk9/o4t49f6](https://www.reddit.com/r/ADHDers/comments/1r1zjk9/comment/o4t49f6/)

**Finch (free core): praised for gentleness and gamification, criticised for streak shame.**
- Positive: "I like using finch because I feel like it doesn't make a big deal of it… it's just a tiny little hammer." Score 23, r/ADHD, 2026-04-03. — [Reddit 1sb7u5c/oe1f82i](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1f82i/)
- Positive: "Finch! I love it so much… works especially well for neurodivergent folks." Score 9, r/productivity, 2026-07-29. — [Reddit 1v9l8bt/p0frvws](https://www.reddit.com/r/productivity/comments/1v9l8bt/comment/p0frvws/)
- Explicitly on the free version: "now I've just started using Finch (the free version)… It gives your bird energy when you tick off a goal… gives me a little dopamine boost." r/adhdwomen, 2026-08-01. — [Reddit 1vciaiy/p11na31](https://www.reddit.com/r/adhdwomen/comments/1vciaiy/comment/p11na31/)
- Negative: "I was pushing 100 and something days. Got too busy and didnt open the app a few days… I saw my little Lola sad… I then deleted it because I felt so ashamed and guilty." Score 9, 2026-04-03. — [Reddit 1sb7u5c/oe1lc0l](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1lc0l/)
- Negative: "I found myself logging in just to keep my streak rather to learn. I've now started feeling the same about Finch :/" Score 14. — [Reddit 1sb7u5c/oe1s7v4](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1s7v4/)

**Obsidian (free): powerful but has a learning curve.**
- "Obsidian. A sort of second-brain. It's a free note-taking app… Thanks to free community plugins, it is my planner, journal, food diary… reminders… auto-generates my to-do lists for the day without getting overwhelmed." Score 43, r/adhdwomen, 2026-08-15. — [Reddit 1vow3lc/p3tju1u](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3tju1u/)
- The reply to that comment shows the overwhelm risk: "I saw the list, got overwhelmed, and haven't ventured back yet." Score 16. — [Reddit 1vow3lc/p3tyjjh](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3tyjjh/)
- "Once you get past the learning curve it makes organizing my chaotic brain so much easier." Score 14, 2026-07-29. — [Reddit 1v9l8bt/p0en3u1](https://www.reddit.com/r/productivity/comments/1v9l8bt/comment/p0en3u1/)

**Goblin Tools: task breakdown ("Magic ToDo") for task initiation.**
- "My favorite function… break down big tasks into small chunks… 'Clean bathroom'… set the level of 'spice' from 1-5… then it spits out a list of steps." r/adhdwomen, 2026-08-01. — [Reddit 1vciaiy/p11jy0h](https://www.reddit.com/r/adhdwomen/comments/1vciaiy/comment/p11jy0h/)
- "I enjoy goblin tools, it serves a lot of different functions for me." Score 19, r/ADHD, 2026-07-01. — [Reddit 1uka63k/ouufcjb](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouufcjb/)

**TickTick and Todoist: credited for quick capture, widgets and continuous alarms, but scores are low.**
- TickTick: "What's made it work for me vs other organization apps is the 'continuous alert' aka alarm feature." r/adhdwomen, 2026-08-15. — [Reddit 1vow3lc/p3v7km0](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3v7km0/)
- TickTick: "the widgets for the Android version are amazing." 2026-07-14. — [Reddit 1uwa0cs/oxhlsn1](https://www.reddit.com/r/productivity/comments/1uwa0cs/comment/oxhlsn1/)
- Todoist: "the game changer for me because of the quick capture and… NLP… But… you still need to have a system… the list spirals." r/productivity, 2026-07-14. — [Reddit 1uwa0cs/oxhdch1](https://www.reddit.com/r/productivity/comments/1uwa0cs/comment/oxhdch1/)
- Todoist again: filters "so I only had to see what was important at that moment. Otherwise the list became overwhelming." — [Reddit 1uwa0cs/oxhfjht](https://www.reddit.com/r/productivity/comments/1uwa0cs/comment/oxhfjht/)

**Alarmy and Medisafe: alarms that force a transition.**
- Alarmy: "the missions feature" makes you do an activity to dismiss the alarm. Score 81, r/productivity, 2026-07-29. — [Reddit 1v9l8bt/p0fb4rp](https://www.reddit.com/r/productivity/comments/1v9l8bt/comment/p0fb4rp/)
- The same commenter uses Alarmy as a "stop playing video games" alarm. They also use Medisafe, which can text a friend if a medication dose isn't confirmed: "my compliance has become so much more regular." Score 14, 2026-08-15. — [Reddit 1vow3lc/p3u94zu](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3u94zu/)

**Focus Friend (Hank Green), free with optional pro.**
- Recommended first in the score-242 r/adhdwomen app-stack post: "Helps with the whole 'can't start a task without my phone in my hand' thing." 2026-08-15. — [Reddit 1vow3lc](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/)

**Tiimo: very little genuine voice, and mixed.**
- "Ive been using the free version… the basic functionality has helped with tasks and routines… see if the free version is enough… A lot of these apps try lock you in to exploitative subscriptions that are hard to cancel, which is predatory for us." 2026-07-01. — [Reddit 1uka63k/ouvif0m](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouvif0m/)
- "I've tried Tiimo and didn't get on with it; it felt naggy rather than positive." 2026-08-01. — [Reddit 1vciaiy/p11na31](https://www.reddit.com/r/adhdwomen/comments/1vciaiy/comment/p11na31/)

**Warnings users give about predatory subscriptions.**
- "Just a PSA - NEVER try Attainify. It's a predatory app… No easy way to quit after the free trial." Score 15, 2026-08-15. — [Reddit 1vow3lc/p3uk5t4](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3uk5t4/)
- "I heard similar things about the Fabulous app. It specifically targets Adhd people and then uses our weak points against us." Score 17. — [Reddit 1vow3lc/p3ut5qd](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3ut5qd/)

**Older context (Aug 2024).** An r/ADHD thread titled "What ADHD apps do you use" (14 Aug 2024) exists, but the mirror returned 503, so it was not analysed. — [mirror link](https://cal1.lr.ggtyler.dev/r/ADHD/comments/1ervz6i/what_adhd_apps_do_you_use/li2jmpr)

### Inferences
**Recurring reasons a tool "worked":**
1. **Zero or near-zero capture friction**: voice, widget, quick add, an alarm renamed to the task.
2. **Interruptive delivery**: alarms, continuous alerts and location reminders that "punch through".
3. **Already on the phone and free**, so there is no setup project and no subscription trap.
4. **Gentle, non-punitive feedback**: Finch's "tiny little hammer", ScreenZen's delay instead of a hard block.
5. **Making the first step concrete**: Goblin Tools' breakdown, Focus Friend's timer.

**Weighted by both mention count and upvotes,** the evidence-backed free shortlist is:
- Google Calendar or Apple Calendar plus Reminders plus phone alarms (the "stack" of built-ins)
- Finch, with the streak-shame caveat
- ScreenZen
- Goblin Tools
- Obsidian, only for people who like tinkering
- Google Keep or Apple Notes for capture

**ADHD-branded planners (Tiimo, Structured, Llama Life, Inflow) have almost no organic Reddit presence** relative to how prominently they appear in "best ADHD apps" articles. That gap is itself a signal of marketing-driven visibility (see Q6).

### Gaps
- Exact mention counts across all of Reddit cannot be done without full-text search. My counts cover 30 hand-picked threads, so treat them as relative, not absolute.
- Nov 2024 – mid-2025 threads are under-represented. The archive returned mostly 2026 threads for the largest-comment sort.
- Regex counting cannot separate positive from negative mentions. Sentiment above comes from reading the top-scored comments.

## Q2. ADDitude, CHADD, and published surveys of ADHD app use

### Takeaway
There is no recent (2024–2026) large reader poll or academic survey ranking consumer ADHD apps. ADDitude's reader-recommendation list dates from 2022. It still mirrors the Reddit pattern: built-ins (Apple Reminders, Siri or Alexa), shared calendars (Cozi), Trello and analogue tools (whiteboard, Planner Pad). CHADD explicitly does not endorse products. Academic work says apps are a "potential adjunct" with unproven long-term efficacy.

### Cited Findings
**ADDitude, "15 Apps, Tools, and Gadgets for ADHD Brains: Reader Recommendations"** (Janice Rodden, 10 Feb 2022, details accurate as of 31 Jan 2022). Readers were surveyed; no sample size is given. The article discloses Amazon affiliate commissions. Picks:
- Trello
- Cozi (shared colour-coded family calendar)
- Apple Reminders (location-based: "reminded to empty their car trunk when near home")
- Siri or Alexa ("much faster than doing it manually")
- Wunderlist (now discontinued)
- Whiteboard
- Planner Pad
- phone camera to photograph notes
- Ruggie alarm rug

— [ADDitude](https://www.additudemag.com/adhd-productivity-apps/)

**CHADD.**
- No current CHADD list of recommended apps for adults was found. CHADD states it does not endorse products. — [CHADD search results summary](https://chadd.org/attention-article/yep-theres-an-app-for-that-choosing-apps-for-executive-function-challenges/)
- CHADD's guidance on choosing apps (2015) is a friction rule: "if it takes five steps to enter a reminder about an appointment, it's not the app for someone challenged with cognitive demands." — [CHADD Adult ADHD blog, 19 May 2015](https://chaddadultadhd.blogspot.com/2015/05/choosing-apps-for-executive-function.html)

**Academic evidence.**
- A 2025 systematic review of 14 studies found apps "can potentially be adjunctive instruments" for ADHD, but "further study is required to validate their effectiveness over a long period." — [Frontiers in Public Health 2025](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1483923/pdf)
- A 2025 JMIR Formative Research study used passive phone sensing to compare people with and without ADHD, including notification response times. It is not a survey of which apps help. — [PubMed 39885373](https://pubmed.ncbi.nlm.nih.gov/39885373/)
- A medication-reminder app was reported to increase adherence in adults with ADHD. This is a Creighton conference abstract with sample size and date not visible. — [Creighton](https://researchworks.creighton.edu/esploro/outputs/conferencePoster/Implementation-of-a-Medication-Reminder-App/991006224765602656)

**Independent journalism.** HuffPost (Brittany Wong, 8 Nov 2024), "We have ADHD, these are the apps we swear by". The interviewees are mostly ADHD creators and coaches, so this is expert/creator opinion rather than a poll:
- Notes app (Rach Idowu, *Adulting with ADHD*): "Poor working memory… it's super important for me to write things down"
- How We Feel (timed break reminders)
- Brili (routines: "doesn't allow me to skip around")
- Bearable (symptom tracking)
- Insight Timer
- Pocket (since shut down)
- Feedly
- Mem

No pricing or affiliate disclosure is given. — [HuffPost UK](https://huffingtonpost.co.uk/entry/we-have-adhd-these-are-the-apps-we-swear-by_uk_672dda81e4b01e5999fcc70b)

**No Wirecutter, Verge, Wired or Guardian ADHD-app test was found for 2025–2026.** The search results were dominated by vendor blogs. — [search results incl. toodledo, saner, lifestack](https://blog.toodledo.com/best-task-manager-for-adhd-2026)

### Inferences
- The 2022 ADDitude readers and the 2025–26 Reddit users converge on the same pattern: built-in reminders, calendars, voice assistants and physical tools, with a shared family calendar for households. This consistency across sources and years strengthens the finding.

### Gaps
- No 2024–2026 ADDitude reader survey on apps was found. Whether a newer one exists behind ADDitude's paywall or in its "ADHD Guide to Mobile Apps" product is unknown.
- No peer-reviewed survey ranking the consumer apps adults with ADHD use was found.

## Q3. App store evidence: ratings and recent review themes

### Takeaway
Store ratings are uniformly high (4.3–4.95) and do not separate the apps. Rating counts reflect popularity and marketing reach, not ADHD benefit. **Recent reviews (Sep–Oct 2026) are more informative.** They show:
- frequent paywall and trial complaints for **Tiimo, Structured, Goblin Tools and Todoist**
- comparatively clean, positive recent reviews for **Finch, ScreenZen, TickTick and Focus Friend**

### Cited Findings
**iOS App Store (US).** Average rating and rating count from the iTunes Search/Lookup API, retrieved 2026-10-28:

| App | Rating | Count | Price | Source |
|---|---|---|---|---|
| Finch: Self-Care Pet | 4.95 | 768,791 | Free | [App Store](https://apps.apple.com/us/app/finch-self-care-pet/id1528595748) |
| Structured: Daily Planner | 4.79 | 168,129 | Free | [App Store](https://apps.apple.com/us/app/structured-daily-planner-todo/id1499198946) |
| Google Calendar | 4.53 | 132,495 | Free | [App Store](https://apps.apple.com/us/app/google-calendar-get-organized/id909319292) |
| Todoist | 4.80 | 130,224 | Free | [App Store](https://apps.apple.com/us/app/todoist-to-do-list-calendar/id572688855) |
| Opal | 4.72 | 90,516 | Free | [App Store](https://apps.apple.com/us/app/opal-screen-time-control/id1497465230) |
| ScreenZen | 4.86 | 52,633 | Free | [App Store](https://apps.apple.com/us/app/screenzen-screen-time-control/id1541027222) |
| Forest | 4.80 | 49,572 | Free | [App Store](https://apps.apple.com/us/app/forest-focus-for-productivity/id866450515) |
| TickTick | 4.86 | 46,666 | Free | [App Store](https://apps.apple.com/us/app/ticktick-to-do-list-calendar/id626144601) |
| Google Keep | 4.58 | 29,020 | Free | iTunes lookup id 1029207872 |
| Tiimo | 4.60 | 21,206 | Free download | [App Store](https://apps.apple.com/us/app/tiimo-to-do-list-planner/id1480220328) |
| Focus Friend, by Hank Green | 4.83 | 9,556 | Free | [App Store](https://apps.apple.com/us/app/focus-friend-by-hank-green/id6742278016) |
| Habitica | 4.31 | 3,594 | Free | [App Store](https://apps.apple.com/us/app/habitica-gamified-taskmanager/id994882113) |
| Goblin Tools | 4.76 | 3,044 | **$0.99** | [App Store](https://apps.apple.com/us/app/goblin-tools/id6449003064) |
| Obsidian | 4.48 | 2,795 | Free | [App Store](https://apps.apple.com/us/app/obsidian-connected-notes/id1557175442) |
| Alarmy | 4.76 | 250,447 | Free | [App Store](https://apps.apple.com/us/app/alarmy-loud-alarm-clock/id1163786766) |
| Daylio | 4.77 | 62,258 | Free | [App Store](https://apps.apple.com/us/app/daylio-journal-mood-tracker/id1194023242) |

**Google Play (US).** Scraped from the listing pages 2026-10-28; figures are rating / reviews / installs:

| App | Rating | Reviews | Installs | Source |
|---|---|---|---|---|
| Finch | 4.9 | 635K | 10M+ | [Play](https://play.google.com/store/apps/details?id=com.finch.finch) |
| Google Keep | 4.7 | 2.64M | 1B+ | [Play](https://play.google.com/store/apps/details?id=com.google.android.keep) |
| Google Calendar | 4.6 | 4.91M | 10B+ | [Play](https://play.google.com/store/apps/details?id=com.google.android.calendar) |
| TickTick | 4.6 | 166K | 10M+ | [Play](https://play.google.com/store/apps/details?id=com.ticktick.task) |
| Todoist | 4.6 | 307K | 10M+ | [Play](https://play.google.com/store/apps/details?id=com.todoist) |
| ScreenZen | 4.8 | 35.1K | 1M+ | [Play](https://play.google.com/store/apps/details?id=com.screenzen) |
| Forest | 4.3 | 814K | 10M+ | [Play](https://play.google.com/store/apps/details?id=cc.forestapp) |
| Habitica | 4.6 | 76.1K | 5M+ | [Play](https://play.google.com/store/apps/details?id=com.habitrpg.android.habitica) |
| Obsidian | 4.4 | 19.1K | 5M+ | [Play](https://play.google.com/store/apps/details?id=md.obsidian) |
| Alarmy | 4.7 | 2.18M | 50M+ | [Play](https://play.google.com/store/apps/details?id=droom.sleepIfUCan) |
| Daylio | 4.7 | 464K | 10M+ | [Play](https://play.google.com/store/apps/details?id=net.daylio) |

Tiimo, Structured, Goblin Tools and Focus Friend package ids were not found, so their Play listings were not checked.

**Recent iOS reviews.** These are the 50 most recent US reviews per app from the Apple customer-reviews RSS feed, retrieved 2026-10-28. "Mean" is the mean of those 50, not the overall rating.
- **Finch** (24–26 Oct 2026): mean 4.62, 4 of 50 at two stars or below.
  - Complaints are a refused trial refund and bugs.
  - Positive: "I have ADHD, autism, & anxiety… With Finch I was able to start new habits. I now have an over 400 day streak." — [Apple RSS, Finch](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1528595748/sortby=mostrecent/json)
- **Tiimo** (22 Sep – 26 Oct 2026): mean **3.70**, 14 of 50 low.
  - "you force me into a week trial… that will charge me over $50 bucks if I forget, or I'd have to pay $14 for one m[onth]" (22 Oct 2026).
  - Bug complaints, and an update that removed the completion "confetti" users found motivating. — [Apple RSS, Tiimo](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1480220328/sortby=mostrecent/json)
- **Structured** (Sep–Oct 2026): mean 4.00, 9 of 50 low.
  - "why do I have to pay to have reoccurring task… ITS A DAILY PLANNER" (27 Oct 2026).
  - Also complaints about missing two-way calendar sync. — [Apple RSS, Structured](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1499198946/sortby=mostrecent/json)
- **Goblin Tools** (Jun–Oct 2026): mean **3.58**, 18 of 50 low.
  - "The developer has moved the app to subscription, booting users who paid before" (6 Sep 2026).
  - Pro purchases are not recognised on web.
  - Still: "The only app I've had success with for making and accomplishing to-do lists." — [Apple RSS, Goblin Tools](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6449003064/sortby=mostrecent/json)
  - This conflicts with the iTunes API's "$0.99" price. Verify the current model with the pricing researchers.
- **Todoist** (Aug–Oct 2026): mean 3.88, 12 of 50 low.
  - "even the simple reminders require payment. That is basic functionality" (17 Oct 2026).
  - Positive: "undiagnosed ADHD… I jot everything that pops in my head… I'm not forgetting everything anymore!" — [Apple RSS, Todoist](https://itunes.apple.com/us/rss/customerreviews/page=1/id=572688855/sortby=mostrecent/json)
- **TickTick** (Oct 2026): mean 4.58, 3 of 50 low.
  - Complaints: sluggish animations, and "You must purchase the subscription… including looking at the calendar from week and month view." — [Apple RSS, TickTick](https://itunes.apple.com/us/rss/customerreviews/page=1/id=626144601/sortby=mostrecent/json)
- **ScreenZen** (Oct 2026): mean 4.56, 5 of 50 low.
  - Complaints are a new persistent notification and set-up complexity. Even a critic notes "It's free so there's that." — [Apple RSS, ScreenZen](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1541027222/sortby=mostrecent/json)
- **Focus Friend** (Oct 2026): mean 4.64, 2 of 50 low (both joke reviews).
  - "Whole family of ADHD folks and I love this app!" — [Apple RSS, Focus Friend](https://itunes.apple.com/us/rss/customerreviews/page=1/id=6742278016/sortby=mostrecent/json)
- **Google Keep** (Aug–Oct 2026): recent mean **2.30**, 30 of 50 low. The complaints are about a UI "refresh" (copy/scroll freezing, colour changes), not missing features. — [Apple RSS, Google Keep](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1029207872/sortby=mostrecent/json)
- **Habitica** (Apr–Oct 2026): mean 4.34. Positive: "I have ADHD and find it hard to do tasks, but this app has been a game changer." — [Apple RSS, Habitica](https://itunes.apple.com/us/rss/customerreviews/page=1/id=994882113/sortby=mostrecent/json)

### Inferences
- Headline ratings are near-useless for ranking. Apps prompt for ratings during onboarding; one Tiimo review complains it "asks for a review, before I've gotten any value," and a Todoist review says the same. Prompts like that inflate the averages.
- Recent low-star themes cluster around **paywalled basics**: recurring tasks in Structured, reminders in Todoist, calendar views in TickTick, and a pay-model switch in Goblin Tools.
- For a user who will pay nothing, this means:
  - **Finch, ScreenZen, Focus Friend, Google Calendar/Keep and Apple built-ins** deliver their praised features free.
  - **Todoist, TickTick and Structured free tiers lack** reminders, calendar views or recurring tasks respectively.
  - **Tiimo's** praised features largely sit behind a trial.

### Gaps
- Only the 50 most recent reviews per app were sampled.
- Google Play review text was not analysed.
- Apple Reminders, Calendar, Clock and Notes have no store ratings because they are system apps.
- Llama Life, Inflow, Saner, Due, Opal and Lunatask lookups were rate-limited (HTTP 403) and not collected.

## Q4. YouTube and ADHD creators' recommendations

### Takeaway
I could not verify app recommendations directly from How to ADHD videos. A third-party site claims Jessica McCabe uses Sunsama, Opal and Apple Reminders plus Siri. McCabe's book frames tools as a "menu" rather than endorsing apps. Creators quoted in journalism favour simple tools (the Notes app, mood or symptom trackers).

### Cited Findings
- Toolfinder.com's "Jessica McCabe's 5-App ADHD Stack" (updated Feb 2026) claims she uses:
  - Sunsama for time blindness (paid)
  - Opal for blocking (freemium)
  - Apple Reminders (free) with Siri for hands-free reminders
  - colour-coding

  This is an **unofficial affiliate-style directory** and was not corroborated by her own channel. — [Toolfinder](https://toolfinder.com/stacks/how-to-adhd)
- McCabe's book *How to ADHD* is described as a "menu of tools" from community, experts and research, not an app list. — [publisher listing](https://profilebooks.com/?p=36632)
- Rach Idowu (*Adulting with ADHD*) relies on the default Notes app for working memory. — [HuffPost UK, 8 Nov 2024](https://huffingtonpost.co.uk/entry/we-have-adhd-these-are-the-apps-we-swear-by_uk_672dda81e4b01e5999fcc70b)
- Sydni Rubio (*What in the ADHD?*) uses Bearable for symptom tracking. — [HuffPost UK](https://huffingtonpost.co.uk/entry/we-have-adhd-these-are-the-apps-we-swear-by_uk_672dda81e4b01e5999fcc70b)
- Pina Varnel (*ADHD Alien*) uses How We Feel timed reminders. — [HuffPost UK](https://huffingtonpost.co.uk/entry/we-have-adhd-these-are-the-apps-we-swear-by_uk_672dda81e4b01e5999fcc70b)
- **Hank Green** (YouTube creator; not presented as an ADHD expert) makes Focus Friend. A genuine user ranked it first in a score-242 r/adhdwomen post. — [Reddit 1vow3lc](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/)
- A Reddit user notes they learned Obsidian set-up from YouTube channels (CreaDev Labs, the Notebook Navigator dev). — [Reddit 1vow3lc/p3v3dg6](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3v3dg6/)

### Inferences
- Creator picks are personal and often paid (Sunsama), so they should be weighted as expert or creator opinion, not as evidence of what works for most people.

### Gaps
- YouTube transcripts and descriptions were not accessible through the search tools. No primary How to ADHD video naming apps was verified.

## Q5. The "nothing works / I abandon every app" pattern: what people keep using long-term, and why

### Takeaway
App abandonment is the dominant theme. The named causes are:
- streak-reset shame
- backlog guilt
- the app becoming "another thing to manage"
- notification blindness

The tools people report keeping for years are free and low-friction:
- phone alarms, renamed to the task
- Siri or Apple Reminders
- Google Calendar with everything recurring
- pen and paper or a whiteboard capped at about 3 tasks
- sticky notes in the line of sight
- one notes app

### Cited Findings
**Streak shame.**
- Top comment, score **176**: "The streak thing is brutal for ADHD brains 💀 I've deleted so many apps after breaking a 30+ day streak… Way more motivating when apps show you did something 80% of the time." r/ADHD, 2026-04-03. — [Reddit 1sb7u5c/oe1ck9y](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1ck9y/)
- Workaround: set daily habits to "6 days a week so if I fail one day, it doesn't kill the streak." Score 15. — [Reddit 1sb7u5c/oe1mlgf](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1mlgf/)
- A homemade paper "loyalty card" rewards showing up at any time. Score 13. — [Reddit 1sb7u5c/oe1mpi5](https://www.reddit.com/r/ADHD/comments/1sb7u5c/comment/oe1mpi5/)

**Backlog guilt (OP of a quit-every-to-do-app thread).** "I've installed Things, Todoist, Apple Reminders, Notion, Clear… and abandoned every one within a few weeks… the list turns into something I avoid opening because it just makes me feel behind." r/productivity, 2026-07-14. — [Reddit 1uwa0cs](https://www.reddit.com/r/productivity/comments/1uwa0cs/)
- The top answer, score 15: "Physical pen and paper is the way to go." — [Reddit 1uwa0cs/oxhbi67](https://www.reddit.com/r/productivity/comments/1uwa0cs/comment/oxhbi67/)
- Why paper: "writing a task down by hand makes it feel more intentional… physically cross it off… tangible sense of progress." — [Reddit 1uwa0cs/oxhs8om](https://www.reddit.com/r/productivity/comments/1uwa0cs/comment/oxhs8om/)

**"The app becomes a chore."**
- "the last thing I'm going to do is consistently open up and use an app. Just using an app becomes a chore in itself… physically jotting things down on sticky notes and then sticking them right under my monitor does the heaviest lifting." Score 54, r/ADHD_Programmers, 2025-08-04. — [Reddit 1mhh5lh/n6wk16n](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/comment/n6wk16n/)
- Counterpoint: "those sticky notes become invisible after a day or two 🤣 It's cellphone alarms for me that work." Score 10. — [Reddit 1mhh5lh/n7086ni](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/comment/n7086ni/)
- "I set everything up, use it for maybe a week, and then completely forget it exists, the app just becomes another thing I have to manage." OP, r/ADHDers, 2026-02-11. — [Reddit 1r1zjk9](https://www.reddit.com/r/ADHDers/comments/1r1zjk9/)

**Notification blindness, and alarms as the fallback.**
- OP (post score 492): "I've tried sooooo many task management apps and planners and literally ignore every notification." r/ADHDers, 2025-10-27. — [Reddit 1oh5es3](https://www.reddit.com/r/ADHDers/comments/1oh5es3/)
- "I have started using my actual alarm and renaming it to whatever it is I need to remember… It doesn't work well if the alarm goes off to remind you to pay the electric bill while you're sitting in the doctor's office." Score 13. — [Reddit 1oh5es3/nllr1tn](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllr1tn/)
- The limit of alarms: "set 10 alarms a day… made me feel like a hostage in my own house" (score 12), and "I end up with like 20 alarms a day" (score 9). — [Reddit 1oh5es3/nllqnk2](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllqnk2/); [Reddit 1oh5es3/nllpobx](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nllpobx/)
- "alarms punch through, which I realize I need." 2026-05-31. — [Reddit 1tsx1ru/oozryek](https://www.reddit.com/r/adhdmeme/comments/1tsx1ru/comment/oozryek/)
  - This commenter is building their own app, so their framing is not neutral, but the observation about alarms matches many other comments.

**Simple calendar and routine.**
- "For me, routines and a calendar have been a godsend." Score 54, r/adhdmeme (post score 7,582), 2026-05-31. — [Reddit 1tsx1ru/ooye4m8](https://www.reddit.com/r/adhdmeme/comments/1tsx1ru/comment/ooye4m8/)
- "The only thing that worked for me was a visual calendar. That I wrote in manually. Typing something does not lock in my brain as much." Score 14. — [Reddit 1tsx1ru/ooybacv](https://www.reddit.com/r/adhdmeme/comments/1tsx1ru/comment/ooybacv/)

**Minimal whiteboard.** "A dry erase board with no more than 3 tasks on it, a body doubling video… and medication has been most effective… less complicated the better." Score 11, r/ADHDers, 2025-07-11. — [Reddit 1lwzjb8/n2j0yet](https://www.reddit.com/r/ADHDers/comments/1lwzjb8/comment/n2j0yet/)

**Consolidation.** "calendar for anything with a time, one notes app for everything else, and a paper pad on the desk… that i clear out at night." r/productivity, 2026-08-08. — [Reddit 1virt35/p2jhu11](https://www.reddit.com/r/productivity/comments/1virt35/comment/p2jhu11/)

**Long-term retention claims.**
- Raindrop free version "for like 3 years".
- The "Tasks" reminders app "saved my forgetful ass daily for many years". — [Reddit 1vow3lc/p3vk6p2](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3vk6p2/)
- Daylio "since 2019… 2766 day streak". — [Reddit 1v9l8bt/p0g3yxy](https://www.reddit.com/r/productivity/comments/1v9l8bt/comment/p0g3yxy/)
- Google Calendar "for years". — [Reddit 1uka63k/ouuko8p](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouuko8p/)

**Non-app hacks with high upvotes.**
- Playlists of "6 minutes songs" to make starting a chore finite. Score **75**, the highest in the r/adhdwomen app thread, 2026-08-15. — [Reddit 1vow3lc/p3t2lhr](https://www.reddit.com/r/adhdwomen/comments/1vow3lc/comment/p3t2lhr/)
- Physically throwing the phone onto the couch. Score 12. — [Reddit 1wzwt0w/pefibl7](https://www.reddit.com/r/ADHD/comments/1wzwt0w/comment/pefibl7/)

**The desired-but-missing tool.** "If only there was app that would call me like a personal assistant would." Post score 492. Commenters suggest Alexa routines as a stand-in. — [Reddit 1oh5es3/nlm8g2t](https://www.reddit.com/r/ADHDers/comments/1oh5es3/comment/nlm8g2t/)

### Inferences
- What survives long-term is the tool that (a) is already open or on screen, (b) interrupts at the right moment, and (c) never punishes a missed day.
- Users who succeed often pair a **time-based interrupter** (alarm or calendar notification) with a **single dumping ground** (one notes or list app, or paper).
- Elaborate systems (Notion, Obsidian, multi-app stacks) are praised by a minority who enjoy configuring them. Others report the configuration itself as procrastination; see the r/ADHD_Programmers "Please STOP building your ADHD App" thread (score 432, top reply 221: "Can you build me an app that stops me building apps please"). — [Reddit 1mhh5lh](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/)

### Gaps
- No quantitative retention data, such as 30/90-day retention by app, was found from any independent source.

## Q6. Bias detection: vendor, affiliate and SEO "best ADHD apps" content

### Takeaway
Search results for "best ADHD apps" in 2025–2026 are dominated by **vendor blogs that rank their own product first**:
- Saner.ai, which runs multiple near-duplicate lists
- Focus Bear
- Toodledo
- Lifestack
- Habi
- Tiimo's resource hub
- AI-generated or SEO pages (pages.dev sites, internxt and building.co.uk tag-spam pages)

Astroturfing also appears inside Reddit itself. These sources inflate ADHD-branded paid planners that genuine users rarely mention, and they should be weighted low.

### Cited Findings
**Saner.ai "ADHD Apps: We tested 44 Apps and Here're the Best 9 in 2026"** (21 Jun 2026).
- The list ranks **Saner.AI #1**, then Obsidian, Todoist, Sunsama, Finch, Goblin.tools, Forest, Headspace and Tiimo.
- It discloses "I work at Saner.ai." It gives criteria but no described testing method. — [Saner blog](https://blog.saner.ai/best-adhd-apps/)
- Saner also publishes "best ADHD planners", "best Tiimo alternatives", "best Inflow alternatives" and "ADHD Reminder Apps: We tested 20", each with Saner first. — [Saner planners](https://saner.ai/blogs/best-adhd-planners); [Saner Tiimo alternatives](https://www.saner.ai/blogs/best-tiimo-alternatives); [Saner reminders](https://blog.saner.ai/best-adhd-reminder-apps/)

**Focus Bear** posts present Focus Bear as the top choice ("built from the ground up with neurodivergent users in mind"). — [Focus Bear blog](https://www.focusbear.io/blog-post/5-game-changing-adhd-time-management-tools-you-cant-miss); [Focus Bear 2024 list](https://focusbear.io/blog-post/best-10-adhd-apps-for-enhancing-focus-and-productivity-in-2024)

**Toodledo's "Best Task Manager for ADHD (2026)"** lists Toodledo among its top three, with Todoist and TickTick. — [Toodledo blog](https://blog.toodledo.com/best-task-manager-for-adhd-2026)

**Other vendor and SEO pages.**
- Tiimo publishes its own "top ADHD apps 2025" hub. — [Tiimo](https://tiimoapp.com/resource-hub/best-adhd-apps-2025)
- Lifestack (an AI calendar vendor) publishes ADHD focus-app lists. — [Lifestack](https://lifestack.ai/blog/adhd-apps-for-focus)
- Habi publishes "Best ADHD Planner Apps in 2026 (Tested and Compared)". — [Habi](https://habi.app/insights/best-adhd-planner-apps/)
- Carly publishes "Best Apps for ADHD Adults (2026): 12 That Help". — [usecarly](https://www.usecarly.com/blog/tags/neurodivergent-tools/)
- AFFiNE (a notes vendor) publishes "best free ADHD app for knowledge management". — [AFFiNE](https://affine.pro/blog/best-free-adhd-app-for-knowledge-management)

**Affiliate or unverifiable directories.**
- Toolfinder's "McCabe stack" is an unofficial directory. — [Toolfinder](https://toolfinder.com/stacks/how-to-adhd)
- Anonymous pages.dev sites ("adhd-productivity.pages.dev" naming Tiimo the "best starting point"; "vertexlabsolutions.pages.dev") — [adhd-productivity.pages.dev](https://adhd-productivity.pages.dev/blog/best-habit-tracker-apps-adhd-2026); [vertexlabsolutions](https://vertexlabsolutions.pages.dev/blog/best-adhd-apps-2026.html)
- Spammy tag pages on unrelated domains (community.internxt.com, i.building.co.uk, legacy.visitoverlandpark.com) titled "Best Apps for ADHD Adults". — [internxt tag page](https://community.internxt.com/tag/adhd-apps/); [building.co.uk](https://i.building.co.uk/?p=97406)
- Even ADDitude discloses Amazon affiliate commissions on its reader-recommendation list. — [ADDitude](https://www.additudemag.com/adhd-productivity-apps/)

**Astroturf inside Reddit.**
- The r/ADHD post "I finally figured out why I keep quitting every habit app" (score 138) ends with the OP saying they "actually started building something around" the problem. A relatable post is used as a launch vector. — [Reddit 1sb7u5c](https://www.reddit.com/r/ADHD/comments/1sb7u5c/)
- In r/ADHD's "Actually Good Apps" thread, a commenter pitches their own "SnakeStreak" with "free Lifetime Pro" for pre-registration (score 10). — [Reddit 1uka63k/ouv4c7a](https://www.reddit.com/r/ADHD/comments/1uka63k/comment/ouv4c7a/)
- A self-disclosed developer pitches an Android life-management app. — [Reddit 1tsx1ru/p1g2q89](https://www.reddit.com/r/adhdmeme/comments/1tsx1ru/comment/p1g2q89/)
- Many of the largest r/ADHD_Programmers "app" threads are dev launches. One example: "I'm a solo dev and I think I accidentally made a good app for ADHD brains" (917 comments, 2025-07-22). — [Reddit 1m69q6e](https://www.reddit.com/r/ADHD_Programmers/comments/1m69q6e/)
- Reddit users themselves complain about this ("Please STOP building your ADHD App", score 432). — [Reddit 1mhh5lh](https://www.reddit.com/r/ADHD_Programmers/comments/1mhh5lh/)
- A Reddit post claims that saying "your app helps manage ADHD symptoms" can get developer accounts blocked (r/ADHD_Programmers, 2026-07-20, score 175). This is unverified and I did not read it in detail. — [Reddit 1v21kh5](https://www.reddit.com/r/ADHD_Programmers/comments/1v21kh5/)

**Possible seeded recommendation.** "Yoodoo: ADHD daily planner is a good one..I mean it has ADHD in the title :)" (r/ADHDers, 2025-07-12) is followed in another thread by "haven't heard of Yoodoo actually. gonna check it out, thanks" (2026-02-11). — [Reddit 1lwzjb8/n2r1ovn](https://www.reddit.com/r/ADHDers/comments/1lwzjb8/comment/n2r1ovn/); [Reddit 1r1zjk9/o4zydj4](https://www.reddit.com/r/ADHDers/comments/1r1zjk9/comment/o4zydj4/)
- This is an inference, not proven. Weight such comments low.

**Store-rating inflation.** Tiimo's onboarding asks for a review "before I've gotten any value" (review 22 Oct 2026), and a Todoist review says the same. — [Apple RSS, Tiimo](https://itunes.apple.com/us/rss/customerreviews/page=1/id=1480220328/sortby=mostrecent/json); [Apple RSS, Todoist](https://itunes.apple.com/us/rss/customerreviews/page=1/id=572688855/sortby=mostrecent/json)

### Inferences
**How vendor content distorts rankings.**
1. Self-ranking at #1, sometimes disclosed only in body text.
2. "We tested N apps" headlines with no described method.
3. Over-representation of paid ADHD-branded planners. Tiimo, Llama Life, Inflow, Saner, Focus Bear and Sunsama dominate the listicles but have about 0–6 organic mentions in 1,055 Reddit comments.
4. Omission of free built-ins (Apple Reminders, Clock alarms, Google Calendar). Vendors cannot monetise these, yet genuine users credit them most.
5. Affiliate incentives favour subscriptions.

**Weighting rule for the report writer.**
- Genuine-user Reddit comments and recent store reviews: high.
- 2022 ADDitude reader picks: medium-high, but dated.
- Creator and journalist picks: medium.
- Vendor, affiliate and SEO listicles: low. Use them only to identify candidate apps, never to rank.

### Gaps
- getinflow and Llama Life blog rankings were not retrieved directly. A search snippet says Saner's lists rank Llama Life lower (e.g. "best for focus sessions and timeboxing"). Whether Llama Life's own blog ranks itself first was not verified.
- Affiliate relationships of toolfinder.com and the pages.dev sites could not be confirmed. They are classed as low-trust based on anonymity and structure.
