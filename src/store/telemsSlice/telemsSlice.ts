import { RsuvResultTibo, RsuvTxJsonServer } from 'rsuv-lib';
import { API_ADDRESS } from '../../consts';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { store } from '../store';

const telemsServer = new RsuvTxJsonServer(API_ADDRESS, 'telems2')

export type TelemType = { id: number, title: string }
type SuazType = { ids: number[], entities: any }

export const telemsReceiveThunk = createAsyncThunk('telems/telemsReceived', async () => {
  console.log(`!!-!!-!! -> :::::::::::::: telemsReceiveThunk () {210928200224}:${Date.now()}`); // del+

  const telems: TelemType[] = await telemsServer.elemsGetAll()
  console.log('!!-!!-!! telems {211023161656}\n', telems) // del+

  const suazStruct = telems.reduce((acc: SuazType, el: TelemType) => {
    acc.ids.push(el.id)
    acc.entities[el.id] = el
    return acc
  }, {ids: [], entities: {}})
  console.log('!!-!!-!! suazStruct {211023161715}\n', suazStruct) // del+

  return suazStruct.entities
})

export const telemsCreateThunk = createAsyncThunk('telems/telemsCreated', async (elem: any) => {
  console.log('!!-!!-!! 1414- elem {211023163437}\n', elem) // del+
  let ret: RsuvResultTibo<string> = await telemsServer.elemCreateB(elem)
  console.log('!!-!!-!! 1414- ret {211010141439}\n', ret) // del+
  if (ret.success) {
    const elem0 = _.cloneDeep(elem)
    console.log('!!-!!-!! 1414- elem0 {211023164016}\n', elem0) // del+
    elem0.id = _.toInteger(ret.value)
    // to [211024101059]
    return elem0
  }
  throw new Error('ERR* [[211023164131]]');
})


// ---
export const telemsAdapter = createEntityAdapter<TelemType>()

const telemsInitialState = telemsAdapter.getInitialState()
console.log('!!-!!-!! telemsInitialState {211023130313}\n', telemsInitialState) // del+

export const telemsSlice = createSlice({
  name: 'telems',
  initialState: telemsInitialState,
  extraReducers: (builder) => {
    builder.addCase(telemsReceiveThunk.fulfilled, (state, action) => {
      console.log('!!-!!-!! 1316- action {210928200102}\n', action); // del+
      telemsAdapter.setAll(state, action)
    })
    // [[211024101059]]
    builder.addCase(telemsCreateThunk.fulfilled, (state, action) => {
      console.log(`!!-!!-!! -> :::::::::::::: () {211023132949}:${Date.now()}`) // del+
      console.log('!!-!!-!! action {211023133136}\n', action) // del+
      telemsAdapter.addOne(state, action)
    })
    builder.addCase(telemsCreateThunk.rejected, (state, action) => {
      console.log(`!!-!!-!! 1650- -> :::::::::::::: rejected {211023165035}:${Date.now()}`) // del+
      console.log('!!-!!-!! 1650- action {211023165040}\n', action) // del+
    })
  },
  reducers: {
    // telemsReceived: (state, action) => {
    //   state.telems = action.payload
    // }
    // telemsReceived(state, action) {
    //   console.log('!!-!!-!! 1316- action {211023131338}\n', action) // del+
    //   telemsAdapter.setAll(state, action.payload.telems)
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

