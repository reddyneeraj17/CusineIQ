"use client"

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { supabase } from '@/lib/config/supabase'
import { useToast } from '@/components/ui/use-toast'
import { salesAtom, expensesAtom, employeesAtom, inventoryAtom } from '@/lib/store/atoms'
import { handleSupabaseError } from '@/lib/utils/error-handling'
import { SUPABASE_TABLES, DATABASE_CONFIG } from '@/lib/config/constants'

export function useSupabaseData() {
  const setSales = useSetAtom(salesAtom)
  const setExpenses = useSetAtom(expensesAtom)
  const setEmployees = useSetAtom(employeesAtom)
  const setInventory = useSetAtom(inventoryAtom)
  const { toast } = useToast()

  useEffect(() => {
    let mounted = true

    async function fetchInitialData() {
      try {
        const results = await Promise.all(
          SUPABASE_TABLES.map(table => {
            const config = DATABASE_CONFIG.orderBy[table]
            return supabase
              .from(table)
              .select('*')
              .order(config.column, { ascending: config.ascending })
          })
        )

        if (!mounted) return

        const [salesRes, expensesRes, employeesRes, inventoryRes] = results

        // Handle errors
        results.forEach((result, index) => {
          if (result.error) {
            throw new Error(`Error fetching ${SUPABASE_TABLES[index]}: ${result.error.message}`)
          }
        })

        setSales(salesRes.data || [])
        setExpenses(expensesRes.data || [])
        setEmployees(employeesRes.data || [])
        setInventory(inventoryRes.data || [])
      } catch (error) {
        handleSupabaseError(error, toast)
      }
    }

    fetchInitialData()

    // Set up real-time subscriptions
    const channels = SUPABASE_TABLES.map(table => 
      supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => fetchInitialData()
        )
        .subscribe()
    )

    return () => {
      mounted = false
      channels.forEach(channel => supabase.removeChannel(channel))
    }
  }, [setSales, setExpenses, setEmployees, setInventory, toast])
}