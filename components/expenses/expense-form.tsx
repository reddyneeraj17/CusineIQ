"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addExpense } from "@/lib/api/expenses"
import { EXPENSE_CATEGORIES } from "@/lib/constants/categories"
import { useToast } from "@/components/ui/use-toast"

export function ExpenseForm() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    setLoading(true)
    try {
      const expense = {
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description || "",
        date: new Date().toISOString()
      }
      
      const result = await addExpense(expense)
      
      if (!result) {
        throw new Error('Failed to add expense')
      }

      toast({
        title: "Success",
        description: "Expense added successfully"
      })

      setFormData({ amount: "", category: "", description: "" })
      // Realtime subscription will handle the update
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred'
      console.error('Error adding expense:', message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Add Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="Enter amount"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            required
          >
            <option value="">Select category</option>
            {EXPENSE_CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            placeholder="Enter description (optional)"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || !formData.amount || !formData.category}
        >
          {loading ? "Adding..." : "Add Expense"}
        </Button>
      </form>
    </Card>
  )
}