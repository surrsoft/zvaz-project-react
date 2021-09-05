import React from 'react';
import { EActionType, pages } from '../../consts';
import UeurSelectNav from '../UeurSelectNav/UeurSelectNav';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';


export function ZvazMenu() {

  const dispatch = useDispatch()
  // @ts-ignore
  const pagePath = useSelector(state => state.pagePath)

  function handler(ev: any) {
    const val: string = ev.target.value;
    dispatch({type: EActionType.CHANGE_PAGE, payload: {pagePath: val}})
  }

  pages.options.forEach(op => op.callback = handler)

  return (
    <div className={'header'}>
      <div>{pagePath}</div>
      <UeurSelectNav data={pages}/>
    </div>
  )
}
