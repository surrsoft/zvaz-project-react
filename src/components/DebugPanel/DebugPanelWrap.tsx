import React, { ReactElement } from 'react';
import { useDebugPanelHandler } from './useDebugPanel';
import { debugPanelUpdate } from '../../store/appSlice/appSlice';
import { useDispatch } from 'react-redux';
import { timerMsec } from './DebugPanel';

interface DebugPanelWrapProps {
  info?: string
}

/**
 * Добавляет ко всем элементам (1) пропс onMouseOver с колбэком отсылающим (2)
 * @param children (1) --
 * @param info (2) --
 * @constructor
 */
const DebugPanelWrap: React.FC<DebugPanelWrapProps> = ({children, info}) => {
  const dispatch = useDispatch()
  return (<>
    {
      React.Children.map(children, (elChild) => {
        console.log('!!-!!-!! 2028- elChild {211231195540}\n', elChild) // del+
        if (React.isValidElement(elChild)) {
          const elem = React.cloneElement(elChild, {
            onMouseOver: function debugPanelHandler(ev: any) {
              console.log('!!-!!-!! 1132- ev {220102113246}\n', ev) // del+
              if (ev?.shiftKey) {
                dispatch(debugPanelUpdate({info}))
              }
            },
          })
          return elem;
        }
        return elChild
      })
    }
  </>)
}

export default DebugPanelWrap;
