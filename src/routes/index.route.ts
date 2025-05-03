import { httpStatusCodes } from '@/http-status-codes'
import { createRouter } from '@/lib/create-app'
import jsonContent from '@/lib/open-api/helpers/json-content'
import { createRoute, z } from '@hono/zod-openapi'

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      [httpStatusCodes.OK]: jsonContent({
        schema: z.object({ message: z.string() }),
        description: 'Tasks API index',
      }),
    },
  }),
  (c) => {
    return c.json(
      {
        message: 'Tasks API',
      },
      httpStatusCodes.OK,
    )
  },
)

export { router }
