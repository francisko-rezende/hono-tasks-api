import { sql } from 'drizzle-orm'
import { pgTable, varchar, uuid, boolean, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const tasksTable = pgTable('tasks', {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  done: boolean().notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`),
})

export const selectTasksSchema = createSelectSchema(tasksTable)

export const insertTasksSchema = createInsertSchema(tasksTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})
