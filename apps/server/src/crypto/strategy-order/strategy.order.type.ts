import { PaginationType } from 'src/types'

export interface SyncSpotOrderParams {
  symbol: string
  startTime: number
  endTime: number
  recvWindow?: number
}

export interface GetStraOrderParams extends PaginationType {
  symbol?: string
  is_running: string | number
}
