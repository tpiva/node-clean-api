import { SaveSurveyResult, SaveSurveyResultRepository, SaveSurveyResultModelParams, SurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

  async save (data: SaveSurveyResultModelParams): Promise<SurveyResultModel> {
    const saveResult = await this.saveSurveyResultRepository.save(data)
    return saveResult
  }
}
