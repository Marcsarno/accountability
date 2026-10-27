import { currentEvent, latestCheckIn } from './commands'
import { inAbsence, resolveUnit } from './recurrence'
import { addDays, type LocalDate } from './time'
import type { AppState, Outcome, UnitId } from './types'

export type OutcomeOrUnknown = Outcome | 'unreported'
export const OUTCOMES: OutcomeOrUnknown[] = ['completed', 'partial', 'missed', 'skipped', 'unreported']

export interface DaySummary {
  date: LocalDate
  planned: boolean
  absent: boolean
  originalCount: number
  currentCount: number
  revisions: number
  counts: Record<OutcomeOrUnknown, number>
  /** In the original commitment but not the current one (moved, withdrawn or removed). */
  leftOriginal: { unitId: UnitId; title: string; now: string }[]
  addedAfter: { unitId: UnitId; title: string }[]
  estimateKnown: number
  estimateUnknown: number
  actualMin: number
  checkedIn: boolean
  sharedPlan: boolean
  sharedCheckIn: boolean
}

const emptyCounts = (): Record<OutcomeOrUnknown, number> => ({ completed: 0, partial: 0, missed: 0, skipped: 0, unreported: 0 })

export function summarizeDay(state: AppState, date: LocalDate): DaySummary {
  const plan = state.plans[date]
  const first = plan?.revisions[0]
  const last = plan?.revisions.at(-1)
  const counts = emptyCounts()
  let estimateKnown = 0, estimateUnknown = 0, actualMin = 0
  for (const e of last?.entries ?? []) {
    const ev = currentEvent(state, date, e.unitId)
    counts[ev?.outcome ?? 'unreported']++
    if (e.estimate == null) estimateUnknown++; else estimateKnown += e.estimate
    actualMin += ev?.actualMin ?? 0
  }
  const currentIds = new Set(last?.entries.map((e) => e.unitId) ?? [])
  const originalIds = new Set(first?.entries.map((e) => e.unitId) ?? [])
  const leftOriginal = (first?.entries ?? []).filter((e) => !currentIds.has(e.unitId)).map((e) => {
    const u = resolveUnit(state, e.unitId)
    const now = !u ? 'removed' : u.withdrawn ? 'withdrawn' : u.date && u.date !== date ? `moved to ${u.date}` : 'removed from plan'
    return { unitId: e.unitId, title: e.title, now }
  })
  const addedAfter = (last?.entries ?? []).filter((e) => !originalIds.has(e.unitId)).map((e) => ({ unitId: e.unitId, title: e.title }))
  const snaps = state.snapshots.filter((s) => s.date === date)
  return {
    date, planned: !!last, absent: inAbsence(state.absences, date),
    originalCount: first?.entries.length ?? 0, currentCount: last?.entries.length ?? 0, revisions: plan?.revisions.length ?? 0,
    counts, leftOriginal, addedAfter, estimateKnown, estimateUnknown, actualMin,
    checkedIn: !!latestCheckIn(state, date),
    sharedPlan: snaps.some((s) => s.kind === 'plan'), sharedCheckIn: snaps.some((s) => s.kind === 'checkin'),
  }
}

export interface WeekSummary {
  days: DaySummary[]
  plannedDays: number
  checkedInDays: number
  absentDays: number
  counts: Record<OutcomeOrUnknown, number>
  originalItems: number
  currentItems: number
  movedOrRemoved: number
}

/** Seven days ending on `end` (inclusive). Denominators are explicit; no composite score. */
export function summarizeWeek(state: AppState, end: LocalDate): WeekSummary {
  const days = Array.from({ length: 7 }, (_, i) => summarizeDay(state, addDays(end, i - 6)))
  const counts = emptyCounts()
  for (const d of days) for (const k of OUTCOMES) counts[k] += d.counts[k]
  return {
    days, counts,
    plannedDays: days.filter((d) => d.planned).length,
    checkedInDays: days.filter((d) => d.checkedIn).length,
    absentDays: days.filter((d) => d.absent).length,
    originalItems: days.reduce((s, d) => s + d.originalCount, 0),
    currentItems: days.reduce((s, d) => s + d.currentCount, 0),
    movedOrRemoved: days.reduce((s, d) => s + d.leftOriginal.length, 0),
  }
}
