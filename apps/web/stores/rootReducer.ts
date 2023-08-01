import { combineReducers } from '@reduxjs/toolkit'
import appReducer, { AppState } from './appSlice'

export type RootState = {
  appStore: AppState
}

const rootReducer = combineReducers({
  appStore: appReducer,
})

export default rootReducer
