import * as React from "react"
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Stat {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    positive?: boolean
  }
  className?: string
}

interface StatsCardsProps {
  stats: Stat[]
  columns?: 2 | 3 | 4
}

export function StatsCards({ stats, columns = 4 }: StatsCardsProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={cn("grid gap-4", gridCols[columns])}>
      {stats.map((stat, index) => (
        <Card key={index} className={stat.className}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {(stat.description || stat.trend) && (
              <div className="mt-2 flex items-center gap-2">
                {stat.trend && (
                  <div
                    className={cn(
                      "flex items-center text-xs",
                      stat.trend.positive ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {stat.trend.positive ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {stat.trend.value}%
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {stat.description || stat.trend?.label}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Pre-built stat configurations for common SaaS metrics
export const saasStats = {
  mrr: (value: number, growth: number): Stat => ({
    title: "MRR",
    value: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value),
    icon: TrendingUp,
    trend: { value: growth, label: "from last month", positive: growth > 0 },
  }),
  users: (value: number, growth: number): Stat => ({
    title: "Total Users",
    value: new Intl.NumberFormat("en-US").format(value),
    icon: TrendingUp,
    trend: { value: growth, label: "from last month", positive: growth > 0 },
  }),
  activeUsers: (value: number, growth: number): Stat => ({
    title: "Active Users",
    value: new Intl.NumberFormat("en-US").format(value),
    icon: TrendingUp,
    trend: { value: growth, label: "from last month", positive: growth > 0 },
  }),
  churnRate: (value: number, change: number): Stat => ({
    title: "Churn Rate",
    value: `${value}%`,
    icon: TrendingDown,
    trend: { value: change, label: "from last month", positive: change < 0 },
  }),
}
