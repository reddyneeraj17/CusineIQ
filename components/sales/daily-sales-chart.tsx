"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { BaseChart, ChartTooltip } from '@/components/charts/base-chart'
import { useDailySales } from "@/lib/hooks/use-sales"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { formatCurrency } from "@/lib/formatters"

export function DailySalesChart() {
  const { dailySales, loading } = useDailySales()

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Today's Sales by Category</h3>
        <div className="h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Today's Sales by Category</h3>
      <div className="h-[400px]">
        <BaseChart>
          <BarChart data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
            <XAxis 
              dataKey="category"
              style={{ fill: 'currentColor' }}
            />
            <YAxis 
              style={{ fill: 'currentColor' }}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<ChartTooltip />} />
            <Bar 
              dataKey="amount" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </BaseChart>
      </div>
    </Card>
  )
}