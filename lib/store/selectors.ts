import { salesAtom, expensesAtom, employeesAtom, inventoryAtom } from './atoms'

export const selectSalesStats = (get: any) => {
  const sales = get(salesAtom)
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0)
  
  const categoryTotals = sales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount
    return acc
  }, {} as Record<string, number>)

  const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount }
    }
    return best
  }, { name: 'N/A', amount: 0 })

  return {
    totalSales,
    bestCategory,
    averageOrder: sales.length ? totalSales / sales.length : 0,
    categoryTotals
  }
}

export const selectExpenseStats = (get: any) => {
  const expenses = get(expensesAtom)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  }, {} as Record<string, number>)

  return { totalExpenses, categoryTotals }
}

export const selectEmployeeStats = (get: any) => {
  const employees = get(employeesAtom)
  const totalEmployees = employees.length
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const averageSalary = totalEmployees ? totalSalary / totalEmployees : 0

  return { totalEmployees, averageSalary, totalSalary }
}

export const selectLowStockItems = (get: any) => {
  const inventory = get(inventoryAtom)
  return inventory.filter(item => item.quantity <= item.min_quantity)
}