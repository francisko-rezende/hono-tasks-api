import type { ZodSchema } from './types'

type JsonContentParams<TSchema> = {
  schema: TSchema
  description: string
}

export const jsonContent = <TSchema extends ZodSchema>({
  schema,
  description,
}: JsonContentParams<TSchema>) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  }
}
