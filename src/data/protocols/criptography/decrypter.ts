export interface Decrypter {
  decrypt: (value: string) => Promise<null | string>
}
