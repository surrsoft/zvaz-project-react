import React from 'react';
import './style.scss';
import MsscList from '../../utils/MsscList/MsscList';
import { AirSource } from '../../utils/MsscList/commonUtils/AirSource';

const airSource = new AirSource({
  dbKey: 'appXv6ry7Vn262nGR',
  tableName: 'main',
  columns: ['id', 'url', 'title', 'comm', 'body', 'trans_count', 'trans_date_last', 'show_date_last'],
  elemJsx: (elObj: any) => {
    return (
      <div className="zslistElem" key={elObj.tid}>
        <div>{elObj.title}</div>
        <div><a className="cls1452" href={elObj.url} target="_blank">{elObj.url}</a></div>
      </div>
    )
  }
})

export function MsscPage() {

  return (<div>
    <div className="title">MsscPage</div>
    <MsscList source={airSource}/>
  </div>)
}
