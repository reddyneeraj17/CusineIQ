"use client"

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { supabase } from '@/lib/config/supabase'

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { fetchData } = useStore()

  useEffect(() => {
    fetchData()

    const channels = ['sales', 'expenses', 'employees', 'inventory'].map(table =>
      supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          fetchData
        )
        .subscribe()
    )

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel))
    }
  }, [fetchData])

  return children
}