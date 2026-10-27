import { Flask, Lock } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { latestCheckIn } from '../domain/commands'
import { currentExperiment, summarizeDay } from '../domain/review'
import { Banner, Sheet, fmtDate, sameValues } from '../ui/kit'
import { EntryRow } from './EntryRow'

export function CheckInSheet({ date, onClose, onSubmitted }: { date: string; onClose: () => void; onSubmitted: () => void }) {
  const { state, run } = useStore()
  const prior = latestCheckIn(state, date)
  const plan = state.plans[date]?.revisions.at(-1)
  const sum = summarizeDay(state, date)
  const experiment = currentExperiment(state, date)
  const [initial] = useState(() => ({ reflection: prior?.reflection ?? '', nextStep: prior?.nextStep ?? '' }))
  const [form, setForm] = useState(initial)
  const [error, setError] = useState<string | null>(null)

  const submit = () => {
    const r = run({ type: 'SubmitPrivateCheckIn', date, reflection: form.reflection, nextStep: form.nextStep, expectedRev: prior?.rev ?? 0 })
    if (!r.ok) { setError(r.message); return }
    onSubmitted()
  }

  return (
    <Sheet title={prior ? 'Update check-in' : 'Private check-in'} onClose={onClose} dirty={!sameValues(form, initial)}
      footer={<button className="btn primary" onClick={submit}>{prior ? 'Save new version' : `Check in for ${fmtDate(date, { weekday: 'long' })}`}</button>}>
      <p className="sheet-lede"><Lock size={14} weight="bold" aria-hidden="true" /> Only you see this. Sharing is a separate, optional step.</p>
      <div className="list">
        {plan?.entries.map((e) => <EntryRow key={e.unitId} date={date} entry={e} />)}
      </div>
      <p className="footnote">
        {sum.counts.unreported > 0
          ? `Tap a mark to record a result. ${sum.counts.unreported} not reported — that’s fine, they stay “not reported” and are never counted as misses.`
          : 'Every item has a result.'}
      </p>
      {sum.leftOriginal.length > 0 && <p className="footnote">From your original plan: {sum.leftOriginal.map((x) => `${x.title} (${x.now})`).join(', ')}.</p>}
      {experiment && <p className="experiment-line"><Flask size={16} weight="bold" aria-hidden="true" /> This week you’re trying: {experiment.text}</p>}

      <label className="field reflection-field"><span>What happened? (private)</span><textarea className="textarea" value={form.reflection} onChange={(e) => setForm({ ...form, reflection: e.target.value })} placeholder="What helped, what got in the way" /></label>
      <label className="field"><span>Next step</span><input className="input" value={form.nextStep} onChange={(e) => setForm({ ...form, nextStep: e.target.value })} placeholder="The smallest useful thing to try next" /><span className="hint">You’ll see this when you plan your next day. A fallback goes here too — it becomes a new plan, never a silent completion.</span></label>
      {!state.sim.online && <Banner tone="info">Offline: this will be saved on this device and marked submitted once synced.</Banner>}
      {error && <Banner tone="warn">{error}</Banner>}
    </Sheet>
  )
}
