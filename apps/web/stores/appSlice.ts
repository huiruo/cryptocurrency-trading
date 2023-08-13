import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SpotFilter, SpotOrders } from '@services/spot.type'
import { StgFilter, StgOrders } from '@services/strategy.type'
import {
  fetchFutureOrders,
  fetchSpotOrders,
  fetchStgOrders,
} from './thunkAction'
import { ResType } from '@services/base'
import { SUCCESS } from '@common/constants'
import { FutureFilter, FutureOrders } from '@services/future.type'

export interface AppState {
  count: number
  loading: boolean
  error: string | null
  spotOrders: SpotOrders
  futureOrders: FutureOrders
  stgOrders: StgOrders
  stgFilter: StgFilter
  spotFilter: SpotFilter
  futureFilter: FutureFilter
}

const initialState: AppState = {
  count: 6,
  loading: false,
  error: null,
  spotOrders: {
    data: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
  },
  futureOrders: {
    data: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
  },
  stgFilter: {
    status: 2,
    asset: '',
  },
  futureFilter: {
    // CHZUSDT
    symbol: '',
  },
  spotFilter: {
    // test MKRUSDT ARUSDT
    symbol: '',
  },
  stgOrders: {
    data: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
  },
}

const appStoreSlice = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    setCount(state, action: PayloadAction<number>) {
      console.log('store==>setCount:', action.payload)
      state.count = action.payload
    },
    setStgFilter(state, action: PayloadAction<StgFilter>) {
      console.log('store==>setStgFilter:', action.payload)
      state.stgFilter = action.payload
    },
    setSpotFilter(state, action: PayloadAction<SpotFilter>) {
      console.log('store==>SpotFilter:', action.payload)
      state.spotFilter = action.payload
    },
    setFutureFilter(state, action: PayloadAction<FutureFilter>) {
      console.log('store==>futureFilter:', action.payload)
      state.futureFilter = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchStgOrders.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchStgOrders.fulfilled,
      (state, action: PayloadAction<ResType<StgOrders>>) => {
        state.loading = false
        if (action.payload.code === SUCCESS) {
          state.stgOrders = action.payload.data
        }
      },
    )
    builder.addCase(fetchStgOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'error'
    })
    // spot
    builder.addCase(fetchSpotOrders.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchSpotOrders.fulfilled,
      (state, action: PayloadAction<ResType<SpotOrders>>) => {
        state.loading = false
        if (action.payload.code === SUCCESS) {
          state.spotOrders = action.payload.data
        }
      },
    )
    builder.addCase(fetchSpotOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'error'
    })
    // spot end
    // future
    builder.addCase(fetchFutureOrders.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchFutureOrders.fulfilled,
      (state, action: PayloadAction<ResType<FutureOrders>>) => {
        state.loading = false
        if (action.payload.code === SUCCESS) {
          state.futureOrders = action.payload.data
        }
      },
    )
    builder.addCase(fetchFutureOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'error'
    })
    // future end
  },
})

export const store = configureStore({
  reducer: appStoreSlice.reducer,
})

export const appStoreActions = appStoreSlice.actions

export const countState = (state: RootState) => state.appStore.count
export const spotOrdersState = (state: RootState) => state.appStore.spotOrders
export const futureOrdersState = (state: RootState) =>
  state.appStore.futureOrders
export const stgOrdersState = (state: RootState) => state.appStore.stgOrders
export const stgFilterState = (state: RootState) => state.appStore.stgFilter
export const spotFilterState = (state: RootState) => state.appStore.spotFilter
export const futureFilterState = (state: RootState) =>
  state.appStore.futureFilter

export default appStoreSlice.reducer
