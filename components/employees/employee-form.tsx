"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { EMPLOYEE_ROLES } from "@/lib/constants/categories"
import { useEmployees } from "@/lib/hooks/use-employees"

const roleOptions = EMPLOYEE_ROLES.map(role => ({
  value: role,
  label: role
}))

export function EmployeeForm() {
  const { createEmployee, loading } = useEmployees()
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createEmployee({
      name: formData.name,
      role: formData.role,
      salary: Number(formData.salary)
    })
    setFormData({ name: "", role: "", salary: "" })
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Add Employee</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter employee name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select
            value={formData.role}
            onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
            options={roleOptions}
            placeholder="Select role"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Salary</label>
          <Input
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
            placeholder="Enter monthly salary"
          />
        </div>
        <Button className="w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </Card>
  )
}