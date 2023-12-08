import { configureStore } from '@reduxjs/toolkit'
import SuperAdminReducer from './SuperAdminSlice'
export const store = configureStore({
  reducer: {
         SuperAdmin:SuperAdminReducer,


  },
})