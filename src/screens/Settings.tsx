import { DownloadSimple, Export, Flask, ShareNetwork, Warning } from '@phosphor-icons/react'
import { useState } from 'react'
import { useStore } from '../app/store'
import { isStandalone, pushSupport, syncSummary } from '../app/status'
import { planNotices } from '../domain/notices'
import { Temporal, addDays } from '../domain/time'
import type { AppState } from '../domain/types'
import { Banner, Sheet, SimPill, fmtDate, fmtInstant, useToast } from '../ui/kit'
import { InstallGuide } from './InstallGuide'

export function Settings() {
  const { state, run, setSim, loadSample, resetEmpty, now, today } = useStore()
  const toast = useToast()
  const [install, setInstall] = useState(false)
  const [away, setAway] = useState({ from: addDays(today, 1), to: addDays(today, 2) })
  const [zone, setZone] = useState(state.owner.zone)
  const [confirm, setConfirm] = useState<null | 'reset' | 'delete' | 'sample'>(null)
  const notices = planNotices(state, today)
  const push = pushSupport()
  const sync = syncSummary(state)
  const theme = document.documentElement.dataset.theme ?? 'system'

  const shift = (hours: number) => setSim({ now: Temporal.Instant.from(now).add({ hours }).toString() })

  return (
    <>
      <div className="top"><div><div className="eyebrow">Daymark · Phase 0 prototype</div><h1 className="large-title">Settings</h1></div></div>

      <h2 className="section-title">Reminders</h2>
      <div className="card">
        {push === 'unsupported-tab' && <Banner tone="info">You’re in a Safari tab. iPhone only allows reminders in the Home Screen app. <button className="btn quiet small" onClick={() => setInstall(true)}>How to install</button></Banner>}
        {push === 'available' && !isStandalone() && <Banner tone="info">Install to your Home Screen for reminders on iPhone. <button className="btn quiet small" onClick={() => setInstall(true)}>How</button></Banner>}
        <label className="field"><span>Daily check-in reminder</span><input className="input" type="time" value={state.settings.reminderTime ?? ''} onChange={(e) => run({ type: 'UpdateSettings', patch: { reminderTime: e.target.value || null } })} /><span className="hint">Clear it to turn the reminder off.</span></label>
        <div className="grid2">
          <label className="field"><span>Quiet from</span><input className="input" type="time" value={state.settings.quietStart} onChange={(e) => run({ type: 'UpdateSettings', patch: { quietStart: e.target.value } })} /></label>
          <label className="field"><span>Quiet until</span><input className="input" type="time" value={state.settings.quietEnd} onChange={(e) => run({ type: 'UpdateSettings', patch: { quietEnd: e.target.value } })} /></label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '4px 0 8px' }}><SimPill>Simulated delivery</SimPill><span className="footnote" style={{ margin: 0 }}>Today’s notices — eligibility is rechecked before sending</span></div>
        {notices.map((n) => (
          <div key={n.key} className="row" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div className="grow">
              <div className="title" style={{ fontSize: 'var(--t-sub)' }}>{n.kind === 'checkin-reminder' ? 'Check-in reminder' : n.kind === 'share-followup' ? 'Sharing follow-up' : `Partner notice → ${n.to}`}{n.dueAt ? ` · ${fmtInstant(n.dueAt, state.owner.zone, { hour: 'numeric', minute: '2-digit' })}` : ''}</div>
              <div className="meta"><span>{n.reason}</span>{n.text && <span>Text: “{n.text}”</span>}{n.adjustment && <span>{n.adjustment}</span>}</div>
            </div>
            <span className={`pill ${n.status === 'scheduled' ? 'info' : n.status.startsWith('provider') ? 'ok' : ''}`}>{n.status.startsWith('provider') ? 'Accepted' : n.status === 'not set' ? 'Off' : n.status[0].toUpperCase() + n.status.slice(1)}</span>
          </div>
        ))}
        <p className="footnote">Notices never include your action titles or reflections. “Provider accepted” is not proof of delivery or that it was read.</p>
      </div>

      <h2 className="section-title">Time away</h2>
      <div className="card">
        <p>Pauses repeats and reminders for those dates. Past results are never changed.</p>
        <div className="grid2" style={{ marginTop: 12 }}>
          <label className="field"><span>From</span><input className="input" type="date" value={away.from} onChange={(e) => setAway({ ...away, from: e.target.value })} /></label>
          <label className="field"><span>To</span><input className="input" type="date" value={away.to} onChange={(e) => setAway({ ...away, to: e.target.value })} /></label>
        </div>
        <button className="btn small" onClick={() => { const r = run({ type: 'AddAbsence', ...away }); toast(r.ok ? 'Time away added' : r.message) }}>Add time away</button>
        {state.absences.map((a) => <div key={a.id} className="row" style={{ paddingLeft: 0, paddingRight: 0 }}><span className="grow">{fmtDate(a.from, { month: 'short', day: 'numeric' })} – {fmtDate(a.to, { month: 'short', day: 'numeric' })}</span><button className="btn quiet small" onClick={() => run({ type: 'RemoveAbsence', id: a.id })}>Remove</button></div>)}
      </div>

      <h2 className="section-title">Account <SimPill /></h2>
      <div className="card">
        <dl className="kv"><dt>Signed in as</dt><dd>{state.owner.name} (simulated identity)</dd><dt>Sync</dt><dd>{sync.label}</dd></dl>
        <label className="field" style={{ marginTop: 12 }}><span>Home time zone</span>
          <div style={{ display: 'flex', gap: 8 }}><input className="input" value={zone} onChange={(e) => setZone(e.target.value)} /><button className="btn" onClick={() => { const r = run({ type: 'SetZone', zone }); toast(r.ok ? 'Zone changed — past days keep their own zone' : r.message) }}>Set</button></div>
          <span className="hint">Days already committed keep the zone they were planned in.</span></label>
      </div>

      <h2 className="section-title">Appearance</h2>
      <div className="card">
        <div className="field"><span>Theme</span><div className="seg">{(['system', 'light', 'dark'] as const).map((t) => <button key={t} aria-pressed={theme === t} onClick={() => { if (t === 'system') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = t; try { localStorage.setItem('theme', t) } catch { /* private mode */ } toast(`Theme: ${t}`) }}>{t[0].toUpperCase() + t.slice(1)}</button>)}</div></div>
        <label className="check" style={{ paddingBottom: 0 }}>
          <input type="checkbox" role="switch" {...{ switch: '' }} checked={state.settings.motion === 'reduced'} onChange={(e) => run({ type: 'UpdateSettings', patch: { motion: e.target.checked ? 'reduced' : 'system' } })} />
          <span>Reduce motion in this app</span>
        </label>
      </div>

      <h2 className="section-title">Your data</h2>
      <div className="card">
        <div className="btn-row" style={{ marginTop: 0 }}>
          <button className="btn small" onClick={() => download('daymark-export.json', exportJson(state), 'application/json')}><DownloadSimple size={16} /> Export JSON</button>
          <button className="btn small" onClick={() => download('daymark-results.csv', exportCsv(state), 'text/csv')}><Export size={16} /> Export CSV</button>
        </div>
        <p className="footnote">Exports include only your own data: actions, original and revised plans, results with times and zones, check-ins and replies you received. It is a local file, not a server export.</p>
        <hr className="divider" />
        <button className="btn small danger" onClick={() => setConfirm('delete')}><Warning size={16} /> Delete account (simulated)</button>
      </div>

      <h2 className="section-title">Prototype controls <SimPill /></h2>
      <div className="card tint-sim">
        <label className="check" style={{ paddingTop: 0 }}>
          <input type="checkbox" role="switch" {...{ switch: '' }} checked={state.sim.online} onChange={(e) => setSim({ online: e.target.checked })} />
          <span><b>Connected</b> — turn off to see offline behaviour (saved on this device, sharing blocked)</span>
        </label>
        <div className="field"><span>Clock: {fmtInstant(now, state.owner.zone, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}{state.sim.now ? ' (simulated)' : ' (real)'}</span>
          <div className="seg">
            <button onClick={() => shift(1)}>+1 hour</button><button onClick={() => shift(24)}>+1 day</button><button onClick={() => shift(24 * 7)}>+1 week</button>
            <button onClick={() => setSim({ now: null })}>Real time</button>
          </div>
        </div>
        <div className="btn-row">
          <button className="btn small" onClick={() => setConfirm('sample')}><Flask size={16} /> Load sample scenario</button>
          <button className="btn small" onClick={() => setConfirm('reset')}>Reset to empty</button>
          <button className="btn small" onClick={() => setInstall(true)}><ShareNetwork size={16} /> Install guide</button>
        </div>
        <p className="footnote">Data is stored in this browser (IndexedDB), bound to the simulated account. Persistent storage is requested at launch; iOS grants it more readily to Home Screen apps.</p>
      </div>

      {install && <InstallGuide onClose={() => setInstall(false)} />}
      {confirm && (
        <Sheet title={confirm === 'delete' ? 'Delete account?' : confirm === 'sample' ? 'Load sample scenario?' : 'Reset?'} onClose={() => setConfirm(null)}>
          <p>{confirm === 'delete' ? 'In the real app this revokes sessions and partner access immediately, then purges active data within 7 days and backups within 35. Here it erases this device’s prototype data.' : 'This replaces everything stored in this browser for the prototype. Export first if you want to keep it.'}</p>
          <button className="btn danger block" style={{ marginTop: 16 }} onClick={() => { if (confirm === 'sample') loadSample(); else resetEmpty(); setConfirm(null); toast(confirm === 'delete' ? 'Deleted (simulated)' : 'Done') }}>{confirm === 'delete' ? 'Delete everything' : confirm === 'sample' ? 'Load sample' : 'Reset'}</button>
        </Sheet>
      )}
    </>
  )
}

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }))
  const a = Object.assign(document.createElement('a'), { href: url, download: name })
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function exportJson(s: AppState) {
  const { sim: _sim, commands: _c, ...rest } = s
  return JSON.stringify({ format: 'daymark-export', exportedAt: new Date().toISOString(), ...rest }, null, 2)
}

/** Formula-safe CSV: cells starting with = + - @ or control chars are prefixed with '. */
export function csvCell(v: unknown) {
  let t = v == null ? '' : String(v)
  if (/^[=+\-@\t\r]/.test(t)) t = `'${t}`
  return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t
}

export function exportCsv(s: AppState) {
  const rows = [['plan_date', 'zone', 'plan_revision', 'title', 'criterion', 'estimate_min', 'outcome', 'actual_min', 'performed_at_utc', 'recorded_at_utc', 'is_correction']]
  for (const p of Object.values(s.plans)) {
    const rev = p.revisions.at(-1)
    if (!rev) continue
    for (const e of rev.entries) {
      const evs = s.events.filter((x) => x.date === p.date && x.unitId === e.unitId)
      if (!evs.length) rows.push([p.date, p.zone, String(rev.rev), e.title, e.criterion, String(e.estimate ?? ''), 'unreported', '', '', '', ''])
      for (const ev of evs) rows.push([p.date, p.zone, String(rev.rev), e.title, e.criterion, String(e.estimate ?? ''), ev.outcome, String(ev.actualMin ?? ''), ev.performedAt, ev.recordedAt, ev.corrects ? 'yes' : 'no'])
    }
  }
  return rows.map((r) => r.map(csvCell).join(',')).join('\r\n')
}
