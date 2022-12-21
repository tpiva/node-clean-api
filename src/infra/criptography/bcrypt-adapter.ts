import bcrypt from 'bcrypt'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
