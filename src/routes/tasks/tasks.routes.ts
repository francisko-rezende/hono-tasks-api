import { createRoute, z } from '@hono/zod-openapi'

import { OK as STATUS_CODE_OK, CREATED as STATUS_CODE_CREATED } from '@/consts/http-status-codes.js'
import { insertTasksSchema, selectTasksSchema } from '@/db/schema.js'
import { jsonContentRequired } from '@/helpers/json-content-required.js'
import { jsonContent } from '@/helpers/json-content.js'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [STATUS_CODE_OK]: jsonContent({
      schema: z.array(selectTasksSchema),
      description: 'The list of tasks',
    }),
  },
})

export type ListRoute = typeof list

export const create = createRoute({
  tags,
  path: '/tasks',
  method: 'post',
  request: {
    body: jsonContentRequired({ schema: insertTasksSchema, description: 'The task to create' }),
  },
  responses: {
    [STATUS_CODE_CREATED]: jsonContent({
      schema: selectTasksSchema,
      description: 'The created tasks',
    }),
  },
})

export type CreateRoute = typeof create
