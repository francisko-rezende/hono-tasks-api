import { createRouter } from '@/lib/create-app'
import { tasksRoutes } from '@/routes/tasks/tasks.routes'
import { tasksHandlers } from '@/routes/tasks/tasks.handlers'

export const tasksRouter = createRouter().openapi(
  tasksRoutes.list,
  tasksHandlers.list,
)
