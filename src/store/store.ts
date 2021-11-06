import { EActionType } from '../consts';
import { AnyAction } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { bindsSlice } from './bindsSlice/bindsSlice';
import { initialState } from './common';
import { telemsSlice } from './telemsSlice/telemsSlice';
import { metaSlice } from './metaSlice/metaSlice';
import { cardsSlice } from './cardsSlice/cardsSlice';
import { appSlice } from './appSlice/appSlice';

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

// ---
export const store = configureStore({
  reducer: {
    main: mainReducer,
    cards: cardsSlice.reducer,
    binds: bindsSlice.reducer,
    telems: telemsSlice.reducer,
    meta: metaSlice.reducer,
    app: appSlice.reducer
  },
  preloadedState: initialState
})

