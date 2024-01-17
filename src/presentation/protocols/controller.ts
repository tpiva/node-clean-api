import { HttpResponse } from './http'

export interface Controller<T = any> {
  handler: (request: T) => Promise<HttpResponse>
}
