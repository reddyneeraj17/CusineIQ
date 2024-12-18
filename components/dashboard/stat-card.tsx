import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  subtitle: string
  bgColor: string
  textColor: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  bgColor,
  textColor
}: StatCardProps) {
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