"use client"

import { ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/formatters'

interface BaseChartProps {
  children: ReactNode
  height?: number | string
}

export function BaseChart({ children, height = "100%" }: BaseChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      {children}
    </ResponsiveContainer>
  )
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

export function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border">
      <p className="font-medium">{label}</p>
      <p className="text-emerald-600">{formatCurrency(payload[0].value)}</p>
    </div>
  )
}