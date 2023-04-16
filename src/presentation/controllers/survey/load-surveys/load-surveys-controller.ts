import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurverys: LoadSurveys) {}
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurverys.load()
    return null
  }
}
