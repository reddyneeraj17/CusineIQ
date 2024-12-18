"use client"

import { Card } from "@/components/ui/card"
import { useInventory } from "@/lib/hooks/use-inventory"
import { formatCurrency } from "@/lib/formatters"

export function InventoryList() {
  const { items, loading } = useInventory()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Current Stock</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} {item.unit}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(item.cost)}</p>
              {item.quantity <= item.minQuantity && (
                <p className="text-sm text-red-500">Low Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}