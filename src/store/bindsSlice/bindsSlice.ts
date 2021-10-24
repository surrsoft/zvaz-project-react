import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../common';
import { RsuvTxJsonServer } from 'rsuv-lib';
import { API_ADDRESS } from '../../consts';

export const bindsSlice = createSlice({
  name: 'binds',
  initialState: initialState.binds,
  reducers: {
    allGetted(state, action) {
      const binds = action.payload
      console.log('!!-!!-!! binds {210912202956}\n', binds); // del+
      state.binds = binds
    }
  }
})

export const bindsAllThunk = (dispatch: Function) => {
  const server = new RsuvTxJsonServer(API_ADDRESS, 'binds')
  server
    .elemsGetAll()
    .then((binds) => {
      console.log('!!-!!-!! binds {210912202101}\n', binds); // del+
      dispatch(bindsSlice.actions.allGetted(binds))
    })
    .catch((err) => {
      console.log('!!-!!-!! err {210912202100}\n', err); // del+
    })
}
