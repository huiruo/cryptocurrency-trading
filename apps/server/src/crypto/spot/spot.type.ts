import { PaginationType } from 'src/types'

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetSpotOrderParams extends PaginationType {
  symbol?: string
}
