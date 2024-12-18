"use client"

import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/formatters"

const metrics = [
  {
    label: "Average Daily Sales",
    value: 22500,
    change: 15.2,
    positive: true
  },
  {
    label: "Items per Order",
    value: "4.8",
    change: -2.1,
    positive: false
  },
  {
    label: "Average Order Value",
    value: 1850,
    change: 8.5,
    positive: true,
    isCurrency: true
  }
]

export function SalesMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-4">
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="text-2xl font-bold mt-2">
            {metric.isCurrency ? formatCurrency(Number(metric.value)) : metric.value}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {metric.positive ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={metric.positive ? "text-green-500" : "text-red-500"}>
              {formatPercentage(metric.change)}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}