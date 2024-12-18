export interface Database {
  public: {
    Tables: {
      sales: {
        Row: {
          id: number
          amount: number
          category: string
          date: string
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['sales']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['sales']['Row']>
      },
      expenses: {
        Row: {
          id: number
          amount: number
          category: string
          description: string
          date: string
          created_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['expenses']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['expenses']['Row']>
      }
    }
  }
}