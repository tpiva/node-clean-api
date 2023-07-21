import { AccountModel, AddAccountModelParams } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add: (accountData: AddAccountModelParams) => Promise<AccountModel>
}
