import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
    profiles : [],
    isLoading : false,
    isError: false,
    isSuccess : false,
    message : ''
}

export const createProfile = createAsyncThunk('profiles/create', async(profileData, thunkAPI)=> {
       try {
        const token = thunkAPI.getState().auth.user.token
        return await profileService.createProfile(profileData, token)
        
       } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
        
       }
})

export const getProfiles = createAsyncThunk('profiles/getprofiles', async(_, thunkAPI)=> {
    try {
     const token = thunkAPI.getState().auth.user.token
     return await profileService.getProfiles(token)
     
    } catch (error) {
     const message = (
         error.response &&
         error.response.data &&
         error.response.data.message
     ) || error.message || error.toString()
     return thunkAPI.rejectWithValue(message)
     
    }
})


export const getProfileById = createAsyncThunk(
    'profiles/getProfileById',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await profileService.getProfileById(id, token)
      } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  );


  export const updateProfile = createAsyncThunk('profiles/updateprofile', async(profileData, thunkAPI)=> {
    try {
     const token = thunkAPI.getState().auth.user.token
     return await profileService.updateProfile(profileData, token)
     
    } catch (error) {
     const message = (
         error.response &&
         error.response.data &&
         error.response.data.message
     ) || error.message || error.toString()
     return thunkAPI.rejectWithValue(message)
     
    }
})

  export const deleteProfile = createAsyncThunk('profiles/deleteprofile', async(id, thunkAPI)=> {
    try {
     const token = thunkAPI.getState().auth.user.token
     return await profileService.deleteProfile(id, token)
     
    } catch (error) {
     const message = (
         error.response &&
         error.response.data &&
         error.response.data.message
     ) || error.message || error.toString()
     return thunkAPI.rejectWithValue(message)
     
    }
})

export const profileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers : {
        reset : (state) => initialState
    }, 
    extraReducers : (builder)=>{
        builder
        .addCase(createProfile.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(createProfile.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.profiles.push(action.payload)
        })
        .addCase(createProfile.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getProfiles.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getProfiles.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.profiles = action.payload
        })
        .addCase(getProfiles.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getProfileById.pending, (state) => {
            state.isLoading = true
            state.isError = false
            state.errorMessage = ''
          })
          .addCase(getProfileById.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.errorMessage = ''
            state.profile = action.payload
          })
          .addCase(getProfileById.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true;
            state.errorMessage = action.payload || 'Failed to fetch profile'
          })
        .addCase(updateProfile.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(updateProfile.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            const index = state.profiles.findIndex((profile)=> profile.id === action.payload.id)
            if (index !== -1) {
                state.profiles[index] = action.payload
              } 
        })
        .addCase(updateProfile.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteProfile.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(deleteProfile.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.profiles = state.profiles.filter((profile)=> profile._id !== action.payload.id )
        })
        .addCase(deleteProfile.rejected, (state, action)=> {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset} = profileSlice.actions
export default profileSlice.reducer