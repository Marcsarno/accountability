import { Flask, PencilSimple, Plus, Sun } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { summarizeCapacity } from '../domain/capacity'
import { draftFor } from '../domain/commands'
import { resolveUnit, unitsOn, type UnitView } from '../domain/recurrence'
import { carryForward } from '../domain/review'
import { addDays, type LocalDate } from '../domain/time'
import { CapacityBar, HorizonArt, mins, originLabel, shortDay } from '../ui/kit'

const AVAILABLE_CHOICES = [30, 60, 90, 120, 180]

export interface NextStep { fromDate: LocalDate; text: string }

interface Props {
  date: LocalDate
  revising: boolean
  onDone: (msg: string) => void
  onCancel: () => void
  onNew: () => void
  onEdit: (unitId: string) => void
  onPlanNextStep: (step: NextStep) => void
}

/** Choose what to commit for a day. The draft is only stored once the owner changes something. */
export function PlanBuilder({ date, revising, onDone, onCancel, onNew, onEdit, onPlanNextStep }: Props) {
  const { state, run } = useStore()
  const last = state.plans[date]?.revisions.at(-1)
  const [ack, setAck] = useState(false)
  const [note, setNote] = useState('')
  const [error, setError] = useState<string | null>(null)

  const draft = draftFor(state, date)
  const dayUnits = unitsOn(state, date)
  const inboxUnits: UnitView[] = Object.values(state.actions)
    .filter((a) => !a.seriesId && !a.trashedAt && !a.withdrawn && !a.plannedDate)
    .map((a) => resolveUnit(state, a.id)!)
  const listed = new Set([...dayUnits, ...inboxUnits].map((u) => u.unitId))
  // Selected units that no longer appear in either list (e.g. moved away) stay visible so they can be unticked.
  const extra = draft.unitIds.filter((id) => !listed.has(id)).map((id) => resolveUnit(state, id)).filter((u): u is UnitView => !!u)
  const selected = new Set(draft.unitIds)
  const entries = draft.unitIds.map((id) => resolveUnit(state, id)).filter((u): u is UnitView => !!u)
  const cap = summarizeCapacity(draft.available, entries)

  const setDraft = (available: number, unitIds: string[]) => {
    setAck(false)
    run({ type: 'SetDraft', date, available, unitIds })
  }
  const toggle = (u: UnitView) => {
    const adding = !selected.has(u.unitId)
    // Picking an Inbox action plans it on this day.
    if (adding && u.kind === 'action' && !u.date) run({ type: 'MoveUnit', unitId: u.unitId, toDate: date })
    setDraft(draft.available, adding ? [...draft.unitIds, u.unitId] : draft.unitIds.filter((x) => x !== u.unitId))
  }
  const commit = () => {
    const r = run({ type: 'CommitPlan', date, acknowledged: ack, expectedRev: last?.rev ?? 0, note })
    if (!r.ok) setError(r.message)
    else onDone(revising ? 'Plan revised — original kept in history' : 'Committed')
  }

  const rows = (units: UnitView[]) => units.map((u) => (
    <PlanRow key={u.unitId} u={u} checked={selected.has(u.unitId)} tag={originLabel(state, u.unitId)} onToggle={() => toggle(u)} onEdit={() => onEdit(u.unitId)} />
  ))

  return (
    <>
      <h2 className="section-title">{revising ? 'Revise commitment' : 'Plan the day'} <small>{revising ? 'The original stays in history' : 'Pick what you can realistically do'}</small></h2>
      {!revising && <CarryForwardCard date={date} onPlanNextStep={onPlanNextStep} />}
      <div className="card">
        <div className="field available-field">
          <span id="avail-label">Time available after fixed obligations</span>
          <div className="seg" role="group" aria-labelledby="avail-label">
            {AVAILABLE_CHOICES.map((n) => <button key={n} aria-pressed={draft.available === n} onClick={() => setDraft(n, draft.unitIds)}>{mins(n)}</button>)}
            <input className="input num available-input" inputMode="numeric" aria-label="Minutes available" value={draft.available} onChange={(e) => setDraft(Number(e.target.value.replace(/\D/g, '')) || 0, draft.unitIds)} />
          </div>
        </div>
        <CapacityBar available={draft.available} entries={entries} />
      </div>

      {dayUnits.length + extra.length > 0 && <><h2 className="section-title">On this day</h2><div className="list">{rows([...dayUnits, ...extra])}</div></>}
      {inboxUnits.length > 0 && <><h2 className="section-title">From your Inbox</h2><div className="list">{rows(inboxUnits)}</div></>}
      {listed.size + extra.length === 0 && (
        <div className="empty"><HorizonArt variant="inbox" /><h3>Nothing to plan yet</h3><p>Capture one concrete action with a clear finish line.</p><button className="btn primary" onClick={onNew}><Plus size={18} weight="bold" /> New action</button></div>
      )}

      {entries.length > 0 && (
        <div className="card commit-card">
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
          {revising && <label className="field"><span>What changed? (optional, private)</span><input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Moved the project to Wednesday" /></label>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="btn-row flush-top">
            <button className="btn primary" disabled={cap.needsAcknowledgement && !ack} onClick={commit}><Sun size={18} weight="bold" /> {revising ? 'Commit revision' : `Commit ${entries.length} action${entries.length > 1 ? 's' : ''}`}</button>
            {revising && <button className="btn" onClick={onCancel}>Cancel</button>}
          </div>
          <p className="footnote">Committing saves a snapshot. Later changes become revisions; nothing is overwritten.</p>
        </div>
      )}
    </>
  )
}

function PlanRow({ u, checked, tag, onToggle, onEdit }: { u: UnitView; checked: boolean; tag: string | null; onToggle: () => void; onEdit: () => void }) {
  return (
    <div className="row plan-row">
      <label className="plan-pick">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        <div className="grow">
          <div className="title">{u.title}</div>
          <div className="meta">
            {tag && <span className="tag">{tag}</span>}
            <span className={u.criterion ? undefined : 'missing'}>{u.criterion || 'Add a done criterion'}</span>
            <span className={`num${u.estimate == null ? ' missing' : ''}`}>{mins(u.estimate)}</span>
            {u.cue && <span>When: {u.cue}</span>}
            {u.deadline && <span>Due {shortDay(u.deadline)} {u.deadline.slice(5)}</span>}
            {u.moved && u.originDate && <span>from {shortDay(u.originDate)}</span>}
          </div>
        </div>
      </label>
      <button className="icon-btn ghost" aria-label={`Edit ${u.title}`} onClick={onEdit}><PencilSimple size={18} /></button>
    </div>
  )
}

function CarryForwardCard({ date, onPlanNextStep }: { date: LocalDate; onPlanNextStep: (step: NextStep) => void }) {
  const { state, today } = useStore()
  const { nextStep, experiment } = carryForward(state, date)
  if (!nextStep && !experiment) return null
  return (
    <div className="card carry">
      {nextStep && (
        <>
          <div className="eyebrow">Your next step · from {nextStep.fromDate === addDays(today, -1) ? 'yesterday' : shortDay(nextStep.fromDate)}</div>
          <p className="carry-text">{nextStep.text}</p>
          <button className="btn small primary" onClick={() => onPlanNextStep(nextStep)}><Plus size={16} weight="bold" /> Plan it</button>
        </>
      )}
      {experiment && <p className="experiment-line"><Flask size={16} weight="bold" aria-hidden="true" /> This week you’re trying: {experiment.text}</p>}
    </div>
  )
}
