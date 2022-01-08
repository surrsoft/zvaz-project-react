import { RsuvResultTibo, RsuvSearchElems, RsuvTxNumIntAB } from 'rsuv-lib'

export class MsscFilter2 {
  constructor(public elems: RsuvSearchElems) {}
}

/**
 * ПОНЯТИЯ:
 * -- А -
 *
 * @type <T> тип данных получаемых из А, и отправляемых для А
 */
export interface MsscDataSource<T> {

  /**
   * Общее число элементов
   */
  elemsCountAll(): Promise<RsuvResultTibo<RsuvTxNumIntAB>>

  /**
   * Число элементов удовлетворяющих фильтру (1)
   * @param filter (1)
   */
  elemsCount(filter: MsscFilter2): Promise<RsuvResultTibo<RsuvTxNumIntAB>>

  /**
   * Элементы удолетворяющие фильтру (1). Если (1) is falsy то возвращает первые элементы (10 максимум)
   * @param filter (1) --
   */
  elems(filter: MsscFilter2): Promise<RsuvResultTibo<T[]>>

  /**
   * С каждым элементом из (1) поступает так: добавляет его как новый.
   * Возвращает {success: true, ...} если все элементы были успешно добавлены.
   * Возвращает {success: false, ...} если некоторые, или все, элементы не были добавлены; в этом случае
   * в поле value будет массив не добавленных элементов.
   * Возвращает {success: false, value: null, ...} в случае других проблем.
   * @param elems (1) -
   */
  elemsAdd(elems: T[]): Promise<RsuvResultTibo<T[]>>

  /**
   * С каждым элементом А из (1) поступает так: ищет уже существующий элемент, если находит то очищает все
   * его поля, после чего наполняет его данными из А; если не находит, добавляет новый элемент.
   * Возвращает {success: true, ...} если все элементы были успешно обновлены или добавлены; в поле value
   * будет список элементов которые были добавлены, с их id после добавления.
   * Возвращает {success: false, value: null, ...} в случае проблем.
   * @param elems (1) -
   */
  elemsSet(elems: T[]): Promise<RsuvResultTibo<T[]>>

  /**
   * С каждым элементом А из (1) поступает так: ищет уже существующий элемент, если находит то делает
   * поверхностное (shallow) объединение его с А; если не находит, добавляет новый элемент.
   * Возвращает {success: true, ...} если все элементы были успешно обновлены или добавлены; в поле value
   * будет список элементов которые были добавлены, с их id после добавления.
   * Возвращает {success: false, value: null, ...} в случае проблем.
   * @param elems (1) -
   */
  elemsUpsert(elems: T[]): Promise<RsuvResultTibo<T[]>>

}
