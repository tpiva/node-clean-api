import { EmailValidation, CompareFieldsValidation, ValidationComposite, RequiredFieldValidation } from '../../../validation/validators'
import { Validation } from '../../../presentation/controllers/login/signup/signup-controller-protocols'
import { EmailValidatorAdapter } from '../../../infra/validators/email-validator'

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
