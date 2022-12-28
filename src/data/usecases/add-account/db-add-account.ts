import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccount, AddAccountModel, AccountModel, Hasher } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (private readonly hasher: Hasher, private readonly addAccountRepositoryStub: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepositoryStub = addAccountRepositoryStub
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepositoryStub.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
