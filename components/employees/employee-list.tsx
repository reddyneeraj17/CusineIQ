"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { format } from "date-fns"

const employees = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Chef",
    salary: 45000,
    joinDate: new Date("2023-01-15"),
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "Server",
    salary: 25000,
    joinDate: new Date("2023-03-20"),
    status: "Active"
  },
  // Add more sample data
]

export function EmployeeList() {
  return (
    <Card>
      <div className="flex justify-between items-center p-6">
        <h3 className="text-lg font-medium">Employees</h3>
        <Button>Add Employee</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>{formatCurrency(employee.salary)}</TableCell>
              <TableCell>{format(employee.joinDate, "MMM d, yyyy")}</TableCell>
              <TableCell>{employee.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}