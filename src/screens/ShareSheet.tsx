import { EyeSlash, PaperPlaneTilt } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useStore } from '../app/store'
import { buildPreview } from '../domain/commands'
import type { ShareField } from '../domain/types'
import { Banner, OutcomeMark, OUTCOME_LABEL, Sheet, fmtDate, fmtInstant, mins, useToast } from '../ui/kit'

const PLAN_FIELDS: [ShareField, string][] = [['criterion', 'Done criterion'], ['estimate', 'Estimate'], ['deadline', 'Hard deadline'], ['cue', 'Start cue']]
const CHECKIN_FIELDS: [ShareField, string][] = [['criterion', 'Done criterion'], ['actualMin', 'Actual minutes'], ['estimate', 'Estimate']]

export function ShareSheet({ kind, date, onClose }: { kind: 'plan' | 'checkin'; date: string; onClose: () => void }) {
  const { state, run } = useStore()
  const toast = useToast()
  const plan = state.plans[date]?.revisions.at(-1)
  const prior = state.snapshots.filter((s) => s.kind === kind && s.date === date).at(-1)
  // Each day needs its own selection: start from the previous version of THIS day only.
  const [unitIds, setUnitIds] = useState<string[]>(prior ? prior.items.map((i) => i.unitId) : [])
  const [fields, setFields] = useState<ShareField[]>(kind === 'plan' ? ['criterion', 'estimate'] : ['criterion', 'actualMin'])
  const [message, setMessage] = useState(prior?.message ?? '')
  const [error, setError] = useState<string | null>(null)

  const preview = useMemo(() => buildPreview(state, kind, date, unitIds, kind === 'checkin' ? [...fields, 'outcome'] : fields, message), [state, kind, date, unitIds, fields, message])
  const hidden = (plan?.entries.length ?? 0) - unitIds.length

  const publish = () => {
    if ('error' in preview) return
    const r = run({ type: 'Publish', kind, date, unitIds, fields: kind === 'checkin' ? [...fields, 'outcome'] : fields, message, previewDigest: preview.digest })
    if (!r.ok) { setError(r.message); return }
    toast(prior ? `Amended — ${preview.recipient.name} sees v${prior.version + 1}` : `Shared with ${preview.recipient.name}`)
    onClose()
  }

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v])

  return (
    <Sheet title={kind === 'plan' ? 'Share plan' : prior ? 'Amend shared check-in' : 'Share results'} onClose={onClose}
      dirty={message !== (prior?.message ?? '')}
      footer={
        <button className="btn primary" disabled={'error' in preview || !state.sim.online || unitIds.length === 0} onClick={publish}>
          <PaperPlaneTilt size={18} weight="bold" /> {prior ? 'Confirm amendment' : 'Confirm and share'}
        </button>
      }>
      {'error' in preview && !unitIds.length ? null : 'error' in preview ? <Banner tone="warn">{preview.error}</Banner> : null}
      <p style={{ margin: '0 0 12px', color: 'var(--ink-2)' }}>
        {kind === 'plan' ? 'Before you start: share selected commitments. No results are shared and no reply is expected.' : 'Choose exactly what your partner sees. Your private check-in stays private.'}
      </p>

      <b style={{ fontSize: 'var(--t-sub)' }}>Items</b>
      <div className="list" style={{ margin: '8px 0 16px' }}>
        {plan?.entries.map((e) => (
          <label key={e.unitId} className="row" style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={unitIds.includes(e.unitId)} onChange={() => setUnitIds(toggle(unitIds, e.unitId))} style={{ width: 24, height: 24, margin: 0, accentColor: 'var(--signal)' }} />
            <div className="grow"><div className="title">{e.title}</div></div>
          </label>
        ))}
      </div>
      <b style={{ fontSize: 'var(--t-sub)' }}>Details</b>
      <div className="seg" style={{ margin: '8px 0 16px' }}>
        {(kind === 'plan' ? PLAN_FIELDS : CHECKIN_FIELDS).map(([f, label]) => <button key={f} aria-pressed={fields.includes(f)} onClick={() => setFields(toggle(fields, f))}>{label}</button>)}
      </div>
      {kind === 'checkin' && <label className="field"><span>Message to your partner</span><textarea className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Written for them — your private reflection is not included" /></label>}

      {!('error' in preview) && (
        <div className="preview" aria-live="polite">
          <div className="eyebrow" style={{ marginBottom: 6 }}>Preview · what {preview.recipient.name} will see</div>
          <b>{fmtDate(date)} · {kind === 'plan' ? 'Plan' : 'Check-in'}{prior ? ` v${prior.version + 1}` : ''}</b>
          {preview.items.length === 0 && <p className="footnote">Select at least one item.</p>}
          {preview.items.map((i) => (
            <div key={i.unitId} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginTop: 10 }}>
              {i.outcome ? <OutcomeMark outcome={i.outcome} size={22} /> : <span style={{ width: 22 }} />}
              <div>
                <div style={{ fontWeight: 600 }}>{i.title}</div>
                <div className="footnote" style={{ marginTop: 0 }}>
                  {[i.outcome && OUTCOME_LABEL[i.outcome], i.criterion && `Done when: ${i.criterion}`, i.estimate !== undefined && `Est. ${mins(i.estimate)}`, i.actualMin != null && `Did ${mins(i.actualMin)}`, i.deadline && `Due ${i.deadline}`, i.cue && `When: ${i.cue}`].filter(Boolean).join(' · ')}
                </div>
              </div>
            </div>
          ))}
          {kind === 'plan' && <p className="footnote">“No results shared yet.”</p>}
          {kind === 'checkin' && message && <p style={{ marginTop: 10 }}>“{message}”</p>}
          <hr className="divider" />
          <p className="footnote" style={{ display: 'flex', gap: 6 }}><EyeSlash size={16} style={{ flex: 'none' }} /> Not included: private reflection, notes, goal labels{hidden > 0 ? `, ${hidden} unselected item${hidden > 1 ? 's' : ''} (not counted or mentioned)` : ''}{!fields.includes('cue') ? ', start cues' : ''}.</p>
          <p className="footnote">Recipient {preview.recipient.name} · agreement v{preview.agreementVersion} · source revision {preview.sourceRev}</p>
          {kind === 'checkin' && prior?.replyDue && <p className="footnote">Reply window stays: by {fmtInstant(prior.replyDue, state.plans[date].zone)}. Earlier feedback stays attached to v{prior.version}.</p>}
        </div>
      )}
      {!state.sim.online && <Banner tone="warn">Sharing needs a connection. Nothing will be sent while offline.</Banner>}
      {error && <Banner tone="warn">{error}</Banner>}
    </Sheet>
  )
}
