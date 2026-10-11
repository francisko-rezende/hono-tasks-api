import { configureOpenApi } from '@/lib/configure-open-api.js'
import { createApp } from '@/lib/create-app.js'
import { notFound } from '@/middlewares/not-found.js'
import { onError } from '@/middlewares/on-error.js'
import { index } from '@/routes/index.route.js'

const app = createApp()

const routes = [index]

configureOpenApi(app)

routes.forEach((route) => {
  app.route('/', route)
})

app.notFound(notFound)
app.onError(onError)

export { app }
