"use client"

import { useAtom } from 'jotai'
import { salesAtom, expensesAtom, employeesAtom, inventoryAtom } from './atoms'
import { supabase } from '@/lib/config/supabase'
import { useToast } from '@/components/ui/use-toast'

export function useStore() {
  const [sales, setSales] = useAtom(salesAtom)
  const [expenses, setExpenses] = useAtom(expensesAtom)
  const [employees, setEmployees] = useAtom(employeesAtom)
  const [inventory, setInventory] = useAtom(inventoryAtom)
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      const [salesData, expensesData, employeesData, inventoryData] = await Promise.all([
        supabase.from('sales').select('*').order('created_at', { ascending: false }),
        supabase.from('expenses').select('*').order('created_at', { ascending: false }),
        supabase.from('employees').select('*').order('name'),
        supabase.from('inventory').select('*').order('name')
      ])

      setSales(salesData.data || [])
      setExpenses(expensesData.data || [])
      setEmployees(employeesData.data || [])
      setInventory(inventoryData.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      })
    }
  }

  return {
    sales,
    expenses,
    employees,
    inventory,
    fetchData
  }
}