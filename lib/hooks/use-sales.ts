"use client"

import { useAtom } from 'jotai'
import { salesAtom, salesStatsAtom } from '@/lib/store/atoms'
import { supabase } from '@/lib/config/supabase'
import { useToast } from '@/components/ui/use-toast'
import type { Database } from '@/lib/types/database'

type NewSale = Database['public']['Tables']['sales']['Insert']

export function useSales() {
  const [sales] = useAtom(salesAtom)
  const [stats] = useAtom(salesStatsAtom)
  const { toast } = useToast()

  const addSale = async (sale: NewSale) => {
    try {
      const { error } = await supabase.from('sales').insert([sale])
      if (error) throw error

      toast({
        title: "Success",
        description: "Sale recorded successfully"
      })
    } catch (error) {
      console.error('Error adding sale:', error)
      toast({
        title: "Error",
        description: "Failed to record sale",
        variant: "destructive"
      })
      throw error
    }
  }

  return {
    sales,
    stats,
    addSale
  }
}