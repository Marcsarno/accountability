import { Lock } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { currentEvent, latestCheckIn } from '../domain/commands'
import { summarizeDay } from '../domain/review'
import { Banner, OutcomeMark, OUTCOME_LABEL, Sheet, fmtDate } from '../ui/kit'

export function CheckInSheet({ date, onClose, onSubmitted }: { date: string; onClose: () => void; onSubmitted: () => void }) {
  const { state, run } = useStore()
  const prior = latestCheckIn(state, date)
  const plan = state.plans[date]?.revisions.at(-1)
  const sum = summarizeDay(state, date)
  const [reflection, setReflection] = useState(prior?.reflection ?? '')
  const [nextStep, setNextStep] = useState(prior?.nextStep ?? '')
  const [error, setError] = useState<string | null>(null)

  const submit = () => {
    const r = run({ type: 'SubmitPrivateCheckIn', date, reflection, nextStep, expectedRev: prior?.rev ?? 0 })
    if (!r.ok) { setError(r.message); return }
    onSubmitted()
  }

  return (
    <Sheet title={prior ? 'Update check-in' : 'Private check-in'} onClose={onClose}>
      <p style={{ margin: '0 0 12px', color: 'var(--ink-2)' }}><Lock size={14} weight="bold" style={{ verticalAlign: '-1px' }} /> Only you see this. Sharing is a separate, optional step.</p>
      <div className="list">
        {plan?.entries.map((e) => {
          const ev = currentEvent(state, date, e.unitId)
          return (
            <div className="row" key={e.unitId}>
              <OutcomeMark outcome={ev?.outcome ?? 'unreported'} />
              <div className="grow"><div className="title">{e.title}</div><div className="meta">{OUTCOME_LABEL[ev?.outcome ?? 'unreported']}{ev?.actualMin != null ? ` · ${ev.actualMin} min` : ''}</div></div>
            </div>
          )
        })}
      </div>
      {sum.counts.unreported > 0 && <p className="footnote">{sum.counts.unreported} not reported. That’s fine — they stay “not reported”, never counted as misses. You can still record them later.</p>}
      {sum.leftOriginal.length > 0 && <p className="footnote">From your original plan: {sum.leftOriginal.map((x) => `${x.title} (${x.now})`).join(', ')}.</p>}

      <label className="field" style={{ marginTop: 16 }}><span>What happened? (private)</span><textarea className="textarea" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What helped, what got in the way" /></label>
      <label className="field"><span>Next step</span><input className="input" value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="The smallest useful thing to try next" /><span className="hint">If something got in the way, a fallback goes here — it becomes a new plan, never a silent completion.</span></label>
      {!state.sim.online && <Banner tone="info">Offline: this will be saved on this device and marked submitted once synced.</Banner>}
      {error && <Banner tone="warn">{error}</Banner>}
      <button className="btn primary block" onClick={submit}>{prior ? 'Save new version' : `Check in for ${fmtDate(date, { weekday: 'long' })}`}</button>
    </Sheet>
  )
}
