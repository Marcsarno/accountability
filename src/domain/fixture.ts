import { buildPreview, currentEvent, dispatch, latestCheckIn, latestPlanRev, type Command } from './commands'
import { DEFAULT_TERMS, emptyState } from './initial'
import { generateOccurrences, occKey } from './recurrence'
import { resolveLocal, type LocalDate } from './time'
import type { AppState, Outcome, ShareField } from './types'

const ZONE = 'America/New_York'

/**
 * Optional sample scenario from the handoff: Tuesday 27 Oct 2026, New York, 60 minutes.
 * Built by dispatching real commands so every screen derives from one consistent model.
 */
export function buildSampleState(): AppState {
  let s = emptyState(ZONE)
  s.owner.name = 'Alex'
  s.onboarded = true
  let n = 0, k = 0
  let clock = at('2026-10-19', '08:00')
  const id = () => `s${++n}`
  const run = (cmd: Command) => {
    const r = dispatch(s, `fixture:${++k}`, cmd, { now: clock, id })
    if (!r.ok) throw new Error(`fixture ${cmd.type}: ${r.message}`)
    s = r.state
  }
  const set = (date: LocalDate, time: string) => { clock = at(date, time) }

  // Partner agreement accepted the week before.
  run({ type: 'Invite', name: 'Jordan', email: 'jordan@example.com', terms: DEFAULT_TERMS })
  set('2026-10-19', '09:30'); run({ type: 'PeerAgreementAction', action: 'accept' })

  // Two repeating habits created from ordinary actions.
  run({ type: 'CreateAction', id: 'writing', title: 'Morning writing', criterion: '300 words added to the draft', estimate: 30, cue: 'After first coffee', goal: 'Finish the book draft', plannedDate: null, deadline: null, notes: '' })
  run({ type: 'MakeRepeating', actionId: 'writing', seriesId: 'w', rule: { kind: 'weekdays', days: [1, 2, 3, 4, 5] }, startDate: '2026-10-19' })
  run({ type: 'CreateAction', id: 'walk', title: 'Walk', criterion: '20 minutes outside, phone in pocket', estimate: 20, cue: 'Right after lunch', goal: 'Health', plannedDate: null, deadline: null, notes: '' })
  run({ type: 'MakeRepeating', actionId: 'walk', seriesId: 'k', rule: { kind: 'daily', days: [] }, startDate: '2026-10-19' })
  run({ type: 'AddAbsence', from: '2026-10-24', to: '2026-10-25' })
  s = { ...s, occurrences: generateOccurrences(s, '2026-10-19', 14) }

  const day = (date: LocalDate, available: number, units: string[], results: [string, Outcome | null, number | null][], checkIn?: { reflection: string; next: string; share?: string; reply?: string }) => {
    set(date, '07:45'); run({ type: 'SetDraft', date, available, unitIds: units })
    set(date, '07:50'); run({ type: 'CommitPlan', date, acknowledged: true, expectedRev: 0, note: '' })
    let t = 10
    for (const [u, outcome, mins] of results) {
      if (!outcome) continue
      set(date, `${t++}:00`)
      run({ type: 'RecordResult', date, unitId: u, outcome, actualMin: mins, note: '', performedAt: clock, expectedEventId: currentEvent(s, date, u)?.id ?? null })
    }
    if (checkIn) {
      set(date, '20:40'); run({ type: 'SubmitPrivateCheckIn', date, reflection: checkIn.reflection, nextStep: checkIn.next, expectedRev: 0 })
      if (checkIn.share !== undefined) share('checkin', date, units, ['criterion', 'outcome', 'actualMin'], checkIn.share, '20:45')
      if (checkIn.reply) {
        set(date, '21:30')
        const snap = s.snapshots.filter((x) => x.date === date && x.kind === 'checkin').at(-1)!
        run({ type: 'PeerReply', snapshotId: snap.id, text: checkIn.reply, suggestion: null })
      }
    }
  }
  const share = (kind: 'plan' | 'checkin', date: LocalDate, units: string[], fields: ShareField[], message: string, time: string) => {
    set(date, time)
    const pv = buildPreview(s, kind, date, units, fields, message)
    if ('error' in pv) throw new Error(pv.error)
    run({ type: 'Publish', kind, date, unitIds: units, fields, message, previewDigest: pv.digest })
  }

  const W = (d: LocalDate) => occKey('w', d)
  const K = (d: LocalDate) => occKey('k', d)
  day('2026-10-20', 60, [W('2026-10-20'), K('2026-10-20')], [[W('2026-10-20'), 'completed', 35], [K('2026-10-20'), 'completed', 20]],
    { reflection: 'Writing before email worked.', next: 'Keep writing first.', share: 'Good start to the week.', reply: 'Nice — writing first clearly helps. Same again tomorrow?' })
  day('2026-10-21', 45, [W('2026-10-21'), K('2026-10-21')], [[W('2026-10-21'), 'partial', 15], [K('2026-10-21'), 'skipped', null]],
    { reflection: 'Calls ran long; walk skipped on purpose.', next: 'Block 30 min before the first call.' })
  day('2026-10-22', 60, [W('2026-10-22'), K('2026-10-22')], [[W('2026-10-22'), 'completed', 30], [K('2026-10-22'), null, null]])
  // Friday's writing moves to Monday: Monday then has two distinct writing opportunities (A11).
  set('2026-10-23', '07:30'); run({ type: 'MoveUnit', unitId: W('2026-10-23'), toDate: '2026-10-26' })
  day('2026-10-23', 40, [K('2026-10-23')], [[K('2026-10-23'), 'completed', 25]],
    { reflection: 'Moved writing to Monday instead of forcing it.', next: 'Do both writing sessions Monday.', share: 'Moved Friday’s writing to Monday.', reply: 'Moving it beats skipping it. Good luck Monday.' })
  day('2026-10-26', 75, [W('2026-10-23'), W('2026-10-26'), K('2026-10-26')], [[W('2026-10-23'), 'completed', 30], [W('2026-10-26'), 'missed', null], [K('2026-10-26'), 'completed', 20]],
    { reflection: 'Two writing blocks was too much after a weekend away.', next: 'One writing block per day.' })

  // Tuesday 27 October — the worked fixture.
  const T = '2026-10-27'
  set(T, '07:40')
  run({ type: 'CreateAction', id: 'project', title: 'Proposal section 2', criterion: 'Section 2 drafted end to end', estimate: 45, cue: null, goal: 'Client proposal', plannedDate: T, deadline: '2026-10-30', notes: 'Pricing table can wait for Thursday.' })
  run({ type: 'SetDraft', date: T, available: 60, unitIds: [W(T), K(T), 'project'] })
  set(T, '07:55'); run({ type: 'CommitPlan', date: T, acknowledged: true, expectedRev: 0, note: 'Knowingly over by 35 minutes.' })
  share('plan', T, [W(T), K(T)], ['criterion', 'estimate'], '', '08:05')
  set(T, '10:15'); run({ type: 'RecordResult', date: T, unitId: W(T), outcome: 'partial', actualMin: 15, note: 'Got 140 words.', performedAt: at(T, '09:00'), expectedEventId: null })
  set(T, '12:30'); run({ type: 'MoveUnit', unitId: 'project', toDate: '2026-10-28' })
  run({ type: 'CreateAction', id: 'review', title: 'Review invoices', criterion: 'All October invoices checked', estimate: 10, cue: null, goal: null, plannedDate: T, deadline: null, notes: '' })
  run({ type: 'SetDraft', date: T, available: 60, unitIds: [W(T), K(T), 'review'] })
  run({ type: 'CommitPlan', date: T, acknowledged: false, expectedRev: latestPlanRev(s, T)!.rev, note: 'Moved the project to Wednesday; added a short review.' })
  set(T, '13:40'); run({ type: 'RecordResult', date: T, unitId: K(T), outcome: 'completed', actualMin: 20, note: '', performedAt: at(T, '13:15'), expectedEventId: null })
  set(T, '20:50'); run({ type: 'SubmitPrivateCheckIn', date: T, reflection: 'Writing stalled after 140 words. The overload this morning was obvious; moving the project helped.', nextStep: 'Smaller writing target tomorrow.', expectedRev: latestCheckIn(s, T)?.rev ?? 0 })
  share('checkin', T, [W(T), K(T), 'review'], ['criterion', 'outcome', 'actualMin'], 'Partial writing day, walk done. Moved the proposal to Wednesday.', '20:55')
  set(T, '21:05')
  const snap = s.snapshots.filter((x) => x.date === T && x.kind === 'checkin').at(-1)!
  run({ type: 'PeerReply', snapshotId: snap.id, text: 'Moving the proposal was the right call. For writing, maybe aim smaller so it is easy to start?', suggestion: { title: 'Write 150 words before email', criterion: '150 words, nothing else first', estimate: 15 } })

  s.sim.now = at(T, '21:10')
  return s
}

function at(date: LocalDate, time: string) {
  return resolveLocal(date, time.padStart(5, '0'), ZONE).utc
}
