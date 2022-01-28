import { MsscIdObject, MsscSource } from '../msscUtils/MsscSource';
import {
  HoggConnectorAirtable,
  HoggConnectorNT,
  HoggOffsetCount,
  HoggTupleNT,
  tupleFrom,
  tupleToObject
} from 'hogg-lib';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo, RsuvTuPromiseAllSettled,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';
import { MsscFilter } from '../msscUtils/MsscFilter';
import { MsscElem } from '../msscUtils/MsscElem';
import _ from 'lodash';

type Ty2130 = { index: number, tuple: HoggTupleNT }

export class AirSourceParams<T> {
  dbKey: string = ''
  tableName: string = ''
  columns: string[] = []
  /**
   * Должен вернуть JSX.Element для элемента списка.
   * Если не указан - возвращается дефолтный JSX.Element вида <div>```id```</div>
   * @param obj (1) -- модель данных для формирования JSX.Element
   */
  elemJsx?: (obj: object) => JSX.Element
  /**
   * Диалог создания элемента. Будет ретранслирован *клиенту
   */
  dialogCreateJsx?: (cbOk: (model: T) => void, cbCancel: () => void) => Promise<JSX.Element>
}

export class AirSource<T> implements MsscSource<T> {
  private connector: HoggConnectorNT;

  constructor(public params: AirSourceParams<T>) {
    const air = new HoggConnectorAirtable()
    air.init({apiKey: process.env.REACT_APP_AIRTABLE_KEY || ''})
    this.connector = air
      .db(params.dbKey)
      .table(params.tableName)
      .columns(params.columns)
  }

  dialogCreate(cbOk: (model: T) => void, cbCancel: () => void): Promise<JSX.Element> {
    if (this.params.dialogCreateJsx) {
      return this.params.dialogCreateJsx(cbOk, cbCancel)
    }
    return Promise.resolve(<div>no realised</div>)
  }

  dialogUpdate(id: RsuvTxStringAB, cbModel: Promise<T>): Promise<JSX.Element> {
    return Promise.reject(undefined);
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    // TODO br реализовать filters
    // TODO br реализовать sorts

    if (filters.length > 0) {
      throw new Error('ERR* filters - не реализовано')
    }
    if (sorts.length > 0) {
      throw new Error('ERR* sorts - не реализовано')
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

  async elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
    console.log('!!-!!-!! elems {220126210803}\n', elems) // del+
    debugger; // del+
    const elems0 = elems.map((el: any) => {
      return _.omit(el, 'id')
    })
    const tuples: (HoggTupleNT | null)[] = elems0.map((el: any) => {
      return tupleFrom(el)
    })
    // отбираем только те для которых успешно создался tuple
    const validTuples = tuples.reduce<Ty2130[]>((acc: Ty2130[], tuple: HoggTupleNT | null, ix: number) => {
      if (tuple) acc.push({index: ix, tuple: tuple})
      return acc;
    }, [])
    const tuples0 = validTuples.map((el: any) => el.tuple)
    const createResult = await this.connector.create(tuples0)
    console.log('!!-!!-!! createResult {220126210418}\n', createResult) // del+
    debugger; // del+
    if (createResult.success && createResult.value) {
      const ids: string[] | undefined = createResult.value
      return elems.reduce((acc: any, el: any, ix: number) => {
        const tix = validTuples.findIndex((el0: Ty2130) => el0.index === ix)
        if (ix === tix) {
          el.id = ids[ix]
          acc.push(el)
        } else {
          new RsuvResultBoolPknz(false)
        }
        return acc
      }, [])
    }
    return Promise.reject(new Error(createResult.errCode + ' : ' + createResult.errMessage));
  }

  async elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    if (filters.length > 0) {
      throw new Error('ERR* filters не реализовано')
    } else {
      const count = await this.connector.countAll()
      return new RsuvTxNumIntAB(count)
    }
  }

  async elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]> {
    const promises = elems.map((el: any) => {
      return this.connector.delete([el.id || ''])
    })
    const pResults = await Promise.allSettled(promises)
    const rejectedList = RsuvTuPromiseAllSettled.rejected(pResults)
    return rejectedList.map(el => {
      return elems[el.ix]
    })
  }

  elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

  elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

}
