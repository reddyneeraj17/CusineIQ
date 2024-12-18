import { supabase } from '../supabase/client'
import type { Database } from '@/lib/types/database'

type Employee = Database['public']['Tables']['employees']['Row']
type NewEmployee = Database['public']['Tables']['employees']['Insert']

export async function getEmployees() {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function addEmployee(employee: NewEmployee) {
  const { data, error } = await supabase
    .from('employees')
    .insert([employee])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getEmployeeStats() {
  const { data: employees, error } = await supabase
    .from('employees')
    .select('salary')

  if (error) throw error

  const totalEmployees = employees.length
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const averageSalary = totalEmployees ? totalSalary / totalEmployees : 0

  return {
    totalEmployees,
    averageSalary,
    totalSalary
  }
}