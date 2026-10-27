import { useState } from 'react'
import { newId, useStore } from '../app/store'
import { committedUnits } from '../domain/commands'
import { isOccKey, previewSeriesEdit, resolveUnit, revisionFor } from '../domain/recurrence'
import type { Action, ActionOrigin, RepeatRule } from '../domain/types'
import { Sheet, fmtDate, mins, originLabel, sameValues, shortDay, useToast } from '../ui/kit'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface Props {
  unitId?: string
  initialDate?: string | null
  /** Starting values for a new action (e.g. a next step being planned). */
  prefill?: { title: string }
  origin?: ActionOrigin
  onClose: () => void
  /** Called with the new id after creating; the caller closes the sheet. */
  onSaved?: (id: string) => void
}

/** Create or edit a one-time action, or edit a single repeat (default) / its series (previewed). */
export function ActionSheet({ unitId, initialDate, prefill, origin, onClose, onSaved }: Props) {
  const { state, run, today } = useStore()
  const toast = useToast()
  const occ = unitId && isOccKey(unitId) ? state.occurrences[unitId] : null
  const action = unitId && !occ ? state.actions[unitId] : null
  const u = unitId ? resolveUnit(state, unitId) : null
  const series = occ ? state.series[occ.seriesId] : action?.seriesId ? state.series[action.seriesId] : null

  const [initial] = useState(() => ({
    title: u?.title ?? prefill?.title ?? '',
    criterion: u?.criterion ?? '',
    estimate: u?.estimate?.toString() ?? '',
    cue: u?.cue ?? '',
    goal: action?.goal ?? '',
    planned: action ? action.plannedDate ?? '' : initialDate ?? '',
    deadline: action?.deadline ?? '',
    notes: action?.notes ?? '',
    moveTo: occ?.displayDate ?? '',
  }))
  const [form, setForm] = useState(initial)
  const field = (k: keyof typeof initial) => ({
    value: form[k],
    onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value })),
  })
  const [scope, setScope] = useState<'one' | 'series'>('one')
  const [rule, setRule] = useState<RepeatRule>({ kind: 'daily', days: [] })
  const [error, setError] = useState<string | null>(null)
  const [overwrite, setOverwrite] = useState<string[]>([])
  const dirty = !sameValues(form, initial) || overwrite.length > 0

  const { title, criterion, estimate, cue, goal, planned, deadline, notes, moveTo } = form
  const est = estimate.trim() === '' ? null : Math.max(0, Math.round(Number(estimate)))

  const save = () => {
    setError(null)
    if (!title.trim()) return setError('Give it a short title.')
    if (estimate.trim() && Number.isNaN(Number(estimate))) return setError('Estimate must be a number of minutes.')
    if (occ && scope === 'one') {
      const r = run({ type: 'EditOccurrence', key: occ.key, patch: { title, criterion, estimate: est, cue: cue || null } })
      if (!r.ok) return setError(r.message)
      if (moveTo && moveTo !== occ.displayDate) run({ type: 'MoveUnit', unitId: occ.key, toDate: moveTo })
      toast('This repeat updated — the series is unchanged')
    } else if (occ && series && scope === 'series') {
      const cur = revisionFor(series, occ.originDate)!
      const r = run({ type: 'EditSeries', seriesId: series.id, effectiveFrom: occ.originDate, patch: { title, criterion, estimate: est, cue: cue || null, rule: cur.rule }, overwriteExceptions: overwrite })
      if (!r.ok) return setError(r.message)
      toast('Future repeats updated; changed ones kept')
    } else if (action) {
      const r = run({ type: 'EditAction', id: action.id, patch: { title, criterion, estimate: est, cue: cue || null, goal: goal || null, plannedDate: planned || null, deadline: deadline || null, notes } })
      if (!r.ok) return setError(r.message)
      toast('Saved')
    } else {
      const id = newId()
      const r = run({ type: 'CreateAction', id, title, criterion, estimate: est, cue: cue || null, goal: goal || null, plannedDate: planned || null, deadline: deadline || null, notes, ...(origin && { origin }) })
      if (!r.ok) return setError(r.message)
      toast(planned ? `Added for ${fmtDate(planned, { weekday: 'long' })}` : 'Added to Inbox')
      if (onSaved) return onSaved(id)
    }
    onClose()
  }

  const preview = occ && series && scope === 'series' ? previewSeriesEdit(state, series.id, occ.originDate, committedUnits(state)) : null

  return (
    <Sheet title={unitId ? (occ ? 'Repeat' : 'Action') : 'New action'} onClose={onClose} dirty={dirty}
      footer={<button className="btn primary" onClick={save}>{unitId ? 'Save' : 'Add'}</button>}>
      {action && <OriginNote action={action} />}
      {occ && (
        <div className="card tint-info" style={{ marginBottom: 16 }}>
          <p style={{ color: 'var(--ink)' }}>Repeat from <b>{fmtDate(occ.originDate)}</b>{occ.displayDate !== occ.originDate && <> · shown on <b>{fmtDate(occ.displayDate)}</b></>}. Its identity stays tied to its original date.</p>
          <div className="seg" style={{ marginTop: 10 }} role="group" aria-label="What to change">
            <button aria-pressed={scope === 'one'} onClick={() => setScope('one')}>Only this one</button>
            <button aria-pressed={scope === 'series'} onClick={() => setScope('series')}>This and future</button>
          </div>
        </div>
      )}
      <label className="field"><span>Action</span><input className="input" {...field('title')} placeholder="e.g. Draft section 2" /></label>
      <label className="field"><span>Done when…</span><input className="input" {...field('criterion')} placeholder="An observable finish line" /><span className="hint">Minutes spent don’t complete an action — this does.</span></label>
      <div className="grid2">
        <label className="field"><span>Estimate (min)</span><input className="input num" inputMode="numeric" {...field('estimate')} placeholder="Unknown" /></label>
        {!occ && <label className="field"><span>Goal label (private)</span><input className="input" {...field('goal')} placeholder="Optional" /></label>}
      </div>
      <label className="field"><span>When or after what will you start? (optional)</span><input className="input" {...field('cue')} placeholder="e.g. After first coffee" /><span className="hint">Private unless you choose to share it.</span></label>
      {!occ && (
        <div className="grid2">
          <label className="field"><span>Planned day</span><input className="input" type="date" {...field('planned')} /></label>
          <label className="field"><span>Hard deadline</span><input className="input" type="date" {...field('deadline')} /></label>
        </div>
      )}
      {occ && scope === 'one' && <label className="field"><span>Move this repeat to</span><input className="input" type="date" {...field('moveTo')} /><span className="hint">Moving never completes it. The day it lands on keeps its own repeat too.</span></label>}
      {!occ && <label className="field"><span>Private notes</span><textarea className="textarea" {...field('notes')} /></label>}

      {preview && (
        <div className="preview" style={{ marginBottom: 16 }}>
          <b>Preview: this and future repeats</b>
          <p className="footnote">{preview.untouched.length} untouched future {preview.untouched.length === 1 ? 'copy follows' : 'copies follow'} the new details.</p>
          {[...preview.exceptions, ...preview.committed].length > 0 && <p className="footnote" style={{ color: 'var(--ink)' }}>These were changed or already committed, so they keep their details unless you tick them:</p>}
          {[...preview.exceptions, ...preview.committed].map((x) => (
            <label key={x.unitId} className="check" style={{ padding: '6px 0' }}>
              <input type="checkbox" checked={overwrite.includes(x.unitId)} onChange={(e) => setOverwrite(e.target.checked ? [...overwrite, x.unitId] : overwrite.filter((k) => k !== x.unitId))} />
              <span>{x.title} · from {fmtDate(x.originDate!, { weekday: 'short', month: 'short', day: 'numeric' })}{x.moved ? ` (shown ${shortDay(x.date!)})` : ''} · {mins(x.estimate)}</span>
            </label>
          ))}
        </div>
      )}

      {error && <p role="alert" className="form-error">{error}</p>}

      {action && !action.seriesId && !action.trashedAt && (
        <>
          <hr className="divider" />
          <div className="field"><span>Repeat</span>
            <div className="seg" role="group" aria-label="Repeat pattern">
              <button aria-pressed={rule.kind === 'daily'} onClick={() => setRule({ kind: 'daily', days: [] })}>Daily</button>
              <button aria-pressed={rule.kind === 'weekdays'} onClick={() => setRule({ kind: 'weekdays', days: rule.days.length ? rule.days : [1, 2, 3, 4, 5] })}>Chosen days</button>
            </div>
            {rule.kind === 'weekdays' && <div className="seg" style={{ marginTop: 6 }}>{DAYS.map((d, i) => <button key={d} aria-pressed={rule.days.includes(i + 1)} onClick={() => setRule({ kind: 'weekdays', days: rule.days.includes(i + 1) ? rule.days.filter((x) => x !== i + 1) : [...rule.days, i + 1].sort() })}>{d}</button>)}</div>}
            <span className="hint">This action keeps its notes and history; repeats start {action.plannedDate ? 'after its planned day' : 'today'}.</span>
          </div>
          <button className="btn small" onClick={() => {
            const r = run({ type: 'MakeRepeating', actionId: action.id, seriesId: newId(), rule, startDate: action.plannedDate ?? today })
            if (r.ok) { toast('Now repeating'); onClose() } else setError(r.message)
          }}>Make repeating</button>
        </>
      )}

      {unitId && (
        <>
          <hr className="divider" />
          <div className="btn-row" style={{ marginTop: 0 }}>
            {(occ || (action && !action.seriesId)) && !u?.withdrawn && <button className="btn small" onClick={() => { run({ type: 'WithdrawUnit', unitId: unitId }); toast('Withdrawn — kept in history'); onClose() }}>Withdraw</button>}
            {action && !action.trashedAt && <button className="btn small danger" onClick={() => { run({ type: 'TrashUnit', unitId: action.id }); toast(action.seriesId ? 'Series moved to Trash' : 'Moved to Trash'); onClose() }}>{action.seriesId ? 'Trash series' : 'Move to Trash'}</button>}
            {action?.trashedAt && <button className="btn small" onClick={() => { run({ type: 'RestoreUnit', unitId: action.id }); toast('Restored — private, not re-shared'); onClose() }}>Restore (private)</button>}
          </div>
          <p className="footnote">Withdrawing or trashing is never completion. Trash revokes any partner access to this item; restoring keeps it private.</p>
        </>
      )}
    </Sheet>
  )
}

function OriginNote({ action }: { action: Action }) {
  const { state } = useStore()
  const label = originLabel(state, action.id)
  return label && <p className="origin-note">{label}</p>
}
