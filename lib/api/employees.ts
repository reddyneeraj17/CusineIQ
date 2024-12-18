import { db } from '@/lib/db';
import { EmployeeData } from '@/lib/types';

export async function getEmployees(): Promise<EmployeeData[]> {
  const query = `
    SELECT * FROM employees
    ORDER BY name ASC
  `;
  
  return db.prepare(query).all();
}

export async function getEmployeeStats() {
  const totalQuery = `SELECT COUNT(*) as count FROM employees`;
  const salaryQuery = `SELECT AVG(salary) as avg FROM employees`;
  const activeShiftsQuery = `
    SELECT COUNT(*) as count FROM shifts 
    WHERE start_time <= datetime('now') 
    AND end_time >= datetime('now')
  `;

  const total = db.prepare(totalQuery).get();
  const salary = db.prepare(salaryQuery).get();
  const active = db.prepare(activeShiftsQuery).get();

  return {
    totalEmployees: total.count,
    averageSalary: salary.avg || 0,
    activeShifts: active.count,
  };
}