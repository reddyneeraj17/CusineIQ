import { SALES_CATEGORIES } from '@/lib/constants/categories'

export interface Sale {
  id: number
  category: string
  amount: number
  date: string
}

export interface SalesState {
  dailySales: Record<string, number>
  salesHistory: Sale[]
  setDailySales: (category: string, amount: number) => void
  resetSales: () => void
  submitSales: () => void
}

export interface SalesStats {
  totalSales: number
  bestCategory: {
    name: string
    amount: number
  }
  averageOrder: number
}