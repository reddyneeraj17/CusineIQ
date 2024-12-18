import { DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { THEME_COLORS } from "@/lib/constants"
import { formatCurrency, formatPercentage } from "@/lib/formatters"

function StatCard({ title, value, icon: Icon, subtitle, bgColor, textColor }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`p-4 ${bgColor} rounded-full`}>
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
      </div>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(3452100)}
          icon={DollarSign}
          subtitle={`${formatPercentage(20.1)} from last month`}
          {...THEME_COLORS.revenue}
        />

        <StatCard
          title="Active Orders"
          value="24"
          icon={ShoppingCart}
          subtitle="+12 from last hour"
          {...THEME_COLORS.orders}
        />

        <StatCard
          title="Staff on Duty"
          value="8"
          icon={Users}
          subtitle="Current shift"
          {...THEME_COLORS.staff}
        />

        <StatCard
          title="Net Profit"
          value={formatCurrency(892450)}
          icon={TrendingUp}
          subtitle={`${formatPercentage(8.2)} from last month`}
          {...THEME_COLORS.profit}
        />
      </div>
    </div>
  )
}