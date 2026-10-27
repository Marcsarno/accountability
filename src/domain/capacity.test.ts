import { describe, expect, it } from 'vitest'
import { summarizeCapacity } from './capacity'
import { replyDue } from './reply'
import { resolveLocal } from './time'

describe('A02 capacity', () => {
  it('95 proposed with 60 available shows overload 35 and needs acknowledgement', () => {
    const s = summarizeCapacity(60, [{ estimate: 30 }, { estimate: 20 }, { estimate: 45 }])
    expect(s).toMatchObject({ knownTotal: 95, overload: 35, verdict: 'over', needsAcknowledgement: true })
  })
  it('missing estimate is unknown, never a fits claim', () => {
    const s = summarizeCapacity(60, [{ estimate: 30 }, { estimate: null }])
    expect(s).toMatchObject({ knownTotal: 30, unknownCount: 1, verdict: 'incomplete', needsAcknowledgement: true })
  })
  it('A03 revised Tuesday totals 60 and fits', () => {
    expect(summarizeCapacity(60, [{ estimate: 30 }, { estimate: 20 }, { estimate: 10 }]).verdict).toBe('fits')
  })
})

describe('A19 reply window', () => {
  it('23:00 publication with 15h minimum resolves to 14:00 next day', () => {
    const z = 'America/New_York'
    const normal = resolveLocal('2026-10-28', '12:00', z).utc
    const published = resolveLocal('2026-10-27', '23:00', z).utc
    expect(replyDue(normal, published, 15)).toBe(resolveLocal('2026-10-28', '14:00', z).utc)
  })
  it('on-time publication keeps the normal deadline', () => {
    const z = 'America/New_York'
    const normal = resolveLocal('2026-10-28', '12:00', z).utc
    expect(replyDue(normal, resolveLocal('2026-10-27', '20:00', z).utc, 15)).toBe(normal)
  })
})
