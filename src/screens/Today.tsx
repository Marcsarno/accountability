import { ArrowRight, ArrowsClockwise, Lock, PaperPlaneTilt, Plus } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import type { Tab } from '../App'
import { useStore } from '../app/store'
import { activeAgreement, draftFor, latestCheckIn } from '../domain/commands'
import { summarizeDay } from '../domain/review'
import { addDays, compareDates, type LocalDate } from '../domain/time'
import type { ActionOrigin, UnitId } from '../domain/types'
import { Banner, CapacityBar, fmtDate, fmtInstant, shortDay, useToast } from '../ui/kit'
import { ActionSheet } from './ActionSheet'
import { CheckInSheet } from './CheckInSheet'
import { EntryRow } from './EntryRow'
import { PlanBuilder } from './PlanBuilder'
import { ResultSheet } from './ResultSheet'
import { ShareSheet } from './ShareSheet'

type OpenSheet =
  | { kind: 'result'; unitId: UnitId }
  | { kind: 'checkin' }
  | { kind: 'share'; share: 'plan' | 'checkin' }
  | { kind: 'new'; prefill?: { title: string }; origin?: ActionOrigin }
  | { kind: 'edit'; unitId: UnitId }

export function Today({ go }: { go: (t: Tab) => void }) {
  const { state, today, run } = useStore()
  const toast = useToast()
  const [date, setDate] = useState(today)
  const [revising, setRevising] = useState(false)
  const [sheet, setSheet] = useState<OpenSheet | null>(null)
  const [marked, setMarked] = useState(false)
  useEffect(() => setDate(today), [today])

  const plan = state.plans[date]
  const committed = plan?.revisions.at(-1) ?? null
  const planning = !committed || revising
  const ag = activeAgreement(state)
  const checkIn = latestCheckIn(state, date)
  const isPast = compareDates(date, today) < 0
  const snaps = state.snapshots.filter((s) => s.date === date)
  const planSnap = snaps.filter((s) => s.kind === 'plan').at(-1)
  const ciSnap = snaps.filter((s) => s.kind === 'checkin').at(-1)
  const nextDay = addDays(date, 1)
  const canPlanNextDay = !!checkIn?.nextStep.trim() && compareDates(nextDay, today) >= 0 && !state.plans[nextDay]?.revisions.length

  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i - 5)), [today])

  const showDay = (d: LocalDate) => { setDate(d); setRevising(false) }
  const startRevising = () => {
    // The revision starts from the current commitment.
    run({ type: 'SetDraft', date, available: committed!.available, unitIds: committed!.entries.map((e) => e.unitId) })
    setRevising(true)
  }
  /** A new action captured while planning is selected for the day straight away. */
  const onCreated = (id: string) => {
    if (planning) {
      const d = draftFor(state, date)
      run({ type: 'SetDraft', date, available: d.available, unitIds: [...d.unitIds, id] })
    }
    setSheet(null)
  }

  return (
    <>
      <div className="top">
        <div>
          <div className="eyebrow">{fmtDate(date)}</div>
          <h1 className="large-title">{date === today ? 'Today' : isPast ? 'Earlier' : 'Ahead'}</h1>
        </div>
        <button className="icon-btn" aria-label="Capture a new action" onClick={() => setSheet({ kind: 'new' })}><Plus size={22} weight="bold" /></button>
      </div>

      <div className="week" role="group" aria-label="Choose a day">
        {week.map((d) => {
          const sum = summarizeDay(state, d)
          const done = sum.counts.completed + sum.counts.partial
          const tone = sum.absent ? 'away' : !sum.planned ? 'none' : ''
          return (
            <button key={d} className="d" aria-pressed={d === date} onClick={() => showDay(d)}
              aria-label={`${fmtDate(d)}${sum.planned ? `, ${done} of ${sum.currentCount} done or partial` : sum.absent ? ', planned absence' : ', no plan'}${sum.checkedIn ? ', checked in' : ''}`}>
              <span>{d === today ? 'Today' : shortDay(d)}</span>
              <span className={`pip ${tone}`} style={sum.planned ? { background: `conic-gradient(var(--done) 0 ${(sum.counts.completed / Math.max(1, sum.currentCount)) * 100}%, var(--partial) 0 ${(done / Math.max(1, sum.currentCount)) * 100}%, var(--surface-2) 0)` } : undefined}>
                {sum.checkedIn && <span className="pip-check" />}
              </span>
            </button>
          )
        })}
      </div>

      {!state.sim.online && <div className="offline-banner"><Banner tone="warn"><b>Offline.</b> Plans, results and private check-ins save on this device and sync later. Sharing waits for a connection.</Banner></div>}

      {planning
        ? <PlanBuilder date={date} revising={revising}
            onDone={(msg) => { setRevising(false); toast(msg) }} onCancel={() => setRevising(false)}
            onNew={() => setSheet({ kind: 'new' })} onEdit={(unitId) => setSheet({ kind: 'edit', unitId })}
            onPlanNextStep={(step) => setSheet({ kind: 'new', prefill: { title: step.text }, origin: { kind: 'next-step', checkInDate: step.fromDate } })} />
        : committed && (
          <>
            <h2 className="section-title">Commitment <small>{plan!.revisions.length > 1 ? `Revised ${fmtInstant(committed.at, plan!.zone, { hour: 'numeric', minute: '2-digit' })} · original kept` : `Committed ${fmtInstant(committed.at, plan!.zone, { hour: 'numeric', minute: '2-digit' })}`}</small></h2>
            <div className="card">
              <CapacityBar available={committed.available} entries={committed.entries} />
              {committed.note && <p className="footnote">“{committed.note}”</p>}
            </div>
            <div className="list entries">
              {committed.entries.map((e) => <EntryRow key={e.unitId} date={date} entry={e} onOpen={() => setSheet({ kind: 'result', unitId: e.unitId })} />)}
            </div>
            <div className="btn-row">
              <button className="btn small" onClick={startRevising}><ArrowsClockwise size={16} weight="bold" /> Revise plan</button>
              {ag?.status === 'active' && !checkIn && (
                <button className="btn small" onClick={() => setSheet({ kind: 'share', share: 'plan' })}>
                  <PaperPlaneTilt size={16} weight="bold" /> {planSnap ? 'Plan shared · update' : `Share plan with ${ag.peer.name}`}
                </button>
              )}
            </div>
            {planSnap && <p className="footnote">Plan shared with {ag?.peer.name ?? 'partner'} at {fmtInstant(planSnap.publishedAt, plan!.zone, { hour: 'numeric', minute: '2-digit' })} (v{planSnap.version}). It shows “No results shared yet” and starts no reply window.</p>}

            <h2 className="section-title">Check-in</h2>
            {!checkIn ? (
              <div className="card tint-signal">
                <h3><Lock size={16} weight="bold" aria-hidden="true" /> {isPast ? 'Check in on this day' : 'End of day'}</h3>
                <p>Close the day privately: confirm results, note what happened and pick a next step. No partner needed.</p>
                <div className="btn-row"><button className="btn primary" onClick={() => setSheet({ kind: 'checkin' })}>Check in privately</button></div>
              </div>
            ) : (
              <div className="card">
                <div className="pill-row">
                  <span className="pill">{state.commands.some((c) => c.type === 'SubmitPrivateCheckIn' && c.sync === 'queued') ? 'Privately submitted · on this device' : 'Privately submitted'}</span>
                  {ciSnap ? <span className="pill ok">Shared v{ciSnap.version}</span> : ag?.status === 'active' ? <span className="pill">Not shared</span> : null}
                </div>
                {checkIn.reflection && <p>“{checkIn.reflection}”</p>}
                {checkIn.nextStep && <p className="next-step"><b>Next:</b> {checkIn.nextStep}</p>}
                <div className="btn-row">
                  {canPlanNextDay && <button className="btn small primary" onClick={() => showDay(nextDay)}>{nextDay === today ? 'Plan today' : `Plan ${shortDay(nextDay)}`} <ArrowRight size={16} weight="bold" /></button>}
                  <button className="btn small" onClick={() => setSheet({ kind: 'checkin' })}>Update check-in</button>
                  {ag?.status === 'active' && <button className="btn small" onClick={() => setSheet({ kind: 'share', share: 'checkin' })}><PaperPlaneTilt size={16} weight="bold" /> {ciSnap ? 'Amend shared check-in' : `Share results with ${ag.peer.name}`}</button>}
                </div>
                {ciSnap?.replyDue && <p className="footnote">Reply window for {ag?.peer.name ?? 'partner'}: by {fmtInstant(ciSnap.replyDue, plan!.zone)}. Amendments keep this deadline.</p>}
              </div>
            )}
            {!ag && <p className="footnote">Want someone to see selected results? <button className="btn quiet small" onClick={() => go('partner')}>Invite a partner</button></p>}
          </>
        )}

      {sheet?.kind === 'result' && <ResultSheet date={date} unitId={sheet.unitId} onClose={() => setSheet(null)} />}
      {sheet?.kind === 'checkin' && <CheckInSheet date={date} onClose={() => setSheet(null)} onSubmitted={() => { setSheet(null); setMarked(true) }} />}
      {sheet?.kind === 'share' && <ShareSheet kind={sheet.share} date={date} onClose={() => setSheet(null)} />}
      {sheet?.kind === 'new' && <ActionSheet initialDate={date} prefill={sheet.prefill} origin={sheet.origin} onClose={() => setSheet(null)} onSaved={onCreated} />}
      {sheet?.kind === 'edit' && <ActionSheet unitId={sheet.unitId} onClose={() => setSheet(null)} />}
      {marked && <DayMarked onDone={() => setMarked(false)} />}
    </>
  )
}

function DayMarked({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1900); return () => clearTimeout(t) }, [onDone])
  return (
    <div className="marked" role="status" onClick={onDone}>
      <svg viewBox="0 0 120 90" width="150" aria-hidden="true">
        <clipPath id="hz"><rect x="0" y="0" width="120" height="60" /></clipPath>
        <g clipPath="url(#hz)"><circle className="sun" cx="60" cy="60" r="26" fill="var(--signal)" /></g>
        <rect x="14" y="60" width="92" height="5" rx="2.5" fill="var(--ink)" />
        <rect className="tick" x="34" y="72" width="52" height="5" rx="2.5" fill="var(--ink)" opacity=".35" />
      </svg>
      <b>Day marked</b>
      <span>Honest beats perfect.</span>
    </div>
  )
}
