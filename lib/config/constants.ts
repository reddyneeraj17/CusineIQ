export const SUPABASE_TABLES = ['sales', 'expenses', 'employees', 'inventory'] as const

export const DATABASE_CONFIG = {
  orderBy: {
    sales: { column: 'created_at', ascending: false },
    expenses: { column: 'created_at', ascending: false },
    employees: { column: 'name', ascending: true },
    inventory: { column: 'name', ascending: true }
  }
} as const