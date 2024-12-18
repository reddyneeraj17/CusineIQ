"use client"

import { useState } from 'react'
import { useAtom } from 'jotai'
import { expensesAtom } from '@/lib/store/atoms'
import { supabase } from '@/lib/config/supabase'
import { useToast } from '@/components/ui/use-toast'
import type { Database } from '@/lib/types/database'

type NewExpense = Database['public']['Tables']['expenses']['Insert']

export function useExpenses() {
  const [loading, setLoading] = useState(false)
  const [expenses] = useAtom(expensesAtom)
  const { toast } = useToast()

  const addExpense = async (data: NewExpense) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from('expenses')
        .insert([data])

      if (error) throw error
      
      toast({
        title: "Success",
        description: "Expense added successfully"
      })
      return true
    } catch (error) {
      console.error('Error adding expense:', error)
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive"
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    expenses,
    addExpense,
    loading
  }
}