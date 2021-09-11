import { EActionType, pages } from '../consts';
import { AnyAction } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

type CardModel = {
  id: number,
  title?: string,
  comm?: string,
  body?: string,
  counter?: number
}

type T2220 = { pagePath: string, cards: CardModel[] }

const initialState: T2220 = {
  pagePath: pages.options[0].value,
  cards: []
}

const rootReducer = (state: any = initialState, action: AnyAction) => {
  debugger; // del+
  switch (action.type) {
    case EActionType.CARDS_ALL_RECEIVED:
      return {...state, cards: action.payload}
    case EActionType.CARDS_ALL_NOT_RECEIVED:
      return state;
    case EActionType.CHANGE_PAGE:
      debugger; // del+
      return {...state, pagePath: action.payload}
    default:
      return state
  }
}

const pagePathReducer = (state: any = initialState, action: AnyAction) => {
  debugger; // del+
  return state;
}

export const store = configureStore({
  reducer: rootReducer
})
