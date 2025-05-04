import { httpStatusCodes } from '@/http-status-codes'
import jsonContent from '@/lib/open-api/helpers/json-content'
import { createRoute, z } from '@hono/zod-openapi'

const list = createRoute({
  path: '/tasks',
  method: 'get',
  tags: ['Tasks'],
  responses: {
    [httpStatusCodes.OK]: jsonContent({
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

export type ListTasksRoute = typeof list

export const tasksRoutes = {
  list,
}
