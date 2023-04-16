import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurverys: LoadSurveys) {}
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurverys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
