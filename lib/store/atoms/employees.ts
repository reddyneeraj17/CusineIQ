"use client"

import { atom } from 'jotai'
import type { Database } from '@/lib/types/database'

type Employee = Database['public']['Tables']['employees']['Row']

export const employeesAtom = atom<Employee[]>([])
export const employeesLoadingAtom = atom(true)

export const employeeStatsAtom = atom((get) => {
  const employees = get(employeesAtom)
  const totalEmployees = employees.length
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const averageSalary = totalEmployees ? totalSalary / totalEmployees : 0

  return { totalEmployees, averageSalary, totalSalary }
})