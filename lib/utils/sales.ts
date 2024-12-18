import { SalesStats } from '@/lib/store/sales'

export function calculateSalesStats(sales: { amount: number, category: string }[]): SalesStats {
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

  const averageOrder = sales.length ? totalSales / sales.length : 0

  return {
    totalSales,
    bestCategory,
    averageOrder
  }
}