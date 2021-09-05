/*
UeurSelectNav

Простой выпадающий список играющий роль навигатора между страницами.

ВНЕШНИЙ ВИД: https://drive.google.com/drive/folders/16jaRv6v2J64EDnge_V5h2NFN3DdoSo_a?usp=sharing

ID [[210808111533]] rev 1 1.1.0 2021-08-08
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { WnouT2, WnouT3 } from '../../utils/WnouLib';

interface UeurSelectNavProps {
  /**
   * В options..value нужно указывать уникальные строки, любые.
   * В options..text нужно указывать строки которые будут отображаться как пункты выпадающего списка.
   * В options..subValue нужно указывать пути, например '/some', на которые будет выполняться переход при выборе
   * элемента выпадающего списка.
   * В selectedValue следует указать один из текстом указанных в options..value, это определяет пункт с которого
   * выпадающий список начнёт отображаться
   */
  data: WnouT2<any | string>
}

const UeurSelectNav: React.FC<UeurSelectNavProps> = ({data}) => {
  const [selectValue, selectValueSet] = useState(data.selectedValue);
  const history = useHistory();
  // ---
  return <>
    <select
      value={selectValue}
      onChange={(ev) => {
        // @ts-ignore
        selectValueSet(ev.target.value);
        const option = data.options.find(el => el.value === ev.target.value);
        if (option) {
          history.push(option.subValue || '');
          if (option.callback) {
            option.callback(ev)
          }
        }

      }}
    >
      {
        data.options.map((op: WnouT3<any>) => (
          <option
            key={op.value}
            value={op.value}
          >{op.text}</option>
        ))
      }
    </select>
  </>
}

export default UeurSelectNav;
