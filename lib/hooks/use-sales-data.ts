"use client"

import { useState, useEffect } from 'react'
import { getSales } from '@/lib/api/sales'
import { useRealtimeSubscription } from '@/lib/hooks/use-realtime-subscription'
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']

interface SalesStats {
  totalSales: number
  bestCategory: {
    name: string
    amount: number
  }
  averageOrder: number
  categoryTotals: Record<string, number>
}

const initialStats: SalesStats = {
  totalSales: 0,
  bestCategory: { name: 'N/A', amount: 0 },
  averageOrder: 0,
  categoryTotals: {}
}

export function useSalesData() {
  const [sales, setSales] = useState<Sale[]>([])
  const [stats, setStats] = useState<SalesStats>(initialStats)
  const [loading, setLoading] = useState(true)

  const calculateStats = (salesData: Sale[]): SalesStats => {
    if (!salesData.length) return initialStats

    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0)
    
    const categoryTotals = salesData.reduce((acc, sale) => {
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
      averageOrder: totalSales / salesData.length,
      categoryTotals
    }
  }

  const fetchSales = async () => {
    try {
      const data = await getSales()
      setSales(data || [])
      setStats(calculateStats(data || []))
    } catch (error) {
      console.error('Error fetching sales:', error)
      setSales([])
      setStats(initialStats)
    } finally {
      setLoading(false)
    }
  }

  useRealtimeSubscription({
    table: 'sales',
    onUpdate: fetchSales
  })

  useEffect(() => {
    fetchSales()
  }, [])

  return {
    sales,
    stats,
    loading,
    refresh: fetchSales
  }
}