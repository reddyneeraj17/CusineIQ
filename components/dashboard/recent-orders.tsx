import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

const orders = [
  { id: 1, table: 5, amount: 1250, time: "2 mins ago" },
  { id: 2, table: 3, amount: 850, time: "5 mins ago" },
  { id: 3, table: 8, amount: 2100, time: "12 mins ago" },
  { id: 4, table: 12, amount: 1600, time: "18 mins ago" },
  { id: 5, table: 7, amount: 950, time: "25 mins ago" },
]

export function RecentOrders() {
  return (
    <Card className="col-span-3 p-6">
      <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-muted-foreground">Table {order.table}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{formatCurrency(order.amount)}</p>
              <p className="text-sm text-muted-foreground">{order.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}