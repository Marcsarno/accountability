import { Check, Minus, Question, X, ArrowBendDownRight, Flask, Info, Warning } from '@phosphor-icons/react'
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { summarizeCapacity, type CapacityEntry } from '../domain/capacity'
import { suggestedBy } from '../domain/commands'
import { Temporal } from '../domain/time'
import type { AppState, Outcome, UnitId } from '../domain/types'

export const OUTCOME_LABEL: Record<Outcome | 'unreported', string> = {
  completed: 'Completed', partial: 'Partial', missed: 'Missed', skipped: 'Skipped', unreported: 'Not reported',
}

export function OutcomeMark({ outcome, size = 28 }: { outcome: Outcome | 'unreported'; size?: number }) {
  const icon = { completed: <Check weight="bold" />, partial: null, missed: <X weight="bold" />, skipped: <ArrowBendDownRight weight="bold" />, unreported: <Question weight="bold" /> }[outcome]
  return (
    <span className={`mark ${outcome}`} style={{ width: size, height: size, fontSize: size * 0.5 }} role="img" aria-label={OUTCOME_LABEL[outcome]}>
      {outcome === 'partial' ? <Minus weight="bold" /> : icon}
    </span>
  )
}

export function fmtDate(date: string, opts: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' }) {
  return Temporal.PlainDate.from(date).toLocaleString(undefined, opts)
}
export const shortDay = (date: string) => fmtDate(date, { weekday: 'short' })
export function fmtInstant(iso: string, zone: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', hour: 'numeric', minute: '2-digit' }) {
  return Temporal.Instant.from(iso).toZonedDateTimeISO(zone).toLocaleString(undefined, opts)
}
/** Short label for where an action came from, or null for one captured directly. */
export function originLabel(state: AppState, unitId: UnitId): string | null {
  const o = state.actions[unitId]?.origin
  if (!o) return null
  return o.kind === 'suggestion'
    ? `Suggested by ${suggestedBy(state, o.feedbackId) ?? 'your partner'}`
    : `Next step from ${shortDay(o.checkInDate)}`
}

/** Shallow equality for flat form-value objects (used to tell whether a sheet has unsaved edits). */
export function sameValues<T extends object>(a: T, b: T): boolean {
  return (Object.keys(a) as (keyof T)[]).every((k) => Object.is(a[k], b[k]))
}

export const mins = (m: number | null | undefined) => (m == null ? 'No estimate' : m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ''}` : `${m}m`)

export function CapacityBar({ available, entries }: { available: number; entries: CapacityEntry[] }) {
  const c = summarizeCapacity(available, entries)
  const pct = available > 0 ? Math.min(100, (c.knownTotal / available) * 100) : c.knownTotal > 0 ? 100 : 0
  const verdict = entries.length === 0 ? 'Nothing selected yet' :
    c.verdict === 'fits' ? 'Fits your time' :
    c.verdict === 'over' ? `Over by ${mins(c.overload)}` :
    c.verdict === 'incomplete' ? `${c.unknownCount} without an estimate — can’t say it fits` :
    `Over by ${mins(c.overload)}, plus ${c.unknownCount} unestimated`
  return (
    <div className="cap">
      <div className="cap-bar" role="meter" aria-valuemin={0} aria-valuemax={available} aria-valuenow={c.knownTotal} aria-label={`${c.knownTotal} of ${available} minutes planned. ${verdict}`}>
        <div className={`cap-fill ${c.overload ? 'over' : ''}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="cap-legend">
        <span><b className="num">{c.knownTotal}</b> of <span className="num">{available}</span> min{c.unknownCount ? ` · ${c.unknownCount} unknown` : ''}</span>
        <span style={{ color: entries.length === 0 ? 'var(--ink-3)' : c.verdict === 'fits' ? 'var(--done-ink)' : 'var(--warn)', fontWeight: 650 }}>{verdict}</span>
      </div>
    </div>
  )
}

/** Keeps a ref pointing at the latest value, so long-lived listeners never call a stale callback. */
function useLatest<T>(value: T) {
  const ref = useRef(value)
  useLayoutEffect(() => { ref.current = value })
  return ref
}

interface SheetProps {
  title: string
  onClose: () => void
  children: ReactNode
  /** The sheet's main action, pinned below the scrolling content. */
  footer?: ReactNode
  /** When true, closing asks before discarding the edits. */
  dirty?: boolean
}

export function Sheet({ title, onClose, children, footer, dirty = false }: SheetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const keepRef = useRef<HTMLButtonElement>(null)
  const [confirming, setConfirming] = useState(false)
  const requestClose = () => { if (dirty) setConfirming(true); else onClose() }
  const latest = useLatest({ requestClose, confirming })

  // Runs once per opening. Callbacks are read through `latest`, so parent re-renders
  // (a new onClose each time) never re-run this and never move focus while the user types.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    // Focus the dialog, not an input: iOS ignores programmatic focus outside a gesture.
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (latest.current.confirming) setConfirming(false)
      else latest.current.requestClose()
    }
    // Keep sheet actions above the iOS keyboard (no VirtualKeyboard API on iOS).
    const vv = window.visualViewport
    const onVV = () => { if (vv) document.documentElement.style.setProperty('--vvh', `${vv.height}px`) }
    onVV()
    vv?.addEventListener('resize', onVV)
    document.addEventListener('keydown', onKey)
    const shell = document.querySelector<HTMLElement>('.shell, .peer, .onboard')
    if (shell) shell.inert = true
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey); vv?.removeEventListener('resize', onVV)
      document.documentElement.style.removeProperty('--vvh')
      if (shell) shell.inert = false
      document.body.style.overflow = ''; prev?.focus?.()
    }
  }, [latest])
  useEffect(() => { if (confirming) keepRef.current?.focus() }, [confirming])

  return createPortal(
    <>
      <div className="sheet-backdrop" onClick={requestClose} />
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} ref={ref} tabIndex={-1}>
        <div className="grabber" />
        <header>
          <button className="btn quiet" onClick={requestClose}>Close</button>
          <h2>{title}</h2>
          <span className="sheet-header-balance" aria-hidden="true" />
        </header>
        <div className="body">{children}</div>
        {confirming ? (
          <div className="sheet-footer confirm" role="alertdialog" aria-label="Discard changes?">
            <p>Discard your changes?</p>
            <div className="btn-row">
              <button ref={keepRef} className="btn" onClick={() => setConfirming(false)}>Keep editing</button>
              <button className="btn danger" onClick={onClose}>Discard</button>
            </div>
          </div>
        ) : footer && <div className="sheet-footer">{footer}</div>}
      </div>
    </>,
    document.body,
  )
}

export function Banner({ tone, children }: { tone: 'sim' | 'warn' | 'info'; children: ReactNode }) {
  const Icon = tone === 'sim' ? Flask : tone === 'warn' ? Warning : Info
  return <div className={`banner ${tone}`} role={tone === 'warn' ? 'alert' : undefined}><Icon size={18} weight="bold" />{<div>{children}</div>}</div>
}

export const SimPill = ({ children = 'Simulated' }: { children?: ReactNode }) => <span className="pill sim"><Flask size={12} weight="bold" />{children}</span>

const ToastCtx = createContext<(msg: string) => void>(() => {})
export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null)
  const show = useCallback((text: string) => setMsg({ text, id: Date.now() }), [])
  useEffect(() => { if (!msg) return; const t = setTimeout(() => setMsg(null), 2600); return () => clearTimeout(t) }, [msg])
  return <ToastCtx.Provider value={show}>{children}{msg && <div className="toast" role="status" key={msg.id}>{msg.text}</div>}</ToastCtx.Provider>
}
export const useToast = () => useContext(ToastCtx)

/** Brand mark: a day-marker — sun on the horizon above a tick. */
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="var(--ink)" />
      <path d="M14 38a18 18 0 0 1 36 0z" fill="var(--signal)" />
      <rect x="10" y="41" width="44" height="4" rx="2" fill="var(--bg)" />
      <rect x="22" y="49" width="20" height="4" rx="2" fill="var(--bg)" opacity=".55" />
    </svg>
  )
}

/** Empty-state art: horizon, marker post, soft sun — drawn from the brand primitives. */
export function HorizonArt({ variant = 'calm' }: { variant?: 'calm' | 'inbox' | 'partner' | 'review' }) {
  return (
    <svg className="art" viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="74" r={variant === 'partner' ? 26 : 30} fill="var(--signal-soft)" />
      <path d="M50 74a30 30 0 0 1 60 0z" fill="var(--signal)" opacity={variant === 'calm' ? 1 : .85} />
      {variant === 'partner' && <path d="M88 74a22 22 0 0 1 44 0z" fill="var(--done)" opacity=".85" />}
      <rect x="16" y="74" width="128" height="4" rx="2" fill="var(--ink)" opacity=".85" />
      <rect x="40" y="86" width="80" height="4" rx="2" fill="var(--ink)" opacity=".25" />
      <rect x="60" y="98" width="40" height="4" rx="2" fill="var(--ink)" opacity=".12" />
      {variant === 'inbox' && <><rect x="104" y="28" width="30" height="22" rx="6" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="2" /><path d="M110 36h18M110 42h12" stroke="var(--ink-3)" strokeWidth="2.5" strokeLinecap="round" /></>}
      {variant === 'review' && <path d="M24 40l10 8 16-18" fill="none" stroke="var(--done)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}
