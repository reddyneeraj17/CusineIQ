import { Sale, SalesStats } from '@/lib/store/sales'

export function calculateCategoryTotals(sales: Sale[]): Record<string, number> {
  return sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)
}

export function findBestCategory(categoryTotals: Record<string, number>) {
  return Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })
}

export function calculateSalesStats(sales: Sale[]): SalesStats {
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  const categoryTotals = calculateCategoryTotals(sales)
  const bestCategory = findBestCategory(categoryTotals)
  const averageOrder = sales.length ? totalSales / sales.length : 0

  return {
    totalSales,
    bestCategory,
    averageOrder
  }
}