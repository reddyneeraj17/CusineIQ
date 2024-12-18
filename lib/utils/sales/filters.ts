import { Sale } from '@/lib/store/sales'

export function filterSalesByDate(sales: Sale[], date: Date): Sale[] {
  return sales.filter(sale => {
    const saleDate = new Date(sale.date)
    return saleDate.toDateString() === date.toDateString()
  })
}

export function filterSalesByDateRange(sales: Sale[], startDate: Date, endDate: Date): Sale[] {
  return sales.filter(sale => {
    const saleDate = new Date(sale.date)
    return saleDate >= startDate && saleDate <= endDate
  })
}