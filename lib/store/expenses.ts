import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EXPENSE_CATEGORIES } from '@/lib/constants/categories'

interface Expense {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

interface ExpenseState {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense) => 
        set((state) => ({
          expenses: [
            {
              ...expense,
              id: Date.now(),
              date: new Date().toISOString()
            },
            ...state.expenses
          ]
        }))
    }),
    {
      name: 'expense-storage'
    }
  )
)