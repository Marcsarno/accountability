import type { AppState } from '../domain/types'

export function syncSummary(s: AppState) {
  const queued = s.commands.filter((c) => c.sync === 'queued').length
  if (!s.sim.online) return { tone: 'warn' as const, label: queued ? `Offline · ${queued} saved on this device` : 'Offline', queued }
  return { tone: 'ok' as const, label: 'Synced (simulated)', queued }
}

export function isStandalone(): boolean {
  return (navigator as Navigator & { standalone?: boolean }).standalone === true ||
    matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches
}

export function pushSupport(): 'unsupported-tab' | 'available' | 'unsupported' {
  if (typeof window.Notification === 'undefined' || !('serviceWorker' in navigator)) {
    return /iPhone|iPad/.test(navigator.userAgent) && !isStandalone() ? 'unsupported-tab' : 'unsupported'
  }
  return 'available'
}
