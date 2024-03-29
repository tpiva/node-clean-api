import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '@/validation/validators'
import { makeLoginValidation } from './login-validation-factory'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
