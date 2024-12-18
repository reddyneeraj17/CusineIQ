import { db } from '@/lib/db';
import type { InventoryItem } from '@/lib/types/inventory';

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const query = `
    SELECT * FROM inventory
    ORDER BY name ASC
  `;
  
  return db.prepare(query).all();
}