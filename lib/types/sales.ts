export interface DailySales {
  id: number
  date: string
  category: string
  amount: number
}

export interface SalesByCategoryInput {
  [category: string]: number
}

export interface SalesStats {
  totalSales: number
  bestCategory: {
    name: string
    amount: number
  }
  averageOrder: number
}