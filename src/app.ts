import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound } from './middleware/not-found.js'
import onError from './middleware/on-error.js'

export const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/error', (c) => {
  throw new Error('errou!')
})

app.notFound(notFound)
app.onError(onError)
