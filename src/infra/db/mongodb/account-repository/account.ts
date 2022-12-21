import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usecases/addAccount'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...accountWithoutID } = account
    return Object.assign({}, accountWithoutID, { id: _id })
  }
}
