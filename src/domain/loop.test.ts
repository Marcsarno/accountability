import { describe, expect, it } from 'vitest'
import { currentEvent, dispatch, draftFor } from './commands'
import { buildSampleState } from './fixture'
import { emptyState } from './initial'
import { defaultPerformedTime, quickResult } from './results'
import { carryForward, currentExperiment } from './review'
import type { AppState } from './types'

const T = '2026-10-27'
const ctx = { now: '2026-10-28T01:30:00Z', id: (() => { let i = 0; return () => `l${++i}` })() }
const run = (s: AppState, cmd: Parameters<typeof dispatch>[2], key = ctx.id()) => {
  const r = dispatch(s, key, cmd, ctx)
  if (!r.ok) throw new Error(r.message)
  return r.state
}
const createFromNextStep = (s: AppState, id: string, checkInDate: string) => run(s, {
  type: 'CreateAction', id, title: 'Write 150 words', criterion: '150 words', estimate: 15, cue: null, goal: null,
  plannedDate: '2026-10-28', deadline: null, notes: '', origin: { kind: 'next-step', checkInDate },
})

describe('closing the loop', () => {
  it('A08: the chosen experiment stays in force for seven days, then lapses', () => {
    const s = run(buildSampleState(), { type: 'SetExperiment', weekEnd: T, text: 'Plan within your time' })
    expect(currentExperiment(s, T)?.text).toBe('Plan within your time')
    expect(currentExperiment(s, '2026-11-02')?.text).toBe('Plan within your time')
    expect(currentExperiment(s, '2026-11-03')).toBeNull()
    expect(currentExperiment(s, '2026-10-26')).toBeNull()
  })
  it('A08: choosing again replaces the experiment in force', () => {
    let s = run(buildSampleState(), { type: 'SetExperiment', weekEnd: T, text: 'First' })
    s = run(s, { type: 'SetExperiment', weekEnd: '2026-10-29', text: 'Second' })
    expect(currentExperiment(s, '2026-10-30')?.text).toBe('Second')
  })
  it('carries the latest earlier check-in’s next step into the next day', () => {
    const cf = carryForward(buildSampleState(), '2026-10-28')
    expect(cf.nextStep).toEqual({ fromDate: T, text: 'Smaller writing target tomorrow.' })
    expect(carryForward(buildSampleState(), T).nextStep?.fromDate).not.toBe(T) // never the day's own check-in
  })
  it('uses the newest check-in revision, and offers nothing when it has no next step', () => {
    const s = run(buildSampleState(), { type: 'SubmitPrivateCheckIn', date: T, reflection: 'x', nextStep: '  ', expectedRev: 1 })
    expect(carryForward(s, '2026-10-28').nextStep).toBeNull()
  })
  it('does not offer a next step more than a week old', () => {
    expect(carryForward(buildSampleState(), '2026-11-04').nextStep).toBeNull()
  })
  it('stops offering a next step once it has been planned, and records where the action came from', () => {
    const s = createFromNextStep(buildSampleState(), 'n1', T)
    expect(s.actions.n1.origin).toEqual({ kind: 'next-step', checkInDate: T })
    expect(carryForward(s, '2026-10-28').nextStep).toBeNull()
  })
  it('rejects origins that don’t match real records', () => {
    expect(dispatch(buildSampleState(), 'bad', {
      type: 'CreateAction', id: 'n2', title: 'x', criterion: '', estimate: null, cue: null, goal: null, plannedDate: null, deadline: null, notes: '',
      origin: { kind: 'next-step', checkInDate: '2026-10-01' },
    }, ctx).ok).toBe(false)
    expect(dispatch(buildSampleState(), 'bad2', {
      type: 'CreateAction', id: 'n3', title: 'x', criterion: '', estimate: null, cue: null, goal: null, plannedDate: null, deadline: null, notes: '',
      origin: { kind: 'suggestion', feedbackId: 'f' },
    }, ctx).ok).toBe(false)
  })
  it('A18: an accepted suggestion is marked as the partner’s, without notes written for the owner', () => {
    const s0 = buildSampleState()
    const f = s0.feedback.find((x) => x.suggestion)!
    const s = run(s0, { type: 'AcceptSuggestion', feedbackId: f.id, actionId: 'sug' })
    expect(s.actions.sug.origin).toEqual({ kind: 'suggestion', feedbackId: f.id })
    expect(s.actions.sug.notes).toBe('')
  })
  it('reading a day’s draft never creates a plan', () => {
    const s = emptyState('UTC')
    expect(draftFor(s, '2026-10-30')).toEqual({ available: 60, unitIds: [] })
    expect(s.plans).toEqual({})
  })
})

describe('quick results', () => {
  it('A06: an earlier day’s result defaults to a stated evening time; today uses now', () => {
    expect(defaultPerformedTime('2026-10-26', T, '2026-10-27T14:05:00Z', 'America/New_York')).toBe('18:00')
    expect(defaultPerformedTime(T, T, '2026-10-27T14:05:00Z', 'America/New_York')).toBe('10:05')
  })
  it('A04: a first quick report records only the outcome, never inferred minutes', () => {
    const s = buildSampleState()
    const cmd = quickResult(s, T, 'review', 'completed', '2026-10-27T22:00:00Z', T)
    expect(cmd).toMatchObject({ type: 'RecordResult', outcome: 'completed', actualMin: null, expectedEventId: null, performedAt: '2026-10-27T22:00:00Z' })
  })
  it('A05: a quick correction keeps the minutes, note and time already reported', () => {
    const s = buildSampleState()
    const writing = Object.keys(s.occurrences).find((k) => k.startsWith('w@') && k.endsWith(T))!
    const before = currentEvent(s, T, writing)!
    const after = run(s, quickResult(s, T, writing, 'completed', ctx.now, T))
    const ev = currentEvent(after, T, writing)!
    expect(ev).toMatchObject({ outcome: 'completed', actualMin: before.actualMin, note: before.note, performedAt: before.performedAt, corrects: before.id })
  })
})
