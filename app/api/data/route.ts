import { NextResponse } from 'next/server'
import { fetchInitialData } from '@/lib/api/queries'

export async function GET() {
  try {
    const data = await fetchInitialData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}