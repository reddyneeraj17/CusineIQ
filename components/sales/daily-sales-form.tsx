"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SALES_CATEGORIES } from "@/lib/constants/categories"
import { addBulkSales } from "@/lib/api/sales"
import { useToast } from "@/components/ui/use-toast"

export function DailySalesForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [salesData, setSalesData] = useState<Record<string, number>>(
    SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const sales = Object.entries(salesData)
        .filter(([_, amount]) => amount > 0)
        .map(([category, amount]) => ({
          category,
          amount,
          date: new Date().toISOString()
        }))

      if (sales.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please enter at least one sales amount",
          variant: "destructive"
        })
        return
      }

      await addBulkSales(sales)

      toast({
        title: "Success",
        description: "Sales recorded successfully"
      })

      // Reset form
      setSalesData(SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {}))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to record sales'
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Enter Daily Sales</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {SALES_CATEGORIES.map((category) => (
          <div key={category} className="space-y-2">
            <label className="text-sm font-medium">{category}</label>
            <Input
              type="number"
              value={salesData[category] || 0}
              onChange={(e) => setSalesData(prev => ({
                ...prev,
                [category]: Number(e.target.value)
              }))}
              placeholder={`Enter ${category} sales`}
              min="0"
              step="0.01"
            />
          </div>
        ))}
        <Button className="w-full" disabled={loading}>
          {loading ? "Recording..." : "Record Sales"}
        </Button>
      </form>
    </Card>
  )
}