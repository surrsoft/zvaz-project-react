import {
  RsuvEnResultCrudSet,
  RsuvResultBoolPknz,
  RsuvResultTibo,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort, RsuvTxStringAB
} from 'rsuv-lib';
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
   * Возвращает элементы из диапазона (1) удовлетворяющие фильтрам (2) с сортировкой согласно (3)
   *
   * @param indexDiap (1) -- начальный и конечный индексы рассматриваются "включительно", т.е. например для
   * диапазона [0..1] должно вернуться 2 элемента (при условии что в хранилище элементов больше одного)
   * @param filters (2) -- если пустой массив, то не применяется
   * @param sorts (3) -- если пустой массив, то не применяется
   */
  elems(indexDiap: RsuvTxNumIntDiap, filters: MsscFilter[], sorts: RsuvTxSort[]): Promise<MsscElem[]>

  /**
   * Создаёт записи для элементов из (1).
   *
   * Возвращает список той же длины что (1), с теми же элементами, но в месте
   * расположения элементов для которых не удалось создать запись, будет содержаться объект {@link RsuvResultBoolPknz}
   * с информацией о причинах проблемы.
   * У элементов для которых удалось создать запись, будет поле id с индентификатором созданной записи
   *
   * @param elems (1) --
   */
  elemsAdd(elems: TModel[]): Promise<Array<TModel | RsuvResultBoolPknz>>

  /**
   * Удаляет записи соответствующие элементам из (1).
   * Возвращает пустой массив если все элементы были успешно удалены,
   * или список тех элементов (1) записи которых удалить не удалось.
   * @param elems (1) -- любой объект обладающий полем `id`
   */
  elemsDelete(elems: MsscIdObject[]): Promise<MsscIdObject[]>

  /**
   * Выполняет set operation (см. [asau45]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsSet(elems: TModel[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>

  /**
   * Выполняет upsert operation (см. [asau46]) для элементов из (1).
   *
   * Возвращает массив той же длины, что и (1) но со
   * специальными объектами описывающими результат операции для каждого элемента - был ли обновлен существующий элемент,
   * или был создан новый или произошла ошибка (в случае ошибки у объекта {@link RsuvResultTibo}
   * заполнены поля `errCode`, `errMessage`). Расположение объектов-результатов
   * соответствует расположению исходных объектов
   *
   * @param elems
   */
  elemsUpsert(elems: TModel[]): Promise<Array<RsuvResultTibo<RsuvEnResultCrudSet>>>

  /**
   * Возвращает диалог создания элемента. *С-компонент показывает его. Когда пользователь нажимает ОК вызывается (1)
   * с моделью данных
   * @param cbOk (1) -- колбэк, который *клиент должен вызвать по нажатию ОК
   * @param cbCancel (2) -- колбэк, который *клиент должен вызвать по нажатию Cancel
   */
  dialogCreate(cbOk: (model: TModel) => void, cbCancel: () => void): Promise<JSX.Element>

  /**
   * Возвращает диалог редактирования элемента (1). *С-компонент показывает его. Когда пользователь нажимает SAVE вызывается (2)
   * с обновлённой моделью данных
   * @param id (1) --
   * @param cbModel (2) --
   */
  dialogUpdate(id: RsuvTxStringAB, cbModel: Promise<TModel>): Promise<JSX.Element>
}

/**
 * Любой объект обладающий полем `id`
 */
export type MsscIdObject = { id: string, [key: string]: any }
