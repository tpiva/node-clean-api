import { adapterResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory'

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => adapterResolver(makeLoadSurveyResultController(), args)
  }

}
