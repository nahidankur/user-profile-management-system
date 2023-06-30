import {configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authSlice'
import profileReducer from '../profile/profileSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        profile : profileReducer
    }
})