import { createApp } from '@/lib/create-app'
import { configureOpenAPI } from '@/lib/configure-open-api'

const app = createApp()
configureOpenAPI(app)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  c.status(422)
  c.var.logger.debug('degug')
  throw new Error('errou!')
})

export { app }
