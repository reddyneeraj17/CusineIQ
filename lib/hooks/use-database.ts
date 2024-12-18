"use client"

import { useState, useCallback } from 'react'
import { useSupabase } from '@/lib/providers/supabase-provider'
import { useToast } from '@/components/ui/use-toast'
import { handleSupabaseError } from '@/lib/utils/error-handling'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export function useDatabase<T extends TableName>(table: T) {
  const { supabase } = useSupabase()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from(table)
        .select('*')
      
      if (error) throw error
      return data
    } catch (error) {
      handleSupabaseError(error, toast)
      return []
    } finally {
      setLoading(false)
    }
  }, [table, supabase, toast])

  const insertData = useCallback(async (data: Tables[T]['Insert']) => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single()
      
      if (error) throw error
      return result
    } catch (error) {
      handleSupabaseError(error, toast)
      return null
    } finally {
      setLoading(false)
    }
  }, [table, supabase, toast])

  return {
    fetchData,
    insertData,
    loading
  }
}