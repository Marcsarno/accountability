import { ChatCircleText, Eye, Flag, Pause, Play, Prohibit, UserPlus, X } from '@phosphor-icons/react'
import { useState } from 'react'
import { newId, useStore } from '../app/store'
import { activeAgreement } from '../domain/commands'
import { DEFAULT_TERMS } from '../domain/initial'
import type { Agreement, AgreementTerms } from '../domain/types'
import { Banner, HorizonArt, OutcomeMark, Sheet, SimPill, fmtDate, fmtInstant, useToast } from '../ui/kit'

const DAY = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Partner() {
  const { state, run, setSim, now } = useStore()
  const toast = useToast()
  const ag = activeAgreement(state)
  const past = state.agreements.filter((a) => a !== ag).reverse()
  const [inviting, setInviting] = useState(false)
  const [replying, setReplying] = useState(false)
  const [confirm, setConfirm] = useState<null | 'end' | 'block'>(null)
  const zone = state.owner.zone

  const act = (cmd: Parameters<typeof run>[0], msg: string) => { const r = run(cmd); toast(r.ok ? msg : r.message) }

  const days = [...new Set(state.snapshots.filter((s) => s.agreementId === ag?.id).map((s) => s.date))].sort().reverse()

  return (
    <>
      <div className="top"><div><div className="eyebrow">Optional · one trusted person</div><h1 className="large-title">Partner</h1></div>
        {ag?.status === 'active' && <button className="icon-btn" aria-label={`View as ${ag.peer.name} (simulated)`} onClick={() => setSim({ view: 'peer' })}><Eye size={22} /></button>}</div>

      <Banner tone="sim"><b>Simulation.</b> Invitations, your partner’s replies and access are simulated on this device. A real pilot needs separate accounts and server checks.</Banner>

      {!ag && (
        <div className="empty" style={{ paddingTop: 16 }}>
          <HorizonArt variant="partner" />
          <h3>Plan with a peer — if you want</h3>
          <p>Everything works privately. A partner sees only what you choose to share, day by day, and can reply or suggest — never edit.</p>
          <button className="btn primary" onClick={() => setInviting(true)}><UserPlus size={18} weight="bold" /> Invite a partner</button>
        </div>
      )}

      {ag?.status === 'invited' && (
        <>
          <div className="card">
            <h3>Waiting for {ag.peer.name}</h3>
            <p>Sent to {ag.peer.email}. Only that person can accept. Expires {fmtInstant(ag.expiresAt, zone, { weekday: 'short', month: 'short', day: 'numeric' })}. Nothing is shared while pending.</p>
            <div className="btn-row"><button className="btn small" onClick={() => act({ type: 'AgreementAction', action: 'withdraw' }, 'Invitation withdrawn')}>Withdraw</button></div>
          </div>
          <SimPanel title={`Simulate ${ag.peer.name}`}>
            <button className="btn small" onClick={() => act({ type: 'PeerAgreementAction', action: 'accept' }, `${ag.peer.name} accepted`)}>Accept</button>
            <button className="btn small" onClick={() => act({ type: 'PeerAgreementAction', action: 'decline' }, `${ag.peer.name} declined`)}>Decline</button>
            <button className="btn small" onClick={() => act({ type: 'PeerAgreementAction', action: 'expire' }, 'Invitation expired')}>Let it expire</button>
          </SimPanel>
        </>
      )}

      {(ag?.status === 'active' || ag?.status === 'paused') && (
        <>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{ag.peer.name}</h3>
              <span className={`pill ${ag.status === 'active' ? 'ok' : 'warn'}`}>{ag.status === 'active' ? `Active · v${ag.version}` : `Paused by ${ag.pause?.by === 'owner' ? 'you' : ag.peer.name}`}</span>
            </div>
            <Terms ag={ag} />
            {ag.status === 'paused' && <p className="footnote">While paused: no sharing, no reply obligations, no partner notices, and {ag.peer.name} can’t see past days. Resuming needs both of you{ag.pause?.resumeRequestedBy ? ` — ${ag.pause.resumeRequestedBy === 'owner' ? 'you asked; waiting for them' : `${ag.peer.name} asked to resume`}` : ''}.</p>}
            <div className="btn-row">
              {ag.status === 'active' && <button className="btn small" onClick={() => act({ type: 'AgreementAction', action: 'pause' }, `Paused — ${ag.peer.name}'s access revoked`)}><Pause size={16} weight="bold" /> Pause</button>}
              {ag.status === 'paused' && ag.pause?.resumeRequestedBy !== 'owner' && <button className="btn small" onClick={() => act({ type: 'AgreementAction', action: 'request-resume' }, ag.pause?.resumeRequestedBy === 'peer' ? 'Resumed — old days stay unshared' : 'Resume requested')}><Play size={16} weight="bold" /> {ag.pause?.resumeRequestedBy === 'peer' ? 'Accept resume' : 'Ask to resume'}</button>}
              <button className="btn small" onClick={() => setConfirm('end')}><X size={16} weight="bold" /> End</button>
              <button className="btn small danger" onClick={() => setConfirm('block')}><Prohibit size={16} weight="bold" /> Block</button>
            </div>
          </div>

          <SimPanel title={`Simulate ${ag.peer.name}`}>
            {ag.status === 'active' && <button className="btn small" onClick={() => setReplying(true)}><ChatCircleText size={16} /> Reply to latest check-in</button>}
            {ag.status === 'active' && <button className="btn small" onClick={() => act({ type: 'PeerAgreementAction', action: 'pause' }, `${ag.peer.name} paused the agreement`)}>Pause</button>}
            {ag.status === 'paused' && <button className="btn small" onClick={() => act({ type: 'PeerAgreementAction', action: 'request-resume' }, ag.pause?.resumeRequestedBy === 'owner' ? 'Both accepted — resumed' : `${ag.peer.name} asked to resume`)}>{ag.pause?.resumeRequestedBy === 'owner' ? 'Accept resume' : 'Ask to resume'}</button>}
            {ag.status === 'active' && <button className="btn small" onClick={() => setSim({ view: 'peer' })}><Eye size={16} /> View as {ag.peer.name}</button>}
          </SimPanel>

          <h2 className="section-title">Shared days</h2>
          {days.length === 0 && <div className="card"><p>Nothing shared yet. From Today you can share a plan before you start, or results after your private check-in.</p></div>}
          {days.map((date) => <SharedDay key={date} date={date} ag={ag} now={now} />)}
        </>
      )}

      {past.length > 0 && (
        <>
          <h2 className="section-title">History</h2>
          <div className="list">{past.map((a) => (
            <div className="row" key={a.id}><div className="grow"><div className="title">{a.peer.name}</div><div className="meta"><span>{a.blocked ? 'Blocked' : a.status[0].toUpperCase() + a.status.slice(1)}</span><span>{a.history.at(-1)?.event}</span></div></div></div>
          ))}</div>
          {!ag && <p className="footnote">Former partners can’t open your shared days, old links or previews. Copies they already saw can’t be recalled.</p>}
        </>
      )}

      {inviting && <InviteSheet onClose={() => setInviting(false)} />}
      {replying && ag && <ReplySheet ag={ag} onClose={() => setReplying(false)} />}
      {confirm && ag && (
        <Sheet title={confirm === 'end' ? 'End agreement?' : `Block ${ag.peer.name}?`} onClose={() => setConfirm(null)}
          footer={<button className="btn danger" onClick={() => { act({ type: 'AgreementAction', action: confirm }, confirm === 'end' ? 'Agreement ended' : 'Blocked and ended'); setConfirm(null) }}>{confirm === 'end' ? 'End agreement' : 'Block and end'}</button>}>
          <p>{ag.peer.name} immediately loses access to everything you shared, including old links and previews. Your own plans and the replies you received stay with you.{confirm === 'block' ? ' They can’t invite you again.' : ''}</p>
          <p className="footnote">Anything they already viewed or copied can’t be recalled.</p>
        </Sheet>
      )}
    </>
  )
}

function Terms({ ag }: { ag: Agreement }) {
  const t = ag.terms
  return (
    <dl className="kv" style={{ marginTop: 12 }}>
      <dt>Check-in days</dt><dd>{t.checkInDays.map((d) => DAY[d - 1]).join(' ')} · by {t.cutoff}</dd>
      <dt>Reply by</dt><dd>{t.replyTime} next day, at least {t.minIntervalHours}h after a late share</dd>
      <dt>Quiet hours</dt><dd>{t.quietStart}–{t.quietEnd}</dd>
      <dt>Follow-up</dt><dd>{t.followUpAllowed ? 'One reminder to you if nothing is shared' : 'None'}</dd>
    </dl>
  )
}

function SharedDay({ date, ag, now }: { date: string; ag: Agreement; now: string }) {
  const { state, run } = useStore()
  const toast = useToast()
  const versions = state.snapshots.filter((s) => s.date === date && s.agreementId === ag.id)
  const plan = versions.filter((v) => v.kind === 'plan').at(-1)
  const ci = versions.filter((v) => v.kind === 'checkin')
  const latest = ci.at(-1)
  const fb = state.feedback.filter((f) => f.date === date)
  const zone = state.plans[date]?.zone ?? state.owner.zone
  const overdue = latest?.replyDue && Date.parse(now) > Date.parse(latest.replyDue) && !fb.length
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <h3 style={{ margin: 0 }}>{fmtDate(date)}</h3>
        <span className="pill">{latest ? `Check-in v${latest.version}` : plan ? 'Plan only' : ''}</span>
      </div>
      {latest ? (
        <div style={{ marginTop: 8 }}>{latest.items.map((i) => <div key={i.unitId} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6 }}><OutcomeMark outcome={i.outcome ?? 'unreported'} size={20} /><span>{i.title}</span></div>)}{latest.message && <p style={{ marginTop: 8 }}>“{latest.message}”</p>}</div>
      ) : <p className="footnote">Plan shared: {plan?.items.map((i) => i.title).join(', ')}. No results shared yet.</p>}
      {latest?.replyDue && <p className="footnote">{overdue ? `No reply by ${fmtInstant(latest.replyDue, zone)}. That’s on the agreement, not on you — your day still counts.` : fb.length ? '' : `Reply expected by ${fmtInstant(latest.replyDue, zone)}`}</p>}
      {fb.map((f) => (
        <div key={f.id} style={{ marginTop: 12, padding: 12, borderRadius: 14, background: 'var(--surface-2)' }}>
          <div className="eyebrow" style={{ textTransform: 'none' }}>{ag.peer.name} · on version {f.snapshotVersion}{latest && f.snapshotVersion < latest.version ? ' (an earlier version)' : ''}</div>
          <p style={{ margin: '4px 0 0', color: 'var(--ink)' }}>{f.text}</p>
          {f.suggestion && (
            <div style={{ marginTop: 8, padding: 10, borderRadius: 12, background: 'var(--surface)' }}>
              <b style={{ fontSize: 'var(--t-sub)' }}>Suggested: {f.suggestion.title}</b>
              <div className="footnote" style={{ marginTop: 2 }}>{f.suggestion.criterion}{f.suggestion.estimate ? ` · ${f.suggestion.estimate}m` : ''}</div>
              {f.acceptedActionId ? <p className="footnote">Added to your Inbox as a draft.</p> : <button className="btn small primary" style={{ marginTop: 8 }} onClick={() => { const r = run({ type: 'AcceptSuggestion', feedbackId: f.id, actionId: newId() }); toast(r.ok ? 'Added to Inbox as a draft — not committed' : r.message) }}>Add as draft</button>}
            </div>
          )}
          {!f.reported ? <button className="btn quiet small" style={{ paddingLeft: 0, marginTop: 4 }} onClick={() => { run({ type: 'ReportFeedback', feedbackId: f.id }); toast('Reported — a restricted case was opened (simulated)') }}><Flag size={14} /> Report</button> : <p className="footnote">Reported</p>}
        </div>
      ))}
    </div>
  )
}

function SimPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card tint-sim" style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}><SimPill /><b style={{ fontSize: 'var(--t-sub)' }}>{title}</b></div>
      <div className="btn-row" style={{ marginTop: 0 }}>{children}</div>
    </div>
  )
}

function InviteSheet({ onClose }: { onClose: () => void }) {
  const { run } = useStore()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [terms, setTerms] = useState<AgreementTerms>(DEFAULT_TERMS)
  const [error, setError] = useState<string | null>(null)
  const send = () => { const r = run({ type: 'Invite', name, email, terms }); if (!r.ok) setError(r.message); else { toast('Invitation sent (simulated)'); onClose() } }
  return (
    <Sheet title="Invite a partner" onClose={onClose} dirty={!!(name || email)} footer={<button className="btn primary" onClick={send}>Send invitation</button>}>
      <p style={{ marginTop: 0, color: 'var(--ink-2)' }}>They’ll see the agreement below before accepting. Nothing is shared until you choose, day by day.</p>
      <label className="field"><span>Their name</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label className="field"><span>Their email</span><input className="input" type="email" inputMode="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} /><span className="hint">Only the person signed in with this email can accept. Expires in 7 days.</span></label>
      <div className="field"><span>Your check-in days</span><div className="seg">{DAY.map((d, i) => <button key={d} aria-pressed={terms.checkInDays.includes(i + 1)} onClick={() => setTerms({ ...terms, checkInDays: terms.checkInDays.includes(i + 1) ? terms.checkInDays.filter((x) => x !== i + 1) : [...terms.checkInDays, i + 1].sort() })}>{d}</button>)}</div></div>
      <div className="grid2">
        <label className="field"><span>Share by</span><input className="input" type="time" value={terms.cutoff} onChange={(e) => setTerms({ ...terms, cutoff: e.target.value })} /></label>
        <label className="field"><span>They reply by (next day)</span><input className="input" type="time" value={terms.replyTime} onChange={(e) => setTerms({ ...terms, replyTime: e.target.value })} /></label>
      </div>
      <label className="field"><span>Minimum time to reply after a late share (hours)</span><input className="input num" inputMode="numeric" value={terms.minIntervalHours} onChange={(e) => setTerms({ ...terms, minIntervalHours: Number(e.target.value.replace(/\D/g, '')) || 0 })} /></label>
      <label className="check"><input type="checkbox" checked={terms.followUpAllowed} onChange={(e) => setTerms({ ...terms, followUpAllowed: e.target.checked })} /><span>Remind me once if I haven’t shared by the cutoff</span></label>
      {error && <Banner tone="warn">{error}</Banner>}
    </Sheet>
  )
}

function ReplySheet({ ag, onClose }: { ag: Agreement; onClose: () => void }) {
  const { state, run } = useStore()
  const toast = useToast()
  // The partner can only reply to check-ins shared under the current agreement.
  const latest = state.snapshots.filter((s) => s.kind === 'checkin' && s.agreementId === ag.id).at(-1)
  const [text, setText] = useState('')
  const [sTitle, setSTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  if (!latest) return <Sheet title="Reply" onClose={onClose}><p>No shared check-in to reply to.</p></Sheet>
  const send = () => {
    const r = run({ type: 'PeerReply', snapshotId: latest.id, text, suggestion: sTitle.trim() ? { title: sTitle.trim(), criterion: '', estimate: null } : null })
    if (!r.ok) setError(r.message); else { toast('Reply recorded (simulated partner)'); onClose() }
  }
  return (
    <Sheet title="Simulated reply" onClose={onClose} dirty={!!(text || sTitle)} footer={<button className="btn primary" onClick={send}>Send as partner</button>}>
      <p className="footnote">Replying to {fmtDate(latest.date)}, version {latest.version}.</p>
      <label className="field"><span>Reply</span><textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} /></label>
      <label className="field"><span>Suggest a next action (optional)</span><input className="input" value={sTitle} onChange={(e) => setSTitle(e.target.value)} /></label>
      {error && <Banner tone="warn">{error}</Banner>}
    </Sheet>
  )
}
