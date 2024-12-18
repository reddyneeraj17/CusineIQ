import { NextResponse } from 'next/server'
import { fetchData } from '@/lib/api/base'

export async function GET(
  request: Request,
  { params }: { params: { table: string } }
) {
  try {
    const data = await fetchData(params.table)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}