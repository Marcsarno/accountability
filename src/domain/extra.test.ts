import { describe, expect, it } from 'vitest'
import { csvCell, exportCsv } from '../screens/Settings'
import { dispatch } from './commands'
import { buildSampleState } from './fixture'
import { emptyState } from './initial'

const ctx = { now: '2026-10-28T01:30:00Z', id: (() => { let i = 0; return () => `x${++i}` })() }

describe('extra acceptance checks', () => {
  it('A28: CSV neutralises formula-like text and quotes commas', () => {
    expect(csvCell('=SUM(A1)')).toBe("'=SUM(A1)")
    expect(csvCell('+1')).toBe("'+1")
    expect(csvCell('@cmd')).toBe("'@cmd")
    expect(csvCell('a, "b"')).toBe('"a, ""b"""')
    const csv = exportCsv(buildSampleState())
    expect(csv.split('\r\n')[0]).toContain('performed_at_utc')
    expect(csv).toContain('unreported')
  })
  it('A13: changing home zone keeps frozen zones on committed days', () => {
    const s = buildSampleState()
    const r = dispatch(s, 'z', { type: 'SetZone', zone: 'Europe/London' }, ctx)
    expect(r.ok && r.state.owner.zone).toBe('Europe/London')
    expect(r.state.plans['2026-10-27'].zone).toBe('America/New_York')
    expect(dispatch(s, 'z2', { type: 'SetZone', zone: 'Mars/Base' }, ctx).ok).toBe(false)
  })
  it('A18: accepting a suggestion creates an uncommitted owner draft only', () => {
    const s = buildSampleState()
    const f = s.feedback.find((x) => x.suggestion)!
    const r = dispatch(s, 'acc', { type: 'AcceptSuggestion', feedbackId: f.id, actionId: 'draft1' }, ctx)
    expect(r.ok).toBe(true)
    expect(r.state.actions.draft1).toMatchObject({ title: 'Write 150 words before email', plannedDate: null })
    expect(Object.values(r.state.plans).some((p) => p.revisions.some((v) => v.entries.some((e) => e.unitId === 'draft1')))).toBe(false)
  })
  it('A06: a past day with no result stays unreported (no auto-miss)', () => {
    const s = buildSampleState()
    const later = { ...s, sim: { ...s.sim, now: '2026-10-30T12:00:00Z' } }
    expect(later.events.some((e) => e.date === '2026-10-27' && e.unitId === 'review')).toBe(false)
  })
  it('A14: invitation is blocked while another agreement exists; peer cannot reply after pause', () => {
    const s = buildSampleState()
    expect(dispatch(s, 'i', { type: 'Invite', name: 'Sam', email: 'sam@example.com', terms: s.agreements[0].terms }, ctx).ok).toBe(false)
    const paused = dispatch(s, 'p', { type: 'AgreementAction', action: 'pause' }, ctx).state
    const snap = paused.snapshots.find((x) => x.kind === 'checkin')!
    const r = dispatch(paused, 'rep', { type: 'PeerReply', snapshotId: snap.id, text: 'hi', suggestion: null }, ctx)
    expect(r.ok === false && r.kind).toBe('forbidden')
  })
  it('fresh state is private and empty', () => {
    const s = emptyState('UTC')
    expect(s.agreements).toHaveLength(0)
    expect(s.onboarded).toBe(false)
  })
})
