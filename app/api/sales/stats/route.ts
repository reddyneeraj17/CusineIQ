import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ 
    totalSales: 0,
    bestCategory: { name: 'N/A', amount: 0 },
    averageOrder: 0
  })
}