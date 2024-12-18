import { supabase } from '@/lib/config/supabase'

export async function testSupabaseConnection() {
  const results: string[] = []
  let success = false

  try {
    // Test 1: Basic Connection
    results.push('Testing basic connection...')
    
    const { data: versionData, error: versionError } = await supabase
      .from('expenses')
      .select('count(*)')
      .limit(0)

    if (versionError) {
      throw new Error(versionError.message)
    }
    results.push('✓ Basic connection successful')

    // Test 2: Read Operation
    results.push('Testing read operation...')
    
    const { data: readData, error: readError } = await supabase
      .from('expenses')
      .select('*')
      .limit(1)

    if (readError) {
      throw new Error(readError.message)
    }
    results.push(`✓ Read operation successful (${readData?.length || 0} records)`)

    // Test 3: Write Operation
    results.push('Testing write operation...')
    
    const testExpense = {
      amount: 1,
      category: 'Test',
      description: 'Connection test',
      date: new Date().toISOString()
    }

    const { data: writeData, error: writeError } = await supabase
      .from('expenses')
      .insert([testExpense])
      .select()

    if (writeError) {
      throw new Error(writeError.message)
    }
    results.push('✓ Write operation successful')

    // Test 4: Cleanup
    if (writeData?.[0]?.id) {
      results.push('Cleaning up test data...')
      
      const { error: deleteError } = await supabase
        .from('expenses')
        .delete()
        .eq('id', writeData[0].id)

      if (deleteError) {
        results.push(`⚠ Cleanup warning: ${deleteError.message}`)
      } else {
        results.push('✓ Cleanup successful')
      }
    }

    success = true
  } catch (error) {
    const message = error instanceof Error ? error.message : 
      typeof error === 'object' && error !== null && 'message' in error ? error.message :
      'Unknown error occurred'
    results.push(`❌ Test failed: ${message}`)
    console.error('Supabase test error:', error)
  }

  return {
    success,
    results: results.join('\n')
  }
}