import { useState } from 'react'
import { newId, useStore } from '../app/store'
import { committedUnits } from '../domain/commands'
import { isOccKey, previewSeriesEdit, resolveUnit, revisionFor } from '../domain/recurrence'
import type { RepeatRule } from '../domain/types'
import { Sheet, fmtDate, mins, shortDay, useToast } from '../ui/kit'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/** Create or edit a one-time action, or edit a single repeat (default) / its series (previewed). */
export function ActionSheet({ unitId, initialDate, onClose, onSaved }: { unitId?: string; initialDate?: string | null; onClose: () => void; onSaved?: (id: string) => void }) {
  const { state, run, today } = useStore()
  const toast = useToast()
  const occ = unitId && isOccKey(unitId) ? state.occurrences[unitId] : null
  const action = unitId && !occ ? state.actions[unitId] : null
  const u = unitId ? resolveUnit(state, unitId) : null
  const series = occ ? state.series[occ.seriesId] : action?.seriesId ? state.series[action.seriesId] : null

  const [title, setTitle] = useState(u?.title ?? '')
  const [criterion, setCriterion] = useState(u?.criterion ?? '')
  const [estimate, setEstimate] = useState(u?.estimate?.toString() ?? '')
  const [cue, setCue] = useState(u?.cue ?? '')
  const [goal, setGoal] = useState(action?.goal ?? '')
  const [planned, setPlanned] = useState<string>(action ? action.plannedDate ?? '' : initialDate ?? '')
  const [deadline, setDeadline] = useState(action?.deadline ?? '')
  const [notes, setNotes] = useState(action?.notes ?? '')
  const [scope, setScope] = useState<'one' | 'series'>('one')
  const [moveTo, setMoveTo] = useState(occ?.displayDate ?? '')
  const [rule, setRule] = useState<RepeatRule>({ kind: 'daily', days: [] })
  const [error, setError] = useState<string | null>(null)
  const [overwrite, setOverwrite] = useState<string[]>([])

  const est = estimate.trim() === '' ? null : Math.max(0, Math.round(Number(estimate)))
  const fail = (m: string) => { setError(m); return false }

  const save = () => {
    setError(null)
    if (!title.trim()) return fail('Give it a short title.')
    if (estimate.trim() && Number.isNaN(Number(estimate))) return fail('Estimate must be a number of minutes.')
    if (occ && scope === 'one') {
      const r = run({ type: 'EditOccurrence', key: occ.key, patch: { title, criterion, estimate: est, cue: cue || null } })
      if (!r.ok) return fail(r.message)
      if (moveTo && moveTo !== occ.displayDate) run({ type: 'MoveUnit', unitId: occ.key, toDate: moveTo })
      toast('This repeat updated — the series is unchanged')
    } else if (occ && series && scope === 'series') {
      const cur = revisionFor(series, occ.originDate)!
      const r = run({ type: 'EditSeries', seriesId: series.id, effectiveFrom: occ.originDate, patch: { title, criterion, estimate: est, cue: cue || null, rule: cur.rule }, overwriteExceptions: overwrite })
      if (!r.ok) return fail(r.message)
      toast('Future repeats updated; changed ones kept')
    } else if (action) {
      const r = run({ type: 'EditAction', id: action.id, patch: { title, criterion, estimate: est, cue: cue || null, goal: goal || null, plannedDate: planned || null, deadline: deadline || null, notes } })
      if (!r.ok) return fail(r.message)
      toast('Saved')
    } else {
      const id = newId()
      const r = run({ type: 'CreateAction', id, title, criterion, estimate: est, cue: cue || null, goal: goal || null, plannedDate: planned || null, deadline: deadline || null, notes })
      if (!r.ok) return fail(r.message)
      toast(planned ? `Added for ${fmtDate(planned, { weekday: 'long' })}` : 'Added to Inbox')
      onSaved?.(id)
      if (onSaved) return true
    }
    onClose()
    return true
  }

  const preview = occ && series && scope === 'series' ? previewSeriesEdit(state, series.id, occ.originDate, committedUnits(state)) : null

  return (
    <Sheet title={unitId ? (occ ? 'Repeat' : 'Action') : 'New action'} onClose={onClose} trailing={<button className="btn quiet" onClick={save} style={{ fontWeight: 700 }}>{unitId ? 'Save' : 'Add'}</button>}>
      {occ && (
        <div className="card tint-info" style={{ marginBottom: 16 }}>
          <p style={{ color: 'var(--ink)' }}>Repeat from <b>{fmtDate(occ.originDate)}</b>{occ.displayDate !== occ.originDate && <> · shown on <b>{fmtDate(occ.displayDate)}</b></>}. Its identity stays tied to its original date.</p>
          <div className="seg" style={{ marginTop: 10 }} role="group" aria-label="What to change">
            <button aria-pressed={scope === 'one'} onClick={() => setScope('one')}>Only this one</button>
            <button aria-pressed={scope === 'series'} onClick={() => setScope('series')}>This and future</button>
          </div>
        </div>
      )}
      <label className="field"><span>Action</span><input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Draft section 2" /></label>
      <label className="field"><span>Done when…</span><input className="input" value={criterion} onChange={(e) => setCriterion(e.target.value)} placeholder="An observable finish line" /><span className="hint">Minutes spent don’t complete an action — this does.</span></label>
      <div className="grid2">
        <label className="field"><span>Estimate (min)</span><input className="input num" inputMode="numeric" value={estimate} onChange={(e) => setEstimate(e.target.value)} placeholder="Unknown" /></label>
        {!occ && <label className="field"><span>Goal label (private)</span><input className="input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Optional" /></label>}
      </div>
      <label className="field"><span>When or after what will you start? (optional)</span><input className="input" value={cue} onChange={(e) => setCue(e.target.value)} placeholder="e.g. After first coffee" /><span className="hint">Private unless you choose to share it.</span></label>
      {!occ && (
        <div className="grid2">
          <label className="field"><span>Planned day</span><input className="input" type="date" value={planned} onChange={(e) => setPlanned(e.target.value)} /></label>
          <label className="field"><span>Hard deadline</span><input className="input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} /></label>
        </div>
      )}
      {occ && scope === 'one' && <label className="field"><span>Move this repeat to</span><input className="input" type="date" value={moveTo} onChange={(e) => setMoveTo(e.target.value)} /><span className="hint">Moving never completes it. The day it lands on keeps its own repeat too.</span></label>}
      {!occ && <label className="field"><span>Private notes</span><textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} /></label>}

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

      {error && <p role="alert" style={{ color: 'var(--warn)', fontWeight: 600 }}>{error}</p>}

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
