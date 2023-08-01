import { SUCCESS } from '@common/constants'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { strategyApi } from '@services/strategy'
import { message } from 'antd'
import { RootState } from './rootReducer'
import { StgOrders } from '@services/strategy.type'
import { ResType } from '@services/base'

export type FetchStgOrdersAction = {
  payload: ResType<StgOrders>
  type: string
}

export type StgOrdersParams = {
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
      message.error(res.msg || 'error')
      throw new Error(res.msg || 'error')
    }
  },
)
