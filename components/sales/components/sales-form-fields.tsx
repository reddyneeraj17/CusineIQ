"use client"

import { Input } from "@/components/ui/input"

interface SalesFormFieldsProps {
  categories: readonly string[]
  values: Record<string, number>
  onChange: (category: string, amount: number) => void
}

export function SalesFormFields({ categories, values, onChange }: SalesFormFieldsProps) {
  return (
    <>
      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <label className="text-sm font-medium">{category}</label>
          <Input
            type="number"
            value={values[category] || 0}
            onChange={(e) => onChange(category, Number(e.target.value))}
            placeholder={`Enter ${category} sales`}
            min="0"
            step="0.01"
          />
        </div>
      ))}
    </>
  )
}