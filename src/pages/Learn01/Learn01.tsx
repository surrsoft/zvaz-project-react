import ZvazCUDElem from '../../components/ZvazCUDElem';
import ZvazCardList from '../../components/ZvazCardList';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { API_ADDRESS, EActionType } from '../../consts';
import React, { useEffect } from 'react';
import { RsuvTxJsonServer } from 'rsuv-lib';
import { bindsAllThunk } from '../../store/bindsSlice';
import { cardsSlice } from '../../store/store';
import _ from 'lodash';

const server = new RsuvTxJsonServer(API_ADDRESS, 'cards')

const cardsThunk = (dispatch: Function) => {
  server
    .elemsGetAll()
    .then((cards) => {
      console.log('!!-!!-!! cards {210904092257}\n', cards); // del+
      dispatch(cardsSlice.actions.cardsAllReceived(cards))
    })
    .catch((err) => {
      console.log('!!-!!-!! err {210904100021}\n', err); // del+
      dispatch(cardsSlice.actions.cardsAllNotReceived(err))
    })
}

export const cardUpdateThunk = async (dispatch: Function, getState: Function) => {
  const state = getState()
  const cardCurrent = _.get(state, 'cards.cardCurrent')
  console.log('!!-!!-!! 1518- thunk cardCurrent {210927151838}\n', cardCurrent); // del+
  if (cardCurrent) {
    const res = await server.elemUpdate(cardCurrent)
    console.log('!!-!!-!! 1518- res {210927151932}\n', res); // del+
    if (res.success) {
      dispatch(cardsSlice.actions.cardUpdate(cardCurrent))
    } else {
      console.warn(res)
    }
  }
}

export const Learn01 = () => {

  const dispatch = useDispatch()
  // @ts-ignore
  const cards = useSelector(state => state.cards.cards)
  // @ts-ignore
  const binds = useSelector(state => state.binds.binds)

  const fnCards = (cards0: any) => {
    console.log('!!-!!-!! cards0 {210911165701}\n', cards0); // del+
    if (cards0) {
      return cards0.length
    }
    return 0
  }

  const fnBinds = (binds0: any) => {
    if (binds0) {
      return binds0.length
    }
    return 0
  }

  useEffect(() => {
    dispatch(cardsThunk)
    dispatch(bindsAllThunk)
  }, []);

  return (<div>
    <div className={'learn01-container'}>
      <ZvazCUDElem/>
      <ZvazCardList cards={cards}/>
    </div>
    <div>cards count: {fnCards(cards)}</div>
    <div>binds count: {fnBinds(binds)}</div>
  </div>)
}

