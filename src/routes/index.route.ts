import { createRoute, z } from '@hono/zod-openapi'

import jsonContent from '@/helpers/json-content.js'
import { createRouter } from '@/lib/create-app.js'

const index = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: jsonContent(
        z.object({
          message: z.string(),
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
