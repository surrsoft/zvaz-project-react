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

export type SaucElemStruct = (icon: JSX.Element, body: JSX.Element, subIcon: JSX.Element | null) => JSX.Element

export interface SaucProps {
  menuElems: SaucMenuElem[]
  /**
   * иконка для показа справа у пунктов меню имеющих подменю
   */
  iconSubmenu?: JSX.Element
  children?: ReactNode
  elemCustomStruct?: SaucElemStruct
}

interface SaucElem0 {
  id: SaucMenuElemId
  elems: SaucMenuElem[]
}

const SAUC_ROOT_ID = 'root-id-is'

export default function SaucMLMenuFCC({
                                        menuElems,
                                        iconSubmenu = (<div className="sauc-menu__achevron"><IconChevron/></div>),
                                        children,
                                        elemCustomStruct
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
  const refBtn = useRef(null)

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

  function recalc() {
    $recalcSet(!recalc)
  }

  function btnMainHandle() {
    const show = !$dropdownShow;
    if (show) {
      $currIdSet(SAUC_ROOT_ID)
      $backElemCurrentSet(null)
    }
    $dropdownShowSet(show)
    recalc()
  }

  const [$recalc, $recalcSet] = useState(false);

  const menuItemClickHandle = (elCurr: SaucMenuElem, children?: SaucMenuElem[]) => () => {
    if (children && children.length > 0) {
      $allBackElems.push($backElemCurrent)
      $backElemCurrentSet(elCurr)
      $currIdSet(elCurr.id)
      transDirectionSet(false)
    }
    elCurr.cb?.(elCurr)
    recalc()
  };

  const backHandle = () => {
    const lastBackElem: any = $allBackElems.splice($allBackElems.length - 1, 1)
    $backElemCurrentSet(lastBackElem[0] || null)
    $currIdSet(lastBackElem[0]?.id || SAUC_ROOT_ID)
    transDirectionSet(true)
    recalc()
  }

  function canvasHandle() {
    $dropdownShowSet(false)
  }

  const cfg = {
    defaultWidth: 280,
    marginPx: 16,
    gapAtBtnPx: 6
  }

  const [$baseTop, $baseTopSet] = useState(0);
  const [$baseRight, $baseRightSet] = useState(0);
  const [$baseWidth, $baseWidthSet] = useState(cfg.defaultWidth);
  const [$resize, $resizeSet] = useState(Date.now());

  function resizeLis() {
    const iH = window.innerHeight
    const iW = window.innerWidth
    console.log('!!-!!-!! iH {220217231641}\n', iH) // del+
    console.log('!!-!!-!! iW {220217231646}\n', iW) // del+
    $resizeSet(Date.now())
  }

  useEffect(() => {
    window.onresize = resizeLis
  }, []);

  useEffect(() => {
    // ---
    const btn: any = refBtn.current
    console.log('!!-!!-!! btn {220217223425}\n', btn) // del+
    if (btn) {
      const btnPosTop = btn.offsetTop
      const btnPosLeft = btn.offsetLeft
      const btnH = btn.offsetHeight
      const btnW = btn.offsetWidth
      console.log('!!-!!-!! btnPosTop {220217224426}\n', btnPosTop) // del+
      console.log('!!-!!-!! btnPosLeft {220217224432}\n', btnPosLeft) // del+
      console.log('!!-!!-!! btnH {220217224620}\n', btnH) // del+
      console.log('!!-!!-!! btnW {220217224625}\n', btnW) // del+

      // --- bodyWidth, bodyHeight
      const body = document.getElementsByTagName('body')[0]
      const bodyWidth = body.offsetWidth
      const bodyHeight = body.offsetHeight
      console.log('!!-!!-!! bodyWidth {220217225345}\n', bodyWidth) // del+
      // ---
      const btnPosCenterHoriz = btnPosLeft + btnW / 2
      const bodyCenterHoriz = bodyWidth / 2
      const btnIsLeft = btnPosCenterHoriz < bodyCenterHoriz
      // ---
      const btnPosCenterVert = btnPosTop + btnH / 2
      const bodyCenterVert = bodyHeight / 2
      const btnIsTop = btnPosCenterVert > bodyCenterVert
      // ---
      const baseTop = btnPosTop - cfg.gapAtBtnPx - ($menuHeight || 0);
      if (btnIsTop && baseTop > 0) {
        $baseTopSet(baseTop)
      } else {
        $baseTopSet(btnPosTop + btnH + cfg.gapAtBtnPx)
      }
      // --- baseRight
      let baseRight = btnPosCenterHoriz
      if (btnIsLeft) {
        baseRight = bodyWidth - btnPosLeft - $baseWidth
      } else {
        baseRight = bodyWidth - btnPosLeft - btnW;
        const rr = btnPosLeft + btnW - $baseWidth
        if (rr < cfg.marginPx) {
          baseRight = bodyWidth - cfg.marginPx - $baseWidth
        }
      }
      console.log('!!-!!-!! baseRight {220217232558}\n', baseRight) // del+
      // ---
      if (baseRight < cfg.marginPx) {
        baseRight = cfg.marginPx
        $baseWidthSet(240)
      } else {
        if ($baseWidth < cfg.defaultWidth) {
          $baseWidthSet(cfg.defaultWidth)
        }
      }
      $baseRightSet(baseRight)
    }
  }, [$resize, $recalc, $menuHeight]);

  const elemsObjCurr = $childrenList.find(el => el.id === $currId)

  return (<div className="sauc-wr-menu">

      <div className="sauc-menu" ref={refBtn}>
        <button className="sauc-menu__btn" onClick={btnMainHandle}>{children}</button>
        {!$dropdownShow ? null : (<div className="sauc-menu__canvas" onClick={canvasHandle}/>)}
      </div>

      {!$dropdownShow ? null : (
        <div className="sauc-menu__base" ref={refElem}
             style={{top: $baseTop, right: $baseRight, width: $baseWidth}}>
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
                    <div className="back-item__icon">
                      <div className="sauc-menu__achevron"><IconChevronToLeft/></div>
                    </div>
                    <div className="back-item__body">{$backElemCurrent.body}</div>
                  </div>)}
                {
                  elemsObjCurr?.elems.map((el: SaucMenuElem) => {
                    return (
                      <div key={el.id} className="sauc-dropdown__elem" onClick={menuItemClickHandle(el, el.children)}>
                        {elemCustomStruct
                          ? elemCustomStruct(
                            el.icon || (<div className="sauc-dropdown__aicon"><IconCircle/></div>),
                            el.body || (<div/>),
                            _.isEmpty(el.children) ? null : iconSubmenu
                          )
                          : (
                            <>
                              <div className="elem__icon">{el.icon || (<IconCircle/>)}</div>
                              <div className="elem__body">{el.body}</div>
                              {
                                _.isEmpty(el.children) ? null : (<div className="elem__icon-sub">{iconSubmenu}</div>)
                              }
                            </>
                          )}
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
