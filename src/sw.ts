/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', (e) => { if (e.data?.type === 'SKIP_WAITING') self.skipWaiting() })

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)
// App shell for every navigation (offline fallback). API calls are never cached here:
// IndexedDB is the data cache, and partner-shared data must not persist offline.
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html'), { denylist: [/^\/api\//, /^\/auth\//] }))

/** Phase 4: payloads use the Declarative Web Push shape so iOS 18.4+ can show them
 *  without this worker; other browsers land here and render the same JSON. */
interface DeclarativePush { web_push?: number; notification?: { title: string; body?: string; navigate?: string; tag?: string }; app_badge?: string }

self.addEventListener('push', (event) => {
  let data: DeclarativePush = {}
  try { data = event.data?.json() ?? {} } catch { /* not JSON */ }
  const n = data.notification ?? { title: 'Daymark', body: 'Time to check in.', navigate: '/' }
  event.waitUntil(Promise.all([
    self.registration.showNotification(n.title, { body: n.body, tag: n.tag, data: { url: n.navigate ?? '/' } }),
    data.app_badge && 'setAppBadge' in self.navigator ? (self.navigator as unknown as { setAppBadge(n: number): Promise<void> }).setAppBadge(Number(data.app_badge)) : Promise.resolve(),
  ]))
})

// Best-effort on iOS (declarative `navigate` is the reliable path there).
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = new URL(event.notification.data?.url ?? '/', self.location.origin).href
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
    const win = wins[0] as WindowClient | undefined
    if (win) { await win.focus(); win.postMessage({ type: 'NAVIGATE', url }) }
    else await self.clients.openWindow(url)
  })())
})
