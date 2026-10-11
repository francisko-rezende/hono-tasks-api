import { boolean, pgTable, timestamp, serial, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { toZodV4SchemaTyped } from '@/lib/zod-utils.js'

export const tasks = pgTable('tasks', {
  id: serial().primaryKey(),
  name: text().notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const selectTasksSchema = toZodV4SchemaTyped(createSelectSchema(tasks))

export const insertTasksSchema = toZodV4SchemaTyped(
  createInsertSchema(tasks, {
    name: (field) => field.min(1).max(500),
  })
    .required({ done: true })
    .omit({ id: true, createdAt: true, updatedAt: true }),
)

// @ts-expect-error partial exists on zod v4 type
export const patchTasksSchema = insertTasksSchema.partial()
