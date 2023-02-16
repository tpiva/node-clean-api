import { badRequest, unauthorized, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, Authentication, Validation, HttpRequest, HttpResponse } from '../signup/signup-controller-protocols'

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
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
