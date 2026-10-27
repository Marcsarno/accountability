import { Flask } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { latestCheckIn } from '../domain/commands'
import { OUTCOMES, currentExperiment, summarizeDay, summarizeWeek, type DaySummary } from '../domain/review'
import { addDays } from '../domain/time'
import { HorizonArt, OutcomeMark, OUTCOME_LABEL, fmtDate, mins, shortDay, useToast } from '../ui/kit'

export function Review() {
  const { state, today, run } = useStore()
  const toast = useToast()
  const [mode, setMode] = useState<'week' | 'day'>('week')
  const [date, setDate] = useState(today)
  const week = summarizeWeek(state, today)
  const exp = currentExperiment(state, today)
  const [choosing, setChoosing] = useState(false)
  const [custom, setCustom] = useState('')
  const choose = (text: string) => {
    const r = run({ type: 'SetExperiment', weekEnd: today, text })
    if (!r.ok) return
    toast('Experiment set for the next seven days')
    setChoosing(false); setCustom('')
  }

  const suggestions: string[] = []
  const overDays = week.days.filter((d) => d.planned && state.plans[d.date].revisions[0].acknowledged).length
  if (overDays) suggestions.push(`Plan within your time: on ${overDays} day${overDays > 1 ? 's' : ''} you committed past capacity or without estimates.`)
  if (week.counts.partial) suggestions.push('Shrink one finish line so it’s easier to fully complete.')
  if (week.counts.unreported) suggestions.push('Check in before your reminder so results don’t go unreported.')
  if (week.movedOrRemoved) suggestions.push('Commit to fewer items in the morning; add more only once they’re done.')
  if (!suggestions.length) suggestions.push('Keep the same plan size for another week.')

  const total = OUTCOMES.reduce((s, k) => s + week.counts[k], 0)

  return (
    <>
      <div className="top"><div><div className="eyebrow">{fmtDate(addDays(today, -6), { month: 'short', day: 'numeric' })} – {fmtDate(today, { month: 'short', day: 'numeric' })}</div><h1 className="large-title">Review</h1></div></div>
      <div className="seg" role="group" aria-label="Review range">
        <button aria-pressed={mode === 'week'} onClick={() => setMode('week')}>7 days</button>
        <button aria-pressed={mode === 'day'} onClick={() => setMode('day')}>One day</button>
      </div>

      {mode === 'week' ? (
        week.plannedDays === 0 ? (
          <div className="empty"><HorizonArt variant="review" /><h3>No committed days yet</h3><p>Review shows what you planned against what happened — once you commit a day, it appears here.</p></div>
        ) : (
          <>
            <div className="stat-grid" style={{ marginTop: 16 }}>
              <div className="stat"><div className="v num">{week.plannedDays}<span style={{ fontSize: 'var(--t-sub)', color: 'var(--ink-3)' }}>/7</span></div><div className="k">days committed</div></div>
              <div className="stat"><div className="v num">{week.checkedInDays}<span style={{ fontSize: 'var(--t-sub)', color: 'var(--ink-3)' }}>/{week.plannedDays}</span></div><div className="k">of those checked in</div></div>
              <div className="stat"><div className="v num">{week.absentDays}</div><div className="k">days away (paused)</div></div>
            </div>

            <h2 className="section-title">Outcomes <small>{total} committed items</small></h2>
            <div className="card">
              <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', gap: 2 }} aria-hidden="true">
                {OUTCOMES.map((k) => week.counts[k] > 0 && <div key={k} className={`mark ${k}`} style={{ width: 'auto', height: 'auto', flex: week.counts[k], borderRadius: 0 }} />)}
              </div>
              <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse', fontSize: 'var(--t-sub)' }}>
                <caption className="vh">Outcome counts for committed items over seven days</caption>
                <tbody>{OUTCOMES.map((k) => (
                  <tr key={k}><td style={{ padding: '4px 0', width: 32 }}><OutcomeMark outcome={k} size={20} /></td><td>{OUTCOME_LABEL[k]}</td><td className="num" style={{ textAlign: 'right', fontWeight: 650 }}>{week.counts[k]} of {total}</td></tr>
                ))}</tbody>
              </table>
              <p className="footnote">Counts use each day’s current commitment. {week.originalItems} items were originally committed; {week.movedOrRemoved} later moved, withdrawn or removed — they’re not counted as misses. No combined score.</p>
            </div>

            <h2 className="section-title">Days</h2>
            <div className="list">{week.days.map((d) => <DayRow key={d.date} d={d} onClick={() => { setDate(d.date); setMode('day') }} />)}</div>

            <h2 className="section-title">Next experiment</h2>
            {exp && !choosing ? (
              <div className="card tint-signal">
                <h3><Flask size={16} weight="bold" aria-hidden="true" /> This week</h3>
                <p className="experiment-text">{exp.text}</p>
                <p className="footnote">Chosen {fmtDate(exp.weekEnd, { weekday: 'long' })}. Try it for a week, then look again. You’ll see it when you plan and check in.</p>
                <button className="btn quiet small flush" onClick={() => setChoosing(true)}>Choose a different one</button>
              </div>
            ) : (
              <div className="card">
                <p className="picker-lede">Pick one small change to try. Just one.</p>
                {suggestions.map((t) => <button key={t} className="row suggestion" onClick={() => choose(t)}><span className="grow">{t}</span></button>)}
                <form className="inline-form" onSubmit={(e) => { e.preventDefault(); choose(custom) }}>
                  <input className="input" aria-label="Your own experiment" placeholder="Or write your own" value={custom} onChange={(e) => setCustom(e.target.value)} />
                  <button className="btn" type="submit" disabled={!custom.trim()}>Set</button>
                </form>
                {exp && <button className="btn quiet small flush" onClick={() => setChoosing(false)}>Keep “{exp.text}”</button>}
              </div>
            )}
          </>
        )
      ) : (
        <DayDetail date={date} setDate={setDate} />
      )}
    </>
  )
}

function DayRow({ d, onClick }: { d: DaySummary; onClick: () => void }) {
  const parts = d.absent ? ['Time away — not counted'] : !d.planned ? ['No commitment'] : [
    `${d.counts.completed} done`, d.counts.partial && `${d.counts.partial} partial`, d.counts.missed && `${d.counts.missed} missed`, d.counts.skipped && `${d.counts.skipped} skipped`, d.counts.unreported && `${d.counts.unreported} not reported`,
  ].filter(Boolean)
  return (
    <button className="row" onClick={onClick}>
      <div style={{ width: 44, textAlign: 'center' }}><div className="eyebrow" style={{ textTransform: 'none' }}>{shortDay(d.date)}</div><div className="num" style={{ fontWeight: 700, fontSize: 'var(--t-title3)' }}>{d.date.slice(8)}</div></div>
      <div className="grow">
        <div className="title" style={{ fontWeight: 550, fontSize: 'var(--t-sub)' }}>{parts.join(' · ')}</div>
        <div className="meta">{d.planned && <span>{d.currentCount} committed{d.revisions > 1 ? ` (revised from ${d.originalCount})` : ''}</span>}{d.checkedIn && <span>Checked in</span>}{d.sharedCheckIn && <span>Shared</span>}</div>
      </div>
    </button>
  )
}

function DayDetail({ date, setDate }: { date: string; setDate: (d: string) => void }) {
  const { state, today } = useStore()
  const d = summarizeDay(state, date)
  const ci = latestCheckIn(state, date)
  const plan = state.plans[date]
  return (
    <>
      <div className="btn-row">
        <button className="btn small" onClick={() => setDate(addDays(date, -1))}>← Earlier</button>
        <button className="btn small" disabled={date === today} onClick={() => setDate(addDays(date, 1))}>Later →</button>
      </div>
      <h2 className="section-title">{fmtDate(date)}</h2>
      {!d.planned ? <div className="card"><p>{d.absent ? 'Planned time away. Nothing was expected.' : 'No commitment for this day.'}</p></div> : (
        <>
          <div className="card">
            <dl className="kv">
              <dt>Original plan</dt><dd>{d.originalCount} items · {mins(plan.revisions[0].entries.reduce((s, e) => s + (e.estimate ?? 0), 0))} of {mins(plan.revisions[0].available)}</dd>
              <dt>Current plan</dt><dd>{d.currentCount} items · {mins(d.estimateKnown)}{d.estimateUnknown ? ` + ${d.estimateUnknown} unknown` : ''} of {mins(plan.revisions.at(-1)!.available)}</dd>
              <dt>Revisions</dt><dd>{d.revisions}</dd>
              <dt>Time reported</dt><dd>{mins(d.actualMin)}</dd>
              <dt>Zone</dt><dd>{plan.zone}</dd>
            </dl>
          </div>
          {(d.leftOriginal.length > 0 || d.addedAfter.length > 0) && (
            <div className="card">
              {d.leftOriginal.map((x) => <p key={x.unitId}>− {x.title} <span className="footnote">({x.now})</span></p>)}
              {d.addedAfter.map((x) => <p key={x.unitId}>+ {x.title} <span className="footnote">(added after first commitment)</span></p>)}
            </div>
          )}
          <h2 className="section-title">Check-in</h2>
          <div className="card">{ci ? <><p style={{ color: 'var(--ink)' }}>“{ci.reflection || 'No reflection'}”</p>{ci.nextStep && <p style={{ marginTop: 6 }}><b>Next:</b> {ci.nextStep}</p>}<p className="footnote">Version {ci.rev} · private</p></> : <p>No check-in for this day.</p>}</div>
        </>
      )}
    </>
  )
}
