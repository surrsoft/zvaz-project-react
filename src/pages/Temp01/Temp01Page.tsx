import './temp01PageStyles.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect, useRef, useState } from 'react';

export default function Temp01Page() {
  const elems = [
    ['hello1', 'hello2', 'hello3'],
    ['world'],
    ['and1', 'and2', 'and3', 'and4', 'and5', 'and6', 'and7',]
  ]

  const refElem = useRef(null)

  const [menuHeight, setMenuHeight] = useState(null);
  const [$elemIndex, $elemIndexSet] = useState(0);
  const [$valMs] = useState<number>(() => {
    const root: any = document.querySelector(':root');
    // SYNC [[220216114243]]
    return Number(getComputedStyle(root).getPropertyValue('--sauc-timeout').replace(' ', '').replace('ms', ''))
  });

  useEffect(() => {
    const main: any = refElem.current
    const firstChild = main.firstChild.firstChild;
    const offsetHeight = firstChild.offsetHeight;
    setMenuHeight(offsetHeight)
  }, [])

  function calcHeight(el: any) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function varChange(is: boolean) {
    const root: any = document.querySelector(':root');
    if (root) {
      // SYNC [[220216111625]]
      const val = getComputedStyle(root).getPropertyValue('--sauc-transx0')
      const rr2 = is ? val : ('-' + val).replace(' ', '');
      // SYNC [[220216114204]]
      root.style.setProperty('--sauc-transx', rr2)
    }
  }

  const btnHandle = (isLeft: boolean) => () => {
    if (isLeft) {
      if ($elemIndex > 0) {
        $elemIndexSet($elemIndex - 1)
        varChange(false)
      }
    } else {
      if ($elemIndex < elems.length - 1) {
        $elemIndexSet($elemIndex + 1)
        varChange(true)
      }
    }
  };

  return (<div className="main-con" ref={refElem}>
    <TransitionGroup className="tgroup" style={{height: menuHeight + 'px'}}>
      <CSSTransition
        classNames="fade"
        timeout={$valMs}
        key={elems[$elemIndex][0]}
        onEnter={calcHeight}
      >
        <div className="elem">{elems[$elemIndex].map(el => {
          return (<div>{el}</div>)
        })}</div>
      </CSSTransition>
    </TransitionGroup>
    <button className="btn" onClick={btnHandle(true)}>left</button>
    <button className="btn" onClick={btnHandle(false)}>right</button>
  </div>)
}
