import type { AppState } from './types'

export const DEFAULT_TERMS = {
  checkInDays: [1, 2, 3, 4, 5],
  cutoff: '21:00',
  replyTime: '12:00',
  minIntervalHours: 15,
  quietStart: '22:00',
  quietEnd: '07:00',
  followUpAllowed: true,
}

export function emptyState(zone: string): AppState {
  return {
    schema: 1,
    owner: { id: 'owner-1', name: 'You', zone },
    sim: { now: null, online: true, view: 'owner' },
    actions: {}, series: {}, occurrences: {}, plans: {}, events: [], checkIns: [], snapshots: [], agreements: [],
    feedback: [], absences: [], commands: [], notices: [], reports: [], revokedUnits: [], experiments: [],
    settings: { reminderTime: '20:30', quietStart: '22:00', quietEnd: '07:00', motion: 'system' },
    onboarded: false,
  }
}
