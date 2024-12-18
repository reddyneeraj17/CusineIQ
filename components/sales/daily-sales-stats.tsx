"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"
import { getSales } from "@/lib/api/sales"
import { useRealtimeSubscription } from "@/lib/hooks/use-realtime-subscription"
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']

interface SalesStats {
  totalSales: number
  bestCategory: {
    name: string
    amount: number
  }
  averageOrder: number
}

const initialStats: SalesStats = {
  totalSales: 0,
  bestCategory: { name: 'N/A', amount: 0 },
  averageOrder: 0
}

function calculateStats(sales: Sale[]): SalesStats {
  if (!sales.length) return initialStats

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  
  const categoryTotals = sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)

  const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })

  return {
    totalSales,
    bestCategory,
    averageOrder: totalSales / sales.length
  }
}

export function DailySalesStats() {
  const [stats, setStats] = useState<SalesStats>(initialStats)
  const [loading, setLoading] = useState(true)

  const fetchAndCalculateStats = async () => {
    try {
      const data = await getSales()
      setStats(calculateStats(data || []))
    } catch (error) {
      console.error('Error fetching sales stats:', error)
      setStats(initialStats)
    } finally {
      setLoading(false)
    }
  }

  useRealtimeSubscription({
    table: 'sales',
    onUpdate: fetchAndCalculateStats
  })

  useEffect(() => {
    fetchAndCalculateStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Today's Sales</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(stats.totalSales)}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Best Performing Category</h3>
        <p className="text-2xl font-bold mt-2">{stats.bestCategory.name}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {formatCurrency(stats.bestCategory.amount)}
        </p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Average Order Value</h3>
        <p className="text-2xl font-bold mt-2">{formatCurrency(stats.averageOrder)}</p>
      </Card>
    </div>
  )
}