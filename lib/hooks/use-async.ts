"use client"

import { useState, useCallback } from 'react'
import { useToast } from '@/components/ui/use-toast'

interface UseAsyncOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncOptions = {}
) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      const result = await asyncFn()
      options.onSuccess?.()
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      options.onError?.(error as Error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [asyncFn, options, toast])

  return {
    loading,
    execute
  }
}