import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModels } from '@/domain/test'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'

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

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel()
  id: string

  async loadById (id: string): Promise<SurveyModel> {
    this.id = id
    return Promise.resolve(this.surveyModel)
  }
}
