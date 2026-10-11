import type { ZodSchema } from './types.js'

const jsonContent = <T extends ZodSchema>({
  schema,
  description,
}: {
  schema: T
  description: string
}) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  }
}

export { jsonContent }
