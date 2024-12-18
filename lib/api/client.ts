import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export async function fetchTableData<T extends TableName>(
  table: T,
  options: {
    select?: string
    orderBy?: { column: string; ascending?: boolean }
  } = {}
): Promise<Tables[T]['Row'][]> {
  let query = supabase.from(table).select(options.select || '*')
  
  if (options.orderBy) {
    query = query.order(options.orderBy.column, { 
      ascending: options.orderBy.ascending 
    })
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function insertData<T extends TableName>(
  table: T,
  data: Tables[T]['Insert']
): Promise<Tables[T]['Row']> {
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result
}

export async function updateData<T extends TableName>(
  table: T,
  id: number,
  data: Partial<Tables[T]['Update']>
): Promise<Tables[T]['Row']> {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return result
}