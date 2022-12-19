import { MissingParamError } from '../../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  it('Should return a missing param error if validation failed ', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
