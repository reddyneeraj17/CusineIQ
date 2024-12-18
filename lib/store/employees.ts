import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EmployeeRole } from '@/lib/constants/categories'

interface Employee {
  id: number
  name: string
  role: EmployeeRole
  salary: number
  joinDate: string
}

interface EmployeeState {
  employees: Employee[]
  addEmployee: (employee: Omit<Employee, 'id' | 'joinDate'>) => void
}

export const useEmployeeStore = create<EmployeeState>()(
  persist(
    (set) => ({
      employees: [],
      addEmployee: (employee) => 
        set((state) => ({
          employees: [
            {
              ...employee,
              id: Date.now(),
              joinDate: new Date().toISOString()
            },
            ...state.employees
          ]
        }))
    }),
    {
      name: 'employee-storage'
    }
  )
)