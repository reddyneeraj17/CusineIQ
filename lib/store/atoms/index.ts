export * from './sales'
export * from './expenses'
export * from './employees'
export * from './inventory'
export * from './loading'

// Root atoms for global state
import { atom } from 'jotai'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']

export const dataAtom = atom<{
  [K in keyof Tables]: Tables[K]['Row'][]
}>({
  sales: [],
  expenses: [],
  employees: [],
  inventory: []
})

export const errorAtom = atom<Error | null>(null)