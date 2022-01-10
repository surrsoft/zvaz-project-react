import {
  RsuvEnResultCrudSet,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAB
} from 'rsuv-lib';
import { MsscSource } from '../../utils/MsscList/MsscSource';
import { MsscFilter } from '../../utils/MsscList/MsscFilter';
import { MsscElem } from '../../utils/MsscList/MsscElem';

export class MsscSourceImplJsonServer implements MsscSource<any> {
  dialogCreate(cbModel: Promise<any>): Promise<JSX.Element> {
    return Promise.resolve((<div>111</div>));
  }

  dialogUpdate(id: RsuvTxStringAB, cbModel: Promise<any>): Promise<JSX.Element> {
    return Promise.resolve((<div>111</div>));
  }

  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]> {
    return Promise.resolve([]);
  }

  elemsAdd(elems: any[]): Promise<Array<any>> {
    return Promise.resolve([]);
  }

  elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB> {
    return Promise.reject(undefined);
  }

  elemsDelete(elems: any[]): Promise<any[]> {
    return Promise.resolve([]);
  }

  elemsSet(elems: any[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }

  elemsUpsert(elems: any[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>> {
    return Promise.reject(undefined);
  }
}
