import { ResType } from './base'

export interface CodeListOptions {
  test: number
}
export interface CodeListResponse {
  test2: []
}

export interface Api {
  codeList: (options?: CodeListOptions) => Promise<ResType<CodeListResponse>>
}
