import SvgIconMenu from '../../commonIcons/SvgIconMenu/SvgIconMenu';
import React, { useEffect, useRef, useState } from 'react';
import './stylesMenuAsau54.css';

// ID [[asau54]]
// ИСПОЛЬЗОВАННЫЕ ТЕХНИКИ: [asau58]


export class Asau54Data {
  id: string = ''
  items: Asau54Item[] = []
}

/**
 * идентификатор действия которое пункт меню представляет
 */
export type Asau54IdAction = string
/**
 * текст для отображения на пункте меню
 */
export type Asau54ActionText = string

/**
 * представляет элемент меню
 */
export class Asau54Item {
  idAction: Asau54IdAction = ''
  text: Asau54ActionText = ''
}

export class Asau54SelectResult {
  idAction?: Asau54IdAction
  idElem?: string
}

export class Asau54Props {
  /**
   * Данные описывающие пункты меню
   */
  data?: Asau54Data
  /**
   * Вызывается когда сделан выбор пункта
   * @param el (1) -- выбранный пункт
   */
  cbOnSelected?: (el: Asau54SelectResult) => void
}

function MenuAsau54FCC({data, cbOnSelected}: Asau54Props) {
  const [$isListShowed, $isListShowedSet] = useState(false);
  const refBtnDropdown = useRef(null)

  // обработчик нажатия на кнопку меню
  const onClickHandler = () => {
    $isListShowedSet((prev) => {
      return !prev
    })
  };

  const btnOnClick = (idAction: Asau54IdAction, idElem: string) => (ev: any) => {
    ev.stopPropagation()
    console.log('!!-!!-!! idAction {220122201452}\n', idAction) // del+
    console.log('!!-!!-!! idElem {220122201452}\n', idElem) // del+
    $isListShowedSet(false)
    if (cbOnSelected) {
      cbOnSelected({idAction, idElem})
    }
  };

  // срабатывает при любом клике гдебы то нибыло
  const eventClickHandle = (ev: any) => {
    const ix = ev.path.findIndex((el: any) => {
      return el === refBtnDropdown.current;
    })
    if (ix === -1) {
      // ^ если нажатие вне кнопки меню (т.е. в цепочке прохождения события нажатия не нашлось текущего экземпляра
      // кнопки меню)
      $isListShowedSet(false)
    }
  };

  useEffect(() => {
    document.removeEventListener('click', eventClickHandle)
    document.addEventListener('click', eventClickHandle)
    return () => {
      document.removeEventListener('click', eventClickHandle)
    }
  }, []);

  return (
    <div className="asau54-dropdown">
      <button
        ref={refBtnDropdown}
        onClick={onClickHandler}
        className="asau54-dropdown__btn"
      >
        <SvgIconMenu width="24px" height="24px"/>
      </button>
      {!$isListShowed ? null : <div className="asau54-dropdown__content">
        {data?.items.map((el) => {
          return (
            <button
              className="asau54-dropdown__elbutton"
              key={el.idAction}
              onClick={btnOnClick(el.idAction, data.id)}
            >
              {el.text}
            </button>
          )
        })}
      </div>}
    </div>
  )
}

export default MenuAsau54FCC;
