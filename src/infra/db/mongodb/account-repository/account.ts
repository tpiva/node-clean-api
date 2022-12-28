import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/addAccount'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    return result && MongoHelper.map(result)
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
