import { Controller } from '@/presentation/protocols'

export const adapterResolver = async (controller: Controller, args: any): Promise<any> => {
  const httpResponse = await controller.handler(args)
  return httpResponse.body
}
