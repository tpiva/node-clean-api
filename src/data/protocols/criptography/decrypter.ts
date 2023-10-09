export interface Decrypter {
  decrypt: (ciphertext: string) => Promise<null | string>
}
