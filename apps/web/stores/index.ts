import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

// 导出了 RootState 和 AppDispatch 类型，以便在整个应用程序中使用。
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store