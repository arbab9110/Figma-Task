import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {}
}

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
   setUserData: (state, action) => {
  
      state.value = action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})


export const { setUserData, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer; 