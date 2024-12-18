"use client"

import { DailySalesForm } from "@/components/sales/daily-sales-form"
import { DailySalesList } from "@/components/sales/daily-sales-list"
import { DailySalesStats } from "@/components/sales/daily-sales-stats"

export default function SalesEntryPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Daily Sales Entry</h2>
      <DailySalesStats />
      <div className="grid gap-6 md:grid-cols-2">
        <DailySalesList />
        <DailySalesForm />
      </div>
    </div>
  )
}