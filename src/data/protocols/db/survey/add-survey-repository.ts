import { SurveyModel } from '@/domain/models/survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyRepository.Params) => Promise<void>
}

export namespace AddSurveyRepository {
  export type Params = Omit<SurveyModel, 'id'>
}
