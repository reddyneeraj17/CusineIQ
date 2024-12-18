"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { testSupabaseConnection } from "@/lib/api/supabase-test"

export function SupabaseTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    try {
      const { success, results } = await testSupabaseConnection()
      setTestResult(results)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      setTestResult(`❌ Test failed: ${message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-medium mb-4">Supabase Connection Test</h3>
      <div className="space-y-4">
        <Button 
          onClick={testConnection} 
          disabled={loading}
        >
          {loading ? "Testing..." : "Test Connection"}
        </Button>
        {testResult && (
          <div className="mt-4 space-y-1">
            {testResult.split('\n').map((line, index) => (
              <p
                key={index}
                className={`text-sm font-mono ${
                  line.includes('❌') ? 'text-red-600' :
                  line.includes('⚠') ? 'text-yellow-600' :
                  line.includes('✓') ? 'text-green-600' :
                  'text-gray-600'
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}