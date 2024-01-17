import { SurveyModel } from '@/domain/models/survey'
import { mockSurveysModels } from '@/domain/test'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { LoadAnswersBySurvey } from '@/domain/usecases/survey/load-answers-by-survey'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { CheckSurveyById } from '../controllers/survey-result/load-survey-result/load-survey-result-controller-protocols'
import faker from 'faker'

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params

  async add (data: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = data
    return Promise.resolve()
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveysModels()
  callsCount = 0
  accountId: string

  async load (accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId
    return Promise.resolve(this.surveyModels)
  }
}

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result = [faker.random.word(), faker.random.word()]
  id: string

  async loadAnswers (id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id
    return this.result
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true
  id: string

  async checkById (id: string): Promise<CheckSurveyById.Result> {
    this.id = id
    return this.result
  }
}
