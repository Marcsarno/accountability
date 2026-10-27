/** Starting point for "time available" on a day the owner hasn't set yet. */
export const DEFAULT_AVAILABLE_MIN = 60

export interface CapacityEntry {
  /** Minutes, or null when the estimate is unknown. Unknown is never zero. */
  estimate: number | null
}

export interface CapacitySummary {
  available: number
  knownTotal: number
  unknownCount: number
  /** Known minutes beyond what is available (0 when within). */
  overload: number
  /** 'fits' only when every estimate is known and the total is within capacity. */
  verdict: 'fits' | 'over' | 'incomplete' | 'over-and-incomplete'
  needsAcknowledgement: boolean
}

export function summarizeCapacity(available: number, entries: CapacityEntry[]): CapacitySummary {
  const knownTotal = entries.reduce((s, e) => s + (e.estimate ?? 0), 0)
  const unknownCount = entries.filter((e) => e.estimate == null).length
  const overload = Math.max(0, knownTotal - available)
  const over = overload > 0
  const verdict = over && unknownCount ? 'over-and-incomplete' : over ? 'over' : unknownCount ? 'incomplete' : 'fits'
  return { available, knownTotal, unknownCount, overload, verdict, needsAcknowledgement: verdict !== 'fits' }
}
