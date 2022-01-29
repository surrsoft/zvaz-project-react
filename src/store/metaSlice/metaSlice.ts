import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RsuvTxJsonServer } from 'rsuv-lib';
import { API_ADDRESS } from '../../consts';
import _ from 'lodash';

const jsonServer = new RsuvTxJsonServer(API_ADDRESS, 'meta')

export const metaReceiveThunk = createAsyncThunk('meta/receive', async () => {
  const meta = await jsonServer.elemsGetByFilter('id=1')
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

    }
  },
  extraReducers: (builder) => {
    builder.addCase(metaReceiveThunk.fulfilled, (state, action) => {
      const telemCurrent = _.get(action, 'payload', []).find((el: any) => el.id === 1)
      if (telemCurrent) {
        state.telemCurrent = _.omit(telemCurrent, ['id', 'name'])
      }
    })
  }
})
