import { format, startOfDay, endOfDay } from 'date-fns'

export function formatTime(date: Date): string {
  return format(date, 'HH:mm')
}

export function formatDate(date: Date): string {
  return format(date, 'MMM d, yyyy')
}

export function getDayBounds(date: Date) {
  return {
    start: startOfDay(date),
    end: endOfDay(date)
  }
}