"use client"

import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { salesAtom, expensesAtom, employeesAtom, inventoryAtom } from '@/lib/store/atoms'
import { useToast } from '@/components/ui/use-toast'

export function useData() {
  const [sales, setSales] = useAtom(salesAtom)
  const [expenses, setExpenses] = useAtom(expensesAtom)
  const [employees, setEmployees] = useAtom(employeesAtom)
  const [inventory, setInventory] = useAtom(inventoryAtom)
  const { toast } = useToast()

  const addSale = useCallback((sale) => {
    setSales(prev => [...prev, { ...sale, id: Date.now(), date: new Date().toISOString() }])
  }, [setSales])

  const addExpense = useCallback((expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now(), date: new Date().toISOString() }])
  }, [setExpenses])

  const addEmployee = useCallback((employee) => {
    setEmployees(prev => [...prev, { ...employee, id: Date.now(), joinDate: new Date().toISOString() }])
  }, [setEmployees])

  const addInventoryItem = useCallback((item) => {
    setInventory(prev => [...prev, { ...item, id: Date.now() }])
  }, [setInventory])

  return {
    sales,
    expenses,
    employees,
    inventory,
    addSale,
    addExpense,
    addEmployee,
    addInventoryItem
  }
}