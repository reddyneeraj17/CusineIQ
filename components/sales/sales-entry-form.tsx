"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useDailySales } from "@/lib/hooks/use-sales"
import { SALES_CATEGORIES } from "@/lib/constants/categories"

export function SalesEntryForm() {
  const [loading, setLoading] = useState(false)
  const [salesData, setSalesData] = useState<Record<string, number>>(
    SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  )
  const { addDailySales } = useDailySales()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await addDailySales(salesData)
      toast({
        title: "Success",
        description: "Sales data has been recorded successfully",
      })
      // Reset form
      setSalesData(SALES_CATEGORIES.reduce((acc, category) => ({ ...acc, [category]: 0 }), {}))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record sales data",
        variant: "destructive",
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
          <div key={category} className="grid gap-2">
            <label className="text-sm font-medium">{category}</label>
            <Input
              type="number"
              value={salesData[category]}
              onChange={(e) =>
                setSalesData({
                  ...salesData,
                  [category]: parseFloat(e.target.value) || 0,
                })
              }
              placeholder={`Enter ${category} sales`}
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