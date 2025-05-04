import { httpStatusCodes } from '@/http-status-codes'
import { createRouter } from '@/lib/create-app'
import jsonContent from '@/lib/open-api/helpers/json-content'
import { createMessageObjectSchema } from '@/lib/open-api/schemas/create-message-object-schema'
import { createRoute } from '@hono/zod-openapi'

const indexRouter = createRouter().openapi(
  createRoute({
    method: 'get',
    tags: ['Index'],
    path: '/',
    responses: {
      [httpStatusCodes.OK]: jsonContent({
        schema: createMessageObjectSchema({ exampleMessage: 'Tasks API' }),
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

export { indexRouter }
