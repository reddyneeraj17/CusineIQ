"use client"

import { atom } from 'jotai'
import type { Database } from '@/lib/types/database'

type InventoryItem = Database['public']['Tables']['inventory']['Row']

export const inventoryAtom = atom<InventoryItem[]>([])
export const inventoryLoadingAtom = atom(true)

export const lowStockItemsAtom = atom((get) => {
  const inventory = get(inventoryAtom)
  return inventory.filter(item => item.quantity <= item.min_quantity)
})