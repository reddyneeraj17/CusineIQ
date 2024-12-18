"use client"

import { useEffect, useCallback } from 'react'
import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type TableName = keyof Database['public']['Tables']

export interface UseRealtimeSubscriptionProps {
  table: TableName
  onUpdate?: () => void
  events?: ('INSERT' | 'UPDATE' | 'DELETE')[]
}

export function useRealtimeSubscription({
  table, 
  onUpdate,
  events = ['INSERT', 'UPDATE', 'DELETE']
}: UseRealtimeSubscriptionProps) {
  useEffect(() => {
    if (!table || !onUpdate) return

    let mounted = true
    let channel: ReturnType<typeof supabase.channel>

    try {
      channel = supabase
        .channel(`public:${table}:${Date.now()}`)
        .on(
          'postgres_changes',
          { 
            event: events, 
            schema: 'public', 
            table
          },
          (payload) => {
            if (mounted) {
              onUpdate()
            }
          }
        )
        .subscribe()

      return () => {
        mounted = false
        if (channel) {
          supabase.removeChannel(channel)
        }
      }
    } catch (error) {
      console.error(`Error setting up subscription for ${table}:`, error)
    }
  }, [table, onUpdate, events])
}