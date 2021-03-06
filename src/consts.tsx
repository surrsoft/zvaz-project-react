import { WnouT2 } from './utils/WnouLib';
import _ from 'lodash';

export const PORT_JSON_SERVER = '22102'
export const API_ADDRESS = `http://localhost:${PORT_JSON_SERVER}/`

export enum EPageName {
  MAIN = 'Главная',
  LEARN_01 = 'Learn01',
  LEARN_02 = 'Learn02',
  MSSC = 'MSSC',
  NXCA = 'NxcaPage',
  MVRO = 'MvroPage',
  NOTION_PAGE = 'NotionPage',
}

export const pages: WnouT2<EPageName> = {
  options: [
    {value: EPageName.MAIN, text: 'Главная', subValue: '/'},
    {value: EPageName.LEARN_01, text: 'Learn01', subValue: '/Learn01'},
    {value: EPageName.LEARN_02, text: 'Learn02', subValue: '/Learn02'},
    {value: EPageName.MSSC, text: 'MSSC', subValue: '/mssc'},
    {value: EPageName.NXCA, text: 'NxcaPage', subValue: '/nxca'},
    {value: EPageName.MVRO, text: 'MvroPage', subValue: '/mvro'},
    {value: EPageName.NOTION_PAGE, text: 'NotionPage', subValue: '/notion'},
  ],
  selectedValue: EPageName.MAIN
}

export class ZvazPageUtils {
  static pagePathByName(pageName: EPageName): string | null {
    const obj = pages.options.find(el => el.value === pageName)
    return _.get(obj, 'subValue', null)
  }
}

export enum EActionType {
  CHANGE_PAGE = 'change_page',
  CARD_LIST_INIT = 'card_list_init',
  CARDS_ALL_RECEIVED = 'cards_all_received',
  CARDS_ALL_NOT_RECEIVED = 'cards_all_not_received',
  CARD_CURRENT_SET = 'card_current_set',
}

export type ZvazT1 = {
  type: EActionType,
  payload: {
    pagePath: string
  }
}
