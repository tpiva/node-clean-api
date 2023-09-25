import { forbiddenRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class LoadSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)

      if (!survey) {
        return forbiddenRequest(new InvalidParamError('surveyId'))
      }

      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
