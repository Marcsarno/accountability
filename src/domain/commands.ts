import { DEFAULT_AVAILABLE_MIN, summarizeCapacity } from './capacity'
import { replyDue } from './reply'
import { generateOccurrences, isOccKey, occKey, resolveUnit, unitsOn } from './recurrence'
import { addDays, compareDates, resolveLocal, weekday, type LocalDate } from './time'
import type {
  Action, ActionOrigin, Agreement, AgreementTerms, AppState, CheckInRevision, Outcome, PlanEntry, ProgressEvent, RepeatRule,
  DayPlan, ShareField, SharedItem, ShareSnapshot, UnitId,
} from './types'

export interface Ctx { now: string; id: () => string }

export type Command =
  | { type: 'CreateAction'; id: string; title: string; criterion: string; estimate: number | null; cue: string | null; goal: string | null; plannedDate: LocalDate | null; deadline: LocalDate | null; notes: string; origin?: ActionOrigin }
  | { type: 'EditAction'; id: string; patch: Partial<Pick<Action, 'title' | 'criterion' | 'estimate' | 'cue' | 'goal' | 'plannedDate' | 'deadline' | 'notes'>> }
  | { type: 'EditOccurrence'; key: UnitId; patch: Partial<Pick<Action, 'title' | 'criterion' | 'estimate' | 'cue'>> }
  | { type: 'MoveUnit'; unitId: UnitId; toDate: LocalDate | null }
  | { type: 'WithdrawUnit'; unitId: UnitId }
  | { type: 'MakeRepeating'; actionId: string; seriesId: string; rule: RepeatRule; startDate: LocalDate }
  | { type: 'EditSeries'; seriesId: string; effectiveFrom: LocalDate; patch: { title: string; criterion: string; estimate: number | null; cue: string | null; rule: RepeatRule }; overwriteExceptions: UnitId[] }
  | { type: 'SetDraft'; date: LocalDate; available: number; unitIds: UnitId[] }
  | { type: 'CommitPlan'; date: LocalDate; acknowledged: boolean; expectedRev: number; note: string }
  | { type: 'RecordResult'; date: LocalDate; unitId: UnitId; outcome: Outcome; actualMin: number | null; note: string; performedAt: string; expectedEventId: string | null }
  | { type: 'SubmitPrivateCheckIn'; date: LocalDate; reflection: string; nextStep: string; expectedRev: number }
  | { type: 'Publish'; kind: 'plan' | 'checkin'; date: LocalDate; unitIds: UnitId[]; fields: ShareField[]; message: string; previewDigest: string }
  | { type: 'Invite'; name: string; email: string; terms: AgreementTerms }
  | { type: 'AgreementAction'; action: 'withdraw' | 'pause' | 'request-resume' | 'end' | 'block' }
  | { type: 'PeerAgreementAction'; action: 'accept' | 'decline' | 'expire' | 'pause' | 'accept-resume' | 'request-resume' }
  | { type: 'PeerReply'; snapshotId: string; text: string; suggestion: null | { title: string; criterion: string; estimate: number | null } }
  | { type: 'AcceptSuggestion'; feedbackId: string; actionId: string }
  | { type: 'ReportFeedback'; feedbackId: string }
  | { type: 'AddAbsence'; from: LocalDate; to: LocalDate }
  | { type: 'RemoveAbsence'; id: string }
  | { type: 'TrashUnit'; unitId: UnitId }
  | { type: 'RestoreUnit'; unitId: UnitId }
  | { type: 'MarkOnboarded' }
  | { type: 'SetExperiment'; weekEnd: LocalDate; text: string }
  | { type: 'SetZone'; zone: string }
  | { type: 'UpdateSettings'; patch: Partial<AppState['settings']> }

export type Result =
  | { ok: true; state: AppState; replayed?: boolean }
  | { ok: false; kind: 'conflict' | 'invalid' | 'offline' | 'stale-preview' | 'forbidden'; message: string; state: AppState }

/** Commands that need live server authorization; never queued offline. */
const ONLINE_ONLY = new Set(['Publish', 'Invite', 'AgreementAction', 'PeerAgreementAction', 'PeerReply', 'AcceptSuggestion', 'ReportFeedback'])

export function hashPayload(cmd: Command): string {
  const s = JSON.stringify(cmd)
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return (h >>> 0).toString(36)
}

/**
 * Apply one command. Same key + same payload returns the accepted state unchanged
 * (duplicate-safe retry); same key + different payload conflicts.
 */
export function dispatch(state: AppState, key: string, cmd: Command, ctx: Ctx): Result {
  const hash = hashPayload(cmd)
  const prior = state.commands.find((c) => c.key === key)
  if (prior) {
    return prior.hash === hash
      ? { ok: true, state, replayed: true }
      : { ok: false, kind: 'conflict', message: 'This retry does not match the original request, so it was not applied.', state }
  }
  if (ONLINE_ONLY.has(cmd.type) && !state.sim.online) {
    return { ok: false, kind: 'offline', message: 'Needs a connection. Nothing was shared or changed.', state }
  }
  const draft: AppState = structuredClone(state)
  const err = apply(draft, cmd, ctx)
  if (err) return { ...err, state }
  draft.commands.push({ key, type: cmd.type, hash, at: ctx.now, sync: state.sim.online ? 'synced' : 'queued' })
  return { ok: true, state: draft }
}

type Err = { ok: false; kind: 'conflict' | 'invalid' | 'stale-preview' | 'forbidden'; message: string }
const invalid = (message: string): Err => ({ ok: false, kind: 'invalid', message })
const conflict = (message: string): Err => ({ ok: false, kind: 'conflict', message })

export function latestPlanRev(state: AppState, date: LocalDate) {
  const p = state.plans[date]
  return p?.revisions.at(-1) ?? null
}

/** The day's working selection. A day nobody has touched has no stored draft, only this default. */
export function draftFor(state: AppState, date: LocalDate): DayPlan['draft'] {
  return state.plans[date]?.draft ?? { available: DEFAULT_AVAILABLE_MIN, unitIds: [] }
}

/** Current (latest, correction-aware) event for a unit on a plan date. */
export function currentEvent(state: AppState, date: LocalDate, unitId: UnitId): ProgressEvent | null {
  let found: ProgressEvent | null = null
  for (const e of state.events) if (e.date === date && e.unitId === unitId) found = e
  return found
}

export function activeAgreement(state: AppState): Agreement | null {
  return state.agreements.find((a) => a.status === 'active' || a.status === 'paused' || a.status === 'invited') ?? null
}

/** Name of the partner whose reply carried a suggestion, if that agreement is still on record. */
export function suggestedBy(state: AppState, feedbackId: string): string | null {
  const f = state.feedback.find((x) => x.id === feedbackId)
  const snap = f && state.snapshots.find((x) => x.id === f.snapshotId)
  return (snap && state.agreements.find((a) => a.id === snap.agreementId)?.peer.name) ?? null
}

export function latestCheckIn(state: AppState, date: LocalDate): CheckInRevision | null {
  return state.checkIns.filter((c) => c.date === date).at(-1) ?? null
}

export interface Preview {
  kind: 'plan' | 'checkin'
  date: LocalDate
  sourceRev: number
  agreementId: string
  agreementVersion: number
  recipient: { id: string; name: string }
  items: SharedItem[]
  message: string
  digest: string
}

/** Server-style preview: exactly what the partner would receive. Private reflection, notes and goal labels are never included. */
export function buildPreview(state: AppState, kind: 'plan' | 'checkin', date: LocalDate, unitIds: UnitId[], fields: ShareField[], message: string): Preview | { error: string } {
  const ag = state.agreements.find((a) => a.status === 'active')
  if (!ag) return { error: 'Sharing needs an active partner agreement.' }
  const plan = latestPlanRev(state, date)
  if (!plan) return { error: 'Commit a plan before sharing it.' }
  let sourceRev = plan.rev
  let ci: CheckInRevision | null = null
  if (kind === 'checkin') {
    ci = latestCheckIn(state, date)
    if (!ci) return { error: 'Submit your private check-in first, then choose what to share.' }
    sourceRev = ci.rev
  }
  const items: SharedItem[] = []
  for (const unitId of unitIds) {
    const entry = plan.entries.find((e) => e.unitId === unitId)
    if (!entry) continue
    const u = resolveUnit(state, unitId)
    const item: SharedItem = { unitId, title: entry.title }
    if (fields.includes('criterion')) item.criterion = entry.criterion
    if (fields.includes('estimate')) item.estimate = entry.estimate
    if (fields.includes('deadline')) item.deadline = u?.deadline ?? null
    if (fields.includes('cue') && entry.cue) item.cue = entry.cue
    if (kind === 'checkin' && ci) {
      const ev = state.events.find((e) => ci!.resultEventIds.includes(e.id) && e.unitId === unitId)
      item.outcome = ev?.outcome ?? 'unreported'
      if (fields.includes('actualMin')) item.actualMin = ev?.actualMin ?? null
    }
    items.push(item)
  }
  const body = { kind, date, sourceRev, ag: ag.id, v: ag.version, r: ag.peer.id, items, message: kind === 'checkin' ? message : '' }
  return {
    kind, date, sourceRev, agreementId: ag.id, agreementVersion: ag.version, recipient: { id: ag.peer.id, name: ag.peer.name },
    items, message: body.message, digest: hashPayload(body as unknown as Command),
  }
}

function apply(s: AppState, cmd: Command, ctx: Ctx): Err | null {
  switch (cmd.type) {
    case 'CreateAction': {
      if (!cmd.title.trim()) return invalid('Give the action a short title.')
      if (cmd.origin?.kind === 'next-step' && !latestCheckIn(s, cmd.origin.checkInDate)) return invalid('That check-in no longer exists.')
      if (cmd.origin?.kind === 'suggestion') return invalid('Accept a partner suggestion from its reply instead.')
      s.actions[cmd.id] = {
        id: cmd.id, title: cmd.title.trim(), criterion: cmd.criterion.trim(), estimate: cmd.estimate, cue: cmd.cue || null,
        goal: cmd.goal || null, plannedDate: cmd.plannedDate, deadline: cmd.deadline, notes: cmd.notes, createdAt: ctx.now,
        seriesId: null, withdrawn: false, trashedAt: null, ...(cmd.origin && { origin: cmd.origin }),
      }
      return null
    }
    case 'EditAction': {
      const a = s.actions[cmd.id]
      if (!a) return invalid('That action no longer exists.')
      if (cmd.patch.title !== undefined && !cmd.patch.title.trim()) return invalid('Title cannot be empty.')
      Object.assign(a, cmd.patch)
      return null
    }
    case 'EditOccurrence': {
      const o = s.occurrences[cmd.key]
      if (!o) return invalid('That occurrence no longer exists.')
      Object.assign(o.overrides, cmd.patch)
      o.exception = true
      return null
    }
    case 'MoveUnit': {
      if (isOccKey(cmd.unitId)) {
        const o = s.occurrences[cmd.unitId]
        if (!o || !cmd.toDate) return invalid('Choose a date to move this repeat to.')
        o.displayDate = cmd.toDate
        o.exception = true
      } else {
        const a = s.actions[cmd.unitId]
        if (!a) return invalid('That action no longer exists.')
        a.plannedDate = cmd.toDate
      }
      // Moving is never completion; drafts drop the unit from its old day.
      for (const p of Object.values(s.plans)) if (p.date !== cmd.toDate) p.draft.unitIds = p.draft.unitIds.filter((u) => u !== cmd.unitId)
      return null
    }
    case 'WithdrawUnit': {
      if (isOccKey(cmd.unitId)) { const o = s.occurrences[cmd.unitId]; if (o) { o.withdrawn = true; o.exception = true } }
      else { const a = s.actions[cmd.unitId]; if (a) a.withdrawn = true }
      return null
    }
    case 'MakeRepeating': {
      const a = s.actions[cmd.actionId]
      if (!a) return invalid('That action no longer exists.')
      if (a.seriesId) return invalid('This action already repeats.')
      if (cmd.rule.kind === 'weekdays' && cmd.rule.days.length === 0) return invalid('Pick at least one weekday.')
      a.seriesId = cmd.seriesId
      s.series[cmd.seriesId] = {
        id: cmd.seriesId, sourceActionId: a.id, zone: s.owner.zone, startDate: cmd.startDate, trashedAt: null,
        revisions: [{ rev: 1, effectiveFrom: cmd.startDate, title: a.title, criterion: a.criterion, estimate: a.estimate, cue: a.cue, rule: cmd.rule }],
      }
      // The original one-time action keeps its notes/results/history (A10). Its own planned
      // date stays an independent opportunity, so it is not regenerated as a copy.
      s.occurrences = generateOccurrences(s, cmd.startDate, 14)
      if (a.plannedDate) delete s.occurrences[occKey(cmd.seriesId, a.plannedDate)]
      return null
    }
    case 'EditSeries': {
      const se = s.series[cmd.seriesId]
      if (!se) return invalid('That repeat no longer exists.')
      const rev = se.revisions.at(-1)!.rev + 1
      se.revisions.push({ rev, effectiveFrom: cmd.effectiveFrom, ...cmd.patch })
      const committed = committedUnits(s)
      for (const o of Object.values(s.occurrences)) {
        if (o.seriesId !== se.id || compareDates(o.originDate, cmd.effectiveFrom) < 0) continue
        if (committed.has(o.key) && !cmd.overwriteExceptions.includes(o.key)) continue
        if (o.exception && !cmd.overwriteExceptions.includes(o.key)) continue
        // Untouched future copy (or explicitly resolved): follow the new revision.
        o.ruleRev = rev
        o.overrides = {}
      }
      // Remove untouched future copies that the new rule no longer matches; keep exceptions.
      for (const o of Object.values(s.occurrences)) {
        if (o.seriesId !== se.id || o.exception || committed.has(o.key) || compareDates(o.originDate, cmd.effectiveFrom) < 0) continue
        const r = cmd.patch.rule
        if (r.kind === 'weekdays' && !r.days.includes(weekday(o.originDate))) delete s.occurrences[o.key]
      }
      s.occurrences = generateOccurrences(s, cmd.effectiveFrom, 14)
      return null
    }
    case 'SetDraft': {
      const p = s.plans[cmd.date] ?? (s.plans[cmd.date] = { date: cmd.date, zone: s.owner.zone, draft: { available: cmd.available, unitIds: [] }, revisions: [] })
      p.draft = { available: Math.max(0, Math.round(cmd.available)), unitIds: [...new Set(cmd.unitIds)] }
      return null
    }
    case 'CommitPlan': {
      const p = s.plans[cmd.date]
      if (!p || p.draft.unitIds.length === 0) return invalid('Select at least one action to commit.')
      const current = p.revisions.at(-1)?.rev ?? 0
      if (current !== cmd.expectedRev) return conflict('This day changed on another device. Your selection is kept — review the latest plan and commit again.')
      const entries: PlanEntry[] = []
      for (const unitId of p.draft.unitIds) {
        const u = resolveUnit(s, unitId)
        if (!u) continue
        entries.push({ unitId, title: u.title, criterion: u.criterion, estimate: u.estimate, cue: u.cue })
      }
      const cap = summarizeCapacity(p.draft.available, entries)
      if (cap.needsAcknowledgement && !cmd.acknowledged) return invalid('Acknowledge the overload or unknown estimates, or revise the plan.')
      if (current === 0) p.zone = s.owner.zone
      p.revisions.push({ rev: current + 1, at: ctx.now, available: p.draft.available, entries, acknowledged: cap.needsAcknowledgement, note: cmd.note })
      return null
    }
    case 'RecordResult': {
      const latest = currentEvent(s, cmd.date, cmd.unitId)
      if ((latest?.id ?? null) !== cmd.expectedEventId) return conflict('This result was changed elsewhere. Your entry is kept — compare and save again.')
      if (cmd.actualMin != null && cmd.actualMin < 0) return invalid('Minutes cannot be negative.')
      s.events.push({
        id: ctx.id(), date: cmd.date, unitId: cmd.unitId, outcome: cmd.outcome, actualMin: cmd.actualMin, note: cmd.note,
        performedAt: cmd.performedAt, recordedAt: ctx.now, corrects: latest?.id ?? null,
      })
      return null
    }
    case 'SubmitPrivateCheckIn': {
      const plan = latestPlanRev(s, cmd.date)
      if (!plan) return invalid('There is no committed plan for this day to check in on.')
      const current = latestCheckIn(s, cmd.date)?.rev ?? 0
      if (current !== cmd.expectedRev) return conflict('A newer check-in exists for this day. Your reflection is kept.')
      const resultEventIds = plan.entries.map((e) => currentEvent(s, cmd.date, e.unitId)?.id).filter((x): x is string => !!x)
      s.checkIns.push({ date: cmd.date, rev: current + 1, at: ctx.now, planRev: plan.rev, resultEventIds, reflection: cmd.reflection, nextStep: cmd.nextStep })
      return null
    }
    case 'Publish': {
      const pv = buildPreview(s, cmd.kind, cmd.date, cmd.unitIds, cmd.fields, cmd.message)
      if ('error' in pv) return invalid(pv.error)
      if (pv.digest !== cmd.previewDigest) return { ok: false, kind: 'stale-preview', message: 'Something changed since the preview (source, recipient or agreement). Nothing was shared — review the new preview.' }
      if (pv.items.length === 0) return invalid('Select at least one item to share.')
      const prior = s.snapshots.filter((x) => x.kind === cmd.kind && x.date === cmd.date && x.agreementId === pv.agreementId)
      const ag = s.agreements.find((a) => a.id === pv.agreementId)!
      let due: string | null = null
      if (cmd.kind === 'checkin') {
        if (prior.length) due = prior[0].replyDue
        else {
          const normal = resolveLocal(addDays(cmd.date, 1), ag.terms.replyTime, s.plans[cmd.date].zone).utc
          due = replyDue(normal, ctx.now, ag.terms.minIntervalHours)
        }
      }
      const snap: ShareSnapshot = {
        id: prior[0]?.id ?? ctx.id(), kind: cmd.kind, date: cmd.date, version: prior.length + 1, sourceRev: pv.sourceRev,
        agreementId: pv.agreementId, agreementVersion: pv.agreementVersion, recipientId: pv.recipient.id,
        items: pv.items, message: pv.message, digest: pv.digest, publishedAt: ctx.now, replyDue: due,
      }
      s.snapshots.push(snap)
      if (cmd.kind === 'checkin' && prior.length === 0) {
        const logicalKey = `partner-result:${s.owner.id}:${cmd.date}:${pv.recipient.id}:${pv.agreementId}`
        if (!s.notices.some((n) => n.logicalKey === logicalKey)) {
          s.notices.push({ id: ctx.id(), logicalKey, kind: 'partner-result', dueAt: ctx.now, status: 'provider-accepted', text: `${s.owner.name} shared a check-in.` })
        }
      }
      return null
    }
    case 'Invite': {
      if (activeAgreement(s)) return invalid('End the current agreement before inviting someone new.')
      if (!cmd.name.trim() || !/^\S+@\S+\.\S+$/.test(cmd.email)) return invalid('Enter the partner’s name and a valid email.')
      s.agreements.push({
        id: ctx.id(), peer: { id: 'peer-' + ctx.id(), name: cmd.name.trim(), email: cmd.email.trim() }, version: 1, status: 'invited',
        terms: cmd.terms, invitedAt: ctx.now, expiresAt: addDaysInstant(ctx.now, 7), acceptedAt: null, pause: null, blocked: false,
        history: [{ at: ctx.now, event: `Invitation sent to ${cmd.email.trim()}` }],
      })
      return null
    }
    case 'AgreementAction': {
      const ag = activeAgreement(s)
      if (!ag) return invalid('There is no current agreement.')
      const log = (e: string) => ag.history.push({ at: ctx.now, event: e })
      if (cmd.action === 'withdraw') { if (ag.status !== 'invited') return invalid('Only a pending invitation can be withdrawn.'); ag.status = 'withdrawn'; log('Invitation withdrawn') }
      if (cmd.action === 'pause') { if (ag.status !== 'active') return invalid('Only an active agreement can be paused.'); ag.status = 'paused'; ag.pause = { by: 'owner', at: ctx.now, resumeRequestedBy: null }; log('Paused by you — partner access revoked') }
      if (cmd.action === 'request-resume') {
        if (ag.status !== 'paused' || !ag.pause) return invalid('Agreement is not paused.')
        if (ag.pause.resumeRequestedBy === 'peer') { ag.status = 'active'; ag.pause = null; ag.version++; log('Resumed — both accepted. Old days are not re-shared.') }
        else { ag.pause.resumeRequestedBy = 'owner'; log('You asked to resume; waiting for partner') }
      }
      if (cmd.action === 'end' || cmd.action === 'block') { ag.status = 'ended'; ag.blocked = cmd.action === 'block'; ag.pause = null; log(cmd.action === 'block' ? 'Blocked and ended' : 'Agreement ended — partner access revoked') }
      return null
    }
    case 'PeerAgreementAction': {
      const ag = activeAgreement(s)
      if (!ag) return invalid('There is no current agreement.')
      const log = (e: string) => ag.history.push({ at: ctx.now, event: `${ag.peer.name}: ${e}` })
      if (cmd.action === 'accept') {
        if (ag.status !== 'invited') return invalid('Nothing to accept.')
        if (compareInstants(ctx.now, ag.expiresAt) > 0) { ag.status = 'expired'; log('invitation expired'); return null }
        ag.status = 'active'; ag.acceptedAt = ctx.now; log('accepted the agreement')
      }
      if (cmd.action === 'decline') { if (ag.status !== 'invited') return invalid('Nothing to decline.'); ag.status = 'declined'; log('declined') }
      if (cmd.action === 'expire') { if (ag.status !== 'invited') return invalid('Nothing pending.'); ag.status = 'expired'; log('invitation expired after 7 days') }
      if (cmd.action === 'pause') { if (ag.status !== 'active') return invalid('Not active.'); ag.status = 'paused'; ag.pause = { by: 'peer', at: ctx.now, resumeRequestedBy: null }; log('paused the agreement') }
      if (cmd.action === 'request-resume' || cmd.action === 'accept-resume') {
        if (ag.status !== 'paused' || !ag.pause) return invalid('Agreement is not paused.')
        if (ag.pause.resumeRequestedBy === 'owner') { ag.status = 'active'; ag.pause = null; ag.version++; log('accepted resume') }
        else { ag.pause.resumeRequestedBy = 'peer'; log('asked to resume') }
      }
      return null
    }
    case 'PeerReply': {
      const ag = s.agreements.find((a) => a.status === 'active')
      const versions = s.snapshots.filter((x) => x.id === cmd.snapshotId)
      const snap = versions.at(-1)
      if (!ag || !snap || snap.agreementId !== ag.id || snap.kind !== 'checkin') return { ok: false, kind: 'forbidden', message: 'Partner no longer has access to that check-in.' }
      if (!cmd.text.trim()) return invalid('Write a reply.')
      s.feedback.push({ id: ctx.id(), snapshotId: snap.id, snapshotVersion: snap.version, date: snap.date, text: cmd.text.trim(), suggestion: cmd.suggestion, at: ctx.now, acceptedActionId: null, reported: false })
      return null
    }
    case 'AcceptSuggestion': {
      const f = s.feedback.find((x) => x.id === cmd.feedbackId)
      if (!f?.suggestion) return invalid('No suggestion to accept.')
      if (f.acceptedActionId) return null
      s.actions[cmd.actionId] = {
        id: cmd.actionId, title: f.suggestion.title, criterion: f.suggestion.criterion, estimate: f.suggestion.estimate, cue: null, goal: null,
        plannedDate: null, deadline: null, notes: '', createdAt: ctx.now, seriesId: null, withdrawn: false, trashedAt: null,
        origin: { kind: 'suggestion', feedbackId: f.id },
      }
      f.acceptedActionId = cmd.actionId
      return null
    }
    case 'ReportFeedback': {
      const f = s.feedback.find((x) => x.id === cmd.feedbackId)
      if (!f) return invalid('Reply not found.')
      f.reported = true
      s.reports.push({ id: ctx.id(), feedbackId: f.id, at: ctx.now, status: 'open' })
      return null
    }
    case 'AddAbsence': {
      if (compareDates(cmd.to, cmd.from) < 0) return invalid('End date is before start date.')
      s.absences.push({ id: ctx.id(), from: cmd.from, to: cmd.to, createdAt: ctx.now })
      // Suppress only future, untouched, uncommitted copies; past results are never relabeled.
      const committed = committedUnits(s)
      for (const o of Object.values(s.occurrences)) {
        if (o.exception || committed.has(o.key)) continue
        if (compareDates(o.originDate, cmd.from) >= 0 && compareDates(o.originDate, cmd.to) <= 0) delete s.occurrences[o.key]
      }
      return null
    }
    case 'RemoveAbsence': {
      s.absences = s.absences.filter((a) => a.id !== cmd.id)
      return null
    }
    case 'TrashUnit': {
      if (isOccKey(cmd.unitId)) return invalid('Withdraw a single repeat instead, or trash the whole series from its action.')
      const a = s.actions[cmd.unitId]
      if (!a) return invalid('Not found.')
      a.trashedAt = ctx.now
      // Trash revokes partner access through old snapshots; Restore never re-shares.
      if (!s.revokedUnits.includes(a.id)) s.revokedUnits.push(a.id)
      if (a.seriesId && s.series[a.seriesId]) s.series[a.seriesId].trashedAt = ctx.now
      for (const p of Object.values(s.plans)) p.draft.unitIds = p.draft.unitIds.filter((u) => u !== a.id && !(a.seriesId && u.startsWith(a.seriesId + '@')))
      return null
    }
    case 'RestoreUnit': {
      const a = s.actions[cmd.unitId]
      if (!a) return invalid('Not found.')
      a.trashedAt = null
      if (a.seriesId && s.series[a.seriesId]) s.series[a.seriesId].trashedAt = null
      return null
    }
    case 'MarkOnboarded': s.onboarded = true; return null
    case 'SetExperiment': {
      if (!cmd.text.trim()) return invalid('Describe one thing to try.')
      s.experiments.push({ weekEnd: cmd.weekEnd, text: cmd.text.trim(), at: ctx.now })
      return null
    }
    case 'SetZone': {
      try { new Intl.DateTimeFormat('en', { timeZone: cmd.zone }) } catch { return invalid('Unknown time zone.') }
      // Committed plans keep their frozen zone; only new days use the new one.
      s.owner.zone = cmd.zone
      return null
    }
    case 'UpdateSettings': Object.assign(s.settings, cmd.patch); return null
  }
}

/** Units in any committed plan (protected from silent series rewrites). */
export function committedUnits(s: AppState): Set<UnitId> {
  const set = new Set<UnitId>()
  for (const p of Object.values(s.plans)) for (const r of p.revisions) for (const e of r.entries) set.add(e.unitId)
  return set
}

function addDaysInstant(iso: string, days: number) {
  return new Date(Date.parse(iso) + days * 864e5).toISOString()
}
function compareInstants(a: string, b: string) { return Date.parse(a) - Date.parse(b) }

export { unitsOn }
