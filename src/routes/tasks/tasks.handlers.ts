import type { AppRouterHandler } from '@/lib/types'
import type { CreateTaskRoute, ListTasksRoute } from './tasks.routes'
import { db } from '@/db'
import { tasksTable } from '@/db/schema'
import { desc } from 'drizzle-orm'

const list: AppRouterHandler<ListTasksRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany({
    orderBy: desc(tasksTable.updatedAt),
  })
  return c.json(tasks)
}

const create: AppRouterHandler<CreateTaskRoute> = async (c) => {
  const incomingTask = c.req.valid('json')
  const [createdTask] = await db
    .insert(tasksTable)
    .values(incomingTask)
    .returning()

  return c.json(createdTask)
}

export const tasksHandlers = {
  list,
  create,
}
