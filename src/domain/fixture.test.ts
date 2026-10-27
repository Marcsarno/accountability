import { describe, expect, it } from 'vitest'
import { buildPreview, dispatch } from './commands'
import { buildSampleState } from './fixture'
import { generateOccurrences, occKey, unitsOn } from './recurrence'
import { summarizeCapacity } from './capacity'
import { summarizeDay, summarizeWeek } from './review'

const T = '2026-10-27'
const ctx = { now: '2026-10-28T01:30:00Z', id: (() => { let i = 0; return () => `t${++i}` })() }

describe('handoff fixture', () => {
  const s = buildSampleState()
  it('A02/A03: original commitment overloaded by 35, revised Tuesday totals 60, Friday deadline unchanged', () => {
    const [r1, r2] = s.plans[T].revisions
    expect(summarizeCapacity(r1.available, r1.entries).overload).toBe(35)
    expect(r1.acknowledged).toBe(true)
    expect(r2.entries.reduce((a, e) => a + (e.estimate ?? 0), 0)).toBe(60)
    expect(s.actions.project.plannedDate).toBe('2026-10-28')
    expect(s.actions.project.deadline).toBe('2026-10-30')
  })
  it('A04: partial / complete / unknown, original vs current cohorts distinguishable', () => {
    const d = summarizeDay(s, T)
    expect(d.counts).toMatchObject({ partial: 1, completed: 1, unreported: 1 })
    expect(d.leftOriginal.map((x) => x.now)).toEqual(['moved to 2026-10-28'])
    expect(d.addedAfter.map((x) => x.title)).toEqual(['Review invoices'])
  })
  it('A07: plan snapshot exposes no results; check-in snapshot pins revisions; reply due 14:00 rule', () => {
    const plan = s.snapshots.find((x) => x.date === T && x.kind === 'plan')!
    expect(plan.items.every((i) => i.outcome === undefined)).toBe(true)
    expect(plan.replyDue).toBeNull()
    const ci = s.snapshots.find((x) => x.date === T && x.kind === 'checkin')!
    expect(ci.items.map((i) => i.outcome)).toEqual(['partial', 'completed', 'unreported'])
    expect(ci.replyDue).toBe('2026-10-28T16:00:00Z') // 12:00 EDT next day; 20:55 + 15h = 11:55 is earlier
  })
  it('A17: private reflection, notes and goal labels never appear in shared snapshots', () => {
    const text = JSON.stringify(s.snapshots)
    expect(text).not.toContain('Writing stalled')
    expect(text).not.toContain('Pricing table')
    expect(text).not.toContain('Finish the book draft')
    expect(text).not.toContain('After first coffee') // cue not selected
  })
  it('A11: moved Friday writing and Monday writing stay distinct; regeneration adds no duplicate', () => {
    const mon = unitsOn(s, '2026-10-26').filter((u) => u.seriesId === 'w').map((u) => u.originDate).sort()
    expect(mon).toEqual(['2026-10-23', '2026-10-26'])
    const again = generateOccurrences(s, '2026-10-19', 14)
    expect(Object.keys(again).length).toBe(Object.keys(s.occurrences).length)
    expect(again[occKey('w', '2026-10-23')].displayDate).toBe('2026-10-26')
  })
  it('A08: week review states denominators and absences', () => {
    const w = summarizeWeek(s, T)
    expect(w.plannedDays).toBe(5) // Oct 21–27
    expect(w.absentDays).toBe(2)
    expect(w.checkedInDays).toBe(4)
    expect(w.counts.unreported).toBe(2)
  })
  it('A05: retry with same key is a no-op; same key with different payload conflicts', () => {
    const cmd = { type: 'RecordResult' as const, date: T, unitId: 'review', outcome: 'completed' as const, actualMin: 10, note: '', performedAt: ctx.now, expectedEventId: null }
    const r1 = dispatch(s, 'k1', cmd, ctx)
    expect(r1.ok).toBe(true)
    const r2 = dispatch(r1.state, 'k1', cmd, ctx)
    expect(r2.ok && r2.replayed).toBe(true)
    expect(r2.state.events.length).toBe(r1.state.events.length)
    const r3 = dispatch(r1.state, 'k1', { ...cmd, outcome: 'missed' }, ctx)
    expect(r3.ok).toBe(false)
  })
  it('A16: stale preview is rejected after source changes', () => {
    const pv = buildPreview(s, 'checkin', T, ['review'], ['outcome'], 'hi')
    if ('error' in pv) throw new Error(pv.error)
    let r = dispatch(s, 'e1', { type: 'RecordResult', date: T, unitId: 'review', outcome: 'completed', actualMin: 8, note: '', performedAt: ctx.now, expectedEventId: null }, ctx)
    r = dispatch(r.state, 'e2', { type: 'SubmitPrivateCheckIn', date: T, reflection: '', nextStep: '', expectedRev: 1 }, ctx)
    const pub = dispatch(r.state, 'e3', { type: 'Publish', kind: 'checkin', date: T, unitIds: ['review'], fields: ['outcome'], message: 'hi', previewDigest: pv.digest }, ctx)
    expect(pub.ok === false && pub.kind).toBe('stale-preview')
  })
  it('A19/A20: amendment keeps the original reply deadline; old feedback names old version', () => {
    let st = dispatch(s, 'a1', { type: 'RecordResult', date: T, unitId: 'review', outcome: 'completed', actualMin: 8, note: '', performedAt: ctx.now, expectedEventId: null }, ctx).state
    st = dispatch(st, 'a2', { type: 'SubmitPrivateCheckIn', date: T, reflection: 'x', nextStep: '', expectedRev: 1 }, ctx).state
    const pv = buildPreview(st, 'checkin', T, ['review'], ['outcome'], 'Update: invoices done.')
    if ('error' in pv) throw new Error(pv.error)
    const r = dispatch(st, 'a3', { type: 'Publish', kind: 'checkin', date: T, unitIds: ['review'], fields: ['outcome'], message: 'Update: invoices done.', previewDigest: pv.digest }, ctx)
    expect(r.ok).toBe(true)
    const versions = r.state.snapshots.filter((x) => x.date === T && x.kind === 'checkin')
    expect(versions.map((v) => v.version)).toEqual([1, 2])
    expect(versions[1].replyDue).toBe(versions[0].replyDue)
    expect(r.state.feedback.find((f) => f.date === T)!.snapshotVersion).toBe(1)
    expect(r.state.notices.filter((x) => x.kind === 'partner-result' && x.logicalKey.includes(T)).length).toBe(1)
  })
  it('A09/A10: converting keeps the source action; series edit preserves exceptions', () => {
    expect(s.actions.writing.seriesId).toBe('w')
    const r = dispatch(s, 'se', { type: 'EditSeries', seriesId: 'w', effectiveFrom: '2026-10-23', patch: { title: 'Writing', criterion: '200 words', estimate: 20, cue: null, rule: { kind: 'weekdays', days: [1, 2, 3, 4, 5] } }, overwriteExceptions: [] }, ctx)
    expect(r.ok).toBe(true)
    const moved = r.state.occurrences[occKey('w', '2026-10-23')]
    expect(moved.ruleRev).toBe(1) // exception preserved
    expect(r.state.occurrences[occKey('w', '2026-10-29')].ruleRev).toBe(2) // untouched future copy follows
  })
  it('A21: trash revokes sharing and restore stays private', () => {
    let st = dispatch(s, 'tr', { type: 'TrashUnit', unitId: 'review' }, ctx).state
    st = dispatch(st, 'rs', { type: 'RestoreUnit', unitId: 'review' }, ctx).state
    expect(st.actions.review.trashedAt).toBeNull()
    expect(st.revokedUnits).toContain('review')
  })
  it('offline: publication is refused, private result queues', () => {
    const off = { ...s, sim: { ...s.sim, online: false } }
    const pv = buildPreview(off, 'plan', T, ['review'], [], '')
    if ('error' in pv) throw new Error(pv.error)
    expect(dispatch(off, 'o1', { type: 'Publish', kind: 'plan', date: T, unitIds: ['review'], fields: [], message: '', previewDigest: pv.digest }, ctx).ok).toBe(false)
    const r = dispatch(off, 'o2', { type: 'RecordResult', date: T, unitId: 'review', outcome: 'completed', actualMin: 10, note: '', performedAt: ctx.now, expectedEventId: null }, ctx)
    expect(r.ok && r.state.commands.at(-1)!.sync).toBe('queued')
  })
})
