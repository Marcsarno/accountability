import type { Absence, AppState, Occurrence, RepeatRule, Series, SeriesRevision, UnitId } from './types'
import { compareDates, dateRange, weekday, type LocalDate } from './time'

export const occKey = (seriesId: string, originDate: LocalDate): UnitId => `${seriesId}@${originDate}`
export const isOccKey = (unitId: UnitId) => unitId.includes('@')

export function ruleMatches(rule: RepeatRule, date: LocalDate): boolean {
  return rule.kind === 'daily' || rule.days.includes(weekday(date))
}

/** The series revision in force on a given origin date. */
export function revisionFor(series: Series, date: LocalDate): SeriesRevision | null {
  let found: SeriesRevision | null = null
  for (const r of series.revisions) if (compareDates(r.effectiveFrom, date) <= 0) found = r
  return found
}

export function inAbsence(absences: Absence[], date: LocalDate): boolean {
  return absences.some((a) => compareDates(a.from, date) <= 0 && compareDates(date, a.to) <= 0)
}

/**
 * Generate missing occurrences for [from, from+days). Idempotent: identity is
 * series + origin date, so running twice never duplicates (A11).
 * Planning absences suppress generation for future dates only.
 */
export function generateOccurrences(state: AppState, from: LocalDate, days: number): Record<UnitId, Occurrence> {
  const out = { ...state.occurrences }
  for (const s of Object.values(state.series)) {
    if (s.trashedAt) continue
    for (const date of dateRange(from, days)) {
      if (compareDates(date, s.startDate) < 0) continue
      const rev = revisionFor(s, date)
      if (!rev || !ruleMatches(rev.rule, date)) continue
      if (inAbsence(state.absences, date)) continue
      const key = occKey(s.id, date)
      if (out[key]) continue
      out[key] = { key, seriesId: s.id, originDate: date, displayDate: date, ruleRev: rev.rev, overrides: {}, exception: false, withdrawn: false }
    }
  }
  return out
}

export interface UnitView {
  unitId: UnitId
  kind: 'action' | 'occurrence'
  title: string
  criterion: string
  estimate: number | null
  cue: string | null
  goal: string | null
  deadline: LocalDate | null
  date: LocalDate | null
  originDate: LocalDate | null
  seriesId: string | null
  moved: boolean
  exception: boolean
  withdrawn: boolean
  trashed: boolean
}

export function resolveUnit(state: AppState, unitId: UnitId): UnitView | null {
  if (isOccKey(unitId)) {
    const o = state.occurrences[unitId]
    if (!o) return null
    const s = state.series[o.seriesId]
    const rev = s.revisions.find((r) => r.rev === o.ruleRev) ?? s.revisions[0]
    const src = state.actions[s.sourceActionId]
    return {
      unitId, kind: 'occurrence',
      title: o.overrides.title ?? rev.title,
      criterion: o.overrides.criterion ?? rev.criterion,
      estimate: o.overrides.estimate !== undefined ? o.overrides.estimate : rev.estimate,
      cue: o.overrides.cue !== undefined ? o.overrides.cue : rev.cue,
      goal: src?.goal ?? null, deadline: null,
      date: o.displayDate, originDate: o.originDate, seriesId: s.id,
      moved: o.displayDate !== o.originDate, exception: o.exception, withdrawn: o.withdrawn, trashed: !!s.trashedAt,
    }
  }
  const a = state.actions[unitId]
  if (!a) return null
  return {
    unitId, kind: 'action', title: a.title, criterion: a.criterion, estimate: a.estimate, cue: a.cue, goal: a.goal,
    deadline: a.deadline, date: a.plannedDate, originDate: null, seriesId: a.seriesId, moved: false, exception: false,
    withdrawn: a.withdrawn, trashed: !!a.trashedAt,
  }
}

/** Units available to plan on a date: one-time actions planned there + open occurrences displayed there. */
export function unitsOn(state: AppState, date: LocalDate): UnitView[] {
  const units: UnitView[] = []
  for (const a of Object.values(state.actions)) {
    if (a.seriesId || a.trashedAt || a.withdrawn || a.plannedDate !== date) continue
    units.push(resolveUnit(state, a.id)!)
  }
  for (const o of Object.values(state.occurrences)) {
    if (o.displayDate !== date || o.withdrawn) continue
    const u = resolveUnit(state, o.key)
    if (u && !u.trashed) units.push(u)
  }
  return units
}

export interface SeriesEditPreview {
  untouched: UnitView[]
  exceptions: UnitView[]
  committed: UnitView[]
}

/** Preview a prospective series edit: untouched future copies vs. changed/committed ones (A09). */
export function previewSeriesEdit(state: AppState, seriesId: string, effectiveFrom: LocalDate, committedUnitIds: Set<UnitId>): SeriesEditPreview {
  const p: SeriesEditPreview = { untouched: [], exceptions: [], committed: [] }
  for (const o of Object.values(state.occurrences)) {
    if (o.seriesId !== seriesId || o.withdrawn || compareDates(o.originDate, effectiveFrom) < 0) continue
    const u = resolveUnit(state, o.key)!
    if (committedUnitIds.has(o.key)) p.committed.push(u)
    else if (o.exception) p.exceptions.push(u)
    else p.untouched.push(u)
  }
  const byDate = (a: UnitView, b: UnitView) => compareDates(a.originDate!, b.originDate!)
  p.untouched.sort(byDate); p.exceptions.sort(byDate); p.committed.sort(byDate)
  return p
}
