import { createRoute, z } from '@hono/zod-openapi'

import { OK as STATUS_CODE_OK } from '@/consts/http-status-codes.js'
import jsonContent from '@/helpers/json-content.js'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  path: '/tasks',
  method: 'get',
  responses: {
    [STATUS_CODE_OK]: jsonContent({
      schema: z.array(
        z.object({
          name: z.string(),
          done: z.boolean(),
        }),
      ),
      description: 'The list of tasks',
    }),
  },
})

export type ListRoute = typeof list
