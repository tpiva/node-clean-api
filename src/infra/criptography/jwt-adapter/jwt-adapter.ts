import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {
    this.secret = secret
  }

  async encrypt (plaintext: string): Promise<string> {
    const ciphertext = await jwt.sign({ id: plaintext }, this.secret)
    return ciphertext
  }

  async decrypt (ciphertext: string): Promise<string | null> {
    const plaintext: any = await jwt.verify(ciphertext, this.secret)
    return plaintext
  }
}
