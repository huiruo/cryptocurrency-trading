export interface Result {
  // 1 成功；0 失败
  code: number
  msg: string
}

export interface ResultWithData<T> {
  // 1 成功；0 失败
  code: number
  msg: string
  data: T
}

export interface PaginationType {
  currentPage: number
  pageSize: number
}

export interface PaginationResType<T> {
  total: number
  currentPage: number
  pageSize: number
  data: T
}

export interface GoogleAuthType {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export interface DecodedByTokenType {
  username: string
  email: string
  id: string
}
