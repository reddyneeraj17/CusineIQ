import { Sale } from './types'

export function createSale(category: string, amount: number): Sale {
  return {
    id: Date.now() + Math.random(),
    category,
    amount,
    date: new Date().toISOString()
  }
}

export function resetDailySales(categories: readonly string[]) {
  return categories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
}