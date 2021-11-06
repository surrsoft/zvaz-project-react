import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    telemCurrent: {},
  },
  reducers: {
    telemCurrentUpdate(state, action) {
      const telem = action.payload
      debugger // del+
      state.telemCurrent = telem
    },
  },
})

export const { telemCurrentUpdate } = appSlice.actions
