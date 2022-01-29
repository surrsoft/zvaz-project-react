import { BrSelectId, BrSelectItem, BrSelectSortData } from './brSelectUtils';
import { useState } from 'react';

export interface BrSelectProps<T> {
  data: BrSelectSortData<T>
  /**
   * вызывается когда пользователь делает выбор
   * @param selectedId
   */
  cbSelect?: (selected: BrSelectItem<T>) => void
  /**
   * id выбранного элемента. Если указан, то переопределяет id из 'data`
   */
  selectedId?: BrSelectId | undefined
}

export default function BrSelect<T>({data, cbSelect, selectedId}: BrSelectProps<T>) {

  let selectedIndex = 0;
  let sId = selectedId || data.selectedId
  if (sId) {
    const ix = data.items.findIndex(el => el.idElem === sId)
    if (ix !== -1) {
      selectedIndex = ix
    } else {
      console.warn(`BR-WARN unknown selectedId [${sId}]`)
    }
  }

  const [$selectedId, $selectedIdSet] = useState(data.items[selectedIndex].idElem);

  const changeHandler = (ev: any) => {
    const val = ev.target.value
    if (cbSelect) {
      const item = data.items.find(el => el.idElem === val)
      if (item) {
        $selectedIdSet(item.idElem)
        cbSelect(item)
      }
    }
  }

  return (<div className="br-select-block">
    <select
      className="br-select-block__select"
      defaultValue={$selectedId}
      onChange={changeHandler}
      value={$selectedId}
    >
      {
        data.items.map((el) => {
          return (
            <option
              className="br-select-block__option"
              key={el.idElem} value={el.idElem}
            >
              {el.text}
            </option>
          )
        })
      }
    </select>
  </div>)
}
