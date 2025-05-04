import { createApp } from '@/lib/create-app'
import { configureOpenAPI } from '@/lib/configure-open-api'
import { indexRouter } from '@/routes/index.route'
import { tasksRouter } from '@/routes/tasks/tasks.index'

const app = createApp()

const routes = [indexRouter, tasksRouter]
configureOpenAPI(app)
routes.forEach((route) => {
  app.route('/', route)
})

export { app }
