"use client"

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useSupabaseStore } from './use-supabase-store'
import type { Database } from '@/lib/types/database'

type TableName = keyof Database['public']['Tables']

export function useRealTimeUpdates(tables: TableName[]) {
  const fetchTableData = useSupabaseStore((state) => state.fetchTableData)

  useEffect(() => {
    // Initial data fetch
    tables.forEach(fetchTableData)

    // Set up real-time subscriptions
    const channels = tables.map(table => 
      supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => fetchTableData(table)
        )
        .subscribe()
    )

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel))
    }
  }, [tables, fetchTableData])
}