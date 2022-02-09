import './brMultiselectStyles.scss';
import { useState } from 'react';
import classNames from 'classnames';

// [[asau73]]

/*
ПОНЯТИЯ:
-- *t-component, *т-компонент - текущий компонент
 */

export class DataElemAtAsau73 {
  constructor(
    public id: string,
    public visibleText: string,
    public checked: boolean = false,
    public disabled: boolean = false,
    public payload?: any
  ) {

  }
}

export interface PropsAtAsau73 {
  /**
   *
   */
  datas?: DataElemAtAsau73[]
  /**
   * *Т-компонент вызывает это при установке/снятии галки, передавая в (1) список текущих чекнутых элементов
   * (т.е. в состоянии после установки/снятия галки)
   * @param data (1) --
   */
  cbOnChange?: (checkedList: DataElemAtAsau73[]) => void
}

export default function BrMultiselect({datas = [], cbOnChange}: PropsAtAsau73) {
  const [$selectCount, $selectCountSet] = useState(() => {
    return datas.filter(el => el.checked)?.length || 0
  });
  const [$dropdownShow, $dropdownShowSet] = useState(false);

  function btnHandle() {
    $dropdownShowSet(!$dropdownShow)
  }

  const checkboxChange = (elem: DataElemAtAsau73) => (ev: any) => {
    const checked = ev?.target?.checked
    console.log('!!-!!-!! checked {220209222217}\n', checked) // del+
    console.log('!!-!!-!! elem {220209222550}\n', elem) // del+
    if (cbOnChange) {
      if (checked) {
        const rr = datas.find(el => el.id === elem.id)
        if (rr) {
          rr.checked = true
        }
        cbOnChange(datas.filter(el => el.checked))
      } else {
        cbOnChange(datas.filter(el => el.id !== elem.id && el.checked))
      }
    }
  };

  return (<div className="br-mselect">
    <button onClick={btnHandle}>selected {$selectCount}</button>
    <div className={classNames('br-mselect__dropdown', {'br-mselect__dropdown_showed': $dropdownShow})}>
      {
        datas.map(el => {
          return (
            <div key={el.id}>
              <input
                type="checkbox"
                checked={el.checked}
                disabled={el.disabled}
                onChange={checkboxChange(el)}
              /> <span
              className={classNames('br-mselect__text', {'br-mselect__text_disabled': el.disabled})}>{el.visibleText}</span>
            </div>
          )
        })
      }
    </div>
  </div>)
}
