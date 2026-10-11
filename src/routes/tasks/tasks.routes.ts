import { createRoute, z } from '@hono/zod-openapi'

import {
  OK as STATUS_CODE_OK,
  CREATED as STATUS_CODE_CREATED,
  UNPROCESSABLE_ENTITY as STATUS_CODE_UNPROCESSABLE_ENTITY,
  NOT_FOUND as STATUS_CODE_NOT_FOUND,
} from '@/consts/http-status-codes.js'
import { insertTasksSchema, selectTasksSchema } from '@/db/schema.js'
import { createErrorSchema } from '@/helpers/create-error-schema.js'
import { IdParamsSchema } from '@/helpers/id-params-schema.js'
import { jsonContentRequired } from '@/helpers/json-content-required.js'
import { jsonContent } from '@/helpers/json-content.js'
import { notFoundSchema } from '@/lib/constants.js'

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
    [STATUS_CODE_UNPROCESSABLE_ENTITY]: jsonContent({
      schema: createErrorSchema(insertTasksSchema),
      description: 'The validation errors',
    }),
  },
})

export type CreateRoute = typeof create

export const getOne = createRoute({
  tags,
  path: '/tasks/{id}',
  method: 'get',
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        param: {
          name: 'id',
          in: 'path',
          required: true,
        },
        required: ['id'],
        example: 42,
      }),
    }),
  },
  responses: {
    [STATUS_CODE_OK]: jsonContent({
      schema: selectTasksSchema,
      description: 'The task',
    }),
    [STATUS_CODE_UNPROCESSABLE_ENTITY]: jsonContent({
      schema: createErrorSchema(IdParamsSchema),
      description: 'Invalid ID error',
    }),

    [STATUS_CODE_NOT_FOUND]: jsonContent({ schema: notFoundSchema, description: 'Task not found' }),
  },
})

export type GetOneRoute = typeof getOne
