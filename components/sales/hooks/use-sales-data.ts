"use client"

import { useState, useEffect } from 'react'
import { useSalesStore } from '@/lib/store/sales'
import { selectSalesHistory } from '@/lib/store/sales/selectors'
import { calculateSalesStats } from '@/lib/utils/sales'
import { filterSalesByDate } from '@/lib/utils/sales/filters'
import { INITIAL_STATS } from '@/lib/store/sales/constants'

export function useSalesData() {
  const salesHistory = useSalesStore(selectSalesHistory)
  const [stats, setStats] = useState(INITIAL_STATS)

  useEffect(() => {
    const todaySales = filterSalesByDate(salesHistory, new Date())
    setStats(calculateSalesStats(todaySales))
  }, [salesHistory])

  return { stats, salesHistory }
}