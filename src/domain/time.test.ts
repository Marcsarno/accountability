import { describe, expect, it } from 'vitest'
import { deadlineEnd, resolveLocal } from './time'

describe('A12/A13 local time resolution', () => {
  it('A12: repeated New York 01:30 on 2026-11-01 resolves to the earlier 05:30 UTC', () => {
    const r = resolveLocal('2026-11-01', '01:30', 'America/New_York')
    expect(r.utc).toBe('2026-11-01T05:30:00Z')
    expect(r.adjustment).toBe('repeated-earlier')
    // Resolving again (a retry) yields the same logical instant.
    expect(resolveLocal('2026-11-01', '01:30', 'America/New_York').utc).toBe(r.utc)
  })
  it('A13: nonexistent spring time shifts to first valid instant and says so', () => {
    const r = resolveLocal('2027-03-14', '02:30', 'America/New_York')
    expect(r.adjustment).toBe('gap-shifted')
    expect(r.utc).toBe('2027-03-14T07:00:00Z')
    expect(r.localUsed).toBe('2027-03-14T03:00')
  })
  it('ordinary time has no adjustment', () => {
    expect(resolveLocal('2026-10-27', '21:00', 'America/New_York')).toMatchObject({ utc: '2026-10-28T01:00:00Z', adjustment: 'none' })
  })
  it('date-only deadline ends at next local midnight', () => {
    expect(deadlineEnd('2026-10-30', 'America/New_York')).toBe('2026-10-31T04:00:00Z')
  })
})
