"use client"

import { atom } from 'jotai'
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']

export const salesAtom = atom<Sale[]>([])
export const salesLoadingAtom = atom(true)

export const salesStatsAtom = atom((get) => {
  const sales = get(salesAtom)
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  
  const categoryTotals = sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)

  const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })

  return {
    totalSales,
    bestCategory,
    averageOrder: sales.length ? totalSales / sales.length : 0,
    categoryTotals
  }
})