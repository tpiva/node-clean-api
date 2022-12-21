import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'

export class BcryptAdapter implements Hasher {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
