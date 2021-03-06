import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '../common';
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
      if (index !== -1) {
        const cardsNew = state.cards.filter((el: any) => el.id !== idNum);
        state.cards = cardsNew
      }
    },
  }
})
