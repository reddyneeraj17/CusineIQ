export interface Employee {
  id: number
  name: string
  role: string
  salary: number
  joinDate: Date
}

export interface EmployeeStats {
  totalEmployees: number
  averageSalary: number
  activeShifts: number
}