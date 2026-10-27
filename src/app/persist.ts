import type { AppState } from '../domain/types'

const DB = 'daymark'
const STORE = 'kv'

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

/** One shared connection, so a write starts in the same task as the change that caused it. */
let connection: Promise<IDBDatabase> | null = null
function db(): Promise<IDBDatabase> {
  connection ??= open().then((d) => {
    d.onclose = () => { connection = null } // closed by the browser (e.g. storage cleared): reopen next time
    return d
  }, (e) => { connection = null; throw e })
  return connection
}

/** Read-write transactions on one store run in creation order, so successive saves never land out of order. */
async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const d = await db()
  return new Promise((resolve, reject) => {
    const t = d.transaction(STORE, mode)
    const req = fn(t.objectStore(STORE))
    t.oncomplete = () => resolve(req.result)
    t.onerror = t.onabort = () => reject(t.error ?? req.error)
    // Commit now rather than when the task ends; this narrows the window in which closing the app loses the write.
    t.commit?.()
  })
}

/** Local data is bound to the (simulated) owner id; another account never reads it. */
const key = (ownerId: string) => `state:${ownerId}`

export async function loadState(ownerId: string): Promise<AppState | null> {
  const v = await tx<unknown>('readonly', (s) => s.get(key(ownerId)))
  if (!v) return null
  const st = v as AppState
  if (st.schema !== 1) throw new Error(`Saved data uses schema ${st.schema}; this build reads schema 1. Nothing was changed.`)
  return st
}

export async function saveState(state: AppState): Promise<void> {
  await tx('readwrite', (s) => s.put(state, key(state.owner.id)))
}

export async function requestPersistence(): Promise<boolean | null> {
  try { return (await navigator.storage?.persist?.()) ?? null } catch { return null }
}
