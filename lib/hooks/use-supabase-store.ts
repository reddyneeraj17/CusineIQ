"use client"

import { create } from 'zustand'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/database'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

interface SupabaseStore {
  data: {
    [K in TableName]: Tables[K]['Row'][]
  }
  setTableData: <T extends TableName>(table: T, data: Tables[T]['Row'][]) => void
  fetchTableData: (table: TableName) => Promise<void>
}

export const useSupabaseStore = create<SupabaseStore>((set) => ({
  data: {
    sales: [],
    expenses: [],
    employees: [],
    inventory: []
  },
  setTableData: (table, data) => 
    set((state) => ({
      data: { ...state.data, [table]: data }
    })),
  fetchTableData: async (table) => {
    const { data } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      set((state) => ({
        data: { ...state.data, [table]: data }
      }))
    }
  }
}))