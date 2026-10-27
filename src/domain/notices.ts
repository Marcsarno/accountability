import { activeAgreement, latestCheckIn } from './commands'
import { inAbsence } from './recurrence'
import { resolveLocal, weekday, type LocalDate } from './time'
import type { AppState } from './types'

export interface PlannedNotice {
  key: string
  kind: 'checkin-reminder' | 'share-followup' | 'partner-result'
  to: string
  dueAt: string | null
  status: 'scheduled' | 'suppressed' | 'provider-accepted (simulated)' | 'not set'
  reason: string
  text: string
  adjustment?: string
}

function inQuiet(time: string, start: string, end: string) {
  return start <= end ? time >= start && time < end : time >= start || time < end
}

/** Eligibility is recomputed from current state — the outbox rechecks at dispatch. Generic text only. */
export function planNotices(s: AppState, date: LocalDate): PlannedNotice[] {
  const out: PlannedNotice[] = []
  const zone = s.plans[date]?.zone ?? s.owner.zone
  const committed = !!s.plans[date]?.revisions.length
  const checkedIn = !!latestCheckIn(s, date)
  const t = s.settings.reminderTime
  if (!t) out.push({ key: `owner-reminder:${date}`, kind: 'checkin-reminder', to: 'You', dueAt: null, status: 'not set', reason: 'Daily reminder is off', text: '' })
  else {
    const r = resolveLocal(date, t, zone)
    const reason = inAbsence(s.absences, date) ? 'Planned time away' : !committed ? 'Nothing committed for this day' : checkedIn ? 'You already checked in privately' : inQuiet(t, s.settings.quietStart, s.settings.quietEnd) ? 'Inside your quiet hours' : ''
    out.push({
      key: `owner-reminder:${date}`, kind: 'checkin-reminder', to: 'You', dueAt: r.utc, status: reason ? 'suppressed' : 'scheduled', reason: reason || 'Eligible',
      text: 'Time to check in on today.', adjustment: r.adjustment === 'none' ? undefined : r.adjustment === 'gap-shifted' ? `Clock change: ${t} doesn’t exist, sent at ${r.localUsed.slice(11)}` : `Clock change: ${t} happens twice, sent at the first one`,
    })
  }
  const ag = activeAgreement(s)
  if (ag && ag.terms.followUpAllowed && ag.terms.checkInDays.includes(weekday(date))) {
    const shared = s.snapshots.some((x) => x.date === date && x.kind === 'checkin' && x.agreementId === ag.id)
    const reason = ag.status !== 'active' ? 'Agreement is not active' : !committed ? 'Nothing committed' : shared ? 'Results already shared' : ''
    out.push({ key: `share-followup:${date}:${ag.id}`, kind: 'share-followup', to: 'You', dueAt: resolveLocal(date, ag.terms.cutoff, zone).utc, status: reason ? 'suppressed' : 'scheduled', reason: reason || 'One agreed follow-up if nothing is shared by the cutoff (your partner is not told)', text: 'Want to share today with your partner?' })
  }
  for (const n of s.notices.filter((n) => n.logicalKey.includes(`:${date}:`))) {
    const agId = n.logicalKey.split(':').at(-1)
    const a = s.agreements.find((x) => x.id === agId)
    const live = a?.status === 'active'
    out.push({ key: n.logicalKey, kind: 'partner-result', to: a?.peer.name ?? 'Partner', dueAt: n.dueAt, status: live ? 'provider-accepted (simulated)' : 'suppressed', reason: live ? 'Sent once for this day; amendments update the in-app view only' : 'Access revoked before delivery check', text: n.text })
  }
  return out
}
