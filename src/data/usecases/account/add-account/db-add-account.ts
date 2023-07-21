import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccount, AddAccountModelParams, AccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher,
    private readonly addAccountRepositoryStub: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hasher = hasher
    this.addAccountRepositoryStub = addAccountRepositoryStub
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountModelParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepositoryStub.add(Object.assign({}, accountData, { password: hashedPassword }))
      return newAccount
    }

    return null
  }
}
