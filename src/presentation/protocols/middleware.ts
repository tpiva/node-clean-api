import { HttpResponse } from './http'

export interface Middleware<T = any> {
  handler: (httpRequest: T) => Promise<HttpResponse>
}
