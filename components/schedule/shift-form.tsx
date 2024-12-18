"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEmployees } from "@/lib/hooks/use-employees"
import { useSchedule } from "@/lib/hooks/use-schedule"

export function ShiftForm() {
  const [loading, setLoading] = useState(false)
  const { employees } = useEmployees()
  const { createShift } = useSchedule()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation
  }

  return (
    <Card className="p-6 mt-6">
      <h3 className="text-lg font-medium mb-4">Add Shift</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Employee</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={String(employee.id)}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Start Time</label>
            <Input type="time" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">End Time</label>
            <Input type="time" />
          </div>
        </div>
        <Button className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Shift"}
        </Button>
      </form>
    </Card>
  )
}