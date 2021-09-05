import { EActionType, pages, PORT_JSON_SERVER, ZvazT1 } from '../consts';
import { createStore } from 'redux';
import { RsuvTxJsonServer } from 'rsuv-lib';

type CardModel = {
  id: number,
  title?: string,
  comm?: string,
  body?: string,
  counter?: number
}

const initialState = {
  pagePath: pages.options[0].value,
  cards: []
} as { pagePath: string, cards: CardModel[] }

const reducer = (state = initialState, action: ZvazT1) => {
  console.log('!!-!!-!! action {210808163206}\n', action); // del+
  switch (action.type) {
    case EActionType.CHANGE_PAGE:
      return {...state, pagePath: action.payload.pagePath}
    case EActionType.CARD_LIST_INIT:
      const server = new RsuvTxJsonServer(`http://localhost:${PORT_JSON_SERVER}/`, 'cards')
      server
        .elemsGetAll()
        .then((cards) => {
          console.log('!!-!!-!! cards {210904092257}\n', cards); // del+
          const nx = {...state, cards}
          debugger; // del+
          return nx
        })
        .catch((err) => {
          console.log('!!-!!-!! err {210904100021}\n', err); // del+
        })
      return state
    default:
      return state
  }
}

export const store = createStore(reducer)
