import { SUCCESS } from '@common/constants'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { strategyApi } from '@services/strategy'
import { RootState } from './rootReducer'
import { StgOrders } from '@services/strategy.type'
import { ResType } from '@services/base'
import { spotApi } from '@services/spot'

export type FetchStgOrdersAction = {
  payload: ResType<StgOrders>
  type: string
}

export type FetchSpotOrdersAction = {
  payload: ResType<StgOrders>
  type: string
}

export type StgOrdersParams = {
  current?: number
  page?: number
}

export type SpotOrdersParams = {
  current?: number
  page?: number
}

export const fetchStgOrders = createAsyncThunk(
  'fetchStgOrders',
  async (stgOrdersParams: StgOrdersParams, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState
    const {
      stgFilter: { asset, status },
      stgOrders: { currentPage, pageSize },
    } = state.appStore
    const res = await strategyApi.getStgOrders({
      currentPage: stgOrdersParams.current || currentPage,
      pageSize: stgOrdersParams.page || pageSize,
      symbol: asset,
      is_running: status,
    })
    if (res.code === SUCCESS) {
      return res
    } else {
      // message.error(res.msg || 'error')
      // throw new Error(res.msg || 'error')
      return res
    }
  },
)

export const fetchSpotOrders = createAsyncThunk(
  'fetchSpotOrders',
  async (spotOrdersParams: SpotOrdersParams, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState
    const {
      spotFilter: { symbol },
      spotOrders: { currentPage, pageSize },
    } = state.appStore

    const res = await spotApi.getSpotOrders({
      currentPage: spotOrdersParams.current || currentPage,
      pageSize: spotOrdersParams.page || pageSize,
      symbol,
    })
    if (res.code === SUCCESS) {
      return res
    } else {
      console.log('fetchSpotOrders error:', res)
      // message.error(res.msg || 'error')
      // throw new Error(res.msg || 'error')
      return res
    }
  },
)
