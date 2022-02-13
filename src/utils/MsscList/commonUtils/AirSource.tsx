import { MsscIdObject, MsscSource } from '../msscUtils/MsscSource';
import {
  HoggConnectorAirtable,
  HoggConnectorNT,
  HoggOffsetCount, HoggResultAccum,
  HoggTupleNT,
  tupleFrom,
  tupleToObject
} from 'hogg-lib';
import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo, RsuvTu,
  RsuvTuPromiseAllSettled,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';
import { MsscFilter } from '../msscUtils/MsscFilter';
import { MsscElem } from '../msscUtils/MsscElem';
import _ from 'lodash';
import { PElemAsau66, RsuvAsau67 } from 'rsuv-lib/dist/RsuvTuPromiseAllSettled';
import { MsscTag } from '../msscUtils/MsscTag';

type Ty2130 = { index: number, tuple: HoggTupleNT }

type Ty2214 = { field: string; direction: "desc" | "asc" }

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
   * Диалог создания/редактирования элемента. Будет ретранслирован *клиенту
   */
  dialogCreateEditJsx?: (cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object) => Promise<JSX.Element>
  /**
   * см. [220129122002]
   * если указан, будет исползован вместо прописанного в текущем классе дефолтного
   */
  dialogMiddleware?: (obj: T) => object | T | null
  /**
   * на базе (1) нужно сформировать MsscFilter
   */
  cbFilterFromSearchText?: (searchText: string) => MsscFilter[] | null
  /**
   * на базе тегов (1) нужно сформировать MsscFilter
   */
  cbFilterFromTags?: (tags: string[], fieldName: string) => MsscFilter[] | null
}

function msscFiltersToVuscFilter(filters: MsscFilter[]) {
  if (filters && filters.length > 0) {
    const rrTags: string[] = []
    const rr0 = filters.reduce<string[]>((acc, elFilter) => {
      if (elFilter?.paramId?.val && elFilter?.filterValue) {
        if (!elFilter.isArrElemFind) {
          acc.push(`(FIND(LOWER("${elFilter.filterValue}"),LOWER({${elFilter.paramId.val}})))`)
        } else {
          if (elFilter.filterValue !== RsuvTu.RSUV_NO_TAGS_SPC_VALUE) {
            rrTags.push(`(FIND("${elFilter.filterValue}",{${elFilter.paramId.val}}))`)
          } else {
            rrTags.push(`(LEN({${elFilter.paramId.val}}) < 1)`)
          }
        }
      }
      return acc
    }, []);
    const rr2 = rrTags.join(',')
    const rr3 = `AND(${rr2})`
    rr0.push(rr3)
    const rr = rr0.join(',');
    // ---
    return `SUM(${rr})`
  }
  return ''
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

  dialogCreateOrEdit(cbOk: (model: T) => void, cbCancel: () => void, initialValues?: object): Promise<JSX.Element> {
    if (this.params.dialogCreateEditJsx) {
      const initialValues0 = this.dialogMiddleware(initialValues as any)
      return this.params.dialogCreateEditJsx(cbOk, cbCancel, initialValues0 as any)
    }
    return Promise.resolve(<div>no realised</div>)
  }

  private fnFilterSort(filters: MsscFilter[], sorts: RsuvTxSort[]) {
    const filterVusc = msscFiltersToVuscFilter(filters)
    console.log('!!-!!-!! filterVusc {220210183305}\n', filterVusc) // del+
    let sortArrObj: Array<Ty2214> = []
    if (sorts.length > 0) {
      sortArrObj = sorts.map(el => ({
        field: el.id.val,
        direction: el.sortDirect
      } as Ty2214))
    }
    return {filterVusc, sortArrObj};
  }

  async idsAll(filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<string[]> {
    // ---
    let {filterVusc, sortArrObj} = this.fnFilterSort(filters, sorts);
    // ---
    const hoggOffset = new HoggOffsetCount(true);
    this.connector.sort(sortArrObj)
    // --- QUERY
    const queryResult: HoggTupleNT[] = await this.connector
      .filterVusc(filterVusc)
      .query(hoggOffset) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      const objs = queryResult.map((elTuple: HoggTupleNT) => {
        return tupleToObject(elTuple)
      }).filter(elObj => elObj !== null)
      const ret = objs.map((elObj: any) => {
        return elObj.tid
      });
      return ret;
    }
    return Promise.resolve([]);
  }

  async elemsById(ids: MsscIdObject[]): Promise<MsscElem[]> {
    const promises = ids.map(elId => {
      return this.connector.queryOneById(elId.id)
    })
    const rr = await Promise.allSettled(promises)
    if (!RsuvTuPromiseAllSettled.isAllSuccess(rr as PElemAsau66[])) {
      throw new Error('[[220130215035]] not all successed')
    }
    const results: Array<RsuvAsau67> = RsuvTuPromiseAllSettled.fulfilled(rr as PElemAsau66[])
    if (results && results.length > 0) {
      const tuples: HoggTupleNT[] = results.map((el: RsuvAsau67) => el.value as HoggTupleNT)
      return this.toMsscElems(tuples);
    }
    return Promise.resolve([]);
  }

  async elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    let {filterVusc, sortArrObj} = this.fnFilterSort(filters, sorts);
    // ---
    const indexStart = indexDiap.indexStart.val;
    const indexEnd = indexDiap.indexEnd.val;
    const hoggOffset = new HoggOffsetCount(false, indexStart, indexEnd - indexStart + 1);
    this.connector.sort(sortArrObj)
    // --- QUERY
    const queryResult: HoggTupleNT[] = await this.connector
      .filterVusc(filterVusc)
      .query(hoggOffset) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      return this.toMsscElems(queryResult);
    }
    return Promise.resolve([]);
  }

  private toMsscElems(queryResult: HoggTupleNT[]) {
    const objs = queryResult.map((elTuple: HoggTupleNT) => {
      return tupleToObject(elTuple)
    }).filter(elObj => elObj !== null)
    const ret = objs.map((elObj: any) => {
      return {
        id: new RsuvTxStringAB(elObj.tid),
        elem: this.params.elemJsx ? this.params.elemJsx(elObj) : (<div>elObj.id</div>),
        elemModel: elObj
      } as MsscElem
    });
    return ret;
  }

  async elemsAdd(elems: T[]): Promise<Array<RsuvResultBoolPknz | T>> {
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
    let vuscFilter: string = '';
    if (filters.length > 0) {
      vuscFilter = msscFiltersToVuscFilter(filters);
    }
    let count;
    count = await this.connector.filterVusc(vuscFilter).countAll()
    return new RsuvTxNumIntAB(count)
  }

  async elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]> {
    const promises = elems.map((el: any) => {
      return this.connector.delete([el.id || ''])
    })
    const pResults = await Promise.allSettled(promises)
    const rejectedList = RsuvTuPromiseAllSettled.rejected(pResults as PElemAsau66[])
    return rejectedList.map(el => {
      return elems[el.ix]
    })
  }

  async elemsSet(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    const elems0 = elems.map((el: any) => {
      const ell = _.cloneDeep(el)
      ell.tid = ell.id
      delete ell.id
      return ell
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
    const result = await this.connector.update(tuples0)
    if (result.value) {
      return elems0.map((el, ix) => {
        const rr = validTuples.find(el0 => el0.index === ix)
        if (rr) {
          return new RsuvResultTibo({success: true, value: RsuvEnResultCrudSet.UPDATED})
        } else {
          return new RsuvResultTibo({success: false, errCode: '[[220129125638]]'})
        }
      })
    }
    throw new Error('[[220129125711]]')
  }

  elemsUpsert(elems: T[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

  dialogMiddleware(obj?: T): object | T | null {
    if (obj) {
      if (this.params.dialogMiddleware) {
        return this.params.dialogMiddleware(obj)
      }
      const obj0: any = _.cloneDeep(obj)
      obj0.id = obj0.tid;
      return obj0;
    }
    return null;
  }

  filterFromSearchText(searchText: string): MsscFilter[] | null {
    if (searchText) {
      return this.params.cbFilterFromSearchText?.(searchText) || null
    }
    return null
  }

  filterFromTags(tags: string[], fieldName: string): MsscFilter[] | null {
    if (tags && tags.length > 0) {
      return this.params.cbFilterFromTags?.(tags, fieldName) || null
    }
    return null;
  }


  async tags(filters: MsscFilter[], fieldName: string): Promise<MsscTag[]> {
    let {filterVusc} = this.fnFilterSort(filters, []);
    // ---
    const hoggOffset = new HoggOffsetCount(true);
    // --- QUERY
    const queryResult: HoggResultAccum[] = await this.connector
      .filterVusc(filterVusc)
      .queryAccum(hoggOffset, fieldName) // <=== QUERY
    // ---
    if (queryResult && queryResult.length > 0) {
      return queryResult.map(el => {
        return new MsscTag(el.value, el.ids.length)
      })
    }
    return [];
  }

}
