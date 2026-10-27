import type { LocalDate, Zone } from './time'

export type Id = string
/** A plannable unit: a one-time action id, or an occurrence key `${seriesId}@${originDate}`. */
export type UnitId = string
export type Outcome = 'completed' | 'partial' | 'missed' | 'skipped'

export interface Action {
  id: Id
  title: string
  criterion: string
  estimate: number | null
  cue: string | null
  goal: string | null
  plannedDate: LocalDate | null
  deadline: LocalDate | null
  notes: string
  createdAt: string
  /** Set once converted to repeating; history and notes stay on this action. */
  seriesId: Id | null
  withdrawn: boolean
  trashedAt: string | null
  /** How the action came about when it wasn't captured directly. Absent on actions saved before this field existed. */
  origin?: ActionOrigin
}

export type ActionOrigin =
  /** Planned from the "next step" of the private check-in on `checkInDate`. */
  | { kind: 'next-step'; checkInDate: LocalDate }
  /** A partner's suggestion the owner accepted as a draft (A18). */
  | { kind: 'suggestion'; feedbackId: Id }

export interface RepeatRule {
  kind: 'daily' | 'weekdays'
  /** 1 = Monday … 7 = Sunday; used when kind = 'weekdays'. */
  days: number[]
}

export interface SeriesRevision {
  rev: number
  effectiveFrom: LocalDate
  title: string
  criterion: string
  estimate: number | null
  cue: string | null
  rule: RepeatRule
}

export interface Series {
  id: Id
  sourceActionId: Id
  zone: Zone
  startDate: LocalDate
  revisions: SeriesRevision[]
  trashedAt: string | null
}

export interface Occurrence {
  key: UnitId
  seriesId: Id
  originDate: LocalDate
  displayDate: LocalDate
  /** Series revision it was generated from (not part of identity). */
  ruleRev: number
  overrides: Partial<Pick<Action, 'title' | 'criterion' | 'estimate' | 'cue'>>
  /** Changed individually (moved/edited) — protected from series-wide edits. */
  exception: boolean
  withdrawn: boolean
}

export interface PlanEntry {
  unitId: UnitId
  title: string
  criterion: string
  estimate: number | null
  cue: string | null
}

export interface PlanRevision {
  rev: number
  at: string
  available: number
  entries: PlanEntry[]
  acknowledged: boolean
  note: string
}

export interface DayPlan {
  date: LocalDate
  /** Frozen at first commitment. */
  zone: Zone
  draft: { available: number; unitIds: UnitId[] }
  revisions: PlanRevision[]
}

export interface ProgressEvent {
  id: Id
  date: LocalDate
  unitId: UnitId
  outcome: Outcome
  actualMin: number | null
  note: string
  performedAt: string
  recordedAt: string
  corrects: Id | null
}

export interface CheckInRevision {
  date: LocalDate
  rev: number
  at: string
  planRev: number
  resultEventIds: Id[]
  reflection: string
  nextStep: string
}

export type ShareField = 'title' | 'criterion' | 'estimate' | 'deadline' | 'cue' | 'outcome' | 'actualMin'

export interface SharedItem {
  unitId: UnitId
  title: string
  criterion?: string
  estimate?: number | null
  deadline?: LocalDate | null
  cue?: string | null
  outcome?: Outcome | 'unreported'
  actualMin?: number | null
}

export interface ShareSnapshot {
  id: Id
  kind: 'plan' | 'checkin'
  date: LocalDate
  version: number
  sourceRev: number
  agreementId: Id
  agreementVersion: number
  recipientId: Id
  items: SharedItem[]
  message: string
  digest: string
  publishedAt: string
  /** Fixed by the FIRST published check-in; amendments never move it. */
  replyDue: string | null
}

export interface AgreementTerms {
  checkInDays: number[]
  cutoff: string
  replyTime: string
  minIntervalHours: number
  quietStart: string
  quietEnd: string
  followUpAllowed: boolean
}

export type AgreementStatus = 'invited' | 'active' | 'paused' | 'ended' | 'declined' | 'expired' | 'withdrawn'

export interface Agreement {
  id: Id
  peer: { id: Id; name: string; email: string }
  version: number
  status: AgreementStatus
  terms: AgreementTerms
  invitedAt: string
  expiresAt: string
  acceptedAt: string | null
  pause: null | { by: 'owner' | 'peer'; at: string; resumeRequestedBy: 'owner' | 'peer' | null }
  blocked: boolean
  history: { at: string; event: string }[]
}

export interface Feedback {
  id: Id
  snapshotId: Id
  snapshotVersion: number
  date: LocalDate
  text: string
  suggestion: null | { title: string; criterion: string; estimate: number | null }
  at: string
  acceptedActionId: Id | null
  reported: boolean
}

export interface Absence {
  id: Id
  from: LocalDate
  to: LocalDate
  createdAt: string
}

export type SyncState = 'device' | 'queued' | 'synced'

export interface CommandRecord {
  key: string
  type: string
  hash: string
  at: string
  sync: SyncState
}

export interface SimNotice {
  id: string
  logicalKey: string
  kind: 'checkin-reminder' | 'share-followup' | 'partner-result'
  dueAt: string
  status: 'scheduled' | 'suppressed' | 'provider-accepted'
  text: string
  reason?: string
}

export interface ReportCase {
  id: Id
  feedbackId: Id
  at: string
  status: 'open'
}

export interface Experiment {
  /** Last day of the reviewed week. The experiment runs from that day for seven days. */
  weekEnd: LocalDate
  text: string
  at: string
}

export interface Settings {
  reminderTime: string | null
  quietStart: string
  quietEnd: string
  motion: 'system' | 'reduced'
}

export interface AppState {
  schema: 1
  owner: { id: Id; name: string; zone: Zone }
  /** Simulation controls (Phase 0 only). */
  sim: { now: string | null; online: boolean; view: 'owner' | 'peer' }
  actions: Record<Id, Action>
  series: Record<Id, Series>
  occurrences: Record<UnitId, Occurrence>
  plans: Record<LocalDate, DayPlan>
  events: ProgressEvent[]
  checkIns: CheckInRevision[]
  snapshots: ShareSnapshot[]
  agreements: Agreement[]
  feedback: Feedback[]
  absences: Absence[]
  commands: CommandRecord[]
  notices: SimNotice[]
  reports: ReportCase[]
  /** Units (actions or series ids) whose shared copies are no longer visible to partners. */
  revokedUnits: string[]
  experiments: Experiment[]
  settings: Settings
  onboarded: boolean
}
