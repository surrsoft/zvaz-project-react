import { DebugPanelInfo } from './DebugPanel';
import { debugPanelUpdate } from '../../store/appSlice/appSlice';
import { useDispatch } from 'react-redux';

export function useDebugPanelHandler(obj: DebugPanelInfo) {
  const dispatch = useDispatch()
  return function useDebugPanelHandler0(ev: any) {
    if (ev?.shiftKey) {
      dispatch(debugPanelUpdate(obj))
    }
  }
}
