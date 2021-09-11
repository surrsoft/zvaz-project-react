import { WnouT2 } from './utils/WnouLib';

export const PORT_JSON_SERVER = '22102'
export const API_ADDRESS = `http://localhost:${PORT_JSON_SERVER}/`

export enum EPageValues {
  MAIN = 'Главная',
  LEARN_01 = 'Learn01',
  LEARN_02 = 'Learn02',
}

export const pages: WnouT2<EPageValues> = {
  options: [
    {value: EPageValues.MAIN, text: 'Главная', subValue: '/'},
    {value: EPageValues.LEARN_01, text: 'Learn01', subValue: '/Learn01'},
    {value: EPageValues.LEARN_02, text: 'Learn02', subValue: '/Learn02'},
  ],
  selectedValue: EPageValues.MAIN
}

export enum EActionType {
  CHANGE_PAGE = 'change_page',
  CARD_LIST_INIT = 'card_list_init',
  CARDS_ALL_RECEIVED = 'cards_all_received',
  CARDS_ALL_NOT_RECEIVED = 'cards_all_not_received',
}

export type ZvazT1 = {
  type: EActionType,
  payload: {
    pagePath: string
  }
}
