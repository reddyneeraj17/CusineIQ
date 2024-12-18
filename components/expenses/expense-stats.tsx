import { Card } from "@/components/ui/card"
import { formatCurrency } from "@/lib/formatters"

const stats = [
  {
    title: "Total Expenses",
    value: formatCurrency(245000),
    change: "+12.5%",
    changeType: "negative"
  },
  {
    title: "Biggest Category",
    value: "Ingredients",
    change: formatCurrency(125000),
    changeType: "neutral"
  },
  {
    title: "Average Daily",
    value: formatCurrency(8167),
    change: "-3.2%",
    changeType: "positive"
  }
]

export function ExpenseStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
          <p className={`text-sm mt-2 ${
            stat.changeType === "positive" ? "text-green-600" :
            stat.changeType === "negative" ? "text-red-600" :
            "text-muted-foreground"
          }`}>
            {stat.change}
          </p>
        </Card>
      ))}
    </div>
  )
}