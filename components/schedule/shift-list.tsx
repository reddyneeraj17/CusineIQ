"use client"

import { Card } from "@/components/ui/card"
import { useSchedule } from "@/lib/hooks/use-schedule"
import { format } from "date-fns"

export function ShiftList() {
  const { shifts, loading } = useSchedule()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Today's Shifts</h3>
      <div className="space-y-4">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div>
              <p className="font-medium">{shift.employee.name}</p>
              <p className="text-sm text-muted-foreground">{shift.employee.role}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {format(new Date(shift.startTime), "HH:mm")} -{" "}
                {format(new Date(shift.endTime), "HH:mm")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}