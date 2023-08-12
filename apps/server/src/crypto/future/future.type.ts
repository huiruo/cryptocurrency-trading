import { PaginationType } from 'src/types'

export interface SyncFutureOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetFutureOrderParams extends PaginationType {
  symbol?: string
}
