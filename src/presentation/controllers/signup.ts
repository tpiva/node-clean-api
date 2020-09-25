import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http'
import { HttpRequest, HttpResponse } from '../protocols/http'

export class SignUpController {
  handler (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
