import { pages } from '../consts';

export const initialState: any = {
  cards: {
    cards: []
  },
  binds: {
    binds: []
  },
  main: {
    pagePath: pages.options[0].value,
  }
}
