import { createRoute, z } from '@hono/zod-openapi'

import { OK as STATUS_CODE_OK } from '@/consts/http-status-codes.js'
import jsonContent from '@/helpers/json-content.js'
import { createRouter } from '@/lib/create-app.js'

const index = createRouter().openapi(
  createRoute({
    tags: ['Index'],
    method: 'get',
    path: '/',
    responses: {
      [STATUS_CODE_OK]: jsonContent(
        z
          .object({
            message: z.string(),
          })
          .openapi({
            example: {
              message: 'Tasks API',
            },
          }),
        'Tasks API index',
      ),
    },
  }),
  (c) => {
    return c.json({ message: 'Tasks API' })
  },
)

export { index }
