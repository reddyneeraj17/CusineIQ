export interface Shift {
  id: number
  startTime: Date
  endTime: Date
  employee: {
    id: number
    name: string
    role: string
  }
}

export interface ShiftFormData {
  startTime: Date
  endTime: Date
  employeeId: number
}