import './temp01PageStyles.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState } from 'react';

export default function Temp01Page() {
  const elems = ['hello', 'world', 'and']

  const [$elemIndex, $elemIndexSet] = useState(0);
  const [$valMs] = useState<number>(() => {
    const root: any = document.querySelector(':root');
    // SYNC [[220216114243]]
    const valMs = Number(getComputedStyle(root).getPropertyValue('--sauc-timeout').replace(' ', '').replace('ms', ''))
    return valMs;
  });


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

  return (<div>
    <TransitionGroup className="tgroup">
      <CSSTransition
        classNames="fade"
        timeout={$valMs}
        key={elems[$elemIndex]}
      >
        <div className={`elem ${elems[$elemIndex]}`}>{elems[$elemIndex]}</div>
      </CSSTransition>
    </TransitionGroup>
    <button className="btn" onClick={btnHandle(true)}>left</button>
    <button className="btn" onClick={btnHandle(false)}>right</button>
  </div>)
}
