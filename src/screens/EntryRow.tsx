import { CaretRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { currentEvent } from '../domain/commands'
import { resolveUnit } from '../domain/recurrence'
import { quickResult } from '../domain/results'
import type { Outcome, PlanEntry } from '../domain/types'
import { OutcomeMark, OUTCOME_LABEL, mins, shortDay, useToast } from '../ui/kit'

const CHOICES: Outcome[] = ['completed', 'partial', 'missed', 'skipped']

/**
 * A committed item on a day. Its outcome mark opens a one-tap picker; the rest of the row
 * opens the full result sheet when `onOpen` is given.
 */
export function EntryRow({ date, entry, onOpen }: { date: string; entry: PlanEntry; onOpen?: () => void }) {
  const { state, run, now, today } = useStore()
  const toast = useToast()
  const [picking, setPicking] = useState(false)
  const ev = currentEvent(state, date, entry.unitId)
  const u = resolveUnit(state, entry.unitId)
  const outcome = ev?.outcome ?? 'unreported'

  const pick = (o: Outcome) => {
    setPicking(false)
    if (o === ev?.outcome) return
    const r = run(quickResult(state, date, entry.unitId, o, now, today))
    if (!r.ok) toast(r.message)
    else toast(ev ? `Changed to ${OUTCOME_LABEL[o].toLowerCase()} — earlier entry kept` : state.sim.online ? `${OUTCOME_LABEL[o]} — saved` : 'Saved on this device')
  }

  const body = (
    <>
      <div className="grow">
        <div className="title">{entry.title}</div>
        <div className="meta">
          <span>{entry.criterion || 'No done criterion'}</span>
          <span className="num">{mins(entry.estimate)}</span>
          {ev?.actualMin != null && <span className="num">did {mins(ev.actualMin)}</span>}
          {u?.moved && u.originDate && <span>from {shortDay(u.originDate)}</span>}
          {!ev && <span>{OUTCOME_LABEL.unreported}</span>}
        </div>
      </div>
      {onOpen && <CaretRight className="chev" size={18} aria-hidden="true" />}
    </>
  )

  return (
    <div className="entry">
      <div className="row entry-row">
        <button className="mark-btn" aria-expanded={picking} onClick={() => setPicking(!picking)}
          aria-label={`${entry.title}: ${OUTCOME_LABEL[outcome]}. ${picking ? 'Close result choices' : 'Record a result'}`}>
          <OutcomeMark outcome={outcome} />
        </button>
        {onOpen
          ? <button className="entry-main" onClick={onOpen} aria-label={`${entry.title} — details`}>{body}</button>
          : <div className="entry-main">{body}</div>}
      </div>
      {picking && (
        <div className="quick-pick" role="group" aria-label={`What happened with ${entry.title}?`}>
          {CHOICES.map((o) => (
            <button key={o} aria-pressed={o === ev?.outcome} onClick={() => pick(o)}>
              <OutcomeMark outcome={o} size={22} />{OUTCOME_LABEL[o]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
