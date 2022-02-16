import './saucMLMenuStyles.scss';
import { ReactComponent as IconChevron } from './icons/chevron.svg';
import { ReactComponent as IconChevronToLeft } from './icons/chevronToLeft.svg';
import { ReactComponent as IconCircle } from './icons/circle.svg';
import _ from 'lodash';
import { ReactNode, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export type SaucMenuElemId = string

export interface SaucMenuElem {
  id: SaucMenuElemId
  icon?: JSX.Element
  body?: JSX.Element
  children?: SaucMenuElem[]
  cb?: (elem: SaucMenuElem) => void
}

export interface SaucProps {
  menuElems: SaucMenuElem[]
  /**
   * иконка для показа справа у пунктов меню имеющих подменю
   */
  iconSubmenu?: JSX.Element
  children?: ReactNode
}

export default function SaucMLMenuFCC({menuElems, iconSubmenu = (<IconChevron/>), children}: SaucProps) {

  const [$dropdownShow, $dropdownShowSet] = useState(false);
  const [$menuElemsCurrent, $menuElemsCurrentSet] = useState<SaucMenuElem[]>(menuElems);
  const [$backElemCurrent, $backElemCurrentSet] = useState<SaucMenuElem | null>(null);
  const [$allBackElems] = useState<Array<SaucMenuElem | null>>([]);
  const [$allMenuElems] = useState<SaucMenuElem[][]>([]);
  const [$spc, $spcSet] = useState(Date.now());
  const [$transIn, $transInSet] = useState(false);

  function btnMainHandle() {
    $dropdownShowSet(!$dropdownShow)
  }

  const menuItemClickHandle = (elBack: SaucMenuElem, children?: SaucMenuElem[]) => () => {
    if (children && children.length > 0) {
      $allBackElems.push($backElemCurrent)
      $allMenuElems.push($menuElemsCurrent)
      // ---
      $backElemCurrentSet(elBack)
      $menuElemsCurrentSet(children)
      $spcSet(Date.now())
      $transInSet(!$transIn)
    }
  };

  const backHandle = () => {
    const lastBackElem: any = $allBackElems.splice($allBackElems.length - 1, 1)
    const lastMenuElems: any = $allMenuElems.splice($allMenuElems.length - 1, 1)
    // ---
    $backElemCurrentSet(lastBackElem[0])
    $menuElemsCurrentSet(lastMenuElems[0])
    $spcSet(Date.now())
    $transInSet(!$transIn)
  }

  return (
    <div className="sauc-menu">
      <button className="sauc-menu__btn" onClick={btnMainHandle}>{children}</button>
      {!$dropdownShow ? null : (
        <CSSTransition
          in={$transIn}
          classNames="fade"
          timeout={100}
        >
          <div className="sauc-dropdown" key={$backElemCurrent ? $backElemCurrent.id : 'temp-001'}>
            {!$backElemCurrent ? null : (
              <div key={$backElemCurrent.id} className="sauc-menu__back-item" onClick={backHandle}>
                <div className="back-item__icon"><IconChevronToLeft/></div>
                <div className="back-item__body">{$backElemCurrent.body}</div>
              </div>)}
            {
              $menuElemsCurrent.map((el: SaucMenuElem) => {
                return (
                  <div key={el.id} className="sauc-dropdown__elem" onClick={menuItemClickHandle(el, el.children)}>
                    <div className="elem__icon">{el.icon || (<IconCircle/>)}</div>
                    <div className="elem__body">{el.body}</div>
                    {
                      _.isEmpty(el.children) ? null : (<div className="elem__icon-sub">{iconSubmenu}</div>)
                    }
                  </div>
                )
              })
            }
          </div>
        </CSSTransition>
      )}
    </div>
  )
}
