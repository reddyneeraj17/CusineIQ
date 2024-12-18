"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { getExpenses } from "@/lib/api/expenses"
import { formatCurrency } from "@/lib/formatters"
import { useRealtimeSubscription } from "@/lib/hooks/use-realtime-subscription"
import type { Database } from '@/lib/types/database'

type Expense = Database['public']['Tables']['expenses']['Row']

export function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses()
      setExpenses(data || [])
    } catch (error) {
      const message = error instanceof Error ? error.message : 
        typeof error === 'object' && error !== null && 'message' in error ? error.message :
        'Failed to fetch expenses'
      console.error('Error fetching expenses:', message)
      setExpenses([]) // Reset to empty state on error
    } finally {
      setLoading(false)
    }
  }

  useRealtimeSubscription({
    table: 'expenses',
    onUpdate: fetchExpenses
  })

  useEffect(() => {
    fetchExpenses()
  }, [])

  if (loading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Recent Expenses</h3>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Recent Expenses</h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div>
              <p className="font-medium">{formatCurrency(expense.amount)}</p>
              <p className="text-sm text-muted-foreground">{expense.category}</p>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {new Date(expense.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        ))}
        {expenses.length === 0 && (
          <p className="text-center text-muted-foreground">No expenses recorded yet</p>
        )}
      </div>
    </Card>
  )
}