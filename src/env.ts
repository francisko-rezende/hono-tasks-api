// got the enum values from Level
// import { Level } from 'pino'
import { z, ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

expand(config())

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
  DATABASE_URL: z.string().url(),
})

export type Env = z.infer<typeof envSchema>
let env: Env

try {
  // eslint-disable-next-line
  env = envSchema.parse(process.env)
} catch (e) {
  const error = e as ZodError
  console.error('❌ Invalid env:')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export { env }
