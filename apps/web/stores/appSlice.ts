import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import { SpotOrders } from '@services/spot.type'

interface AppState {
  count: number
  spotOrders: SpotOrders
}

const initialState: AppState = {
  count: 6,
  spotOrders: {
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
  },
})

export const store = configureStore({
  reducer: appStoreSlice.reducer,
})

export const appStoreActions = appStoreSlice.actions

export const countState = (state: RootState) => state.appStore.count

export const spotOrdersState = (state: RootState) => state.appStore.spotOrders

export default appStoreSlice.reducer
