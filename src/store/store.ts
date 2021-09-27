import { EActionType } from '../consts';
import { AnyAction } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { bindsSlice } from './bindsSlice';
import { initialState } from './common';
import _ from 'lodash';

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
    cardUpdate: (state, action) => {
      const card = action.payload
      const index = state.cards.findIndex((el: any) => el.id === _.toInteger(card.id))
      if (index !== -1) {
        state.cards[index] = card
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

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cards: cardsSlice.reducer,
    binds: bindsSlice.reducer
  },
  preloadedState: initialState
})
