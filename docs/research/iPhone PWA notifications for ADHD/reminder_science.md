# Reminder and prompt notifications that change behaviour: design rules for a high-volume personal reminder system for an adult with ADHD

Scope note: this extends an earlier round that already covered the basics of Nordby 2022 (myADHD SMS reminders), CBT for adult ADHD, implementation intentions in general, and Fuermaier 2013 (prospective memory in adult ADHD). Those are only mentioned here where they matter for a rule.

Evidence-strength scale used throughout:
- **A (strong):** meta-analysis or several consistent RCTs/MRTs.
- **B (moderate):** one well-run RCT, MRT or very large field experiment (A/B test, megastudy).
- **C (weak or indirect):** small, observational or lab study, or a different population/domain (e.g. clinicians, children, security warnings).
- **D (extrapolation):** design inference or expert opinion with no direct test.

---

## 1. JITAIs and micro-randomised trials: how big is the effect of a prompt, how fast does it decay, does more prompting reduce responsiveness, and does timing to context help?

### Takeaway
A push prompt reliably produces a large, short-lived jump in the targeted behaviour within the next 30–120 minutes (Drink Less: ~3.5x app opening in the next hour; HeartSteps: +66% steps on day 1). The size of that jump varies between studies: in HeartSteps it decayed about 2–3% per day and was gone by about day 28 (participants called the messages "boring" after 2–4 weeks), but Drink Less found no decay over 30 days. More prompts did not clearly cut response in the studies that varied frequency. Context-aware timing gives modest gains, and ML-learned timing raised receptivity by up to about 40% in one study. Pooled JITAI effects on distal outcomes are small (g≈0.15 for mental-health outcomes).

### Cited Findings
**HeartSteps (physical activity MRT; Klasnja et al. 2019, Annals of Behavioral Medicine)**
- Design: 44 recruited, 37 analysed. 42 days with up to 5 decision points per day (up to 210 randomisations per person). At each available point: 0.4 no suggestion, 0.3 walking suggestion, 0.3 antisedentary suggestion. 3,594 of 6,061 available decision points (59.3%) got a suggestion, averaging 2.4 per day. — [Klasnja et al., PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)
- Averaged over the study, any suggestion vs none raised the 30-min step count by 14% (about 35 steps over a 253-step mean; p=.06). On day 1 the effect was +66% (+167 steps, p<.01). It declined about 2% per day and was no longer distinguishable from zero by about day 28. — [Klasnja et al., PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)
- Walking suggestions, which are concrete and actionable: +24% averaged (+59 steps, p=.02); +107% on day 1 (+271 steps). They declined about 3% per day and were undetectable by about day 29. Antisedentary suggestions ("get up and stretch"-style) had no significant effect at any point. — [Klasnja et al., PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)
- The authors attribute the decay most likely to habituation, even though more than 500 different suggestions were written. In exit interviews, participants said suggestions became boring after 2–4 weeks. To limit burden, suggestions were suppressed when the person was walking, driving or had just finished an activity bout. — [Klasnja et al., PMC6401341](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)
- A 2025 reanalysis of distal effects estimated that an activity suggestion early in the study may raise the average daily step count in week 6 by about 344 steps, but that this effect "likely deteriorates over time". — [Distal causal excursion effects, arXiv 2502.13500](https://arxiv.org/pdf/2502.13500)

**Drink Less (alcohol app MRT; Bell et al. 2023, JMIR mHealth)**
- 349 MRT users analysed over their first 30 days, plus parallel arms (standard daily 11 AM notification n=120; no notification n=97). In the MRT, each day at 8 PM users were randomised to 30% standard message, 30% new message, 40% nothing. — [Bell et al. 2023, PMC10337295](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)
- A notification raised the probability of opening the app in the next hour 3.5-fold (95% CI 2.91–4.25). Standard message RR 3.66; new/varied message RR 3.39, so the two were similar. — [Bell et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)
- No significant change in effect over the 30 days (multiplicative decay 0.993 per day, 95% CI 0.975–1.012). A notification the previous day reduced the next standard message's effect by about 11% (RR 0.889, not significant). — [Bell et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)
- Long-term engagement did not differ: median time to disengagement was 11 days (standard), 11 days (MRT) and 7 days (no notification), log-rank P=.42. The authors note that notifications "could overburden or annoy a user". — [Bell et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)

**Workplace well-being app MRT (Bidargaddi et al. 2018, JMIR mHealth)**
- 1,255 users over 89 days. At one of six random daily slots (8:30, 12:30, 17:30, 18:30, 19:30, 20:30), available users were randomised 50/50 to a tailored push or none. — [Bidargaddi et al. 2018](https://mhealth.jmir.org/2018/11/e10123)
- A push raised self-monitoring in the next 24 h by 3.9% (RR 1.039, 95% CI 1.01–1.08). Weekend effect +8.7% vs weekday +2.5%, though the difference was not significant (P=.18). The best exploratory slot was 12:30 on weekends (+11.8%). The effect attenuated over time, but not significantly (P=.84). — [Bidargaddi et al. 2018](https://mhealth.jmir.org/2018/11/e10123)

**Frequency (Morrison et al. 2017, PLoS ONE, exploratory RCT, n=77)**
- Three arms of a stress-management app: "intelligent" sensor-timed notifications, daily notifications in fixed windows, and occasional notifications. The intelligent and daily arms viewed and acted on more notifications than the occasional arm. The authors conclude that frequent notifications "may encourage greater exposure to intervention content without deterring engagement", but that adaptive timing "does not always enhance their use". — [Morrison et al. 2017, PMC5207732](https://pmc.ncbi.nlm.nih.gov/articles/PMC5207732)

**Prompt frequency vs compliance in experience sampling (an indirect proxy for burden)**
- Wrzus & Neubauer meta-analysis of EMA studies: on average 6 prompts per day for 7 days, with 79% compliance. Experiments that varied the number of daily prompts found comparable 14-day compliance at 3, 6, 9 or 12 prompts per day. — [Wrzus & Neubauer, Assessment (record)](https://heibib.ub.uni-heidelberg.de/search/Record/1839595345)
- Other EMA meta-analyses disagree by population: in alcohol research, prompt frequency predicted lower compliance, and in cancer patients more than 6 prompts per day had the lowest compliance (58.6%). This comes from a search summary and was not verified in full text. — [EMA compliance meta-analyses (PMC9999286)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9999286)

**Timing to receptivity**
- Mishra et al. 2021 (IMWUT; the "Ally" step-goal chatbot): each message was randomly assigned to a static ML model, an adaptive ML model or random timing. The ML models improved receptivity by up to 40% over random timing (a later GetMobile summary says up to 36%), and the adaptive model improved over the study. — [Mishra et al., Dartmouth project page](https://www.cs.dartmouth.edu/dfk/research/mishra-receptivity/index.html); [arXiv 2011.08302](https://arxiv.org/abs/2011.08302)

**Pooled JITAI effects**
- A 2025 meta-analysis of JITAIs and EMIs for depression, anxiety and well-being (23 studies, n=2,563) found a small effect, g=0.15 (95% CI 0.05–0.26). I took this from a search summary and could not confirm the full text or exact venue. — [search-indexed copy, Univ. Bamberg](https://fis.uni-bamberg.de/bitstreams/44f2f62f-aff5-475b-817b-d8ac1b1ee091/download)
- A 2023 meta-analysis of JITAIs on objectively measured health behaviour found g=0.77 (95% CI 0.32–1.22) from 21 effect sizes. It is likely inflated by small studies. — [Using a complexity science approach… JITAI meta-analysis](https://dare.uva.nl/id/4c8814cc-b448-46e0-87b1-30ef52385731)
- Methods literature describes habituation ("reduced level of responsiveness resulting from frequent stimulus exposure") and burden as the expected reasons that MRT effects fall over time. It recommends keeping push content to the minimum needed. — [MRT design considerations, arXiv 2107.03544](https://arxiv.org/pdf/2107.03544)

### Inferences
- A prompt is a short-acting "dose". The response window is roughly 30 min to 2 h (HeartSteps measured 30 min, Drink Less 1 h, Duolingo 2 h), so the prompt should arrive when the task can actually be started. **(B)**
- Plan for the effect of any fixed message family to fade over about 2–4 weeks: HeartSteps showed about 2–3% per day decay to zero by about day 28. Drink Less shows the decay is not universal, possibly because opening an app is easier than walking. Build in rotation, retirement and refresh from the start. **(B, mixed evidence)**
- Concrete, do-able suggestions worked: walking prompts had an effect, vague antisedentary prompts had none. This supports content that names a specific action (see section 4). **(B, single MRT)**
- In the studies that varied it, sending more prompts did not clearly reduce responsiveness: daily beat occasional, and 3–12 per day gave similar compliance. There is a weak hint (Drink Less previous-day RR 0.89, not significant) that back-to-back prompts slightly blunt each other. A single motivated user can probably tolerate more than typical apps assume, provided prompts are relevant. **(C)**
- Smart timing helps modestly (up to about 40% receptivity in one study). It is a second-order optimisation compared with sending the prompt at all. **(B/C)**
- Notifications produce engagement in the moment but did not prevent long-term disengagement in Drink Less, so prompts alone will not sustain use. **(B)**

### Gaps
- I found no MRT that randomised the *number* of prompts per day to estimate a dose-response curve for burden. Nor did I find one that tested varied versus fixed content over many weeks with decay as the outcome. HeartSteps v2/v3 results (reinforcement-learning timing) were not reviewed here.
- I did not confirm the full text and venue of the 2025 JITAI meta-analysis.
- None of these MRTs studied adults with ADHD. The ADHD-specific multiple-randomised trial (Nordby 2022) was null on completion; see section 7.

---

## 2. Reminder RCTs in adherence: effect sizes, frequency, personalisation, two-stage reminders

### Takeaway
Text reminders roughly double the odds of medication adherence (OR 2.11; about 1.68 after correcting for publication bias). Personalisation, two-way messaging and daily frequency did not change that effect. For one-off events, two reminders (advance plus near-time) beat one. In large field megastudies the best wording framed the action as already set up for the person ("reserved for you") and sent it twice.

### Cited Findings
- Thakkar et al. 2016 (JAMA Internal Medicine) meta-analysis: 16 RCTs, 2,742 patients. Text messaging improved medication adherence, OR 2.11 (95% CI 1.52–2.93), with moderate heterogeneity (I²=62%). After adjusting for publication bias the OR fell to about 1.68. Most trials were short, with self-reported adherence. — [Thakkar et al. 2016 PDF](https://www.ehidc.org/sites/default/files/resources/files/Thakkar%202016%20JAMA%20text%20messaging%20meta%20analysis.pdf); [Bond University record](https://research.bond.edu.au/en/publications/mobile-telephone-text-messaging-for-medication-adherence-in-chron/)
- In the same meta-analysis, the effect was "not sensitive to … text message characteristics (personalization, 2-way communication, or daily text message frequency)". Five of 16 trials personalised and 8 of 16 used two-way messaging. — [Thakkar et al. 2016 PDF](https://www.ehidc.org/sites/default/files/resources/files/Thakkar%202016%20JAMA%20text%20messaging%20meta%20analysis.pdf)
- Steiner et al. 2018 (American Journal of Managed Care) randomised trial of reminder number and timing for primary-care appointments: reminders at 3 days and 1 day before were more effective at reducing missed appointments than a single reminder at either time, especially in patients a prediction rule flagged as high-risk. The authors note no prior RCT had directly compared reminder number or timing. — [Steiner et al. 2018, AJMC](https://www.ajmc.com/view/optimizing-number-and-timing-of-appointment-reminders-a-randomized-trial)
- Milkman et al. 2021 (PNAS) megastudy: 19 text-message nudges sent to 47,306 patients before a primary-care visit raised flu vaccination by about 5% on average (relative), against a usual-care baseline of 41.8%. The best message reminded patients twice and said the vaccine was "reserved for you" (about +11% relative). Messages that matched what patients expected from their provider also did better. — [Milkman et al. 2021, PNAS (RePEc)](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html); [Arizona repository](https://repository.arizona.edu/handle/10150/659876)
- Milkman et al. 2011 (PNAS), n=3,272 employees: a reminder mailing with a prompt to write down the *date and time* of the planned vaccination raised vaccination by 4.2 percentage points over a 33.1% control (to about 37.1%). A date-only prompt gave +1.5 pp (not significant). The effect was biggest when the vaccination opportunity existed on a single day. — [Milkman et al. 2011, NBER w17183](https://nber.org/system/files/working_papers/w17183/w17183.pdf)

### Inferences
- Reminders work for adherence at scale. Expect roughly a doubling of the odds, smaller after bias correction. **(A)**
- For a time-bound task, use at least two touches: an advance reminder to plan, then a near-time reminder to act. **(B)**
- In these meta-analyses, personalisation and two-way replies are not, by themselves, what makes reminders work. What seems to matter is a concrete time or plan and a sense that the action is already set up. **(B for the planning prompt; B for "reserved for you" wording; C for the null personalisation subgroup, which is underpowered)**

### Gaps
- I found no reliable RCT comparing SMS with app push notifications head-to-head; the trials are mostly SMS. I could not verify vendor claims that multiple reminders cut no-shows by 30–50%.
- I found no RCTs of homework reminders in CBT, beyond the previous round's Nordby work.

---

## 3. Habituation and alert fatigue: do repeated identical notifications lose effect, does variation restore attention, and what did Duolingo find?

### Takeaway
Repeating the *same* alert erodes its effect, consistently across domains: about 30% lower acceptance per extra repeat in clinicians, brain-level habituation to warnings within days, and a measurable loss from reusing the same Duolingo template. Novel or varied ("polymorphic") versions resist habituation, and a template's novelty recovers with rest (Duolingo modelled about a 15-day half-life). Gains from variation are real but modest at population scale.

### Cited Findings
**Duolingo (Yancey & Settles, KDD 2020)**
- The system optimises daily practice reminders over a pool of hand-written templates. The reward is a lesson completed within 2 hours of the notification. — [Yancey & Settles 2020 PDF](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- Novelty effect: earlier Duolingo A/B tests that added new templates "tended to boost notification conversion rates, even when those new templates did not outperform existing templates in the long run". Without variation, "the bandit will converge to using the same template … day after day, which will get repetitive, desensitize users, and fail to improve engagement in the long run". — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- Recovery model: a template's score is penalised by γ·0.5^(days since last shown / h). The half-life h was set to 15 days, because earlier A/B tests suggested the penalty "should mostly decay within the span of a few weeks to a month". Grid search gave γ≈0.017. — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- Offline, the policy that always reused the last template was 0.5% *worse* than random selection. The bandit was +1.8%, and +1.9% with the recency penalty. The penalty alone added 0.2 percentage points, which the authors call an underestimate. — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- Online A/B test across millions of daily reminders: +0.5% daily active users and +2% new-user retention over a baseline that years of A/B testing had already optimised. — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- A public dataset of about 200 million practice-reminder notifications over 35 days was released with the paper. — [Papers with Code](https://paperswithcode.com/paper/a-sleeping-recovering-bandit-algorithm-for)

**Clinical alert fatigue (Ancker et al. 2017, BMC Med Inform Decis Mak)**
- Retrospective EHR cohort of 112 primary-care clinicians, 2010–2013. The likelihood of accepting a reminder dropped 30% for each additional reminder received in the same encounter, and 10% for each 5-percentage-point rise in the share of repeat alerts. Workload per se had no effect, and there was no desensitisation over time to a newly deployed alert. About a third of clinical reminders were repeats for the same patient within a year. — [Ancker et al. 2017, PMC5387195](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)

**Warning habituation and polymorphic designs (Anderson, Vance et al., BYU)**
- fMRI, n=25: a polymorphic warning, whose appearance changes on each exposure, was significantly more resistant to habituation in attention-related brain regions than a static warning. — [BYU ScholarsArchive](https://scholarsarchive.byu.edu/facpub/1955)
- Longitudinal fMRI and eye-tracking over a 5-day workweek showed a "dramatic drop in attention throughout the workweek despite partial recovery between workdays". The polymorphic design kept its advantage all week. — [Vance et al., MIS Quarterly 2018](https://misq.umn.edu/pub/skin/frontend/default/misq/pdf/V42I2/14124_RA_VanceJenkinsAbstract.pdf)
- In a 3-week field study of Android permission warnings, people who saw changing warnings still followed them 76% of the time at day 15, against 55% for static warnings. This figure comes from a university news summary. — [BYU News](https://news.byu.edu/news/study-android-users-how-get-people-pay-attention-mobile-security-notifications)

**Counter-evidence**
- In Drink Less, a "new" (varied) message did no better than the standard repeated message over 30 days (RR 3.39 vs 3.66). — [Bell et al. 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/)

### Inferences
- Never send the same text repeatedly for the same task. Rotate among several phrasings and formats for each reminder type, and avoid reusing a template within about 1–2 weeks where possible (Duolingo's 15-day half-life). **(B for the direction; C/D for the exact interval)**
- Repeats *within one occasion* are the most corrosive: Ancker's -30% per repeat per encounter. A "nag until done" chain made of identical messages is the worst case. Each escalation step should look and read differently. **(C, clinicians, observational)**
- Visual and format variation, not just wording, protects attention (polymorphic warnings). For an iOS PWA this can mean varying the title, emoji/icon, the action named and the structure, within what the platform lets you change. **(C)**
- Expect variation to deliver single-digit-percent gains, not miracles. Its main value is slowing the 2–4-week fade seen in HeartSteps. **(B)**

### Gaps
- I found no study that tested varying notification *sound* or vibration patterns over weeks.
- Duolingo's results are population averages for a low-effort behaviour, and transfer to effortful ADHD tasks is unknown.

---

## 4. Content: concrete next action vs generic reminder; actionable vs informational; personalisation; positive vs guilt vs self-compassionate wording

### Takeaway
Prompts that name a concrete action and its time or place beat vague prompts: date+time planning prompts +4.2 pp versus date-only +1.5 pp (n.s.); walking suggestions worked where antisedentary prompts did not; "reserved for you" wording won a 19-arm megastudy. Personalisation alone did not moderate SMS adherence effects. There is no direct trial of guilt versus self-compassionate notification wording. Indirect evidence suggests self-forgiveness after a lapse reduces later procrastination, and controlling, guilt-based messages may backfire.

### Cited Findings
- A specific plan prompt (date *and* time) gave a significant +4.2 pp in vaccination, while a less specific date-only prompt did not. — [Milkman et al. 2011, NBER](https://nber.org/system/files/working_papers/w17183/w17183.pdf)
- Concrete walking suggestions increased steps (+24% averaged; +107% day 1), while antisedentary suggestions had no detectable effect. — [Klasnja et al. 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/)
- The best text in a 47,306-patient megastudy framed the action as already arranged ("reserved for you") and was sent twice. — [Milkman et al. 2021, PNAS](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html)
- Personalisation and two-way messaging did not moderate the effect of SMS on adherence. — [Thakkar et al. 2016](https://www.ehidc.org/sites/default/files/resources/files/Thakkar%202016%20JAMA%20text%20messaging%20meta%20analysis.pdf)
- Duolingo templates that reference user-specific state (streak length, streak wager) are eligible only for some users. The bandit found translation-specific template performance mattered: template+UI-language arms gave +1.8% versus +1.2% for template-only arms. — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)
- Self-forgiveness: Wohl, Pychyl & Bennett 2010 followed first-year students (reported n=119–134) across two exam periods. Students who forgave themselves for procrastinating on the first exam procrastinated less before the second, mediated by reduced negative affect. The effect held mainly among high procrastinators. — [BPS Research Digest summary](https://bps.org.uk/research-digest/cure-procrastination-forgive-yourself); [Psychology Today (Pychyl)](https://www.psychologytoday.com/us/blog/dont-delay/200903/self-forgiveness-reduces-procrastination)
- A Psychological Science Accelerator protocol argues that controlling messages "that pressure people to change using shame, guilt, and demands, may backfire". This is a protocol and argument, not a result. — [PsychArchives](https://www.psycharchives.org/handle/20.500.12034/2670)

### Inferences
- Each prompt should name the next physical action, not the project: "Open the tax PDF and find line 3", not "Do taxes". Include when or where if it is not obvious from timing. **(B, convergent across three studies; not tested in notifications for ADHD)**
- Frame the task as already set up or reserved ("Your 10-minute slot for X starts now; the doc is open"), which borrows the winning megastudy framing. **(B, one megastudy; different domain)**
- Avoid guilt and shame. After a miss, use a forgiving, forward-looking message ("Missed it, no problem. Next chance: 4 pm, just step 1"). **(C/D, indirect only)**
- Personalisation should mean relevance (the person's own task, step and context), not cosmetic name insertion. **(C)**

### Gaps
- I found no RCT or MRT comparing guilt, neutral and self-compassionate wording in push notifications.
- I found no direct trial of "implementation intention inside the notification" against a generic reminder for task initiation. The evidence is from planning prompts in mailings and from content contrasts within HeartSteps.
- I found no study of "actionable" notifications (with an inline action button) against informational ones on downstream completion.

---

## 5. Escalation, snoozing and repeat-until-acknowledged

### Takeaway
There is very little direct evidence on snooze design for task reminders. What exists suggests snoozing is common and mostly reflects "can't now", that deferral concentrates on effortful items, and that identical repeats lose force (Ancker). A trial in children found that reminder users came to depend on the reminders. Two distinct, spaced reminders are supported; open-ended identical nagging is not.

### Cited Findings
- Snoozing alarms is common: 57% of 450 full-time salaried adults were habitual snoozers (Mattingly et al. 2022, *Sleep*). Snoozing was linked to chronotype (night owls) and fatigue, not to less total sleep. This is about waking, not task reminders. — [ScienceDaily summary of Mattingly et al. 2022](https://www.sciencedaily.com/releases/2022/10/221017174902.htm)
- Email deferral (Sarrafzadeh et al., WSDM 2019, Microsoft Research): 15 interviews plus logs from about 40,000 enterprise users. Deferral is more likely for emails that need a reply, careful reading or opening attachments (i.e. effortful), and depends on workload and sender importance. About 16% of users deferred at least one email per day, and whether a user would return to a deferred email was partly predictable. — [Sarrafzadeh et al., arXiv 1901.04375](https://arxiv.org/pdf/1901.04375); [Microsoft Research](https://www.microsoft.com/en-us/research/publication/characterizing-and-predicting-email-deferral-behaviour/)
- Mobile notification snoozing (MobileHCI 2018 paper, DOI 10.1145/3229434.3229436): users of an Android app that could snooze any notification for a duration or until a chosen moment snoozed mostly notifications about people and events. Reasons ranged from being unable to attend to it then to not wanting to. I saw only an index record, not the full text. — [bsl.nl record](https://mijn.bsl.nl/doi/10.1145/3229434.3229436)
- Repeated reminders within one encounter reduced acceptance 30% per extra repeat. — [Ancker et al. 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/)
- Two reminders (3 days and 1 day before) beat one. — [Steiner et al. 2018](https://www.ajmc.com/view/optimizing-number-and-timing-of-appointment-reminders-a-randomized-trial); the best megastudy arm reminded twice. — [Milkman et al. 2021](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html)
- Reliance: Nobbe et al. 2024 (*npj Science of Learning*), 85 students aged 10–12, reminders on 16 of 36 days. Students studied more on reminder days than on their own non-reminder days, but *not* more than controls on reminder days, and *less* than controls on non-reminder days. This gap grew over the study, and vocabulary outcomes were equal. — [Nobbe et al. 2024 (DOAJ)](https://doaj.org/article/4a00e095de7a4064a2026866f55eeb6d); [DIPF press release](https://idw-online.de/en/news837096)
- Practitioner view only (not research): snoozing often signals aversion to a poorly defined task, and writing a concrete first action helps. — [nab.it.com blog](https://nab.it.com/blog/why-reminders-dont-work)

### Inferences
- Snooze should ask "when or what instead": offer specific re-times tied to context ("after lunch", "at 4 pm", "when I'm home"), not a bare "+10 min". This turns a snooze into a mini implementation intention, consistent with the date+time planning evidence. **(D, extrapolated from B evidence)**
- Treat repeated snoozing of the same item as a signal that the task is effortful or ill-defined, as deferral research finds. After about 2 snoozes, prompt the user to shrink the task to a smaller first step, or to reschedule or drop it, rather than repeating. **(C/D)**
- Escalation should change the *form* (different wording, format or channel), not just repeat the message, and should be capped per occasion. **(C)**
- For a reliance-prone user, the risk of reminder dependence (Nobbe) is acceptable when the goal is getting tasks done rather than building a habit. For habits the user wants to become automatic, plan to thin out reminders gradually. **(C, children, single study)**

### Gaps
- I found no RCT on snooze interval length, snooze caps or repeat-until-acknowledged reminders for task completion in adults, and none in ADHD.
- I could not verify the claim that a "Stockholm study" found cognitive benefits of snoozing.

---

## 6. Interruptibility: when people respond, and how many notifications per day before burden

### Takeaway
People already receive about 56–64 notifications per day and usually view them within minutes. Delivering at natural breakpoints roughly halved response time in a deployment to 680,000 users and cut perceived cognitive load by a third to a half. People engage more with pushed content when bored or idle. I found no validated "notifications per day" annoyance threshold. Experience-sampling data suggest 3–12 prompts per day are tolerated similarly over two weeks, with population-specific exceptions.

### Cited Findings
- Pielot et al. 2014 (MobileHCI), n=15, one-week in-situ log study: about 63.5 notifications per day, mostly messengers and email, typically viewed within minutes even in silent mode. — [Pielot et al. 2014 PDF](https://ic.unicamp.br/~oliveira/doc/MHCI2014_An-in-situ-study-of-mobile-phone-notifications.pdf)
- Pielot et al. 2018 "Dismissed!": 794,525 notifications from 278 users, about 56 per day, mostly messaging. — [Pielot MobileHCI18 PDF](https://www.interruptions.net/literature/Pielot-MobileHCI18.pdf)
- Breakpoint-timed delivery (Okoshi et al., Attelia): perceived cognitive load fell 46% vs random timing in a controlled study and 33% in a 30-person in-the-wild study. A Yahoo! JAPAN deployment to more than 680,000 users cut mean response time from 54 to 27 minutes. — [survey summary, arXiv 1712.07120](https://arxiv.org/pdf/1712.07120); [Okoshi 2015 PDF](https://julian-ramos.github.io/papers/Okoshi2015a.pdf); [Tsubouchi et al. UbiComp 2017](https://interruptions.net/literature/Tsubouchi-UbiComp17.pdf)
- Boredom: Pielot et al. 2015 (UbiComp), 54 users, 40 million logs, 4,398 self-reports. Boredom was predictable from phone usage (AUC up to 82.9%), and users were significantly more likely to open suggested content when predicted bored (follow-up n=16). Boredom was higher when more time had passed since the last notification or call, and later in the day. — [Pielot et al. 2015 PDF](https://www.cs.ubc.ca/~conati/522/532b-2019/papers/Pielot2015-UbiComp-Boredom-Detection-1.pdf)
- Receptivity models improved responsiveness by up to 40% (Mishra 2021). — [Mishra et al.](https://www.cs.dartmouth.edu/dfk/research/mishra-receptivity/index.html)
- Timing slots: weekend midday (12:30) was the best exploratory slot in Bidargaddi 2018, but the slot differences were not significant. — [Bidargaddi et al. 2018](https://mhealth.jmir.org/2018/11/e10123)
- Prompt load: 3, 6, 9 and 12 prompts per day gave comparable 14-day compliance in EMA experiments. — [Wrzus & Neubauer](https://heibib.ub.uni-heidelberg.de/search/Record/1839595345)
- The intelligent-notification literature says notifications can be disruptive even when unattended and that high volumes may harm well-being. This is stated as motivation, not as a measured threshold. — [Mehrotra & Musolesi survey, arXiv 1711.10171](https://arxiv.org/pdf/1711.10171)

### Inferences
- A personal system competing with about 60 other notifications per day needs to stand out (see section 3) more than it needs to stay under a quota. **(C)**
- Prefer delivering at transitions: after an app session ends, after unlock, at the end of a calendar block, on arriving home. On an iOS PWA these signals are mostly unavailable, so approximate with schedule-based transitions (top of the hour, end of meetings, after meals) and learn the user's best slots from which prompts get acted on. **(B for breakpoints in general; D for PWA proxies)**
- No dose ceiling is established. A pragmatic rule is to cap *task* prompts at roughly a dozen per day, watch for falling response rates or disabled permissions as the real signal, and treat repeated immediate dismissals as overload. **(C/D)**

### Gaps
- I found no study giving a per-day count at which users disable notifications or uninstall. Industry surveys exist but were not verified.
- I found no study of interruptibility specific to ADHD.

---

## 7. ADHD-specific: prospective-memory aids, external cueing, reward immediacy

### Takeaway
Direct trial evidence that smartphone reminders improve outcomes for adults with ADHD is thin, and the one randomised study (Nordby 2022) was largely null on completion. ADHD is reliably associated with steeper delay discounting (d=0.43), which argues for prompts that make the payoff immediate and the first step tiny.

### Cited Findings
- Nordby et al. 2022 (*Frontiers in Digital Health*), already covered in the previous round: 109 adults with self-reported ADHD. Reminders sent after 2 days of inactivity had no effect on module completion, logins or strategy practice. They gave faster logins or more time in some modules, and a higher chance of logging in within 48 h only in module 2. — [Nordby et al. 2022](https://www.frontiersin.org/articles/10.3389/fdgth.2022.821031/text); [NCT04511169](https://clinicaltrials.gov/study/NCT04511169)
- Delay discounting: a meta-analysis of 21 studies (25 case-control comparisons, N=3,913) found that ADHD is associated with steeper monetary delay discounting, d=0.43, with no significant moderation by age (under vs over 18). — [Jackson & MacKillop 2016, PMC5049699](https://pmc.ncbi.nlm.nih.gov/articles/PMC5049699)
- Prospective memory partially mediates the link between ADHD symptoms and procrastination (correlational, Altgassen and colleagues; found via search, not read in full). — [search result, PMC9106824](https://pmc.ncbi.nlm.nih.gov/articles/PMC9106824)
- Smartphone reminder RCTs for prospective memory exist in older adults and mild cognitive impairment (Scullin and colleagues; NCT06444841), not in ADHD. — [NCT06444841](https://clinicaltrials.gov/study/NCT06444841)
- A cross-sectional dissertation found that more external reminder use correlated with *lower* prospective-memory success among people with high smartphone dependency. This is hypothesis-level only. — [Pacific University dissertation](https://commons.pacificu.edu/works/publication-dissertation/39fee-h5p92)

### Inferences
- Reminders compensate for a known prospective-memory deficit, but for ADHD the failure is often *starting*, not *remembering*. Prompts should lower the activation cost (a tiny first step, already set up) and make the reward immediate: show progress or a streak tick on tap, or a quick "done" action. **(C, mechanism-based)**
- Do not expect "reminders after inactivity" alone to raise completion in ADHD (Nordby null). Pair reminders with planning (time-specific commitments) and in-the-moment action support. **(B for the null; D for the remedy)**

### Gaps
- I found no completed RCT or MRT of push-notification task reminders in adults with ADHD measuring task initiation or completion.
- I found no ADHD-specific evidence on habituation speed, snooze behaviour or notification tolerance.

---

## 8. Synthesis: design rules for a high-volume personal reminder system, with strength ratings

### Takeaway
The evidence supports a system that sends many prompts, each tied to a concrete next action at a usable moment. Wording and format should be rotated so identical messages do not repeat, there should be an advance and an at-time touch for scheduled items, and each snooze should be a re-plan with a specific time. The system should also watch for decay, about 2–4 weeks per message family, and refresh or retire messages rather than escalate identically.

### Cited Findings
(These rules are derived from the sources above; each one cites its main evidence.)
- **Timing.** Deliver when the action can start; the response window is about 30–120 min. — [Klasnja 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/); [Bell 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC10337295/); [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf). **B**
- **Timing.** Prefer breakpoints and transitions over random times. — [Okoshi / survey](https://arxiv.org/pdf/1712.07120); [Mishra 2021](https://www.cs.dartmouth.edu/dfk/research/mishra-receptivity/index.html). **B**
- **Dose.** Frequent prompts (daily or several per day) beat occasional ones, and 3–12 per day showed no compliance penalty. — [Morrison 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5207732); [Wrzus & Neubauer](https://heibib.ub.uni-heidelberg.de/search/Record/1839595345). **C**
- **Two-stage.** Use an advance reminder plus a near-time reminder for scheduled tasks. — [Steiner 2018](https://www.ajmc.com/view/optimizing-number-and-timing-of-appointment-reminders-a-randomized-trial); [Milkman 2021](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html). **B**
- **Content.** Name the concrete next action and its time; frame it as already set up. — [Milkman 2011](https://nber.org/system/files/working_papers/w17183/w17183.pdf); [Milkman 2021](https://ideas.repec.org/a/nas/journl/v118y2021pe2101165118.html); [Klasnja 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/). **B**
- **Habituation.** Rotate templates and formats, and avoid reusing one within about 2 weeks. — [Yancey & Settles 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf); [Vance et al.](https://misq.umn.edu/pub/skin/frontend/default/misq/pdf/V42I2/14124_RA_VanceJenkinsAbstract.pdf). **B/C**
- **Escalation.** Do not repeat identical alerts within one occasion; change the form and cap the repeats. — [Ancker 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5387195/). **C**
- **Snooze.** Snooze means re-plan with a specific time or context; after repeated snoozes, shrink or reschedule the task. — [Sarrafzadeh 2019](https://arxiv.org/pdf/1901.04375); [Milkman 2011](https://nber.org/system/files/working_papers/w17183/w17183.pdf). **D**
- **Tone.** Be forgiving after misses; avoid guilt. — [Wohl et al. 2010 summary](https://bps.org.uk/research-digest/cure-procrastination-forgive-yourself). **C/D**
- **When to stop or refresh.** Expect a message family to fade within about 2–4 weeks, and monitor response rate per template and slot. — [Klasnja 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC6401341/). **B (mixed: Drink Less showed no decay)**
- **Dependence.** Reminders can displace self-initiation, so thin them out for habits the user wants to own. — [Nobbe 2024](https://doaj.org/article/4a00e095de7a4064a2026866f55eeb6d). **C**
- **ADHD.** Make the payoff immediate and the first step tiny, because ADHD discounting is steeper. — [Jackson & MacKillop 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5049699). **C**

### Inferences
- The strongest evidence (A/B) is about *whether* to remind (yes), *how many touches* for a scheduled item (two or more), *content specificity* (concrete action plus time) and *timing to usable moments*. The weakest is snooze and escalation design and tone, which are mostly C/D.
- For a single motivated user, the binding constraint is habituation, not annoyance. Volume is acceptable if every prompt is relevant, varied and actionable, and if the system tracks per-template response rates and retires what stops working.
- A useful self-experiment, borrowed from MRTs: randomise, for example, which template or slot is used, then log "acted within 2 h". That gives personal evidence for the same questions the population studies cannot settle for this one user.

### Gaps
- Most of the evidence comes from non-ADHD populations and from low-effort target behaviours (opening an app, a lesson, a short walk). How it transfers to effortful, aversive tasks in ADHD is untested.
- No study addresses iOS PWA delivery specifics; these are covered by a separate research stream.
