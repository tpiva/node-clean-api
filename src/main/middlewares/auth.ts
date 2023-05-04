import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const auth = adapterMiddleware(makeAuthMiddleware())
