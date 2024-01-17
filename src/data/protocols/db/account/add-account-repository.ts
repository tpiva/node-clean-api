import { AddAccount } from '@/data/usecases/account/add-account/db-add-account-protocols'

export interface AddAccountRepository {
  add: (data: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = boolean
}
