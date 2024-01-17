import MockDate from 'mockdate'
import { DbLoadAnswersBySurvey } from './db-load-answers-by-survey'
import { throwError } from '@/domain/test'
import { LoadAnswersBySurveyRepositorySpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadAnswersBySurvey
  loadAnswersBySurveyRepositorySpy: LoadAnswersBySurveyRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAnswersBySurveyRepositorySpy = new LoadAnswersBySurveyRepositorySpy()
  const sut = new DbLoadAnswersBySurvey(loadAnswersBySurveyRepositorySpy)
  return {
    sut,
    loadAnswersBySurveyRepositorySpy
  }
}

let surveyId: string

describe('DbAnswersBySurvey', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeEach(() => {
    surveyId = faker.datatype.uuid()
  })

  test('Should call LoadAnswersBySurveyRepositorySpy', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy: loadSurveyByIdRepositorySpy } = makeSut()
    await sut.loadAnswers(surveyId)
    expect(loadSurveyByIdRepositorySpy.id).toBe(surveyId)
  })

  test('Should return answers on success', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual(
      [loadAnswersBySurveyRepositorySpy.result[0],
        loadAnswersBySurveyRepositorySpy.result[1]
      ])
  })

  test('Should return empty array if LoadAnswersBySurveyRepositorySpy returns []', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    loadAnswersBySurveyRepositorySpy.result = []
    const answers = await sut.loadAnswers(surveyId)
    expect(answers).toEqual([])
  })

  test('Should throw if LoadAnswersBySurveyRepositorySpy throws', async () => {
    const { sut, loadAnswersBySurveyRepositorySpy } = makeSut()
    jest.spyOn(loadAnswersBySurveyRepositorySpy, 'loadAnswers').mockImplementationOnce(throwError)
    const promise = sut.loadAnswers(surveyId)
    await expect(promise).rejects.toThrow()
  })
})
