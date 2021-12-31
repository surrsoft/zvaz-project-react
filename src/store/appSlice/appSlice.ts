import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    telemCurrent: {},
    debugPanel: {}
  },
  reducers: {
    telemCurrentUpdate(state, action) {
      const telem = action.payload
      state.telemCurrent = telem
    },
    debugPanelUpdate(state, action) {
      const payload = action.payload;
      console.log('!!-!!-!! 1957- payload {211230195540}\n', payload) // del+
      state.debugPanel = payload;
    }
  },
})

export const { telemCurrentUpdate, debugPanelUpdate } = appSlice.actions
