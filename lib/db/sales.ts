import { supabase } from '../supabase/client'
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']
type NewSale = Database['public']['Tables']['sales']['Insert']

export async function getSales() {
  const { data, error } = await supabase
    .from('sales')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function addSale(sale: NewSale) {
  const { data, error } = await supabase
    .from('sales')
    .insert([sale])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSalesStats() {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('amount, category')
    .gte('date', new Date().toISOString().split('T')[0])

  if (error) throw error

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  
  const categoryTotals = sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)

  const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })

  return {
    totalSales,
    bestCategory,
    averageOrder: sales.length ? totalSales / sales.length : 0,
    categoryTotals
  }
}