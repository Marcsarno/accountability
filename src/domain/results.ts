import { currentEvent, type Command } from './commands'
import { Temporal, compareDates, resolveLocal, type LocalDate, type Zone } from './time'
import type { AppState, Outcome, UnitId } from './types'

/** Stated default for an earlier day's result when the owner doesn't give a time. */
export const LATE_ENTRY_DEFAULT_TIME = '18:00'

/** Local wall time a result is assumed to have happened at, before the owner edits it. */
export function defaultPerformedTime(date: LocalDate, today: LocalDate, now: string, zone: Zone): string {
  if (compareDates(date, today) < 0) return LATE_ENTRY_DEFAULT_TIME
  return Temporal.Instant.from(now).toZonedDateTimeISO(zone).toPlainTime().toString({ smallestUnit: 'minute' })
}

/**
 * One-tap result. A first report uses the default time; a correction changes only the outcome
 * and keeps the minutes, note and time already reported, so nothing the owner wrote is dropped.
 */
export function quickResult(state: AppState, date: LocalDate, unitId: UnitId, outcome: Outcome, now: string, today: LocalDate): Command {
  const latest = currentEvent(state, date, unitId)
  const zone = state.plans[date]?.zone ?? state.owner.zone
  return {
    type: 'RecordResult', date, unitId, outcome,
    actualMin: latest?.actualMin ?? null,
    note: latest?.note ?? '',
    performedAt: latest?.performedAt ?? resolveLocal(date, defaultPerformedTime(date, today, now, zone), zone).utc,
    expectedEventId: latest?.id ?? null,
  }
}
