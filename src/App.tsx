import { CalendarCheck, ChartBar, GearSix, Tray, UsersThree, type Icon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useStore } from './app/store'
import { syncSummary } from './app/status'
import { activeAgreement } from './domain/commands'
import { Inbox } from './screens/Inbox'
import { Onboarding } from './screens/Onboarding'
import { Partner } from './screens/Partner'
import { PeerView } from './screens/PeerView'
import { Review } from './screens/Review'
import { Settings } from './screens/Settings'
import { Today } from './screens/Today'
import { Banner, BrandMark } from './ui/kit'

export type Tab = 'today' | 'inbox' | 'review' | 'partner' | 'settings'
const TABS: { id: Tab; label: string; icon: Icon }[] = [
  { id: 'today', label: 'Today', icon: CalendarCheck },
  { id: 'inbox', label: 'Inbox', icon: Tray },
  { id: 'review', label: 'Review', icon: ChartBar },
  { id: 'partner', label: 'Partner', icon: UsersThree },
  { id: 'settings', label: 'Settings', icon: GearSix },
]

const readTab = (): Tab => {
  const h = location.hash.replace('#/', '') as Tab
  return TABS.some((t) => t.id === h) ? h : 'today'
}

export default function App() {
  const { state, ready, storageError } = useStore()
  const [tab, setTab] = useState<Tab>(readTab)

  useEffect(() => {
    const on = () => { setTab(readTab()); scrollTo({ top: 0 }) }
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  useEffect(() => { document.documentElement.dataset.motion = state.settings.motion }, [state.settings.motion])

  const go = (t: Tab) => {
    if (t === tab) { scrollTo({ top: 0, behavior: 'smooth' }); return }
    const swap = () => { location.hash = `#/${t}`; setTab(t); scrollTo({ top: 0 }) }
    const d = document as Document & { startViewTransition?: (cb: () => void) => unknown }
    if (d.startViewTransition && state.settings.motion !== 'reduced' && !matchMedia('(prefers-reduced-motion: reduce)').matches) d.startViewTransition(swap)
    else swap()
  }

  if (!ready) return <div className="statusbar-scrim" />
  if (state.sim.view === 'peer') return <><div className="statusbar-scrim" /><PeerView /></>
  if (!state.onboarded) return <><div className="statusbar-scrim" /><Onboarding /></>

  const ag = activeAgreement(state)
  const unanswered = state.feedback.some((f) => f.suggestion && !f.acceptedActionId)
  const badges: Partial<Record<Tab, boolean>> = { partner: unanswered || ag?.status === 'invited' }
  const sync = syncSummary(state)

  const nav = TABS.map((t) => {
    const I = t.icon
    return (
      <button key={t.id} className="tab" aria-current={tab === t.id ? 'page' : undefined} onClick={() => go(t.id)}>
        <I size={24} weight={tab === t.id ? 'fill' : 'regular'} aria-hidden="true" />
        <span>{t.label}</span>
        {badges[t.id] && <span className="dot" aria-label="needs attention" />}
      </button>
    )
  })

  return (
    <div className="shell">
      <div className="statusbar-scrim" />
      <nav className="sidenav" aria-label="Main">
        <div className="brand"><BrandMark size={30} /> Daymark</div>
        {nav}
        <div className="spacer" />
        <span className={`pill ${sync.tone === 'ok' ? 'ok' : 'warn'}`} style={{ alignSelf: 'flex-start' }}>{sync.label}</span>
      </nav>
      <main className="main" style={{ viewTransitionName: 'main' }}>
        {storageError && <Banner tone="warn">{storageError}</Banner>}
        {tab === 'today' && <Today go={go} />}
        {tab === 'inbox' && <Inbox />}
        {tab === 'review' && <Review />}
        {tab === 'partner' && <Partner />}
        {tab === 'settings' && <Settings />}
      </main>
      <nav className="tabbar" aria-label="Main">{nav}</nav>
    </div>
  )
}
