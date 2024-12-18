import { fetchData } from './base'
import type { Sale, Expense, Employee, InventoryItem } from '@/lib/types'

export async function fetchAllData() {
  const [sales, expenses, employees, inventory] = await Promise.all([
    fetchData<Sale>('sales', { orderBy: { column: 'created_at', ascending: false } }),
    fetchData<Expense>('expenses', { orderBy: { column: 'created_at', ascending: false } }),
    fetchData<Employee>('employees', { orderBy: { column: 'name' } }),
    fetchData<InventoryItem>('inventory', { orderBy: { column: 'name' } })
  ])

  return { sales, expenses, employees, inventory }
}