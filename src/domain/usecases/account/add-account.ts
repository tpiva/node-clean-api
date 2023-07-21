import { AccountModel } from '@/domain/models/account'

export type AddAccountModelParams = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModelParams) => Promise<AccountModel | null>
}
