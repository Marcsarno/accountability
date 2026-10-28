# ADHD moment-to-moment: what Marc experiences at a reminder and at the start of a task, and how the system should respond

Scope note. These notes go deeper than `/home/user/reports/ADHD task starting apps.md` and `Why top ADHD apps work.md`. Findings already established there (Fuermaier d = 1.60 planning vs d = 0.03 recall; Nordby reminder trial; Gollwitzer & Sheeran d = 0.65; Stawarz habit cues; habituation to identical alerts; Duolingo template variation) are cited again only where they back a state-level rule. Evidence labels used throughout:
- **[E]** peer-reviewed empirical evidence (sample and design noted)
- **[E-adj]** empirical, but from an adjacent population (children, students, general adults, HCI lab)
- **[P]** practitioner or clinician opinion (books, coaches, clinical blogs)
- **[U]** first-person user reports (Reddit etc.), unverified
No paid tools or other apps are recommended. Everything is framed as behaviour of Sarno's own feature.

## 1. Time blindness and transitions: noticing time pass and switching tasks

### Takeaway
Time-based remembering is where adults with ADHD measurably fail, while event-based remembering is roughly intact. Barkley's prescription is to put cues at the point of performance and make time physical. So the system should do two things. It should turn "at 15:00" into "when X happens / X minutes until the kids' pickup" wherever possible. And it should show time as a visible quantity (time left until the next fixed family event), not as a bare clock time.

### Cited Findings
- **[E]** In the only study that tested both cue types in the same adults with ADHD (25 ADHD vs 25 matched controls, computerised Dresden Breakfast Task), "groups did not differ on event-based prospective memory", but adults with ADHD showed "a large-sized impairment in time-based prospective memory". The abstract gives no numeric effect size. — [Altgassen, Kretschmer & Kliegel 2014, J Atten Disord 18(7):617–624](https://archive-ouverte.unige.ch/unige:98251)
- **[E] (conflicting)** A later study by the same group (18 ADHD vs 18 controls, word-categorisation task) found reduced *event-based* prospective memory in ADHD across both inhibitory-load conditions. So event-based cues are better, not immune. — [Altgassen, Koch & Kliegel 2019 (Mainz bibliography)](https://bibliographie.ub.uni-mainz.de/en/catalog/publication-148568)
- **[E]** Fuermaier et al. (45 unmedicated adults with ADHD vs 45 controls) located the large deficit in *planning* the intention (d = 1.60), not in recalling it (d = 0.03). They note that few PM studies in ADHD exist and most are on children. — [Fuermaier et al. 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3590133/)
- **[E]** A meta-analysis of 55 studies (all ages, search to Sept 2020) found "a broad range of timing deficits in persons with ADHD", including time-reproduction deficits linked to attentional factors (slower counting at short intervals) and motivational factors (faster counting at long intervals). — [Marx et al. 2022 meta-analysis, Southampton eprint](https://eprints.soton.ac.uk/456003)
- **[E]** An adult-only narrative review (about 2012–2022) is mixed: "some studies demonstrated a distinct deficit in time estimation, time reproduction and time management, while others could not show a clear association". Methods varied between studies. — [Mette 2023, Time Perception in Adult ADHD review](https://pmc.ncbi.nlm.nih.gov/articles/PMC9962130/)
- **[P]** Barkley: "you and other adults with ADHD are blind to time–or at least myopic"; "ADHD makes you concentrate mainly on the moment". Treatments help most when "they assist you in doing what you know at the point of performance", meaning the closer an aid is to the place and moment of the behaviour, the better. Concrete advice: "Use kitchen timers, clocks, computers, calendars" to divide time and signal when a block ends; "Break down any task that includes large time gaps into smaller chunks spaced more closely together"; "Make the rules into physical lists" posted where the behaviour occurs. — [Barkley, "Nearsighted to the Future" (clinic blog under his name, 2010)](https://neuropsychologyclinicadhdlab.blogspot.com/2010/09/nearsighted-to-future.html)
- **[P]** Barkley's framing is commonly summarised as "ADHD is not a problem of knowing what to do; it is a problem of doing what you know", attributed to *Taking Charge of Adult ADHD* (2010). Found only in a secondary summary, not verified in the book. — [Tuckman/Barkley paraphrase page](https://caper-bear-lyae.squarespace.com/blog/zlcg1dai3kpi5bd5xvahrhdfb05k6n)
- **[P] (critique)** Critics argue the point-of-performance framework is hard to falsify and may overstate how futile internal strategies are. CBT helps some adults, especially with medication. — [secondary summary of Barkley model](https://austin-wiki.pages.dev/concepts/boole-learn-barkley-adhd/)
- **[P]** Tuckman (podcast summary): "Include contextual details in your reminders. Put the address, building name, or even office location in the event title." — [Hacking Your ADHD episode with Tuckman](https://podbay.fm/p/hacking-your-adhd/e/1751274000)
- **[P/blog]** Several blogs warn that a ticking timer triggers *time anxiety* rather than time awareness in some ADHD brains. — [Super Productivity blog: why timers fail](https://super-productivity.com/blog/adhd-time-blindness-strategies/)

### Inferences
- **State "time is passing unnoticed" (before the task's time).** Marc cannot feel the approach of 15:00. A single alert at 15:00 is a time-based PM test, which is his weakest kind. The system should convert it into an event-style cue where the family calendar allows. Wording like "Before you leave for pickup (3:20)…" or "Kids are with Mum tonight: after dinner is free" anchors the task to an event he already tracks, rather than an abstract clock time.
- **Visible time should be relative to the next fixed family event, not to the clock.** On the Now screen, show "42 min until you leave for pickup" rather than "14:38". This is the externalised, physical form of time Barkley recommends, applied to the one deadline that cannot move. It also tells Marc how big a first step fits.
- **Transitions need a warning *and* a landing.** A pre-warning ("in 10 min: …") should be a soft, single, non-nagging notice. The real push comes at the time. Do not countdown-nag (anxiety risk). The evidence base for a specific lead time is absent (see Gaps), so make it a default of about 10 min and adjust it from what Marc does.
- **Planning is where to invest.** Fuermaier and Barkley converge: the push has to deliver a plan already made (when, where, first step). The moment of capture (adding the task) is where Sarno should ask "when" and "what's the first move", so the reminder moment asks nothing new.

### Gaps
- No peer-reviewed study found on the *optimal lead time* for transition warnings in adults with ADHD. The "10 minutes, not 5" advice appears only in blogs, with no traceable source.
- No adult-only meta-analytic effect size for time perception. The Altgassen 2014 numeric effect size is paywalled.
- No primary Barkley text was read directly. The quotes come from a clinic blog that presents the text under his name without naming the book.

## 2. Task initiation: wall of awful, task aversion, first-step size and wording

### Takeaway
Starting fails mostly on emotion (aversion built up from past failures), not on knowledge. The working clinical rule is Solanto's "If you're having trouble getting started, then the first step is too big." The first step should be physical, immediate, and doable in about 2 minutes where Marc is. Breaking down should happen once, at capture or on demand, and only for the step he is stuck on.

### Cited Findings
- **[P]** Brendan Mahan's "Wall of Awful" (coined around 2016) describes an emotional barrier in front of a task. Each "brick" is a past failure, criticism, rejection or moment of shame tied to that task. It is distinct from lack of ability, and inaction is often mislabelled as laziness. Mahan suggests two moves: feel the emotion and start anyway, or change your state so the wall is lower. This is a coaching model, not tested research. — [Life Skills Advocate summary](https://lifeskillsadvocate.com/blog/wall-of-awful/); [Hachette: Overcoming the Wall of Awful Workbook](https://www.hachettebookgroup.com/titles/brendan-mahan-med-ms/overcoming-the-wall-of-awful-workbook/9781538786901/); [Attention Different podcast with Mahan](https://www.buzzsprout.com/2387896/episodes/19498045-the-wall-of-awful-that-affects-adhd-brains-w-brendan-mahan)
- **[P, from an RCT-tested program]** Solanto's CBT program (12 group sessions on time management, organisation and project management, which also addresses "psychological defense mechanisms" used for short-term relief) uses mantras including "If it's not in the planner, it doesn't exist" and "If you're having trouble getting started, then the first step is too big." — [ADDitude review of Solanto's CBT for Adult ADHD](https://www.additudemag.com/cognitive-behavioral-therapy-for-adult-adhd/)
- **[E]** The program those mantras come from beat supportive therapy in an 88-adult RCT (odds ratio for response 5.41, 95% CI 1.77–16.55). The mantra itself was not tested in isolation. — [Solanto et al. 2010, Am J Psychiatry](https://psychiatryonline.org/doi/abs/10.1176/appi.ajp.2009.09081123)
- **[P]** Barkley: break any task with large time gaps into smaller chunks spaced closer together, and give "a small reward for completing each hour or half-hour of sustained work". — [Barkley clinic blog](https://neuropsychologyclinicadhdlab.blogspot.com/2010/09/nearsighted-to-future.html)
- **[E]** Adults and children with ADHD discount delayed rewards more steeply (meta-analysis, N = 3,913), which supports immediate reward for starting. — [Jackson & MacKillop 2016](https://www.pubmed.gov/27722208/) (from earlier report)
- **[E-adj]** Goblin Tools' higher "spiciness" levels produce 12–42 steps, which users report as overwhelming. The default produces about 7. — [goblin.tools/ToDo, via earlier report](https://goblin.tools/ToDo)
- **[P]** ABC-style daily planning (master list, then a daily list drawn from A/B priorities and the calendar's fixed commitments) is recommended for ADHD adults. Breakdown is advised when a step can't be done in a day. — [ADDitude, to-do lists that work (Kolberg approach)](https://www.additudemag.com/adhd-time-management-tools-make-to-do-lists-work-for-you/)

### Inferences
- **State "push lands, task feels awful" (wall of awful).** The system response is to lower the wall, not to argue with it. Show only the first physical step ("Get the envelope out of the drawer"), never the task's full scope. Offer "Make it smaller" as a first-class, one-tap option next to Done and Snooze. Choosing it is a legitimate decision and should never be treated as a failure.
- **First-step rules (spec):** (1) a verb plus a concrete object he can touch or open; (2) doable where he is, in about 2 minutes; (3) no decisions inside the step ("open the council email", not "decide about the council"); (4) completion is visible ("tab open", "bag by the door").
- **Breakdown helps up to the first step and becomes procrastination after that.** Only break down the step Marc is stuck on, one level at a time, and return to a single step on screen. Never expand the whole plan into a checklist at reminder time. Planning as avoidance is a known pattern (see Solanto's "defense mechanisms"), so cap it: after "make it smaller", the screen shows the new step plus Start, not an editor.
- **Reward the start, not the finish.** Given steep delay discounting, "Done" on the *first step* should feel complete in itself ("That's the hard part. Keep going, or stop here?"). Stopping after the first step must be allowed without the task looking failed.
- **Words matter at the wall.** Avoid "overdue", "you still haven't", or task-scope language. Copy should name the step, the time context and an exit: "Just the first bit: open the council email. 25 min till pickup."

### Gaps
- No peer-reviewed study was found that directly measures the "wall of awful" or compares step sizes for initiation in adult ADHD. Step-size guidance is practitioner consensus.
- Remaining Solanto mantras were not retrieved (the book was not accessible).

## 3. Interruptions and hyperfocus: reminder landing while absorbed, driving, with kids, in a meeting; dismiss-and-forget

### Takeaway
For many ADHD users a swiped notification "basically never existed". Every push must therefore be a promise to come back, not a single event, and dismissal must not count as a decision. Delivery should prefer natural breakpoints (between family events, after transitions), because interruptions at task boundaries cost less. Driving and active childcare are *defer* states: no nag ladder there. Instead, a guaranteed re-delivery should come at the next breakpoint.

### Cited Findings
- **[U]** r/ADHD thread "Do visible external reminders work better than phone reminders?": "if i can swipe it away once, it basically never existed"; "I start subconsciously ignoring repetitive phone reminders after a while". Reminders work only with "a second step that does not rely on me opening the app again", plus "some kind of later check-in". — [r/ADHD snapshot, 2026](https://reddit.sentinel-team.org/posts/1twhie6/snapshots/2026-06-05T21%3A20%3A56.551596Z)
- **[U]** On iPhone, a dismissed Reminders alert without a snooze never fires again ("Reminders will never notify me about it again, so it'll be lost"). — [marco.org, Aug 2026](https://marco.org/2026/08/)
- **[E]** Hyperfocus is a measurable trait in adults. People with higher ADHD symptoms report hyperfocus more often across school, hobbies and screen time (Adult Hyperfocus Questionnaire). The dispositional AHQ-D (347 adults) correlated r = 0.53 with ADHD ratings. Its mechanisms are unknown, and it is not in DSM-5. — [Hupfeld, Abagis & Shah 2019 (PDF)](https://www.adhspedia.de/Downloads/studien/Hupfeld_et_al-2018-ADHD_Attention_Deficit_and_Hyperactivity_Disorders.pdf); [Hupfeld et al. 2024, Scientific Reports (AHQ-D)](https://doaj.org/article/4fafdcea90614363aedc3cc0d95cf462)
- **[E-adj]** Interruption cost depends on *when* within a task it lands. Delivering notifications at task breakpoints reduces resumption lag, frustration and errors, and coarser breakpoints cost less. The relevance of the content should decide which breakpoint type to wait for. This is HCI lab and field work in general adults, not ADHD-specific. — [Iqbal & Bailey, CHI 2008](https://www.interruptions.net/literature/Iqbal-CHI08.pdf); [Iqbal & Bailey CHI 2006](https://interruptions.net/literature/Iqbal-CHI06-p741-iqbal.pdf)
- **[E-adj]** Identical warnings habituate quickly, and acceptance of a clinical reminder fell about 30% with each additional reminder in one encounter. — [Ancker et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/); [BYU/MISQ habituation](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications) (from earlier report)
- **[E]** In 109 adults with ADHD, SMS reminders sped up return but did not raise completion. — [Nordby et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9149073/) (from earlier report)
- **Platform fact:** With iPhone Driving Focus, "text messages and other notifications will be silenced or limited". It can turn on automatically from detected motion, car Bluetooth or CarPlay. Allowed notifications can be set per *person*. The page documents no app exceptions, and it says nothing about what happens to held notifications after driving ends. — [Apple Support: Driving Focus](https://support.apple.com/en-au/HT208090)
- **[U]** Users report that when Driving Focus switches off, previously hidden notifications pop up in a batch (anecdotal, iOS 18.5). — [Apple Discussions thread](https://discussions.apple.com/thread/255945559)

### Inferences
- **Dismiss-and-forget is the core failure, so make the server the memory.** A push that is swiped, or tapped without a decision, leaves the item *pending*. The server re-sends with new wording until Done, Snooze-to-a-time, Smaller or Drop. This is consistent with the earlier report's rule that "swiping the notification away does not count as dealing with it".
- **State: hyperfocused on something else.** The push is a breakpoint he did not choose. The cost of switching is high and the risk of "swipe and continue" is highest. Response: the first push should name the *time cost of not switching* in calendar terms ("Pickup in 35 min, the bins first takes 2"). The follow-up should come after a medium gap (not 1–2 min), and its wording must change. If the task is not time-critical, offer "after this" as a snooze ("when I surface: in 45 min"). Because hyperfocus is unpredictable and unmeasured, the system cannot detect it, so a short "Later today" option has to cost exactly one tap.
- **State: driving.** Delivery is likely silenced by Driving Focus anyway, and nagging a driver is unsafe. Spec: if the family calendar shows a drive (pickup, drop-off, travel to an activity), do not schedule task pushes inside that window. Re-deliver at the *arrival or after-drop-off breakpoint*. Never count a push sent during a drive window as an "attempt" in the ladder.
- **State: with the kids (active parenting).** Treat solo-parenting blocks (dinner, bath, bedtime when kids are at his house) as low-capacity. Only fire tasks tagged as fitting there, or ones that must happen there (school forms, kid admin). Defer the rest to the post-bedtime or kid-free windows.
- **State: in a meeting.** Use calendar events as "do not deliver" windows. Deliver at the meeting's end (a coarse breakpoint, which is the cheapest per Iqbal & Bailey).
- **After a dismissal, re-entry has to be cheap.** The next push should not repeat itself. It should restate the first step and the time context. The badge stays as a persistent, visible trace (Barkley's "physical" reminder) until a decision is made.

### Gaps
- No study was found on hyperfocus *interruption* (how adults with ADHD respond to an alert during hyperfocus). An unpublished Michigan thesis tested task-switching in hyperfocus, but it was not retrieved. — [Tran thesis (Deep Blue)](https://deepblue.lib.umich.edu/bitstream/handle/2027.42/169422/quynht.pdf?sequence=1)
- Apple does not document whether web-push notifications held by Driving Focus are delivered afterwards. Only anecdotal reports exist.
- No ADHD-specific data was found on the optimal nag interval. Breakpoint research is in general adults.

## 4. Prospective memory: event vs time cues, implementation intentions, location/event cues

### Takeaway
Event cues beat time cues for adults with ADHD (one adult study, one partial contradiction). If-then plans have good general-population evidence and child-ADHD lab evidence, but **no adult ADHD randomised trial was found**. The practical rule is to attach tasks to Marc's existing family events ("when I get back from drop-off, I …"). Cues tied to existing routines build automaticity, while bare reminders build reliance.

### Cited Findings
- **[E]** Event-based PM spared, time-based PM impaired (large) in adults with ADHD. — [Altgassen et al. 2014](https://archive-ouverte.unige.ch/unige:98251)
- **[E]** Event-based PM can also be reduced in adults with ADHD under some task demands (n = 18 per group). — [Altgassen et al. 2019](https://bibliographie.ub.uni-mainz.de/en/catalog/publication-148568)
- **[E-adj]** Implementation intentions ("if situation X, then I do Y") have a medium-to-large effect on goal attainment in general populations (d = 0.65 across 94 tests). — [Gollwitzer & Sheeran 2006](https://kops.uni-konstanz.de/entities/publication/2e749bfb-8533-437c-8203-7e788c910c5f) (from earlier report)
- **[E-adj]** In children with ADHD, if-then plans reduced perseverative errors on a set-shifting task and helped with maths problems that needed working memory plus inhibition of distraction. — [Gawrilow, Gollwitzer & Oettingen 2011](https://www.socmot.uni-konstanz.de/sites/default/files/Gawrilow_Gollwitzer_Oettingen_Executive_Function_JSCP_2011.pdf)
- **[P]** A clinician research blog (APSARD) notes that implementation intentions "are not yet studied in adults with ADHD". The only adult data it cites is an uncontrolled open study of CBT without medication. — [APSARD research update](https://apsard.org/?p=4314)
- **[E-adj]** A 2014 RCT in adults with autism found tentative, modest benefits of implementation intentions on prospective memory. This is the nearest adult neurodevelopmental analogue. — [behaviorist book club summary](https://behavioristbookclub.com/aba-research/autism-developmental/prospective-memory-in-adults-with-high-functioning-autism-spectrum-dis/)
- **[E-adj]** In a habit study, reminders "supported repetition but hindered habit development", while cues tied to an existing routine "led to increased automaticity". — [Stawarz, Cox & Blandford, CHI 2015](https://discovery.ucl.ac.uk/id/eprint/1468224/) (from earlier report)

### Inferences
- **Capture spec:** when Marc adds a task, offer anchors drawn from his family calendar first ("after school drop-off Thu", "after kids' bedtime tonight", "when you get home from pickup") and clock times second. Phrase the stored plan as an if-then: "After drop-off → open the council email." Every reminder then delivers *his own plan*, which recall data suggests he can carry out once cued.
- **Firing spec for event anchors:** the PWA cannot sense location or arrival in the background. "After drop-off" must therefore become a computed time (calendar drop-off end + a buffer of about 10 min, an assumption), with wording that names the event ("Back from drop-off? First bit: …"). If the drop-off event moves, the task moves with it.
- **Repeated anchors build habit; repeated alarms don't.** For recurring tasks (bins, meds, forms), anchor to a recurring family event, so the routine itself becomes the cue over time and the push is scaffolding.

### Gaps
- No RCT of implementation intentions in adults with ADHD was found (searched; the clinician source confirms none as of its writing).
- No study was found on location- or arrival-triggered reminders in ADHD adults.

## 5. Using family schedule context: kids at his house vs the other house, pickups, after bedtime

### Takeaway
There is no research on scheduling *tasks* around co-parenting rotations for parents with ADHD. There is good evidence that a parent's own ADHD symptoms are the strongest predictor of parenting stress, more than the child's. So kid-days are high-load, low-capacity days. The system should plan most tasks for kid-free windows and post-bedtime slots, keep kid-days to the essentials, avoid pushes in drive and pickup windows, and use transitions (after drop-off, after handover) as cues.

### Cited Findings
- **[E]** "Parental ADHD symptoms have been reported to be the strongest predictor of parenting stress", even after controlling for the child's ADHD symptoms and oppositionality. High maternal ADHD symptoms undermine behavioural parent training. — [Frontiers in Psychiatry 2023 review](https://www.frontiersin.org/journals/psychiatry/articles/10.3389/fpsyt.2023.1321078/pdf)
- **[E] (dissertation)** Parent ADHD traits, not the child's, were associated with parenting stress. Parent executive functioning was linked to family dysfunction; child executive functioning was not. — [University of Waterloo dissertation](https://uwspace.uwaterloo.ca/items/a285cd59-a584-46f1-b571-7f7fa740c839)
- **[E]** Among 107 mothers and adolescents with ADHD, parenting stress mediated the link between ADHD-related difficulties and poorer parenting. — [J Child Fam Stud 2022](https://mijn.bsl.nl/parenting-adolescents-with-adhd-maternal-and-adolescent-contribu/20012254)
- **[P]** ADDitude's routines guidance for families: keep routines "as simple as possible", since elaborate routines get tossed after a few weeks. Starting and stopping routines leaves people "uncertain and forgetful". — [ADDitude slideshow on routines](https://www.additudemag.com/slideshows/behold-the-magic-of-a-consistent-routine/); [ADDitude daily habits](https://www.additudemag.com/the-daily-habits-of-organized-kids/)
- **[E-adj]** Interruptions at coarse breakpoints (between activities) cost least. — [Iqbal & Bailey CHI 2008](https://www.interruptions.net/literature/Iqbal-CHI08.pdf)
- **Platform fact:** Driving Focus silences notifications and can auto-activate on motion or car Bluetooth. — [Apple Support](https://support.apple.com/en-au/HT208090)

### Inferences
- **Day types (spec):** derive each day's type from the family calendar. **Kid-free day**: the normal task budget, any time outside meetings. **Kid day**: a small budget (1–2 tasks); deliver only in morning-after-drop-off, school-hours and post-bedtime windows. **Handover day**: the handover itself is a transition cue; schedule one "reset" item after it. **Pickup/drive windows**: no task pushes from about 15 min before departure until arrival (the pre-departure window itself is a transition warning: "Leave for pickup in 10").
- **Post-bedtime slot:** a natural, coarse breakpoint and the most reliable solo window on kid-days. It also carries depleted-energy risk, so suggest light tasks there and avoid hard ones. This is an inference; no direct source.
- **Use family transitions as cues** (after drop-off, after handover, after the sitter arrives). These are the event-based cues adults with ADHD handle best, and they repeat weekly, which supports habit formation.
- **Never let a kid-related deferral read as failure.** If a push fell inside a period that turned busy, auto-move it to the next suitable window and tell Marc, without asking him to do anything.

### Gaps
- No peer-reviewed or practitioner source was found on task scheduling around **co-parenting rotations** for parents with ADHD, or specifically on ADHD fathers. Most parenting-ADHD research is on mothers and on children's ADHD.
- No evidence on "post-bedtime" productivity or depletion in ADHD parents.

## 6. Recovery and shame: missed tasks, rejection sensitivity, streaks and red counts, restarting after a bad day or week

### Takeaway
Adults with ADHD report lower self-compassion, partly explained by criticism from others. In general procrastinators, forgiving oneself for the last lapse predicted *less* procrastination next time, via reduced negative feeling. Emotional dysregulation in ADHD is well documented, but "RSD" as a distinct construct is thinly evidenced. The system should therefore carry missed items forward quietly, avoid counts and streaks, and make restarting after a gap a one-tap "fresh start" that shows one thing.

### Cited Findings
- **[E]** In 1,203 adults (46% self-reporting an ADHD diagnosis), those with ADHD reported lower self-compassion, and perceived criticism from others partly accounted for the gap. Undiagnosed high-trait participants looked similar to the diagnosed group. — [Beaton, Sirois & Milne 2020, Mindfulness (White Rose)](https://eprints.whiterose.ac.uk/165039)
- **[E]** In 543 adults with ADHD vs 313 without, low self-compassion helped explain poorer mental health. The authors propose self-compassion as a treatment target (cross-sectional). — [Beaton, Sirois & Milne 2022, J Clin Psychol](https://pmc.ncbi.nlm.nih.gov/articles/PMC9790285/)
- **[E-adj]** Students who forgave themselves for procrastinating before the first midterm procrastinated less before the second. The effect ran through reduced negative affect, appeared only among heavy procrastinators, and predicted better second-exam performance (N = 119, observational). — [Wohl, Pychyl & Bennett 2010, via BPS Research Digest](https://bps.org.uk/research-digest/cure-procrastination-forgive-yourself)
- **[P/E mixed]** RSD is not in DSM-5-TR or ICD-11. The term was popularised clinically by William Dodson. Research support for an ADHD-specific rejection-sensitivity link is mixed: a 2017 review linked rejection sensitivity to BPD, depression and anxiety but not to ADHD. — [Psychology Today: "RSD: the actual research" (2026)](https://www.psychologytoday.com/us/blog/if-i-be-waspish/202604/rejection-sensitivity-dysphoria-the-actual-research); [Therapists in Baltimore review of RSD evidence](https://therapistsinbaltimore.com/therapy-insights-blog/2025/12/20/rejection-sensitive-dysphoria-rsd-what-research-actually-shows)
- **[P]** Mahan's wall-of-awful bricks are past failures and shame tied to a task. Each visible failure marker adds a brick. — [Life Skills Advocate](https://lifeskillsadvocate.com/blog/wall-of-awful/)
- **[U/P]** In earlier research, users blamed streaks, sad pets and "last chance" copy for quitting apps, and credited shame-free moves (Structured), "it only rewards you" (Finch) and "skipped still counts" (Routinery). — [Why top ADHD apps work (earlier report)](/home/user/reports/Why%20top%20ADHD%20apps%20work.md)
- **[E]** Body doubling's qualitative benefits include "reducing shame around struggles", besides starting tasks. — [Eagle & Ringland 2024, ACM TACCESS, DOI 10.1145/3689648](https://doi.org/10.1145/3689648)

### Inferences
- **State: missed it (no decision before end of window).** Do not mark anything red, do not show "overdue", do not count. Move it to the next suitable window (per section 5) and say so neutrally ("Moved the council email to tomorrow after drop-off"). Keep the original date only in history, not on the Now screen.
- **State: many missed / bad day.** At the next contact, never show the backlog. Show one item and offer a single "Fresh start" action that moves everything except a single chosen item (or fixed must-dos) to a parked list he isn't shown by default. This mirrors self-forgiveness lowering negative affect before the next attempt.
- **State: returning after days away.** The first push after a gap should not mention the gap or the number of items. Use: "Pick one for today: X?" The tone is warm and plain, never sarcastic or guilt-tripping (Marc may or may not be rejection-sensitive; the copy should be safe either way).
- **No streaks, no completion percentages, no red badges with large counts.** The badge should show at most "1" (the thing on the Now screen), not the backlog size. Each visible failure count adds a brick to the wall.
- **Drop is honourable.** "Drop" should be framed as deciding, not failing ("Decided: not doing this. Good call to clear it.").

### Gaps
- No experimental (randomised) study was found of self-compassion or self-forgiveness interventions specifically on *task completion* in adults with ADHD. Beaton's PhD reportedly used an RCT, but its procrastination findings were not retrieved. — [Beaton thesis](https://etheses.whiterose.ac.uk/id/eprint/32045/)
- A widely repeated "up to 70% of adults with ADHD have emotional dysregulation" figure appeared in search summaries, but its primary source could not be verified, so it is omitted.
- No study was found directly comparing streak vs no-streak designs in ADHD users. The evidence is user reports.

## 7. Daily structure: morning planning, evening shutdown, tasks per day, "one thing"

### Takeaway
CBT for adult ADHD is built on a single calendar plus task list checked every day, and a daily list kept short (the Adult ADHD Tool Kit says 2–5 priorities). It is the best-evidenced package, but individual components (morning vs evening review) have not been isolated. For Marc, who forgets to open apps, the daily planning prompt must *come to him* and take under a minute: pick today's one thing, with optional 1–2 more.

### Cited Findings
- **[E]** Safren's CBT (86 adults on medication, residual symptoms): 53% vs 23% responders vs relaxation plus education. The core modules are a calendar and task list checked daily, prioritising, and breaking tasks into steps. — [Safren et al. 2010 abstract](https://anhoriga.se/Artiklar-och-rapporter/2010/cognitive-behavioral-therapy-vs-relaxation-with-educational-support-for-medication-treated-adults-with-adhd-and-persistent-symptoms-a-randomized-controlled-trial) (from earlier report)
- **[E]** A component network meta-analysis of 43 trials: "organisational strategies" roughly doubled the odds of response (iOR 2.03). — [Matsumoto et al. 2024, BMJ Mental Health](https://pmc.ncbi.nlm.nih.gov/articles/PMC11683884/) (from earlier report)
- **[P]** Safren's client workbook has a chapter on organising multiple tasks, covering choosing one calendar and task-list system, "Master List Versus Daily List", and a prioritising skill. — [OUP: Mastering Your Adult ADHD, Client Workbook 2e](https://academic.oup.com/book/1239/chapter/140165437)
- **[P]** The Adult ADHD Tool Kit (Ramsay & Rostain) daily routine limits the daily list to 2–5 priorities, sets start and end times, and previews the day for likely problems. Source is a secondary summary. — [Tool Kit summary](https://divergent-tabletop-wiki.pages.dev/3-ND-Resources/2-Books--and--Papers-Summaries/ADHD/The-Adult-ADHD-Tool-Kit---Using-CBT-to-Facilitate-Coping-Inside-and-Out)
- **[P]** ADDitude (Kolberg approach): build the daily plan from the master list's A/B priorities plus the calendar's fixed commitments; re-prioritise the master list weekly. — [ADDitude](https://www.additudemag.com/adhd-time-management-tools-make-to-do-lists-work-for-you/)
- **[P]** Solanto: "If it's not in the planner, it doesn't exist." — [ADDitude review](https://www.additudemag.com/cognitive-behavioral-therapy-for-adult-adhd/)
- **[E]** Self-guided ADHD tools lose most users quickly. The HSE app averaged about 9 minutes over 2.4 sessions; Inflow lost about 60% by week 7. — [Seery et al. 2025](https://pmc.ncbi.nlm.nih.gov/articles/PMC11847728); [Knouse et al. 2022](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9931323/) (from earlier report)

### Inferences
- **Morning prompt (spec):** a single push at a family-calendar-aware time (after drop-off on kid-days, a fixed morning time on kid-free days). It opens a screen with the day's shape (kid day or not, fixed events, time free) and asks "Today's one thing?", offering 1–3 suggestions. One tap to accept. If ignored, the system picks the top item itself, and the day proceeds with it. Planning must not be a gate.
- **Tasks per day:** default budget of **1 must + up to 2 more** on kid-days, **up to 3–5** on kid-free days. This sits at the low end of the 2–5 practitioner range because of parenting load (section 5). It is an inference, not a tested number.
- **Evening shutdown (optional, light):** a post-bedtime or end-of-day check-in ("Anything for tomorrow's after-drop-off?") that captures, not reviews. No list of misses. Carry-over has already happened automatically.
- **Weekly reset:** align with the custody rotation (for example, the evening the kids go to the other house). Re-pick the week's few things and park the rest. The re-prioritisation cadence is ADDitude's weekly one, aligned to Marc's real week.

### Gaps
- No trial isolates morning planning vs evening shutdown, or a specific daily task count, in adults with ADHD.
- The exact Safren/Solanto wording on daily list length was not verified from the manuals.

## 8. Body doubling and accountability without another person: what software can substitute

### Takeaway
Body doubling is a widely used community practice with good qualitative support. Controlled evidence is tiny and mixed (one null study, one 12-person VR study with AI and human co-workers both helping). Since Marc wants no other people or apps, software can substitute only partly: a declared start ("I'm starting X now"), a visible running timer, a scheduled check-in push, and a closing "how did it go". Software cannot provide being watched by a real person.

### Cited Findings
- **[E, qualitative]** Body doubling is a community-driven neurodivergent practice. Doubles include friends, family, co-workers, online strangers and *pre-recorded "study with me" content*. It serves starting tasks, feeling less isolated and reducing shame, beyond completion. — [Eagle & Ringland 2024, ACM TACCESS](https://doi.org/10.1145/3689648)
- **[E]** VR study, 12 adults with ADHD, virtual bricklaying task under alone, human co-worker and AI co-worker conditions. Both co-worker conditions reportedly improved task speed, perceived accuracy and sustained attention (p < 0.05). The authors note "no peer-reviewed controlled trials" of body doubling in adults with ADHD, and that one prior study (Born, 2024) found no significant effect. — [arXiv 2509.12153](https://arxiv.org/html/2509.12153v1)
- **[U/sponsor]** A survey of 117 UK adults on a commercial virtual co-working service reports self-reported benefits. It is sponsored and not peer-reviewed. — [neurodiversity.org write-up](https://neurodiversity.org/?p=11449)
- **[P/U]** Focusmate's loop is "say hello at the beginning, declare your tasks, and say goodbye at the end". — [Focusmate FAQ](https://www.focusmate.com/faq) (mechanism reference only, not a recommendation)
- **[U]** Users want "a second step that does not rely on me opening the app again" and "some kind of later check-in". — [r/ADHD snapshot](https://reddit.sentinel-team.org/posts/1twhie6/snapshots/2026-06-05T21%3A20%3A56.551596Z)

### Inferences
- **What software can substitute (spec):** (1) **Declare**: tapping Start on the Now screen records "started X at 14:05", the analogue of saying hello. (2) **Presence**: a visible running timer on the Now screen, plus a server-scheduled check-in push at the planned end ("15 min up. Still on it, done, or stop here?"). This is the "later check-in" users ask for. (3) **Goodbye**: a one-tap close that logs what happened, with no score. (4) A **steady, neutral "voice"** in the copy that addresses him like a calm companion; Eagle & Ringland note that even pre-recorded presence helps some people.
- **What it cannot substitute:** the social stakes of another person watching. The controlled evidence does not show software presence is equivalent. The earlier reports' finding that reminders speed return but not completion (Nordby) suggests that the start-declare-check-in loop, not more pushes, is the main lever still available without people.

### Gaps
- No controlled study of "AI/software-only body doubling" in real-world tasks for ADHD adults; the VR study is lab-based and small.
- The Born 2024 null study was not retrieved; details unknown.

### Spec summary: states and system responses (synthesis of all sections; inference)
| Marc's state | What is going on (evidence level) | System response |
|---|---|---|
| Before the task, time not felt | Time-based PM weak [E]; myopia to future [P] | Anchor to a family event at capture; one soft pre-warning about 10 min before (default, tunable); show "X min until [next fixed event]" |
| Push lands, he's free | Planning done earlier; recall OK [E] | Push = first step + time context; tap opens the Now screen with only that step + Start/Done/Snooze-to-time/Smaller/Drop |
| Push lands, task feels awful | Wall of awful [P]; first step too big [P] | "Smaller" is one tap; show one smaller physical step; never show scope or overdue |
| Push lands mid-hyperfocus | Hyperfocus trait [E]; swipe = gone [U] | Swipe ≠ decision; re-send after a medium gap with new wording; offer "when I surface" snooze |
| Driving / pickup window | Driving Focus silences [platform]; safety | No pushes in calendar drive windows; re-deliver at arrival/after-drop-off; don't count as attempt |
| With kids (solo-parenting block) | Parent ADHD → highest parenting stress [E] | Only kid-relevant or tagged tasks; defer others to post-bedtime/kid-free windows |
| In a meeting | Breakpoint cost lowest at coarse boundaries [E-adj] | Hold until the event ends; deliver then |
| Started | Delay discounting [E]; body-double "declare" [E-qual] | Immediate acknowledgement; running timer; check-in push at planned end; stopping after the first step is OK |
| Missed window | Self-forgiveness → less next procrastination [E-adj] | Silent auto-carry-over to next suitable window; neutral note; no red, no counts |
| Bad day/week, many missed | Low self-compassion in ADHD [E]; shame bricks [P] | Never show backlog; "Fresh start": pick one, park rest; first push after gap doesn't mention the gap |
| Morning | Daily calendar + short list core of CBT [E pkg] | One push: "Today's one thing?"; auto-pick if ignored; budget 1–3 on kid-days |
| Evening / handover | Weekly re-prioritisation [P]; transitions as cues [E-adj] | Light capture-only shutdown; weekly reset tied to custody handover |
