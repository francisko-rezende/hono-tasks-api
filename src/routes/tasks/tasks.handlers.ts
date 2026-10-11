import type { AppRouteHandler } from '@/lib/types.js'

import {
  OK as STATUS_CODE_OK,
  CREATED as STATUS_CODE_CREATED,
  NOT_FOUND as STATUS_CODE_NOT_FOUND,
} from '@/consts/http-status-codes.js'
import { NOT_FOUND as STATUS_PHRASE_NOT_FOUND } from '@/consts/http-status-phrases.js'
import { db } from '@/db/index.js'
import { tasks } from '@/db/schema.js'

import type { CreateRoute, GetOneRoute, ListRoute } from './tasks.routes.js'

const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks, STATUS_CODE_OK)
}

const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const [createdTask] = await db.insert(tasks).values(task).returning()
  return c.json(createdTask, STATUS_CODE_CREATED)
}

const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const task = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })

  if (!task) {
    return c.json({ message: STATUS_PHRASE_NOT_FOUND }, STATUS_CODE_NOT_FOUND)
  }

  return c.json(task, STATUS_CODE_OK)
}

export { list, create, getOne }
