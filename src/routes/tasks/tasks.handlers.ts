import type { AppRouterHandler } from '@/lib/types'
import type { ListTasksRoute } from './tasks.routes'
import { db } from '@/db'

const list: AppRouterHandler<ListTasksRoute> = async (c) => {
  const tasks = await db.query.tasksTable.findMany()
  return c.json(tasks)
}

export const tasksHandlers = {
  list,
}
