import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModelParams } from '@/domain/usecases/survey-result/add-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModelParams) => Promise<SurveyResultModel>
}
