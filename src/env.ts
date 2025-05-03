// got the enum values from Level
// import { Level } from 'pino'
import { z } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

// eslint-disable-next-line
export const env = envSchema.parse(process.env)
