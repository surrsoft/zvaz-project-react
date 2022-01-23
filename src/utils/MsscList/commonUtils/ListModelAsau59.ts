// [[asau59]]

/*
ПОНЯТИЯ
-- *id - идентификатор элемента
-- *selList - список *id выбранных элементов
 */

// *id
export type Asau59Id = string

export default class ListModelAsau59 {
  /**
   * список id выбранных элементов
   */
  private selectedIds: Set<Asau59Id> = new Set()

  /**
   * Возвращает количество выбранных элементов
   */
  selectElemsCount(): number {
    return this.selectedIds.size
  }

  /**
   * Добавить ids (1) в список выбранных
   * @param ids (1) -- ids элементов
   */
  selectElemsAdd(ids: Asau59Id[]) {
    ids
      .filter(id => !!id)
      .forEach((id: Asau59Id) => {
        this.selectedIds.add(id)
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
        this.selectedIds.delete(el)
      })
  }

  /**
   * Возвращает TRUE если элемент (1) есть среди выбранных
   * @param id (1) --
   */
  selectElemIs(id: Asau59Id): boolean {
    return this.selectedIds.has(id)
  }

  /**
   * Очищает список выбранных элементов
   */
  selectElemsClear() {
    this.selectedIds.clear()
  }

  /**
   * Возвращает один ID из выбранных. Если ни одного нет, то возвращает null
   */
  selectElemOne(): Asau59Id | null {
    if (this.selectElemsCount() > 0) {
      return this.selectedIds.values().next().value
    }
    return null
  }

  /**
   * выбранные идентификаторы
   */
  selectElems(): Asau59Id[] {
    return Array.from(this.selectedIds)
  }
}
