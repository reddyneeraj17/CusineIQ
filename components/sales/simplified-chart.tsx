"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

const data = [
  { category: "Appetizers", amount: 125000 },
  { category: "Main Course", amount: 450000 },
  { category: "Desserts", amount: 85000 },
  { category: "Beverages", amount: 95000 },
  { category: "Specials", amount: 175000 },
]

export function SimplifiedSalesChart() {
  const maxAmount = Math.max(...data.map(d => d.amount))
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Sales by Category</h3>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.category} className="flex items-center justify-between">
            <span className="font-medium">{item.category}</span>
            <div className="flex items-center gap-4">
              <div className="w-48 h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(item.amount / maxAmount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                {formatCurrency(item.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}