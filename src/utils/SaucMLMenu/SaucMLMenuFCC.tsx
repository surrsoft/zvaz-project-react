import './saucMLMenuStyles.scss';
import { ReactComponent as IconChevron } from './icons/chevron.svg';
import { ReactComponent as IconChevronToLeft } from './icons/chevronToLeft.svg';
import { ReactComponent as IconCircle } from './icons/circle.svg';
import _ from 'lodash';
import { ReactNode, useEffect, useState } from 'react';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

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

interface SaucElem0 {
  id: SaucMenuElemId
  elems: SaucMenuElem[]
}

const ROOT_ID = 'root-id-is'

export default function SaucMLMenuFCC({menuElems, iconSubmenu = (<IconChevron/>), children}: SaucProps) {

  const [$valMs] = useState<number>(() => {
    // SYNC [[220216134141]]
    const root: any = document.querySelector('.sauc-menu');
    // SYNC [[220216134343]]
    return Number(getComputedStyle(root).getPropertyValue('--sauc-bs-timeout').replace(' ', '').replace('ms', ''))
  });
  const [$dropdownShow, $dropdownShowSet] = useState(false);
  const [$menuElemsCurrent, $menuElemsCurrentSet] = useState<SaucMenuElem[]>(menuElems);
  const [$backElemCurrent, $backElemCurrentSet] = useState<SaucMenuElem | null>(null);
  const [$allBackElems] = useState<Array<SaucMenuElem | null>>([]);
  const [$allMenuElems] = useState<SaucMenuElem[][]>([]);
  const [$childrenList, $childrenListSet] = useState<SaucElem0[]>([]);
  const [$currId, $currIdSet] = useState(ROOT_ID);

  function fnPopulateRecurs(arrBack: SaucElem0[], elId: SaucMenuElemId, elems?: SaucMenuElem[]) {
    if (elems && elems.length > 0) {
      arrBack.push({id: elId, elems: elems} as SaucElem0)
      elems.forEach(el => {
        fnPopulateRecurs(arrBack, el.id, el.children)
      })
    }
  }

  function varChange(is: boolean) {
    const root: any = document.querySelector('.sauc-menu');
    if (root) {
      const val = getComputedStyle(root).getPropertyValue('--sauc-bs-transx0')
      const rr2 = is ? val : ('-' + val).replace(' ', '');
      root.style.setProperty('--sauc-bs-transx', rr2)
    }
  }

  useEffect(() => {
    const childrenList: SaucElem0[] = [{id: ROOT_ID, elems: menuElems} as SaucElem0]
    menuElems.forEach((el: SaucMenuElem) => {
      fnPopulateRecurs(childrenList, el.id, el.children)
    })
    $childrenListSet(childrenList)
  }, []);

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
      $currIdSet(elBack.id)
      varChange(false)
    }
  };

  const backHandle = () => {
    const lastBackElem: any = $allBackElems.splice($allBackElems.length - 1, 1)
    const lastMenuElems: any = $allMenuElems.splice($allMenuElems.length - 1, 1)
    // ---
    $backElemCurrentSet(lastBackElem[0])
    $menuElemsCurrentSet(lastMenuElems[0])
    $currIdSet(lastBackElem[0] || ROOT_ID)
    varChange(true)
  }



  const elemsObjCurr = $childrenList.find(el => el.id === $currId)

  return (
    <div className="sauc-menu">
      <button className="sauc-menu__btn" onClick={btnMainHandle}>{children}</button>
      {!$dropdownShow ? null : (
        <TransitionGroup className="sauc-menu__tgroup">
          <CSSTransition
            key={elemsObjCurr?.id}
            classNames="sauc-menu__fade"
            timeout={$valMs}
          >
            <div className="sauc-dropdown">
              {!$backElemCurrent ? null : (
                <div key={$backElemCurrent.id} className="sauc-menu__back-item" onClick={backHandle}>
                  <div className="back-item__icon"><IconChevronToLeft/></div>
                  <div className="back-item__body">{$backElemCurrent.body}</div>
                </div>)}
              {
                elemsObjCurr?.elems.map((el: SaucMenuElem) => {
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


          {/*<CSSTransition*/}
          {/*  classNames="fade"*/}
          {/*  timeout={100}*/}
          {/*>*/}
          {/*  <div className="sauc-dropdown" key={$backElemCurrent ? $backElemCurrent.id : 'temp-001'}>*/}
          {/*    {!$backElemCurrent ? null : (*/}
          {/*      <div key={$backElemCurrent.id} className="sauc-menu__back-item" onClick={backHandle}>*/}
          {/*        <div className="back-item__icon"><IconChevronToLeft/></div>*/}
          {/*        <div className="back-item__body">{$backElemCurrent.body}</div>*/}
          {/*      </div>)}*/}
          {/*    {*/}
          {/*      $menuElemsCurrent.map((el: SaucMenuElem) => {*/}
          {/*        return (*/}
          {/*          <div key={el.id} className="sauc-dropdown__elem" onClick={menuItemClickHandle(el, el.children)}>*/}
          {/*            <div className="elem__icon">{el.icon || (<IconCircle/>)}</div>*/}
          {/*            <div className="elem__body">{el.body}</div>*/}
          {/*            {*/}
          {/*              _.isEmpty(el.children) ? null : (<div className="elem__icon-sub">{iconSubmenu}</div>)*/}
          {/*            }*/}
          {/*          </div>*/}
          {/*        )*/}
          {/*      })*/}
          {/*    }*/}
          {/*  </div>*/}
          {/*</CSSTransition>*/}
        </TransitionGroup>
      )}
    </div>
  )
}
