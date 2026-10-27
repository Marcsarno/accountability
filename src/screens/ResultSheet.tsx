import { useState } from 'react'
import { useStore } from '../app/store'
import { currentEvent } from '../domain/commands'
import { resolveUnit } from '../domain/recurrence'
import { Temporal, compareDates, resolveLocal } from '../domain/time'
import type { Outcome } from '../domain/types'
import { Banner, OutcomeMark, OUTCOME_LABEL, Sheet, fmtInstant, mins, useToast } from '../ui/kit'
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
  const defaultTime = compareDates(date, today) < 0 ? '18:00' : Temporal.Instant.from(now).toZonedDateTimeISO(zone).toPlainTime().toString({ smallestUnit: 'minute' })

  const [outcome, setOutcome] = useState<Outcome | null>(latest?.outcome ?? null)
  const [actual, setActual] = useState(latest?.actualMin?.toString() ?? '')
  const [note, setNote] = useState(latest?.note ?? '')
  const [time, setTime] = useState(latest ? Temporal.Instant.from(latest.performedAt).toZonedDateTimeISO(zone).toPlainTime().toString({ smallestUnit: 'minute' }) : defaultTime)
  const [expected, setExpected] = useState(latest?.id ?? null)
  const [error, setError] = useState<string | null>(null)
  const [edit, setEdit] = useState(false)

  const save = () => {
    if (!outcome) { setError('Choose what happened.'); return }
    const r = run({ type: 'RecordResult', date, unitId, outcome, actualMin: actual.trim() ? Math.round(Number(actual)) : null, note, performedAt: resolveLocal(date, time, zone).utc, expectedEventId: expected })
    if (!r.ok) { setError(r.message); if (r.kind === 'conflict') setExpected(currentEvent(r.state, date, unitId)?.id ?? null); return }
    toast(latest ? 'Correction saved — earlier entry kept' : state.sim.online ? 'Result saved' : 'Saved on this device')
    onClose()
  }

  if (edit) return <ActionSheet unitId={unitId} onClose={() => setEdit(false)} />

  return (
    <Sheet title="Result" onClose={onClose} trailing={<button className="btn quiet" onClick={save} style={{ fontWeight: 700 }}>Save</button>}>
      <h3 style={{ margin: '4px 0 2px', fontSize: 'var(--t-title3)' }}>{entry?.title ?? u?.title}</h3>
      <p style={{ margin: 0, color: 'var(--ink-2)' }}>Done when: {entry?.criterion || 'no criterion set'} · <span className="num">{mins(entry?.estimate)}</span></p>
      <button className="btn quiet small" style={{ paddingLeft: 0 }} onClick={() => setEdit(true)}>Edit action details</button>

      <div className="field" style={{ marginTop: 12 }}>
        <span id="oc">What happened?</span>
        <div role="radiogroup" aria-labelledby="oc" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {CHOICES.map((o) => (
            <button key={o} role="radio" aria-checked={outcome === o} onClick={() => setOutcome(o)} className="btn" style={{ justifyContent: 'flex-start', borderRadius: 16, minHeight: 52, background: outcome === o ? 'var(--surface)' : 'var(--surface-2)', boxShadow: outcome === o ? 'inset 0 0 0 2px var(--ink)' : 'none' }}>
              <OutcomeMark outcome={o} size={24} /> {OUTCOME_LABEL[o]}
            </button>
          ))}
        </div>
        <span className="hint">Partial means the criterion wasn’t met. Skipped means you chose not to. If you’re unsure, leave it unreported — midnight won’t turn it into a miss.</span>
      </div>
      <div className="grid2">
        <label className="field"><span>Actual minutes</span><input className="input num" inputMode="numeric" value={actual} onChange={(e) => setActual(e.target.value)} placeholder="Optional" /></label>
        <label className="field"><span>Done at (local)</span><input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
      </div>
      <label className="field"><span>Private note</span><textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional — never shared" /></label>
      {compareDates(date, today) < 0 && <Banner tone="info">Late entry: it records when you did it and when it was entered. It is your own report, not proof.</Banner>}
      {error && <Banner tone="warn">{error}</Banner>}
      {history.length > 0 && (
        <>
          <hr className="divider" />
          <b style={{ fontSize: 'var(--t-sub)' }}>History</b>
          <ol style={{ margin: '8px 0 0', paddingLeft: 18, color: 'var(--ink-2)', fontSize: 'var(--t-foot)' }}>
            {history.map((e) => <li key={e.id}>{OUTCOME_LABEL[e.outcome]}{e.actualMin != null ? `, ${e.actualMin} min` : ''} — done {fmtInstant(e.performedAt, zone)}, entered {fmtInstant(e.recordedAt, zone)}{e.corrects ? ' (correction)' : ''}</li>)}
          </ol>
        </>
      )}
    </Sheet>
  )
}
