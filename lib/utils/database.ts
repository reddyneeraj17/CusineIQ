import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export async function fetchTableData<T extends TableName>(
  table: T,
  options: {
    select?: string
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  } = {}
) {
  try {
    let query = supabase.from(table).select(options.select || '*')
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { 
        ascending: options.orderBy.ascending 
      })
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query
    
    if (error) throw error
    return data
  } catch (error) {
    console.error(`Error fetching ${table}:`, error)
    throw error
  }
}

export async function insertTableData<T extends TableName>(
  table: T,
  data: Tables[T]['Insert']
) {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single()
    
    if (error) throw error
    return result
  } catch (error) {
    console.error(`Error inserting into ${table}:`, error)
    throw error
  }
}

export async function deleteTableData<T extends TableName>(
  table: T,
  id: number
) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error(`Error deleting from ${table}:`, error)
    throw error
  }
}