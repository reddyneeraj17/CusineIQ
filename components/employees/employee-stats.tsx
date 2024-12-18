import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

const stats = [
  {
    title: "Total Employees",
    value: "24",
    change: "+2 this month"
  },
  {
    title: "Average Salary",
    value: formatCurrency(35000),
    change: "+5% from last quarter"
  },
  {
    title: "Active Shifts",
    value: "8",
    change: "Current shift"
  }
]

export function EmployeeStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-2">{stat.change}</p>
        </Card>
      ))}
    </div>
  )
}