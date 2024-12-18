"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { BaseChart, ChartTooltip } from '@/components/charts/base-chart'
import { formatCurrency } from '@/lib/formatters'

const data = [
  { name: 'Mon', sales: 84000 },
  { name: 'Tue', sales: 73000 },
  { name: 'Wed', sales: 62000 },
  { name: 'Thu', sales: 78000 },
  { name: 'Fri', sales: 89000 },
  { name: 'Sat', sales: 122000 },
  { name: 'Sun', sales: 134000 },
]

export function SalesChart() {
  return (
    <BaseChart height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
        <XAxis 
          dataKey="name"
          style={{ fill: 'currentColor' }}
        />
        <YAxis 
          style={{ fill: 'currentColor' }}
          tickFormatter={formatCurrency}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line 
          type="monotone" 
          dataKey="sales" 
          stroke="hsl(var(--primary))" 
          strokeWidth={2}
          dot={{ fill: 'hsl(var(--primary))' }}
        />
      </LineChart>
    </BaseChart>
  )
}