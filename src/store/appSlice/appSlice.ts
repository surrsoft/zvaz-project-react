import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    telemCurrent: {},
  },
  reducers: {
    telemCurrentUpdate(state, action) {
      const telem = action.payload
      state.telemCurrent = telem
    },
  },
})

export const { telemCurrentUpdate } = appSlice.actions
