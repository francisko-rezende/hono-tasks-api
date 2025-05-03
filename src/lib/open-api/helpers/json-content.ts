import type { ZodSchema } from './types'

type JsonContentParams<TSchema> = {
  schema: TSchema
  description: string
}

const jsonContent = <TSchema extends ZodSchema>({
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

export default jsonContent
