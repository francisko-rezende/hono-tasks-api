import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z, ZodError } from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

export type Env = z.infer<typeof EnvSchema>

let env: Env

try {
  // oxlint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env)
} catch (err) {
  const zodErr = err as ZodError

  console.error('⛔ Invalid env:')
  console.error(z.prettifyError(zodErr))
  process.exit(1)
}

export { env }
