import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller Decorator', () => {
  it('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handler (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          body: {
            name: 'Thiago'
          },
          statusCode: 200
        }
        return new Promise(resolve => resolve(httpResponse))
      }
    }
    const controllerStub = new ControllerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handler')
    const sut = new LogControllerDecorator(controllerStub)
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_email',
        password: '123',
        passwordConfirmation: '123'
      }
    }
    await sut.handler(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
