import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RsuvTxJsonServer } from 'rsuv-lib';
import { API_ADDRESS } from '../../consts';
import _ from 'lodash';

const jsonServer = new RsuvTxJsonServer(API_ADDRESS, 'meta')

export const metaReceiveThunk = createAsyncThunk('meta/receive', async () => {
  const meta = await jsonServer.elemsGetByFilter('id=1')
  console.log('!!-!!-!! 1945- meta {211023194500}\n', meta) // del+
  return meta
})

// @ts-ignore
export const metaUpdateThunk = createAsyncThunk('', async (elem: any) => {
  const res = await jsonServer.elemUpdate(elem)
  if (res.success) {
    return true
  }
  throw new Error('ERR* [[211023205120]]');
})

export const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    telemCurrent: {}
  },
  reducers: {
    metaReceived: (state, action) => {
      console.log(`!!-!!-!! 1935- -> :::::::::::::: telemCurrent() {211023193500}:${Date.now()}`) // del+
      console.log('!!-!!-!! 1935- action {211023193512}\n', action) // del+

    }
  },
  extraReducers: (builder) => {
    builder.addCase(metaReceiveThunk.fulfilled, (state, action) => {
      console.log('!!-!!-!! 1946- action {211023194614}\n', action) // del+
      console.log('!!-!!-!! 1946- state {211023195350}\n', state) // del+
      const telemCurrent = _.get(action, 'payload', []).find((el: any) => el.id === 1)
      console.log('!!-!!-!! 1946- nx {211023200906}\n', telemCurrent) // del+
      if (telemCurrent) {
        state.telemCurrent = _.omit(telemCurrent, ['id', 'name'])
      }
    })
  }
})
