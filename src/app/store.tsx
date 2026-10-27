import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { dispatch as apply, type Command, type Result } from '../domain/commands'
import { buildSampleState } from '../domain/fixture'
import { emptyState } from '../domain/initial'
import { generateOccurrences } from '../domain/recurrence'
import { Temporal, addDays, todayIn } from '../domain/time'
import type { AppState } from '../domain/types'
import { loadState, saveState } from './persist'

export const OWNER_ID = 'owner-1'

interface Store {
  state: AppState
  ready: boolean
  storageError: string | null
  now: string
  today: string
  run: (cmd: Command, key?: string) => Result
  setSim: (patch: Partial<AppState['sim']>) => void
  loadSample: () => void
  resetEmpty: () => void
  syncNow: () => void
}

const Ctx = createContext<Store | null>(null)

const browserZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
let seq = 0
export const newId = () => `${Date.now().toString(36)}${(++seq).toString(36)}${Math.random().toString(36).slice(2, 6)}`

function withOccurrences(s: AppState, today: string): AppState {
  const occurrences = generateOccurrences(s, addDays(today, -7), 21)
  return Object.keys(occurrences).length === Object.keys(s.occurrences).length ? s : { ...s, occurrences }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => emptyState(browserZone()))
  const [ready, setReady] = useState(false)
  const [storageError, setStorageError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)
  const stateRef = useRef(state)
  stateRef.current = state

  useEffect(() => {
    loadState(OWNER_ID)
      .then((s) => { if (s) setState(s) })
      .catch((e) => setStorageError(`Could not read saved data on this device: ${e?.message ?? e}. Changes may not survive a reload.`))
      .finally(() => setReady(true))
    const t = setInterval(() => setTick((x) => x + 1), 30_000)
    return () => clearInterval(t)
  }, [])

  /**
   * The single way state changes after load: update the screen and start the device write in
   * the same step, so a result confirmed on screen is already on its way to storage.
   */
  const commit = useCallback((next: AppState) => {
    stateRef.current = next
    setState(next)
    saveState(next)
      .then(() => setStorageError(null))
      .catch((e) => setStorageError(`Not saved on this device: ${e?.name === 'QuotaExceededError' ? 'storage is full' : e?.message ?? e}. Your changes are still on screen — export before closing.`))
  }, [])

  const now = useMemo(() => state.sim.now ?? Temporal.Now.instant().toString(), [state.sim.now, tick])
  const today = useMemo(() => todayIn(state.owner.zone, Temporal.Instant.from(now)), [now, state.owner.zone])

  useEffect(() => {
    if (!ready) return
    const next = withOccurrences(stateRef.current, today)
    if (next !== stateRef.current) commit(next)
  }, [today, ready, commit])

  const run = useCallback((cmd: Command, key = newId()) => {
    const r = apply(stateRef.current, key, cmd, { now: stateRef.current.sim.now ?? Temporal.Now.instant().toString(), id: newId })
    if (r.ok && !r.replayed) commit(withOccurrences(r.state, todayIn(r.state.owner.zone, Temporal.Instant.from(r.state.sim.now ?? Temporal.Now.instant().toString()))))
    return r
  }, [commit])

  const setSim = useCallback((patch: Partial<AppState['sim']>) => {
    const s = stateRef.current
    const next = { ...s, sim: { ...s.sim, ...patch } }
    // Coming back online "syncs" queued commands in the simulation.
    if (patch.online && !s.sim.online) next.commands = s.commands.map((c) => (c.sync === 'queued' ? { ...c, sync: 'synced' as const } : c))
    commit(next)
  }, [commit])

  const loadSample = useCallback(() => commit(buildSampleState()), [commit])
  // Writing the empty state replaces the stored copy, so no separate clear is needed.
  const resetEmpty = useCallback(() => commit(emptyState(browserZone())), [commit])
  const syncNow = useCallback(() => setSim({ online: true }), [setSim])

  const value = useMemo(() => ({ state, ready, storageError, now, today, run, setSim, loadSample, resetEmpty, syncNow }), [state, ready, storageError, now, today, run, setSim, loadSample, resetEmpty, syncNow])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const s = useContext(Ctx)
  if (!s) throw new Error('StoreProvider missing')
  return s
}
