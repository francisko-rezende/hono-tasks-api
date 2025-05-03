import { pinoLogger as logger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
  const isProduction = process.env.NODE_ENV === 'production'
  const logLevel = process.env.LOG_LEVEL || 'info'

  return logger({
    pino: pino({ level: logLevel }, isProduction ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
