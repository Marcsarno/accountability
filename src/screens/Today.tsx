import { ArrowsClockwise, CaretRight, Lock, PaperPlaneTilt, Plus, Sun } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import type { Tab } from '../App'
import { useStore } from '../app/store'
import { summarizeCapacity } from '../domain/capacity'
import { activeAgreement, currentEvent, latestCheckIn } from '../domain/commands'
import { resolveUnit, unitsOn, type UnitView } from '../domain/recurrence'
import { summarizeDay } from '../domain/review'
import { addDays, compareDates } from '../domain/time'
import type { UnitId } from '../domain/types'
import { Banner, CapacityBar, HorizonArt, OutcomeMark, OUTCOME_LABEL, fmtDate, fmtInstant, mins, shortDay, useToast } from '../ui/kit'
import { ActionSheet } from './ActionSheet'
import { CheckInSheet } from './CheckInSheet'
import { ResultSheet } from './ResultSheet'
import { ShareSheet } from './ShareSheet'

export function Today({ go }: { go: (t: Tab) => void }) {
  const { state, today, run } = useStore()
  const toast = useToast()
  const [date, setDate] = useState(today)
  const [revising, setRevising] = useState(false)
  const [sheet, setSheet] = useState<null | { kind: 'result'; unitId: UnitId } | { kind: 'checkin' } | { kind: 'share'; share: 'plan' | 'checkin' } | { kind: 'new' }>(null)
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

  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(today, i - 5)), [today])

  return (
    <>
      <div className="top">
        <div>
          <div className="eyebrow">{fmtDate(date)}</div>
          <h1 className="large-title">{date === today ? 'Today' : compareDates(date, today) < 0 ? 'Earlier' : 'Ahead'}</h1>
        </div>
        <button className="icon-btn" aria-label="Capture a new action" onClick={() => setSheet({ kind: 'new' })}><Plus size={22} weight="bold" /></button>
      </div>

      <div className="week" role="group" aria-label="Choose a day">
        {week.map((d) => {
          const sum = summarizeDay(state, d)
          const done = sum.counts.completed + sum.counts.partial
          const tone = sum.absent ? 'away' : !sum.planned ? 'none' : ''
          return (
            <button key={d} className="d" aria-pressed={d === date} onClick={() => { setDate(d); setRevising(false) }}
              aria-label={`${fmtDate(d)}${sum.planned ? `, ${done} of ${sum.currentCount} done or partial` : sum.absent ? ', planned absence' : ', no plan'}${sum.checkedIn ? ', checked in' : ''}`}>
              <span>{d === today ? 'Today' : shortDay(d)}</span>
              <span className={`pip ${tone}`} style={sum.planned ? { background: `conic-gradient(var(--done) 0 ${(sum.counts.completed / Math.max(1, sum.currentCount)) * 100}%, var(--partial) 0 ${(done / Math.max(1, sum.currentCount)) * 100}%, var(--surface-2) 0)` } : undefined}>
                {sum.checkedIn && <span style={{ width: 12, height: 12, borderRadius: 6, background: 'var(--surface)', boxShadow: '0 0 0 2px var(--ink)' }} />}
              </span>
            </button>
          )
        })}
      </div>

      {!state.sim.online && <div style={{ marginTop: 12 }}><Banner tone="warn"><b>Offline.</b> Plans, results and private check-ins save on this device and sync later. Sharing waits for a connection.</Banner></div>}

      {planning
        ? <PlanBuilder date={date} revising={revising} onDone={(msg) => { setRevising(false); toast(msg) }} onCancel={() => setRevising(false)} onNew={() => setSheet({ kind: 'new' })} />
        : committed && (
          <>
            <h2 className="section-title">Commitment <small>{plan!.revisions.length > 1 ? `Revised ${fmtInstant(committed.at, plan!.zone, { hour: 'numeric', minute: '2-digit' })} · original kept` : `Committed ${fmtInstant(committed.at, plan!.zone, { hour: 'numeric', minute: '2-digit' })}`}</small></h2>
            <div className="card">
              <CapacityBar available={committed.available} entries={committed.entries} />
              {committed.note && <p className="footnote">“{committed.note}”</p>}
            </div>
            <div className="list" style={{ marginTop: 12 }}>
              {committed.entries.map((e) => {
                const ev = currentEvent(state, date, e.unitId)
                const u = resolveUnit(state, e.unitId)
                return (
                  <button key={e.unitId} className="row" onClick={() => setSheet({ kind: 'result', unitId: e.unitId })}>
                    <OutcomeMark outcome={ev?.outcome ?? 'unreported'} />
                    <div className="grow">
                      <div className="title">{e.title}</div>
                      <div className="meta">
                        <span>{e.criterion || 'No done criterion'}</span>
                        <span className="num">{mins(e.estimate)}</span>
                        {ev?.actualMin != null && <span className="num">did {mins(ev.actualMin)}</span>}
                        {u?.moved && u.originDate && <span>from {shortDay(u.originDate)}</span>}
                        {!ev && <span>{OUTCOME_LABEL.unreported}</span>}
                      </div>
                    </div>
                    <CaretRight className="chev" size={18} />
                  </button>
                )
              })}
            </div>
            <div className="btn-row">
              <button className="btn small" onClick={() => setRevising(true)}><ArrowsClockwise size={16} weight="bold" /> Revise plan</button>
              {ag?.status === 'active' && !checkIn && (
                <button className="btn small" onClick={() => setSheet({ kind: 'share', share: 'plan' })}>
                  <PaperPlaneTilt size={16} weight="bold" /> {planSnap ? `Plan shared · update` : `Share plan with ${ag.peer.name}`}
                </button>
              )}
            </div>
            {planSnap && <p className="footnote">Plan shared with {ag?.peer.name ?? 'partner'} at {fmtInstant(planSnap.publishedAt, plan!.zone, { hour: 'numeric', minute: '2-digit' })} (v{planSnap.version}). It shows “No results shared yet” and starts no reply window.</p>}

            <h2 className="section-title">Check-in</h2>
            {!checkIn ? (
              <div className="card tint-signal">
                <h3><Lock size={16} weight="bold" style={{ verticalAlign: '-2px' }} /> {isPast ? 'Check in on this day' : 'End of day'}</h3>
                <p>Close the day privately: confirm results, note what happened and pick a next step. No partner needed.</p>
                <div className="btn-row"><button className="btn primary" onClick={() => setSheet({ kind: 'checkin' })}>Check in privately</button></div>
              </div>
            ) : (
              <div className="card">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span className="pill">{state.commands.some((c) => c.type === 'SubmitPrivateCheckIn' && c.sync === 'queued') ? 'Privately submitted · on this device' : 'Privately submitted'}</span>
                  {ciSnap ? <span className="pill ok">Shared v{ciSnap.version}</span> : ag?.status === 'active' ? <span className="pill">Not shared</span> : null}
                </div>
                {checkIn.reflection && <p>“{checkIn.reflection}”</p>}
                {checkIn.nextStep && <p style={{ marginTop: 6 }}><b>Next:</b> {checkIn.nextStep}</p>}
                <div className="btn-row">
                  <button className="btn small" onClick={() => setSheet({ kind: 'checkin' })}>Update check-in</button>
                  {ag?.status === 'active' && <button className="btn small primary" onClick={() => setSheet({ kind: 'share', share: 'checkin' })}><PaperPlaneTilt size={16} weight="bold" /> {ciSnap ? 'Amend shared check-in' : `Share results with ${ag.peer.name}`}</button>}
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
      {sheet?.kind === 'new' && <ActionSheet initialDate={date} onClose={() => setSheet(null)} onSaved={(id) => {
        if (planning) { const p = state.plans[date]; run({ type: 'SetDraft', date, available: p?.draft.available ?? 60, unitIds: [...(p?.draft.unitIds ?? []), id] }) }
        setSheet(null)
      }} />}
      {marked && <DayMarked onDone={() => setMarked(false)} />}
    </>
  )
}

function PlanBuilder({ date, revising, onDone, onCancel, onNew }: { date: string; revising: boolean; onDone: (msg: string) => void; onCancel: () => void; onNew: () => void }) {
  const { state, run } = useStore()
  const plan = state.plans[date]
  const last = plan?.revisions.at(-1)
  const [ack, setAck] = useState(false)
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Seed the draft: revising starts from the current commitment; a new day starts with what is planned there.
  useEffect(() => {
    if (revising && last) run({ type: 'SetDraft', date, available: last.available, unitIds: last.entries.map((e) => e.unitId) })
    else if (!plan) run({ type: 'SetDraft', date, available: 60, unitIds: [] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, revising])

  const draft = plan?.draft ?? { available: 60, unitIds: [] }
  const dayUnits = unitsOn(state, date)
  const inboxUnits: UnitView[] = Object.values(state.actions)
    .filter((a) => !a.seriesId && !a.trashedAt && !a.withdrawn && !a.plannedDate)
    .map((a) => resolveUnit(state, a.id)!)
  const extra = draft.unitIds.filter((id) => !dayUnits.some((u) => u.unitId === id) && !inboxUnits.some((u) => u.unitId === id)).map((id) => resolveUnit(state, id)).filter((u): u is UnitView => !!u)
  const selected = new Set(draft.unitIds)
  const entries = draft.unitIds.map((id) => resolveUnit(state, id)).filter((u): u is UnitView => !!u)
  const cap = summarizeCapacity(draft.available, entries)

  const toggle = (u: UnitView) => {
    setAck(false)
    const next = selected.has(u.unitId) ? draft.unitIds.filter((x) => x !== u.unitId) : [...draft.unitIds, u.unitId]
    if (u.kind === 'action' && !u.date && !selected.has(u.unitId)) run({ type: 'MoveUnit', unitId: u.unitId, toDate: date })
    run({ type: 'SetDraft', date, available: draft.available, unitIds: next })
  }
  const setAvail = (n: number) => { setAck(false); run({ type: 'SetDraft', date, available: n, unitIds: draft.unitIds }) }
  const commit = () => {
    const r = run({ type: 'CommitPlan', date, acknowledged: ack, expectedRev: last?.rev ?? 0, note })
    if (!r.ok) setError(r.message)
    else onDone(revising ? 'Plan revised — original kept in history' : 'Committed')
  }

  const Row = ({ u }: { u: UnitView }) => (
    <label className="row" style={{ cursor: 'pointer' }}>
      <input type="checkbox" checked={selected.has(u.unitId)} onChange={() => toggle(u)} style={{ width: 24, height: 24, accentColor: 'var(--signal)', margin: 0 }} />
      <div className="grow">
        <div className="title">{u.title}</div>
        <div className="meta">
          <span>{u.criterion || 'Add a done criterion'}</span>
          <span className="num" style={u.estimate == null ? { color: 'var(--warn)', fontWeight: 650 } : undefined}>{mins(u.estimate)}</span>
          {u.cue && <span>When: {u.cue}</span>}
          {u.deadline && <span>Due {shortDay(u.deadline)} {u.deadline.slice(5)}</span>}
          {u.moved && u.originDate && <span>from {shortDay(u.originDate)}</span>}
        </div>
      </div>
    </label>
  )

  return (
    <>
      <h2 className="section-title">{revising ? 'Revise commitment' : 'Plan the day'} <small>{revising ? 'The original stays in history' : 'Pick what you can realistically do'}</small></h2>
      <div className="card">
        <div className="field" style={{ marginBottom: 8 }}>
          <span id="avail-label">Time available after fixed obligations</span>
          <div className="seg" role="group" aria-labelledby="avail-label">
            {[30, 60, 90, 120, 180].map((n) => <button key={n} aria-pressed={draft.available === n} onClick={() => setAvail(n)}>{mins(n)}</button>)}
            <input className="input num" style={{ width: 96, minHeight: 40 }} inputMode="numeric" aria-label="Minutes available" value={draft.available} onChange={(e) => setAvail(Number(e.target.value.replace(/\D/g, '')) || 0)} />
          </div>
        </div>
        <CapacityBar available={draft.available} entries={entries} />
      </div>

      {dayUnits.length + extra.length > 0 && <><h2 className="section-title" style={{ marginTop: 20 }}>On this day</h2><div className="list">{[...dayUnits, ...extra].map((u) => <Row key={u.unitId} u={u} />)}</div></>}
      {inboxUnits.length > 0 && <><h2 className="section-title" style={{ marginTop: 20 }}>From your Inbox</h2><div className="list">{inboxUnits.map((u) => <Row key={u.unitId} u={u} />)}</div></>}
      {dayUnits.length + inboxUnits.length + extra.length === 0 && (
        <div className="empty"><HorizonArt variant="inbox" /><h3>Nothing to plan yet</h3><p>Capture one concrete action with a clear finish line.</p><button className="btn primary" onClick={onNew}><Plus size={18} weight="bold" /> New action</button></div>
      )}

      {entries.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          {cap.needsAcknowledgement && (
            <label className="check">
              <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} />
              <span>
                <b>{cap.overload > 0 ? `This is ${mins(cap.overload)} more than you have.` : 'Some actions have no estimate.'}</b>{' '}
                {cap.unknownCount > 0 && cap.overload > 0 ? `${cap.unknownCount} more without an estimate. ` : ''}
                I’ve seen this and want to commit anyway — or untick something above.
              </span>
            </label>
          )}
          {revising && <div className="field"><span>What changed? (optional, private)</span><input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Moved the project to Wednesday" /></div>}
          {error && <p className="err" role="alert" style={{ color: 'var(--warn)', fontWeight: 600, marginBottom: 8 }}>{error}</p>}
          <div className="btn-row" style={{ marginTop: 0 }}>
            <button className="btn primary" disabled={cap.needsAcknowledgement && !ack} onClick={commit}><Sun size={18} weight="bold" /> {revising ? 'Commit revision' : `Commit ${entries.length} action${entries.length > 1 ? 's' : ''}`}</button>
            {revising && <button className="btn" onClick={onCancel}>Cancel</button>}
          </div>
          <p className="footnote">Committing saves a snapshot. Later changes become revisions; nothing is overwritten.</p>
        </div>
      )}
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
