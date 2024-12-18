"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SALES_CATEGORIES } from '@/lib/constants/categories'
import { createSale, resetDailySales } from './actions'
import { supabase } from '@/lib/config/supabase'
import { STORAGE_KEY } from './constants'
import type { SalesState } from './types'

const initialState = {
  dailySales: resetDailySales(SALES_CATEGORIES),
  salesHistory: []
}

async function persistToSupabase(sales: any) {
  try {
    const { data, error } = await supabase
      .from('sales')
      .insert(sales)
    
    if (error) {
      console.error('Supabase insert error:', error)
      throw error
    }
    console.log('Successfully persisted to Supabase:', data)
    return data
  } catch (error) {
    console.error('Failed to persist to Supabase:', error)
    throw error
  }
}

export const useSalesStore = create<SalesState>()(
  persist(
    (set) => ({
      ...initialState,
      setDailySales: (category, amount) => 
        set((state) => ({
          dailySales: { ...state.dailySales, [category]: amount }
        })),
      resetSales: () => 
        set({ dailySales: initialState.dailySales }),
      submitSales: () =>
        set((state) => {
          const newSales = Object.entries(state.dailySales)
            .map(([category, amount]) => ({
              category,
              amount,
              date: new Date().toISOString()
            }))
          
          // Fire and forget persistence
          persistToSupabase(newSales).catch(error => {
            console.error('Failed to persist sales:', error)
          })
          
          return {
            salesHistory: [...newSales, ...state.salesHistory],
            dailySales: initialState.dailySales
          }
        })
    }),
    {
      name: STORAGE_KEY
    }
  )
)