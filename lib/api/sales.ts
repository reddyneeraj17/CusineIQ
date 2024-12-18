"use client"

import { supabase } from '@/lib/config/supabase'
import type { Database } from '@/lib/types/database'

type Sale = Database['public']['Tables']['sales']['Row']
type NewSale = Database['public']['Tables']['sales']['Insert']

export async function getSales() {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('sales')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching sales:', error)
    throw error
  }
}

export async function addSale(sale: NewSale) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }

    const { data, error } = await supabase
      .from('sales')
      .insert([sale])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error('This sale has already been recorded')
      }
      throw error
    }
    
    return data || null
  } catch (error) {
    console.error('Error adding sale:', error)
    throw error
  }
}

export async function addBulkSales(sales: NewSale[]) {
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized')
    }
    
    if (!sales.length) {
      throw new Error('No sales data provided')
    }

    const { data, error } = await supabase
      .from('sales')
      .insert(sales)
      .select()

    if (error) {
      if (error.code === '23505') {
        throw new Error('Some sales have already been recorded')
      }
      throw error
    }
    
    return data || []
  } catch (error) {
    console.error('Error adding bulk sales:', error)
    throw error
  }
}