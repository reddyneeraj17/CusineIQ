"use client"

import { atom } from 'jotai'
import type { Database } from '@/lib/types/database'

type Expense = Database['public']['Tables']['expenses']['Row']

export const expensesAtom = atom<Expense[]>([])
export const expensesLoadingAtom = atom(true)

export const expenseStatsAtom = atom((get) => {
  const expenses = get(expensesAtom)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  return { totalExpenses, categoryTotals }
})