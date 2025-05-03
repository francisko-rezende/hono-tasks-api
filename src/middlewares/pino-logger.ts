import { env } from '@/env.js'
import { pinoLogger as logger } from 'hono-pino'
import { pino } from 'pino'
import pretty from 'pino-pretty'

export function pinoLogger() {
  const isProduction = env.NODE_ENV === 'production'
  const logLevel = env.LOG_LEVEL

  return logger({
    pino: pino({ level: logLevel }, isProduction ? undefined : pretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
