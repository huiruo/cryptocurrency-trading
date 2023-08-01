import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SpotOrders } from '@services/spot.type'
import { StgOrders } from '@services/strategy.type'
import { fetchStgOrders } from './thunkAction'
import { ResType } from '@services/base'

interface StgFilter {
  status: number
  asset: string
}

export interface AppState {
  count: number
  loading: boolean
  error: string | null
  spotOrders: SpotOrders
  stgOrders: StgOrders
  stgFilter: StgFilter
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
  stgFilter: {
    status: 1,
    asset: '',
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
    setSpotOrders(state, action: PayloadAction<SpotOrders>) {
      console.log('store==>setSpotOrders:', action.payload)
      state.spotOrders = action.payload
    },
    setStgFilter(state, action: PayloadAction<StgFilter>) {
      console.log('store==>setStgFilter:', action.payload)
      state.stgFilter = action.payload
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
        state.stgOrders = action.payload.data
      },
    )
    builder.addCase(fetchStgOrders.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'error'
    })
  },
})

export const store = configureStore({
  reducer: appStoreSlice.reducer,
})

export const appStoreActions = appStoreSlice.actions

export const countState = (state: RootState) => state.appStore.count
export const spotOrdersState = (state: RootState) => state.appStore.spotOrders
export const stgOrdersState = (state: RootState) => state.appStore.stgOrders
export const stgFilterState = (state: RootState) => state.appStore.stgFilter

export default appStoreSlice.reducer
