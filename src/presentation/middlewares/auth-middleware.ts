import { AccessDeniedError } from '../errors'
import { forbiddenRequest } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(forbiddenRequest(new AccessDeniedError())))
  }
}
