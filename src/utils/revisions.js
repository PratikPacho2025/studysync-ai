import { revisionIntervals } from '../data/mock/revisions'

export function getNextRevisionDate(date, revisionNumber) {
  const nextDate = new Date(date)
  const hours = revisionIntervals[Math.min(revisionNumber - 1, revisionIntervals.length - 1)] ?? 360
  nextDate.setHours(nextDate.getHours() + hours)
  return nextDate.toISOString()
}

export function formatRevisionDate(date, options = {}) {
  const formatOptions = Object.keys(options).length > 0 ? options : { day: 'numeric', month: 'short' }
  return new Intl.DateTimeFormat('en-US', formatOptions).format(new Date(date))
}