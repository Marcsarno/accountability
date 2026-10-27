import { Temporal } from './time'

/**
 * Reply due for the FIRST published check-in of a day:
 * the later of the normal reply deadline and publication + minimum interval.
 * Amendments never move this value.
 */
export function replyDue(normalDeadlineUtc: string, firstPublishedUtc: string, minIntervalHours: number): string {
  const normal = Temporal.Instant.from(normalDeadlineUtc)
  const floor = Temporal.Instant.from(firstPublishedUtc).add({ hours: minIntervalHours })
  return (Temporal.Instant.compare(normal, floor) >= 0 ? normal : floor).toString()
}
