import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import betReducer from './slices/betSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bet: betReducer,
  },
})