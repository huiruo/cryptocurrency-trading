import { SUCCESS } from '@common/constants'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { strategyApi } from '@services/strategy'
import { RootState } from './rootReducer'
import { FetchStgOrdersParams } from '@services/strategy.type'
import { spotApi } from '@services/spot'
import { futureApi } from '@services/future'
import { FutureOrdersParams } from '@services/future.type'
import { SpotOrdersParams } from '@services/spot.type'

export const fetchStgOrders = createAsyncThunk(
  'fetchStgOrders',
  async (stgOrdersParams: FetchStgOrdersParams, thunkAPI) => {
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

export const fetchFutureOrders = createAsyncThunk(
  'fetchFutureOrders',
  async (options: FutureOrdersParams, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState
    const {
      futureFilter: { symbol },
      futureOrders: { currentPage, pageSize },
    } = state.appStore

    const res = await futureApi.getFutureOrders({
      currentPage: options.current || currentPage,
      pageSize: options.page || pageSize,
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
