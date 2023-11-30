import { LogControllerDecorator } from './log-controller-decorator'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import faker from 'faker'
import { LogErrorRepositorySpy } from '@/data/test'

class ControllerSpy implements Controller {
  httpResponse = ok(faker.datatype.uuid())
  request: any

  async handler (httpRequest: any): Promise<HttpResponse> {
    this.request = httpRequest
    return Promise.resolve(this.httpResponse)
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): SutTypes => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpRequest = faker.lorem.sentence()
    await sut.handler(httpRequest)
    expect(controllerSpy.request).toEqual(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut, controllerSpy } = makeSut()
    const httpResponse = await sut.handler(faker.lorem.sentence())
    expect(httpResponse).toEqual(controllerSpy.httpResponse)
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.httpResponse = serverError
    await sut.handler(faker.lorem.sentence())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })
})
