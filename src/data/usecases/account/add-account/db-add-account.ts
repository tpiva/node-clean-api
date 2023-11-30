import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccount, Hasher, CheckAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher,
    private readonly addAccountRepositoryStub: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository) {
    this.hasher = hasher
    this.addAccountRepositoryStub = addAccountRepositoryStub
    this.checkAccountByEmailRepository = checkAccountByEmailRepository
  }

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(accountData.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      isValid = await this.addAccountRepositoryStub.add(Object.assign({}, accountData, { password: hashedPassword }))
    }

    return isValid
  }
}
