import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type Expense = Database['public']['Tables']['expenses']['Row']
type NewExpense = Database['public']['Tables']['expenses']['Insert']

export async function getExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function addExpense(expense: NewExpense) {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expense])
    .select()
    .single()

  if (error) throw error
  return data
}