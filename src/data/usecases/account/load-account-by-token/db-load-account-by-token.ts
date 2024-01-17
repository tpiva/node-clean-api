import { Decrypter, LoadAccountByToken, LoadAccountByTokenRepository } from './db-load-account-by-token-protocol'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return {
          id: account.id
        }
      }
    }
    return null
  }
}
