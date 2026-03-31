
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import qaReducer from './qaSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    qa: qaReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;