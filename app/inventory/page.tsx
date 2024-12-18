import { InventoryList } from "@/components/inventory/inventory-list"
import { InventoryForm } from "@/components/inventory/inventory-form"
import { InventoryStats } from "@/components/inventory/inventory-stats"

export default function InventoryPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Inventory</h2>
      <InventoryStats />
      <div className="grid gap-6 md:grid-cols-2">
        <InventoryList />
        <InventoryForm />
      </div>
    </div>
  )
}