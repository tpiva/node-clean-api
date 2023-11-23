import { AccountModel } from '@/domain/models/account'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { Authentication } from '@/domain/usecases/account/authentication'
import faker from 'faker'

export const mockAccountModel = (): AccountModel => (
  {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
)

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
