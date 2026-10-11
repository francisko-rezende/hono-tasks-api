import type { AppRouteHandler } from '@/lib/types.js'

import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'

import type { CreateRoute, ListRoute } from './tasks.routes.js'

const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const [createdTask] = await db.insert(tasks).values(task).returning()
  return c.json(createdTask)
}

export { list, create }
