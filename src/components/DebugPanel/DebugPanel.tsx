import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'
import { useSelector } from 'react-redux';
import _ from 'lodash';

interface DebugPanelProps {
  some?: string
}

export interface DebugPanelInfo {
  info?: string
}

export const timerMsec = 3000;

const DebugPanel: React.FC<DebugPanelProps> = () => {
  const refElem = useRef(null)
  const [$timerId, $timerIdSet] = useState<any>();
  const [$displayClass, $displayClassSet] = useState('display-on');

  const debugPanelValue = useSelector(state => {
    const obj = (state as any)?.app?.debugPanel;
    return !_.isEmpty(obj) ? obj.info : '-'
  })

  useEffect(() => {
    clearTimeout($timerId)
    $displayClassSet('display-on')
    const timerId = setTimeout(() => {
      $displayClassSet('display-off')
    }, timerMsec);
    $timerIdSet(timerId)
  }, [debugPanelValue]);

  return (<>
    <div className={`debugPanelContainer ${$displayClass}`} ref={refElem}>
      {debugPanelValue}
    </div>
  </>)
}

export default DebugPanel;
