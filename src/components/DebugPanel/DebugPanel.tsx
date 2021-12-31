import React from 'react';
import './styles.scss'
import { useSelector } from 'react-redux';
import _ from 'lodash';

interface DebugPanelProps {
  some?: string
}

export interface DebugPanelInfo {
  info?: string
}

const DebugPanel: React.FC<DebugPanelProps> = () => {
  const debugPanelValue = useSelector(state => {
    const val = (state as any)?.app?.debugPanel;
    return !_.isEmpty(val) ? val : {info: '-'}
  })

  return (<>
    <div className="debugPanelContainer">
      {debugPanelValue?.info}
    </div>
  </>)
}

export default DebugPanel;
