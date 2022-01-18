import React from 'react';
import './style.scss';
import MsscList from '../../utils/MsscList/MsscList/MsscList';

export function MsscPage() {
  return (<div>
    <div className="title">MsscPage</div>
    <MsscList source={null} />
  </div>)
}
