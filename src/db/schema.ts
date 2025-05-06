import { sql } from 'drizzle-orm'
import { pgTable, varchar, uuid, boolean, timestamp } from 'drizzle-orm/pg-core'

export const tasksTable = pgTable('tasks', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  done: boolean().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
})
