import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: '' 
};

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  });

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  });
  

 export const logout = createAsyncThunk('auth/logout', async()=>{
      await authService.logout()
 })

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.errorMessage = ''
    },
    removeUser: (state) => {
      state.user = null;
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
    .addCase(register.rejected, (state, action) => {
        const message =
          action.payload ||
          (action.error && action.error.message) ||
          'Something went wrong'
        state.isError = true
        state.isLoading = false
        state.message = message
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
    .addCase(login.rejected, (state, action) => {
        const message =
          action.payload ||
          (action.error && action.error.message) ||
          'Something went wrong'
        state.isError = true
        state.isLoading = false
        state.message = message
        state.user = null
      })
      .addCase(logout.fulfilled, (state)=>{
        state.user = null
      })
  }
});

export const { reset, removeUser } = authSlice.actions
export default authSlice.reducer
