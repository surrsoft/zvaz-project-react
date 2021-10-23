import { pages } from '../consts';

export const initialState: any = {
  cards: {
    cards: [],
    cardCurrent: {},
  },
  binds: {
    binds: []
  },
  main: {
    pagePath: pages.options[0].value,
  },
}
