import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    telemCurrent: {}
  },
  reducers: {
    telemCurrentUpdate(state, action) {
      console.log('!!-!!-!! action {211024093658}\n', action) // del+
      const telem = action.payload
      state.telemCurrent = telem
    }
  }
})

export const {telemCurrentUpdate} = appSlice.actions
