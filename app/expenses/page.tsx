import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { ExpenseStats } from "@/components/expenses/expense-stats"
import { SupabaseTest } from "@/components/expenses/supabase-test"

export default function ExpensesPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Expenses</h2>
      <SupabaseTest />
      <ExpenseStats />
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseList />
        <ExpenseForm />
      </div>
    </div>
  )
}