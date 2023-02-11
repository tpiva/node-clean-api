import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptography/bycrpt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../domain/usecases/addAccount'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bCryptAccount = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bCryptAccount, accountMongoRepository)
}
