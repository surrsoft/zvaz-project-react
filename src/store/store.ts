import { API_ADDRESS, EActionType } from '../consts';
import { AnyAction } from 'redux';
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bindsSlice } from './bindsSlice';
import { initialState } from './common';
import _ from 'lodash';
import { RsuvTxJsonServer } from 'rsuv-lib';

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

const telemsServer = new RsuvTxJsonServer(API_ADDRESS, 'telems')

export const telemsReceiveThunk = createAsyncThunk('telemsSlice/telemsReceive', async () => {
  console.log(`!!-!!-!! -> :::::::::::::: telemsReceiveThunk () {210928200224}:${Date.now()}`); // del+
  const telems = await telemsServer.elemsGetAll()
  console.log('!!-!!-!! 1959- telems {210928195927}\n', telems); // del+
  return telems
})

const telemsSlice = createSlice({
  name: 'telemsSlice',
  initialState: {
    telems: {},
    telemCurrent: null,
  },
  extraReducers: (builder) => {
    builder.addCase(telemsReceiveThunk.fulfilled, (state, action) => {
      console.log('!!-!!-!! 2001- action {210928200102}\n', action); // del+
      const newEntities: any = {}
      action.payload.forEach((telem: any) => {
        newEntities[telem.id] = telem
      })
      state.telems = newEntities
    })
  },
  reducers: {
    //   telemsReceived: (state, action) => {
    //     state.telems = action.payload
    //   }
  }
})

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cards: cardsSlice.reducer,
    binds: bindsSlice.reducer,
    telemsSlice: telemsSlice.reducer,
  },
  preloadedState: initialState
})
