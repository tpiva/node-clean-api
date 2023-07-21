import { AccountModel } from '@/domain/models/account'
import { AddAccountModelParams } from '@/domain/usecases/account/add-account'

export const mockAccountModel = (): AccountModel => (
  {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
)

export const mockAddAccountDataParams = (): AddAccountModelParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})
