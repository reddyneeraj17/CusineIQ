"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { useSalesStore } from "@/lib/store/sales/store"
import { selectSalesHistory } from "@/lib/store/sales/selectors"
import { calculateCategoryTotals } from "@/lib/utils/sales"
import { SalesCategoryBar } from "./components/sales-category-bar"

export function SalesOverview() {
  const salesHistory = useSalesStore(selectSalesHistory)
  const categoryTotals = calculateCategoryTotals(salesHistory)
  const data = Object.entries(categoryTotals).map(([category, sales]) => ({
    category,
    sales
  }))
  
  return (
    <Card className="p-6 my-6">
      <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <SalesCategoryBar 
            key={item.category}
            category={item.category}
            amount={item.sales}
            maxAmount={Math.max(...data.map(d => d.sales))}
          />
        ))}
      </div>
    </Card>
  )
}