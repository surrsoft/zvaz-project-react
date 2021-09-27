import { EActionType } from '../consts';
import { AnyAction } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { bindsSlice } from './bindsSlice';
import { initialState } from './common';

const cardsReducer = (state: any, action: AnyAction) => {
  if (state === undefined) {
    return null
  }
  switch (action.type) {
    case EActionType.CARDS_ALL_RECEIVED:
      return {...state, cards: action.payload}
    case EActionType.CARDS_ALL_NOT_RECEIVED:
      return state;
    case EActionType.CARD_CURRENT_SET:
      const card = action.payload;
      console.log('!!-!!-!! action card {210927102514}\n', card); // del+
      return state;
    default:
      return state;
  }
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState.cards,
  reducers: {
    cardsAllReceived: (state: any, action) => {
      state.cards = action.payload
    },
    cardsAllNotReceived: (state, action) => {
    },
    cardCurrentSet: (state, action) => {
      state.cards.cardCurrent = action.payload
    }
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

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cards: cardsReducer,
    binds: bindsSlice.reducer
  },
  preloadedState: initialState
})
