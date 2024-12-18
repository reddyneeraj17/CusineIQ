import { EmployeeList } from "@/components/employees/employee-list"
import { EmployeeForm } from "@/components/employees/employee-form"
import { EmployeeStats } from "@/components/employees/employee-stats"

export default function EmployeesPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Employees</h2>
      <EmployeeStats />
      <div className="grid gap-6 md:grid-cols-2">
        <EmployeeList />
        <EmployeeForm />
      </div>
    </div>
  )
}