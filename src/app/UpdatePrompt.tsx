import { useRegisterSW } from 'virtual:pwa-register/react'

/** Prompt (not auto) updates so a reload never interrupts a check-in. iOS standalone apps
 *  can stay resumed for days, so also check on every return to the foreground. */
export function UpdatePrompt() {
  const { needRefresh: [needRefresh, setNeedRefresh], updateServiceWorker } = useRegisterSW({
    onRegisteredSW(_url, r) {
      if (!r) return
      const check = () => { if (!r.installing && navigator.onLine) r.update().catch(() => {}) }
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check() })
      setInterval(check, 60 * 60 * 1000)
    },
  })
  if (!needRefresh) return null
  return (
    <div className="toast" role="status" style={{ display: 'flex', gap: 12, alignItems: 'center', top: 'auto', bottom: 'calc(env(safe-area-inset-bottom) + 84px)' }}>
      A new version is ready.
      <button className="btn small primary" onClick={() => updateServiceWorker(true)}>Update</button>
      <button className="btn small quiet" style={{ color: 'inherit' }} onClick={() => setNeedRefresh(false)}>Later</button>
    </div>
  )
}
