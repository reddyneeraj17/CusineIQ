import { SimplifiedSalesChart } from "@/components/sales/simplified-chart"
import { SalesTrends } from "@/components/sales/sales-trends"
import { SalesMetrics } from "@/components/sales/sales-metrics"

export default function SalesPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Sales Overview</h2>
      <div className="space-y-6">
        <SalesMetrics />
        <div className="grid gap-6 md:grid-cols-2">
          <SimplifiedSalesChart />
          <SalesTrends />
        </div>
      </div>
    </div>
  )
}