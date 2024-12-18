"use client"

import { useState } from "react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { useSchedule } from "@/lib/hooks/use-schedule"

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { shifts, loading } = useSchedule(date)

  return (
    <Card className="p-6">
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Card>
  )
}