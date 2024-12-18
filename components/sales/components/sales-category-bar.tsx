"use client"

import { formatCurrency } from "@/lib/formatters"

interface SalesCategoryBarProps {
  category: string
  amount: number
  maxAmount: number
}

export function SalesCategoryBar({ category, amount, maxAmount }: SalesCategoryBarProps) {
  const percentage = (amount / maxAmount) * 100

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{category}</span>
      <div className="flex items-center gap-4">
        <div className="w-48 h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground min-w-[80px] text-right">
          {formatCurrency(amount)}
        </span>
      </div>
    </div>
  )
}