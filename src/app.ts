import { createApp } from '@/lib/create-app.js'
import { notFound } from '@/middlewares/not-found.js'
import { onError } from '@/middlewares/on-error.js'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.info('wow, log here')
})

app.notFound(notFound)
app.onError(onError)

export { app }
