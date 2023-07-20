import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'

interface AppState {
  count: number
}

const initialState: AppState = {
  count: 6,
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
      console.log('store==>setCount:',action.payload)
      state.count = action.payload
    },
  },
})

export const store = configureStore({
  reducer: appStoreSlice.reducer,
})

export const appStoreActions = appStoreSlice.actions

export const countState = (state: RootState) => state.appStore.count

export default appStoreSlice.reducer