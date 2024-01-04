import { adapterResolver } from '@/main/adapters/apollo-server-resolver-adpater'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => adapterResolver(makeLoginController(), args)
  }
}
