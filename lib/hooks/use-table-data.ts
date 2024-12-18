"use client"

import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { supabase } from '@/lib/config/supabase'
import { dataAtom, errorAtom, loadingAtom } from '@/lib/store/atoms'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export function useTableData<T extends TableName>(table: T) {
  const [data, setData] = useAtom(dataAtom)
  const [, setError] = useAtom(errorAtom)
  const [loading, setLoading] = useAtom(loadingAtom)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setData(prev => ({
        ...prev,
        [table]: result || []
      }))
      setError(null)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch data')
      console.error(`Error fetching ${table}:`, error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [table, setData, setError, setLoading])

  return {
    data: data[table],
    loading,
    refetch: fetchData
  }
}