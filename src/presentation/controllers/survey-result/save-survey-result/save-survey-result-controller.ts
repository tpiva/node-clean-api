import { forbiddenRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse, LoadAnswersBySurvey, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly saveSurveyResult: SaveSurveyResult) {}

  async handler (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId } = request
      const { answer } = request
      const { accountId } = request
      const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)

      if (answers.length === 0) {
        return forbiddenRequest(new InvalidParamError('surveyId'))
      } else if (!answers.includes(answer)) {
        return forbiddenRequest(new InvalidParamError('answer'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
