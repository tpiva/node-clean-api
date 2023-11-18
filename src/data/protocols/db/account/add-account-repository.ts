import { AccountModel, AddAccount } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Params>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AccountModel
}
