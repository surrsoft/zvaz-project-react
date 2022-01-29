import { RsuvResultTibo, RsuvTxJsonServer } from 'rsuv-lib';
import { API_ADDRESS } from '../../consts';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { store } from '../store';
import { telemCurrentUpdate } from '../appSlice/appSlice';
import { TelemType } from '../../blogic/misc';

const telemsServer = new RsuvTxJsonServer(API_ADDRESS, 'telems2')


type SuazType = { ids: number[], entities: any }

export const telemsReceiveThunk = createAsyncThunk('telems/telemsReceived', async () => {

  const telems: TelemType[] = await telemsServer.elemsGetAll()

  const suazStruct = telems.reduce((acc: SuazType, el: TelemType) => {
    acc.ids.push(el.id)
    acc.entities[el.id] = el
    return acc
  }, {ids: [], entities: {}})

  return suazStruct.entities
})

export const telemsTelemCreateThunk = createAsyncThunk('telems/telemsCreated', async (elem: any) => {
  let ret: RsuvResultTibo<string> = await telemsServer.elemCreateB(elem)
  if (ret.success) {
    const elem0 = _.cloneDeep(elem)
    elem0.id = _.toInteger(ret.value)
    // to [211024101059]
    return elem0
  }
  throw new Error('ERR* [[211023164131]]');
})

export const telemsTelemUpdateThunk = createAsyncThunk('telems/telemsTelemUpdated', async (elem: any) => {
  const res = await telemsServer.elemUpdate(elem)
  if (res.success) {
    return elem
  }
  throw Error(res.errCode + '|' + res.errMessage);
})

export const telemsTelemDeleteThunk = createAsyncThunk('telems/telemsTelemDelete', async ({id, dispatch}: any) => {
  const res = await telemsServer.elemDelete(id)
  if (res.success) {
    dispatch(telemCurrentUpdate({}))
    return id
  }
  throw Error(res.errCode + '|' + res.errMessage)
})

// ---
export const telemsAdapter = createEntityAdapter<TelemType>()

const telemsInitialState = telemsAdapter.getInitialState()

export const telemsSlice = createSlice({
  name: 'telems',
  initialState: telemsInitialState,
  extraReducers: (builder) => {
    builder.addCase(telemsReceiveThunk.fulfilled, (state, action) => {
      telemsAdapter.setAll(state, action)
    })
    // [[211024101059]]
    builder.addCase(telemsTelemCreateThunk.fulfilled, (state, action) => {
      telemsAdapter.addOne(state, action)
    })
    builder.addCase(telemsTelemCreateThunk.rejected, (state, action) => {
    })
    builder.addCase(telemsTelemUpdateThunk.fulfilled, (state, action) => {
      telemsAdapter.setOne(state, action)
    })
    builder.addCase(telemsTelemDeleteThunk.fulfilled, (state, action) => {
      const id = action.payload
      telemsAdapter.removeOne(state, id)
    })
  },
  reducers: {
    // telemsReceived: (state, action) => {
    //   state.telems = action.payload
    // }
  }
})

// --- telems selectors
type RootState = ReturnType<typeof store.getState>

const telemsSelectors = telemsAdapter.getSelectors<RootState>(
  (state) => {
    return state.telems
  }
)

// [[211024184516]]
export const telemsAllSelector = telemsSelectors.selectAll
