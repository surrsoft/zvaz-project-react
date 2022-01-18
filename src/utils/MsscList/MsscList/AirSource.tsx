import { MsscSource } from '../MsscSource';
import { HoggConnectorAirtable } from 'hogg-lib';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';
import { MsscFilter } from '../MsscFilter';
import { MsscElem } from '../MsscElem';

const air = new HoggConnectorAirtable()
air.init({apiKey: process.env.REACT_APP_AIRTABLE_KEY || ''})
const connector = air
  .db('appXv6ry7Vn262nGR')
  .table('main')
  .columns(['id', 'url', 'title', 'comm', 'body', 'trans_count', 'trans_date_last', 'show_date_last'])

class Cls0040 {

}

export class Source implements MsscSource<Cls0040> {
  dialogCreate(cbModel: Promise<Cls0040>): Promise<JSX.Element> {
    return Promise.reject(undefined);
  }

  dialogUpdate(id: RsuvTxStringAB, cbModel: Promise<Cls0040>): Promise<JSX.Element> {
    return Promise.reject(undefined);
  }

  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    return Promise.resolve([]);
  }

  elemsAdd(elems: Cls0040[]): Promise<Array<RsuvResultBoolPknz | Cls0040>> {
    return Promise.reject(undefined);
  }

  elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    return Promise.reject(undefined);
  }

  elemsDelete(elems: Cls0040[]): Promise<Cls0040[]> {
    return Promise.resolve([]);
  }

  elemsSet(elems: Cls0040[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

  elemsUpsert(elems: Cls0040[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

}
