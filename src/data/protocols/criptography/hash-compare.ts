export interface HashCompare {
  compare: (plainText: string, digest: string) => Promise<boolean>
}
