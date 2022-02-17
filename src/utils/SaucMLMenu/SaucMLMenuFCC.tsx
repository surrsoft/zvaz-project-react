import './saucMLMenuStyles.scss';
import _ from 'lodash';
import { ReactComponent as IconChevron } from './icons/chevron.svg';
import { ReactComponent as IconChevronToLeft } from './icons/chevronToLeft.svg';
import { ReactComponent as IconCircle } from './icons/circle.svg';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RsuvTuTree } from 'rsuv-lib';

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
  isOverflow?: boolean
}

interface SaucElem0 {
  id: SaucMenuElemId
  elems: SaucMenuElem[]
}

const SAUC_ROOT_ID = 'root-id-is'

export default function SaucMLMenuFCC({
                                        menuElems,
                                        iconSubmenu = (<IconChevron/>),
                                        children,
                                        isOverflow = true
                                      }: SaucProps) {

  const [$valMs] = useState<number>(() => {
    // SYNC [[220216134141]]
    const root: any = document.querySelector(':root');
    // SYNC [[220216134343]]
    return Number(getComputedStyle(root).getPropertyValue('--sauc-bs-timeout').replace(' ', '').replace('ms', ''))
  });
  const [$dropdownShow, $dropdownShowSet] = useState(false);
  const [$backElemCurrent, $backElemCurrentSet] = useState<SaucMenuElem | null>(null);
  const [$allBackElems] = useState<Array<SaucMenuElem | null>>([]);
  const [$childrenList, $childrenListSet] = useState<SaucElem0[]>([]);
  const [$currId, $currIdSet] = useState(SAUC_ROOT_ID);
  const [$menuHeight, $menuHeightSet] = useState(null);

  const refElem = useRef(null)

  function fnPopulateRecurs(arrBack: SaucElem0[], elId: SaucMenuElemId, elems?: SaucMenuElem[]) {
    if (elems && elems.length > 0) {
      arrBack.push({id: elId, elems: elems} as SaucElem0)
      elems.forEach(el => {
        fnPopulateRecurs(arrBack, el.id, el.children)
      })
    }
  }

  function transDirectionSet(is: boolean) {
    const root: any = document.querySelector(':root');
    if (root) {
      // SYNC [[220216175236]]
      const val = getComputedStyle(root).getPropertyValue('--sauc-bs-transx0')
      const rr2 = is ? val : ('-' + val).replace(' ', '');
      // SYNC [[220216175308]]
      root.style.setProperty('--sauc-bs-transx', rr2)
    }
  }

  useEffect(() => {
    const ids = RsuvTuTree.values(menuElems, 'id', 'children')
    const b1 = ids.every(el => !!el)
    if (!b1) {
      throw new Error('ERR* having non valid ids [[220216145010]]');
    }
    const b2 = _.uniq(ids).length === ids.length
    if (!b2) {
      throw new Error('ERR* having non uniq ids [[220216145224]]');
    }
  }, []);

  useEffect(() => {
    const childrenList: SaucElem0[] = [{id: SAUC_ROOT_ID, elems: menuElems} as SaucElem0]
    menuElems.forEach((el: SaucMenuElem) => {
      fnPopulateRecurs(childrenList, el.id, el.children)
    })
    $childrenListSet(childrenList)
  }, []);

  useEffect(() => {
    const main: any = refElem.current
    if (main) {
      const firstChild = main.firstChild.firstChild;
      const offsetHeight = firstChild.offsetHeight;
      $menuHeightSet(offsetHeight)
    }
  }, [])

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    $menuHeightSet(height);
  }

  function btnMainHandle() {
    const show = !$dropdownShow;
    if (show) {
      $currIdSet(SAUC_ROOT_ID)
      $backElemCurrentSet(null)
    }
    $dropdownShowSet(show)
  }

  const menuItemClickHandle = (elCurr: SaucMenuElem, children?: SaucMenuElem[]) => () => {
    if (children && children.length > 0) {
      $allBackElems.push($backElemCurrent)
      $backElemCurrentSet(elCurr)
      $currIdSet(elCurr.id)
      transDirectionSet(false)
    }
    elCurr.cb?.(elCurr)
  };

  const backHandle = () => {
    const lastBackElem: any = $allBackElems.splice($allBackElems.length - 1, 1)
    $backElemCurrentSet(lastBackElem[0] || null)
    $currIdSet(lastBackElem[0]?.id || SAUC_ROOT_ID)
    transDirectionSet(true)
  }

  const elemsObjCurr = $childrenList.find(el => el.id === $currId)

  return (
    <div className="sauc-menu">
      <button className="sauc-menu__btn" onClick={btnMainHandle}>{children}</button>
      {!$dropdownShow ? null : (
        <div className="sauc-menu__base" ref={refElem}>
          <TransitionGroup className="sauc-menu__tgroup" style={{height: ($menuHeight) + 'px'}}>
            <CSSTransition
              key={elemsObjCurr?.id}
              classNames="sauc-menu__fade"
              timeout={$valMs}
              onEnter={calcHeight}
              appear={true}
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
          </TransitionGroup>
        </div>
      )}
    </div>
  )
}
