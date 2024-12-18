import { db } from '@/lib/db';
import type { Shift, ShiftFormData } from '@/lib/types/schedule';

export async function getShifts(date?: Date): Promise<Shift[]> {
  const query = date
    ? `
      SELECT s.*, e.name as employee_name, e.role as employee_role
      FROM shifts s
      JOIN employees e ON s.employee_id = e.id
      WHERE DATE(s.start_time) = DATE(?)
      ORDER BY s.start_time ASC
    `
    : `
      SELECT s.*, e.name as employee_name, e.role as employee_role
      FROM shifts s
      JOIN employees e ON s.employee_id = e.id
      ORDER BY s.start_time ASC
    `;

  const params = date ? [date.toISOString()] : [];
  return db.prepare(query).all(...params);
}

export async function createShift(data: ShiftFormData): Promise<Shift> {
  const insert = db.prepare(`
    INSERT INTO shifts (start_time, end_time, employee_id)
    VALUES (?, ?, ?)
  `);

  const result = insert.run(
    data.startTime.toISOString(),
    data.endTime.toISOString(),
    data.employeeId
  );

  return getShifts().then(shifts => 
    shifts.find(shift => shift.id === result.lastInsertRowid)!
  );
}