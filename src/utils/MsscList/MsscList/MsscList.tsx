import React, { ReactNode } from 'react';
import './styles.scss';
import { MsscSource } from '../MsscSource';

interface MsscListProps {
  source: MsscSource<any>
}

const MsscList = ({source}: MsscListProps): JSX.Element => {
  return (<div>
    MsscList
  </div>)
}

export default MsscList;
