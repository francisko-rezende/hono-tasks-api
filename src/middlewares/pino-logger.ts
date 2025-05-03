import { pinoLogger as logger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
  const isProduction = process.env.NODE_ENV === 'production'

  return logger({
    pino: pino(isProduction ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
