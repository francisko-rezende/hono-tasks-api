import { insertTasksSchema, selectTasksSchema } from '@/db/schema'
import { httpStatusCodes } from '@/http-status-codes'
import { jsonContent } from '@/lib/open-api/helpers/json-content'
import { jsonContentRequired } from '@/lib/open-api/helpers/json-content-required'
import { createRoute, z } from '@hono/zod-openapi'

const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags: ['Tasks'],
  responses: {
    [httpStatusCodes.OK]: jsonContent({
      schema: z.array(selectTasksSchema),
      description: 'The list of tasks',
    }),
  },
})

export type ListTasksRoute = typeof list

const create = createRoute({
  path: '/tasks',
  method: 'post',
  tags: ['Tasks'],
  request: {
    body: jsonContentRequired({
      schema: insertTasksSchema,
      description: 'Task to create',
    }),
  },
  responses: {
    [httpStatusCodes.OK]: jsonContent({
      schema: selectTasksSchema,
      description: 'The created task',
    }),
  },
})

export type CreateTaskRoute = typeof create

export const tasksRoutes = {
  list,
  create,
}
