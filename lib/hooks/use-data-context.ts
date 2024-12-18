"use client"

import { createContext, useContext } from 'react'
import type { Sale, Expense, Employee, InventoryItem } from '@/lib/types'

interface DataContextType {
  sales: Sale[]
  expenses: Expense[]
  employees: Employee[]
  inventory: InventoryItem[]
  loading: boolean
}

export const DataContext = createContext<DataContextType>({
  sales: [],
  expenses: [],
  employees: [],
  inventory: [],
  loading: true
})

export const useData = () => useContext(DataContext)