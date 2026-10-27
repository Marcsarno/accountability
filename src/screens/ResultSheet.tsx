import { useState } from 'react'
import { useStore } from '../app/store'
import { currentEvent } from '../domain/commands'
import { resolveUnit } from '../domain/recurrence'
import { defaultPerformedTime } from '../domain/results'
import { Temporal, compareDates, resolveLocal } from '../domain/time'
import type { Outcome } from '../domain/types'
import { Banner, OutcomeMark, OUTCOME_LABEL, Sheet, fmtInstant, mins, sameValues, useToast } from '../ui/kit'
import { ActionSheet } from './ActionSheet'

const CHOICES: Outcome[] = ['completed', 'partial', 'missed', 'skipped']

export function ResultSheet({ date, unitId, onClose }: { date: string; unitId: string; onClose: () => void }) {
  const { state, run, now, today } = useStore()
  const toast = useToast()
  const u = resolveUnit(state, unitId)
  const entry = state.plans[date]?.revisions.at(-1)?.entries.find((e) => e.unitId === unitId)
  const latest = currentEvent(state, date, unitId)
  const history = state.events.filter((e) => e.date === date && e.unitId === unitId)
  const zone = state.plans[date]?.zone ?? state.owner.zone

  const [initial] = useState(() => ({
    outcome: latest?.outcome ?? null as Outcome | null,
    actual: latest?.actualMin?.toString() ?? '',
    note: latest?.note ?? '',
    time: latest
      ? Temporal.Instant.from(latest.performedAt).toZonedDateTimeISO(zone).toPlainTime().toString({ smallestUnit: 'minute' })
      : defaultPerformedTime(date, today, now, zone),
  }))
  const [form, setForm] = useState(initial)
  const [expected, setExpected] = useState(latest?.id ?? null)
  const [error, setError] = useState<string | null>(null)
  const [edit, setEdit] = useState(false)

  const save = () => {
    if (!form.outcome) { setError('Choose what happened.'); return }
    const r = run({ type: 'RecordResult', date, unitId, outcome: form.outcome, actualMin: form.actual.trim() ? Math.round(Number(form.actual)) : null, note: form.note, performedAt: resolveLocal(date, form.time, zone).utc, expectedEventId: expected })
    if (!r.ok) { setError(r.message); if (r.kind === 'conflict') setExpected(currentEvent(r.state, date, unitId)?.id ?? null); return }
    toast(latest ? 'Correction saved — earlier entry kept' : state.sim.online ? 'Result saved' : 'Saved on this device')
    onClose()
  }

  if (edit) return <ActionSheet unitId={unitId} onClose={() => setEdit(false)} />

  return (
    <Sheet title="Result" onClose={onClose} dirty={!sameValues(form, initial)} footer={<button className="btn primary" onClick={save}>Save</button>}>
      <h3 className="sheet-subject">{entry?.title ?? u?.title}</h3>
      <p className="sheet-subject-meta">Done when: {entry?.criterion || 'no criterion set'} · <span className="num">{mins(entry?.estimate)}</span></p>
      <button className="btn quiet small flush" onClick={() => setEdit(true)}>Edit action details</button>

      <div className="field outcome-field">
        <span id="oc">What happened?</span>
        <div role="radiogroup" aria-labelledby="oc" className="outcome-choices">
          {CHOICES.map((o) => (
            <button key={o} role="radio" aria-checked={form.outcome === o} className="outcome-choice" onClick={() => setForm({ ...form, outcome: o })}>
              <OutcomeMark outcome={o} size={24} /> {OUTCOME_LABEL[o]}
            </button>
          ))}
        </div>
        <span className="hint">Partial means the criterion wasn’t met. Skipped means you chose not to. If you’re unsure, leave it unreported — midnight won’t turn it into a miss.</span>
      </div>
      <div className="grid2">
        <label className="field"><span>Actual minutes</span><input className="input num" inputMode="numeric" value={form.actual} onChange={(e) => setForm({ ...form, actual: e.target.value })} placeholder="Optional" /></label>
        <label className="field"><span>Done at (local)</span><input className="input" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
      </div>
      <label className="field"><span>Private note</span><textarea className="textarea" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Optional — never shared" /></label>
      {compareDates(date, today) < 0 && <Banner tone="info">Late entry: it records when you did it and when it was entered. It is your own report, not proof.</Banner>}
      {error && <Banner tone="warn">{error}</Banner>}
      {history.length > 0 && (
        <>
          <hr className="divider" />
          <b className="history-title">History</b>
          <ol className="history">
            {history.map((e) => <li key={e.id}>{OUTCOME_LABEL[e.outcome]}{e.actualMin != null ? `, ${e.actualMin} min` : ''} — done {fmtInstant(e.performedAt, zone)}, entered {fmtInstant(e.recordedAt, zone)}{e.corrects ? ' (correction)' : ''}</li>)}
          </ol>
        </>
      )}
    </Sheet>
  )
}
