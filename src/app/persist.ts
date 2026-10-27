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

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open()
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode)
    const req = fn(t.objectStore(STORE))
    t.oncomplete = () => resolve(req.result)
    t.onerror = t.onabort = () => reject(t.error ?? req.error)
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

export async function clearState(ownerId: string): Promise<void> {
  await tx('readwrite', (s) => s.delete(key(ownerId)))
}

export async function requestPersistence(): Promise<boolean | null> {
  try { return (await navigator.storage?.persist?.()) ?? null } catch { return null }
}
