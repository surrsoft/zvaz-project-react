// [[asau59]]

/*
ПОНЯТИЯ
-- *id - идентификатор элемента
-- *selList - список *id выбранных элементов
-- *активный-элемент - элемент с которым в последний раз производились действия и т.п.
 */

// *id
export type Asau59Id = string
export type Asau59IdB = string | null

/**
 * Предназначен для хранения текущего состояния какого-либо списка, например того какмие элементы "выбраны"
 */
export default class ListModelAsau59 {
  /**
   * список id выбранных элементов
   */
  private _selectedIds: Set<Asau59Id> = new Set()

  /**
   * id *активного-элемента
   * @private
   */
  private _activeId: Asau59Id | null = null

  activeIdSet(id: Asau59Id) {
    this._activeId = id
  }

  activeId(): Asau59IdB {
    return this._activeId
  }

  activeIdReset() {
    this._activeId = null
  }

  /**
   * возвращает TRUE если id (1) соответствует *активному-элементу
   * @param id
   */
  activeIdIs(id: Asau59Id): boolean {
    return !!id && this._activeId === id
  }

  /**
   * Возвращает (2) (обычно это имя класса) если id (1) соответствует *активному-элементу, иначе возвращает пустую строку
   * @param id (1) --
   * @param str (2) --
   */
  activeIdIsB(id: Asau59Id, str: string): string {
    return this.activeIdIs(id) ? str : ''
  }

  /**
   * Возвращает количество выбранных элементов
   */
  selectElemsCount(): number {
    return this._selectedIds.size
  }

  /**
   * Добавить ids (1) в список выбранных
   * @param ids (1) -- ids элементов
   */
  selectElemsAdd(ids: Asau59Id[]) {
    ids
      .filter(id => !!id)
      .forEach((id: Asau59Id) => {
        this._selectedIds.add(id)
      })
  }

  /**
   * Удалить из *selList элементы (1)
   * @param ids (1) --
   */
  selectElemsDelete(ids: Asau59Id[]) {
    ids
      .filter(el => !!el)
      .forEach(el => {
        this._selectedIds.delete(el)
      })
  }

  /**
   * Возвращает TRUE если элемент (1) есть среди выбранных
   * @param id (1) --
   */
  selectElemIs(id: Asau59Id): boolean {
    return this._selectedIds.has(id)
  }

  /**
   * Очищает список выбранных элементов
   */
  selectElemsClear() {
    this._selectedIds.clear()
  }

  /**
   * Возвращает один ID из выбранных. Если ни одного нет, то возвращает null
   */
  selectElemOne(): Asau59IdB {
    if (this.selectElemsCount() > 0) {
      return this._selectedIds.values().next().value
    }
    return null
  }

  /**
   * выбранные идентификаторы
   */
  selectElems(): Asau59Id[] {
    return Array.from(this._selectedIds)
  }
}
