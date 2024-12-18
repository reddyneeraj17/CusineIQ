"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { getSales } from "@/lib/api/sales"
import { formatCurrency } from "@/lib/formatters"
import { useRealtimeSubscription } from "@/lib/hooks/use-realtime-subscription"
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']

export function DailySalesList() {
  const [sales, setSales] = useState<Sale[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSales = async () => {
    try {
      const data = await getSales()
      setSales(data || [])
    } catch (error) {
      console.error('Error fetching sales:', error)
      setSales([])
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

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Recent Sales</h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {sales.map((sale) => (
          <div key={sale.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium">{formatCurrency(sale.amount)}</p>
              <p className="text-sm text-muted-foreground">{sale.category}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {new Date(sale.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
        {sales.length === 0 && (
          <p className="text-center text-muted-foreground">No sales recorded yet</p>
        )}
      </div>
    </Card>
  )
}