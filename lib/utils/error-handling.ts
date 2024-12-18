import type { Toast } from '@/components/ui/use-toast'

export function handleSupabaseError(error: unknown, toast: Toast) {
  console.error('Database error:', error)
  
  let message = 'An unexpected error occurred'
  
  if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    message = error.message as string
  }
  
  toast({
    title: "Error",
    description: message,
    variant: "destructive"
  })
}