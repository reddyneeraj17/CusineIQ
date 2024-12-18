import { SalesState } from './types'

export const selectSalesHistory = (state: SalesState) => state.salesHistory
export const selectDailySales = (state: SalesState) => state.dailySales
export const selectTotalSales = (state: SalesState) => 
  state.salesHistory.reduce((sum, sale) => sum + sale.amount, 0)
export const selectBestCategory = (state: SalesState) => {
  const categoryTotals = state.salesHistory.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)

  return Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })
}