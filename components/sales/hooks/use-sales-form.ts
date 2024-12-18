"use client"

import { useState } from 'react'
import { useSalesStore } from '@/lib/store/sales'
import { selectDailySales } from '@/lib/store/sales/selectors'
import { useToast } from '@/components/ui/use-toast'

export function useSalesForm() {
  const dailySales = useSalesStore(selectDailySales)
  const { setDailySales, submitSales } = useSalesStore()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitSales()
      toast({
        title: "Success",
        description: "Sales data recorded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record sales data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    dailySales,
    setDailySales,
    loading,
    handleSubmit
  }
}