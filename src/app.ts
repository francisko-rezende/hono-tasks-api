import { createApp } from '@/lib/create-app.js'
import { notFound } from '@/middlewares/not-found.js'
import { onError } from '@/middlewares/on-error.js'

import { configureOpenApi } from './lib/configure-open-api.js'

const app = createApp()

configureOpenApi(app)

app.notFound(notFound)
app.onError(onError)

export { app }
