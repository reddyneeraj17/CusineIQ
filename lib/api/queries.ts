import { supabase } from '@/lib/config/supabase'

export async function fetchInitialData() {
  const [salesResponse, expensesResponse, employeesResponse, inventoryResponse] = await Promise.all([
    supabase.from('sales').select('*').order('created_at', { ascending: false }),
    supabase.from('expenses').select('*').order('created_at', { ascending: false }),
    supabase.from('employees').select('*').order('name'),
    supabase.from('inventory').select('*').order('name')
  ])

  return {
    sales: salesResponse.data || [],
    expenses: expensesResponse.data || [],
    employees: employeesResponse.data || [],
    inventory: inventoryResponse.data || []
  }
}