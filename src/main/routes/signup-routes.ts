import { Router } from 'express'
import { adapterRoute } from '../adapters/express-routes-adapter'
import { makeSignupController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adapterRoute(makeSignupController()))
}
