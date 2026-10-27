import { ArrowsClockwise, CaretRight, Plus, Trash } from '@phosphor-icons/react'
import { useState } from 'react'
import { newId, useStore } from '../app/store'
import { revisionFor } from '../domain/recurrence'
import { compareDates } from '../domain/time'
import type { Action } from '../domain/types'
import { HorizonArt, fmtDate, mins, useToast } from '../ui/kit'
import { ActionSheet } from './ActionSheet'

const DAY = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Inbox() {
  const { state, run, today } = useStore()
  const toast = useToast()
  const [title, setTitle] = useState('')
  const [open, setOpen] = useState<string | 'new' | null>(null)
  const [showTrash, setShowTrash] = useState(false)

  const all = Object.values(state.actions)
  const live = all.filter((a) => !a.trashedAt && !a.withdrawn)
  const unplanned = live.filter((a) => !a.seriesId && !a.plannedDate)
  const planned = live.filter((a) => !a.seriesId && a.plannedDate && compareDates(a.plannedDate, today) >= 0).sort((a, b) => compareDates(a.plannedDate!, b.plannedDate!))
  const repeating = live.filter((a) => a.seriesId && state.series[a.seriesId] && !state.series[a.seriesId].trashedAt)
  const trashed = all.filter((a) => a.trashedAt)

  const quickAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const r = run({ type: 'CreateAction', id: newId(), title, criterion: '', estimate: null, cue: null, goal: null, plannedDate: null, deadline: null, notes: '' })
    if (r.ok) { setTitle(''); toast('Captured — add a finish line when you’re ready') }
  }

  const Row = ({ a, meta }: { a: Action; meta: React.ReactNode }) => (
    <button className="row" onClick={() => setOpen(a.id)}>
      <div className="grow"><div className="title">{a.title}</div><div className="meta">{meta}</div></div>
      <CaretRight className="chev" size={18} />
    </button>
  )
  const basics = (a: Action) => <>
    <span style={!a.criterion ? { color: 'var(--warn)', fontWeight: 600 } : undefined}>{a.criterion || 'No finish line yet'}</span>
    <span className="num">{mins(a.estimate)}</span>
    {a.deadline && <span>Due {fmtDate(a.deadline, { month: 'short', day: 'numeric' })}</span>}
  </>

  return (
    <>
      <div className="top"><div><div className="eyebrow">Capture first, plan later</div><h1 className="large-title">Inbox</h1></div>
        <button className="icon-btn" aria-label="New action with details" onClick={() => setOpen('new')}><Plus size={22} weight="bold" /></button></div>

      <form onSubmit={quickAdd} style={{ display: 'flex', gap: 8 }}>
        <input className="input" aria-label="Quick capture" placeholder="Something you might do…" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className="btn primary" type="submit" disabled={!title.trim()}>Add</button>
      </form>

      {unplanned.length === 0 && planned.length === 0 && repeating.length === 0 ? (
        <div className="empty"><HorizonArt variant="inbox" /><h3>Inbox is clear</h3><p>Keep it small. Capture an action with an observable finish line, then pull it into a day.</p></div>
      ) : (
        <>
          {unplanned.length > 0 && <><h2 className="section-title">Not planned <small>{unplanned.length}</small></h2><div className="list">{unplanned.map((a) => <Row key={a.id} a={a} meta={basics(a)} />)}</div></>}
          {planned.length > 0 && <><h2 className="section-title">Planned <small>{planned.length}</small></h2><div className="list">{planned.map((a) => <Row key={a.id} a={a} meta={<><span>{a.plannedDate === today ? 'Today' : fmtDate(a.plannedDate!, { weekday: 'short', month: 'short', day: 'numeric' })}</span>{basics(a)}</>} />)}</div></>}
          {repeating.length > 0 && <><h2 className="section-title">Repeating <small>{repeating.length}</small></h2><div className="list">{repeating.map((a) => {
            const se = state.series[a.seriesId!]
            const rev = revisionFor(se, today) ?? se.revisions.at(-1)!
            return <Row key={a.id} a={a} meta={<><ArrowsClockwise size={14} weight="bold" /><span>{rev.rule.kind === 'daily' ? 'Every day' : rev.rule.days.map((d) => DAY[d]).join(' ')}</span><span className="num">{mins(rev.estimate)}</span><span>{rev.criterion}</span></>} />
          })}</div><p className="footnote">To change one day, open it from Today. Editing here changes the original action, not its repeats.</p></>}
        </>
      )}

      {trashed.length > 0 && (
        <>
          <button className="btn quiet small" style={{ marginTop: 24, paddingLeft: 0 }} onClick={() => setShowTrash(!showTrash)} aria-expanded={showTrash}><Trash size={16} /> Trash ({trashed.length})</button>
          {showTrash && <><div className="list">{trashed.map((a) => <Row key={a.id} a={a} meta={<span>Kept 30 days, then deleted (simulated). Restoring keeps it private.</span>} />)}</div></>}
        </>
      )}

      {open && <ActionSheet unitId={open === 'new' ? undefined : open} onClose={() => setOpen(null)} />}
    </>
  )
}
