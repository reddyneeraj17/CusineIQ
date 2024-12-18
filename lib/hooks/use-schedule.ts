"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { getShifts, createShift as createShiftApi } from "@/lib/api/schedule"
import type { Shift, ShiftFormData } from "@/lib/types"

export function useSchedule(date?: Date) {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchShifts() {
      try {
        setLoading(true)
        const data = await getShifts(date)
        setShifts(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch shifts",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchShifts()
  }, [date, toast])

  const createShift = async (data: ShiftFormData) => {
    try {
      const newShift = await createShiftApi(data)
      setShifts([...shifts, newShift])
      toast({
        title: "Success",
        description: "Shift created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shift",
        variant: "destructive",
      })
      throw error
    }
  }

  return {
    shifts,
    loading,
    createShift,
  }
}