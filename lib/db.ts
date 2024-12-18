// Remove Prisma client initialization from here since we're using better-sqlite3
import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'prisma/dev.db'), {
  verbose: process.env.NODE_ENV === 'development' ? console.log : undefined,
  fileMustExist: false,
});

// Enable foreign keys support
db.pragma('foreign_keys = ON');

export { db };