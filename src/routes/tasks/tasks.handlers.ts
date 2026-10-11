import type { AppRouteHandler } from '@/lib/types.js'

import { OK as STATUS_CODE_OK, CREATED as STATUS_CODE_CREATED } from '@/consts/http-status-codes.js'
import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'

import type { CreateRoute, ListRoute } from './tasks.routes.js'

const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks, STATUS_CODE_OK)
}

const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const [createdTask] = await db.insert(tasks).values(task).returning()
  return c.json(createdTask, STATUS_CODE_CREATED)
}

export { list, create }
