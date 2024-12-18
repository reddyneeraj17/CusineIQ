import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type Expense = Database['public']['Tables']['expenses']['Row']
type NewExpense = Database['public']['Tables']['expenses']['Insert']

export async function getExpenses() {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching expenses:', error)
    throw error
  }
}

export async function addExpense(expense: NewExpense) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([expense])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('This expense has already been recorded')
      }
      throw new Error(error.message)
    }
    
    return data || null
  } catch (error) {
    console.error('Error adding expense:', error)
    throw error
  }
}