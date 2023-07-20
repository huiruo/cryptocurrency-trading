import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appSlice'

const rootReducer = combineReducers({
  appStore: appReducer,
})

export default rootReducer