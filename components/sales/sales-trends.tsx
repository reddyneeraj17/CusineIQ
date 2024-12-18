"use client"

import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

const weeklyData = [
  { day: "Mon", sales: 12500 },
  { day: "Tue", sales: 18900 },
  { day: "Wed", sales: 15600 },
  { day: "Thu", sales: 22400 },
  { day: "Fri", sales: 28900 },
  { day: "Sat", sales: 32100 },
  { day: "Sun", sales: 24500 },
]

export function SalesTrends() {
  const maxSales = Math.max(...weeklyData.map(d => d.sales))
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Weekly Sales Trend</h3>
      <div className="grid grid-cols-7 gap-2 h-[200px] items-end">
        {weeklyData.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-2">
            <div 
              className="w-full bg-primary rounded-t-md transition-all duration-500"
              style={{ height: `${(item.sales / maxSales) * 100}%` }}
            />
            <span className="text-sm font-medium">{item.day}</span>
            <span className="text-xs text-muted-foreground">
              {formatCurrency(item.sales)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}