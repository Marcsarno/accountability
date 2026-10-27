import { ArrowLeft, Lock } from '@phosphor-icons/react'
import { useStore } from '../app/store'
import { addDays } from '../domain/time'
import { Banner, OutcomeMark, OUTCOME_LABEL, fmtDate, fmtInstant, mins } from '../ui/kit'

/** What the partner can see: only current, granted snapshot versions, minus revoked items. */
export function PeerView() {
  const { state, setSim, today } = useStore()
  const ag = state.agreements.find((a) => a.status === 'active')
  const name = state.owner.name
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, -i))
  return (
    <div className="peer main" style={{ maxWidth: 720 }}>
      <div className="top">
        <div><div className="eyebrow">Viewing as {state.agreements.at(-1)?.peer.name ?? 'partner'} · simulated</div><h1 className="large-title">{name}’s shared days</h1></div>
        <button className="btn small" onClick={() => setSim({ view: 'owner' })}><ArrowLeft size={16} weight="bold" /> Back</button>
      </div>
      <Banner tone="sim">This screen shows only what the partner’s account would receive from the server. In Phase 0 it’s rendered on your device for review.</Banner>
      {!ag ? (
        <div className="card"><p><Lock size={16} weight="bold" style={{ verticalAlign: '-2px' }} /> You don’t currently have access to {name}’s shared days.</p></div>
      ) : days.map((date) => {
        const v = state.snapshots.filter((s) => s.date === date && s.agreementId === ag.id)
        const ci = v.filter((s) => s.kind === 'checkin').at(-1)
        const plan = v.filter((s) => s.kind === 'plan').at(-1)
        const items = (ci ?? plan)?.items.filter((i) => !state.revokedUnits.includes(i.unitId) && !state.revokedUnits.some((r) => i.unitId.startsWith(r + '@'))) ?? []
        return (
          <div className="card" key={date}>
            <h3>{fmtDate(date)}</h3>
            {!ci && !plan && <p>No check-in shared.</p>}
            {plan && !ci && <p className="footnote" style={{ marginTop: 0 }}>Plan · No results shared yet.</p>}
            {items.map((i) => (
              <div key={i.unitId} style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                {i.outcome ? <OutcomeMark outcome={i.outcome} size={22} /> : <span style={{ width: 22 }} />}
                <div><div style={{ fontWeight: 600 }}>{i.title}</div><div className="footnote" style={{ marginTop: 0 }}>{[i.outcome && OUTCOME_LABEL[i.outcome], i.criterion && `Done when: ${i.criterion}`, i.estimate !== undefined && `Est. ${mins(i.estimate)}`, i.actualMin != null && `Did ${mins(i.actualMin)}`].filter(Boolean).join(' · ')}</div></div>
              </div>
            ))}
            {ci?.message && <p style={{ marginTop: 10, color: 'var(--ink)' }}>“{ci.message}”</p>}
            {ci?.replyDue && <p className="footnote">Your reply is due {fmtInstant(ci.replyDue, state.plans[date]?.zone ?? state.owner.zone)} · version {ci.version}</p>}
          </div>
        )
      })}
    </div>
  )
}
