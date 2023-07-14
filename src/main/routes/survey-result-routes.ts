/* eslint-disable @typescript-eslint/no-misused-promises */
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { adapterRoute } from '../adapters/express-routes-adapter'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterRoute(makeSaveSurveyResultController()))
}
