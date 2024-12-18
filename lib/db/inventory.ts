import { supabase } from '../supabase/client'
import type { Database } from '@/lib/types/database'

type InventoryItem = Database['public']['Tables']['inventory']['Row']
type NewInventoryItem = Database['public']['Tables']['inventory']['Insert']

export async function getInventory() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function addInventoryItem(item: NewInventoryItem) {
  const { data, error } = await supabase
    .from('inventory')
    .insert([item])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateInventoryItem(id: number, updates: Partial<InventoryItem>) {
  const { data, error } = await supabase
    .from('inventory')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getLowStockItems() {
  const { data, error } = await supabase
    .from('inventory')
    .select('*')
    .lte('quantity', supabase.raw('min_quantity'))

  if (error) throw error
  return data
}