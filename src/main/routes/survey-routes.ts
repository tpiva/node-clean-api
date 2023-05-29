/* eslint-disable @typescript-eslint/no-misused-promises */
import { adapterRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adapterRoute(makeLoadSurveysController()))
}
