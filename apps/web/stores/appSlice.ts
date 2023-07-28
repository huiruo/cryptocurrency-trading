import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SpotOrders } from '@services/spot.type'
import { StraOrders } from '@services/strategy.type'

interface AppState {
  count: number
  spotOrders: SpotOrders
  straOrders: StraOrders
}

const initialState: AppState = {
  count: 6,
  spotOrders: {
    data: [],
    total: 0,
  },
  straOrders: {
    data: [],
    total: 0,
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
    setStraOrders(state, action: PayloadAction<StraOrders>) {
      console.log('store==>setStraOrders:', action.payload)
      state.straOrders = action.payload
    },
  },
})

export const store = configureStore({
  reducer: appStoreSlice.reducer,
})

export const appStoreActions = appStoreSlice.actions

export const countState = (state: RootState) => state.appStore.count
export const spotOrdersState = (state: RootState) => state.appStore.spotOrders
export const straOrdersState = (state: RootState) => state.appStore.straOrders

export default appStoreSlice.reducer
