import { MsscSource } from './MsscSource';
import { HoggConnectorAirtable, HoggConnectorNT, HoggOffsetCount, HoggTupleNT, tupleToObject } from 'hogg-lib';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo, RsuvTuPromiseAllSettled,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';
import { MsscFilter } from '../msscComponents/MsscFilter';
import { MsscElem } from '../msscComponents/MsscElem';


class Cls0040 {
  id?: string
}

export class AirSourceParams {
  dbKey: string = ''
  tableName: string = ''
  columns: string[] = []
  /**
   * Должен вернуть JSX.Element для элемента списка.
   * Если не указан - возвращается дефолтный JSX.Element вида <div>```id```</div>
   * @param obj (1) -- модель данных для формирования JSX.Element
   */
  elemJsx?: (obj: object) => JSX.Element
}

export class AirSource implements MsscSource<Cls0040> {
  private connector: HoggConnectorNT;

  constructor(public params: AirSourceParams) {
    const air = new HoggConnectorAirtable()
    air.init({apiKey: process.env.REACT_APP_AIRTABLE_KEY || ''})
    this.connector = air
      .db(params.dbKey)
      .table(params.tableName)
      .columns(params.columns)
  }

  dialogCreate(cbModel: Promise<Cls0040>): Promise<JSX.Element> {
    return Promise.reject(undefined);
  }

  dialogUpdate(id: RsuvTxStringAB, cbModel: Promise<Cls0040>): Promise<JSX.Element> {
    return Promise.reject(undefined);
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    // TODO br реализовать filters
    // TODO br реализовать sorts

    if (filters.length > 0) {
      throw 'ERR* filters - не реализовано'
    }
    if (sorts.length > 0) {
      throw 'ERR* sorts - не реализовано'
    }

    // ---
    const indexStart = indexDiap.indexStart.val;
    const indexEnd = indexDiap.indexEnd.val;
    const hoggOffset = new HoggOffsetCount(false, indexStart, indexEnd - indexStart + 1);
    const queryResult: HoggTupleNT[] = await this.connector.query(hoggOffset) // <=== QUERY
    if (queryResult && queryResult.length > 0) {
      const objs = queryResult.map((elTuple: HoggTupleNT) => {
        return tupleToObject(elTuple)
      }).filter(elObj => elObj !== null)
      // console.log('!!-!!-!! objs {220119092801}\n', JSON.stringify(objs, null, 2))
      const ret = objs.map((elObj: any) => {
        return {
          id: new RsuvTxStringAB(elObj.tid),
          elem: this.params.elemJsx ? this.params.elemJsx(elObj) : (<div>elObj.id</div>)
        } as MsscElem
      });
      return ret;
    }
    return Promise.resolve([]);
  }

  elemsAdd(elems: Cls0040[]): Promise<Array<RsuvResultBoolPknz | Cls0040>> {
    return Promise.reject(undefined);
  }

  async elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    if (filters.length > 0) {
      throw new Error('ERR* filters не реализовано')
    } else {
      const count = await this.connector.countAll()
      return new RsuvTxNumIntAB(count)
    }
  }

  async elemsDelete(elems: Cls0040[]): Promise<Cls0040[]> {
    const promises = elems.map((el: Cls0040) => {
      return this.connector.delete([el.id || ''])
    })
    const pResults = await Promise.allSettled(promises)
    const rejectedList = RsuvTuPromiseAllSettled.rejected(pResults)
    return rejectedList.map(el => {
      return elems[el.ix]
    })
  }

  elemsSet(elems: Cls0040[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

  elemsUpsert(elems: Cls0040[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

}
