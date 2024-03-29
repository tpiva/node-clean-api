import { Controller, HttpResponse } from '@/presentation/protocols'
import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handler (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handler(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
