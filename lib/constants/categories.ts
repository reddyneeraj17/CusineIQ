export const SALES_CATEGORIES = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Specials"
] as const

export const EXPENSE_CATEGORIES = [
  "Ingredients",
  "Utilities",
  "Salary",
  "Maintenance",
  "Marketing",
  "Other"
] as const

export const EMPLOYEE_ROLES = [
  "Manager",
  "Chef",
  "Server",
  "Bartender",
  "Host",
  "Kitchen Staff"
] as const

export type SalesCategory = typeof SALES_CATEGORIES[number]
export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number]
export type EmployeeRole = typeof EMPLOYEE_ROLES[number]