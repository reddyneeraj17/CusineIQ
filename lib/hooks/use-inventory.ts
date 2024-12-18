"use client"

import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { addInventoryItem, updateInventoryItem } from '@/lib/db/inventory'
import type { InventoryItem } from '@/lib/types'

export function useInventory() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const createItem = async (itemData: Omit<InventoryItem, 'id'>) => {
    try {
      setLoading(true)
      await addInventoryItem(itemData)
      toast({
        title: "Success",
        description: "Inventory item added successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add inventory item",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (id: number, updates: Partial<InventoryItem>) => {
    try {
      setLoading(true)
      await updateInventoryItem(id, updates)
      toast({
        title: "Success",
        description: "Inventory item updated successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update inventory item",
        variant: "destructive"
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { createItem, updateItem, loading }
}