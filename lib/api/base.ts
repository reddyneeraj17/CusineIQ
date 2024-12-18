import { supabase } from '@/lib/config/database'

export async function fetchData<T>(
  table: string,
  options: { 
    select?: string,
    orderBy?: { column: string; ascending?: boolean }
  } = {}
) {
  const query = supabase.from(table).select(options.select || '*')
  
  if (options.orderBy) {
    query.order(options.orderBy.column, { ascending: options.orderBy.ascending })
  }

  const { data, error } = await query
  if (error) throw error
  return data as T[]
}

export async function insertData<T>(
  table: string,
  data: any
) {
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select()
    .single()

  if (error) throw error
  return result as T
}