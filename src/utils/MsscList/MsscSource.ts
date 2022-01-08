import { RsuvTxNumIntAB, RsuvTxNumIntDiap, RsuvTxSort } from 'rsuv-lib';
import { MsscElem } from './MsscElem';
import { MsscFilter } from './MsscFilter';

export interface MsscSource<TModel> {

  /**
   * Возвращает общее количество элементов удовлетворяющих фильтрам (1). Если (1) это пустой массив то возвращает
   * просто общее количество элементов
   * @param filters
   */
  elemsCountByFilter(filters: MsscFilter[]): Promise<RsuvTxNumIntAB>

  /**
   * Возращает элементы из диапазона (1) удовлетворяющие фильтрам (2) с сортировкой согласно (3)
   * @param indexDiap (1) --
   * @param filters (2) -- если пустой массив, то не применяется
   * @param sorts (3) -- если пустой массив, то не применяется
   */
  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]>


  dialogCreate(cb: () => TModel): Promise<JSX.Element>
}
