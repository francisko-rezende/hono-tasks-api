import type { AppOpenAPI } from './types.js'
import packageJSON from '../../package.json'
import { Scalar } from '@scalar/hono-api-reference'

export function configureOpenAPI(app: AppOpenAPI) {
  const docURL = '/doc'
  app.doc(docURL, {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
    },
  })

  app.get(
    '/scalar',
    Scalar({
      layout: 'classic',
      defaultHttpClient: { targetKey: 'js', clientKey: 'fetch' },
      theme: 'purple',
      url: docURL,
    }),
  )
}
