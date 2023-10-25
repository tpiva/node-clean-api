import { Controller, Authentication, Validation, HttpRequest, HttpResponse } from '../signup/signup-controller-protocols'
import { badRequest, unauthorized, ok, serverError } from '@/presentation/helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { email, password } = httpRequest.body
      const authenticationModel = await this.authentication.auth({ email, password })
      if (!authenticationModel) return unauthorized()

      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
