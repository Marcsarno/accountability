import { Temporal } from 'temporal-polyfill'

/** ISO local date, e.g. "2026-10-27". */
export type LocalDate = string
/** IANA zone, e.g. "America/New_York". */
export type Zone = string

export interface ResolvedInstant {
  /** UTC instant as ISO string. */
  utc: string
  /** Local wall time actually used (may differ from requested in a DST gap). */
  localUsed: string
  adjustment: 'none' | 'repeated-earlier' | 'gap-shifted'
}

/**
 * Resolve a local wall-clock time to one instant.
 * Repeated local time (fall back) → the earlier instant.
 * Nonexistent local time (spring forward) → first valid instant after the gap.
 */
export function resolveLocal(date: LocalDate, time: string, zone: Zone): ResolvedInstant {
  const pdt = Temporal.PlainDateTime.from(`${date}T${time}`)
  const earlier = pdt.toZonedDateTime(zone, { disambiguation: 'earlier' })
  const later = pdt.toZonedDateTime(zone, { disambiguation: 'later' })
  const back = earlier.toPlainDateTime()
  if (Temporal.PlainDateTime.compare(back, pdt) !== 0) {
    // Gap: the wall time does not exist. Use the transition instant itself.
    const zdt = earlier.getTimeZoneTransition('next')!
    return { utc: zdt.toInstant().toString(), localUsed: zdt.toPlainDateTime().toString({ smallestUnit: 'minute' }), adjustment: 'gap-shifted' }
  }
  const repeated = !earlier.toInstant().equals(later.toInstant())
  return {
    utc: earlier.toInstant().toString(),
    localUsed: back.toString({ smallestUnit: 'minute' }),
    adjustment: repeated ? 'repeated-earlier' : 'none',
  }
}

/** A date-only hard deadline ends at the next local midnight in its stored zone. */
export function deadlineEnd(date: LocalDate, zone: Zone): string {
  const next = Temporal.PlainDate.from(date).add({ days: 1 })
  return next.toZonedDateTime({ timeZone: zone }).toInstant().toString()
}

export function addDays(date: LocalDate, n: number): LocalDate {
  return Temporal.PlainDate.from(date).add({ days: n }).toString()
}

/** 1 = Monday … 7 = Sunday */
export function weekday(date: LocalDate): number {
  return Temporal.PlainDate.from(date).dayOfWeek
}

export function compareDates(a: LocalDate, b: LocalDate): number {
  return Temporal.PlainDate.compare(Temporal.PlainDate.from(a), Temporal.PlainDate.from(b))
}

export function todayIn(zone: Zone, now: Temporal.Instant = Temporal.Now.instant()): LocalDate {
  return now.toZonedDateTimeISO(zone).toPlainDate().toString()
}

export function dateRange(from: LocalDate, days: number): LocalDate[] {
  return Array.from({ length: days }, (_, i) => addDays(from, i))
}

export { Temporal }
