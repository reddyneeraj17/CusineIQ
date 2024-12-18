"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'

type TableName = keyof Database['public']['Tables']

export function useRealTimeData<T>(
  tableName: TableName,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData)

  useEffect(() => {
    const channel = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        async (payload) => {
          // Fetch fresh data when changes occur
          const { data: freshData } = await supabase
            .from(tableName)
            .select('*')
            .order('created_at', { ascending: false })
          
          if (freshData) {
            setData(freshData as T[])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [tableName])

  return data
}