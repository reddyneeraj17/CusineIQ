"use client"

import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { SupabaseProvider } from './supabase-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseProvider>
        {children}
        <Toaster />
      </SupabaseProvider>
    </ThemeProvider>
  )
}