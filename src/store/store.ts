import { API_ADDRESS, EActionType } from '../consts';
import { AnyAction } from 'redux';
import { configureStore, createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { bindsSlice } from './bindsSlice';
import { initialState } from './common';
import _ from 'lodash';
import { RsuvResultTibo, RsuvTxJsonServer } from 'rsuv-lib';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState.cards,
  reducers: {
    cardsAllReceived: (state: any, action) => {
      state.cards = action.payload
    },
    cardsAllNotReceived: (state, action) => {
    },
    cardCurrentSet: (state, action) => {
      console.log('!!-!!-!! 1146- action {210927114610}\n', action); // del+
      state.cardCurrent = action.payload
    },
    cardUpdated: (state, action) => {
      const card = action.payload
      const index = state.cards.findIndex((el: any) => el.id === _.toInteger(card.id))
      if (index !== -1) {
        state.cards[index] = card
      }
    },
    cardCreated: (state, action) => {
      const card = action.payload
      state.cards.push(card)
    },
    cardDeleted: (state, action) => {
      const id = action.payload
      const idNum = _.toInteger(id)
      const index = state.cards.findIndex((el: any) => el.id === idNum)
      console.log('!!-!!-!! 1721- index {210927172149}\n', index); // del+
      if (index !== -1) {
        const cardsNew = state.cards.filter((el: any) => el.id !== idNum);
        console.log('!!-!!-!! 1721- cardsNew {210927172108}\n', cardsNew); // del+
        state.cards = cardsNew
      }
    },
  }
})

const mainReducer = (state: any, action: AnyAction) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case EActionType.CHANGE_PAGE:
      return {...state, pagePath: action.payload}
    default:
      return state
  }
}

// --- telems

const telemsServer = new RsuvTxJsonServer(API_ADDRESS, 'telems')
const telemsServer2 = new RsuvTxJsonServer(API_ADDRESS, 'telems2')

type TelemType = { id: string, title: string }
type TelemType2 = { id: number, title: string }
type SuazType = { ids: number[], entities: any }

export const telemsReceiveThunk = createAsyncThunk('telems/telemsReceived', async () => {
  console.log(`!!-!!-!! -> :::::::::::::: telemsReceiveThunk () {210928200224}:${Date.now()}`); // del+

  const telems: TelemType2[] = await telemsServer2.elemsGetAll()
  console.log('!!-!!-!! telems {211023161656}\n', telems) // del+

  const suazStruct = telems.reduce((acc: SuazType, el: TelemType2) => {
    acc.ids.push(el.id)
    acc.entities[el.id] = el
    return acc
  }, {ids: [], entities: {}})
  console.log('!!-!!-!! suazStruct {211023161715}\n', suazStruct) // del+

  return suazStruct.entities
})

export const telemsCreateThunk = createAsyncThunk('telems/telemsCreated', async () => {
  console.log(`!!-!!-!! -> :::::::::::::: () {211023132847}:${Date.now()}`) // del+
  // const ret: RsuvResultTibo<string> = await telemsServer.elemCreateB({})
  // console.log('!!-!!-!! 1414- ret {211010141439}\n', ret) // del+
  // return ret.success ? ret.value : null;
  return {title: 'elem 2'}
})


const telemsAdapter = createEntityAdapter<TelemType>()

const telemsInitialState = telemsAdapter.getInitialState()
console.log('!!-!!-!! telemsInitialState {211023130313}\n', telemsInitialState) // del+

const telemsSlice = createSlice({
  name: 'telems',
  initialState: telemsInitialState,
  extraReducers: (builder) => {
    builder.addCase(telemsReceiveThunk.fulfilled, (state, action) => {
      console.log('!!-!!-!! 1316- action {210928200102}\n', action); // del+
      telemsAdapter.setAll(state, action)
    })
    builder.addCase(telemsCreateThunk.fulfilled, (state, action) => {
      console.log(`!!-!!-!! -> :::::::::::::: () {211023132949}:${Date.now()}`) // del+
      console.log('!!-!!-!! action {211023133136}\n', action) // del+
      // @ts-ignore
      telemsAdapter.addOne(state, action.payload)
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

// ---

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cards: cardsSlice.reducer,
    binds: bindsSlice.reducer,
    telems: telemsSlice.reducer,
  },
  preloadedState: initialState
})

// --- telems selectors
type RootState = ReturnType<typeof store.getState>

export const telemsSelectors = telemsAdapter.getSelectors<RootState>(
  state => state.telems
)
