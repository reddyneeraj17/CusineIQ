"use client"

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { addEmployee } from '@/lib/db/employees'
import type { Employee } from '@/lib/types'

export function useEmployees() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const createEmployee = async (employeeData: Omit<Employee, 'id' | 'join_date'>) => {
    try {
      setLoading(true)
      await addEmployee(employeeData)
      toast({
        title: "Success",
        description: "Employee added successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createEmployee, loading }
}