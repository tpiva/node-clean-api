import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { makeSignupValidation } from './signup-validation-factory'
import { BcryptAdapter } from '../../../infra/criptography/bycrpt-adapter/bcrypt-adapter'

export const makeSignupController = (): Controller => {
  const salt = 12
  const bCryptAccount = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bCryptAccount, accountMongoRepository)
  const signupController = new SignUpController(dbAddAccount, makeSignupValidation())
  const logErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signupController, logErrorRepository)
}
