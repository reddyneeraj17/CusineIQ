"use client"

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type TableName = keyof Database['public']['Tables']

export function useSupabaseSubscription(
  table: TableName,
  setData: ReturnType<typeof useSetAtom<any[]>>
) {
  useEffect(() => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        async () => {
          const { data } = await supabase
            .from(table)
            .select('*')
            .order('created_at', { ascending: false })
          
          if (data) {
            setData(data)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [table, setData])
}