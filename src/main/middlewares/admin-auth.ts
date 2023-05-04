import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware'

export const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))
