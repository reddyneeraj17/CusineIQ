"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from "@/lib/formatters"

const sales = [
  {
    id: 1,
    date: "2024-03-20",
    orders: 45,
    revenue: 85000,
    avgOrderValue: 1889,
  },
  {
    id: 2,
    date: "2024-03-19",
    orders: 38,
    revenue: 72000,
    avgOrderValue: 1895,
  },
  // Add more sample data as needed
]

export function SalesTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Avg. Order Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.date}</TableCell>
              <TableCell>{sale.orders}</TableCell>
              <TableCell>{formatCurrency(sale.revenue)}</TableCell>
              <TableCell>{formatCurrency(sale.avgOrderValue)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}