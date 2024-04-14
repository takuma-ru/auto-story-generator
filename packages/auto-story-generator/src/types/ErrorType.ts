export interface ErrorType {
  [
  key: `E${'C' | 'R' | 'L' | 'V' | 'A'}${number}`
  ]: // C = Common, R = React, L = Lit, V = Vue, A = Angular
  | {
    title: string
    detail: string
    isCustomDetail: false
  }
  | {
    title: string
    detail?: never
    isCustomDetail: true
  }
}
