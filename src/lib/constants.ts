import { NOT_FOUND as STATUS_PHRASE_NOT_FOUND } from '@/consts/http-status-phrases.js'
import { createMessageObjectSchema } from '@/helpers/create-message-object.js'

const notFoundSchema = createMessageObjectSchema(STATUS_PHRASE_NOT_FOUND)

export { notFoundSchema }
