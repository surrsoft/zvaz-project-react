import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './style.scss'
import ZvazCUDButtons from './ZvazCUDButtons';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { cardsSlice } from '../../store/store';

const CardForm: React.FC<any> = () => {

  const dispatch = useDispatch()

  const cardId = useSelector(state => _.get(state, 'cards.cardCurrent.id', null))
  const cardTitle = useSelector(state => _.get(state, 'cards.cardCurrent.title', null))
  const cardComm = useSelector(state => _.get(state, 'cards.cardCurrent.comm', null))
  const cardBody = useSelector(state => _.get(state, 'cards.cardCurrent.body', null))
  const cardCounter = useSelector(state => _.get(state, 'cards.cardCurrent.counter', null))

  const cardCurrent = () => {
    return {
      id: cardId,
      title: cardTitle,
      comm: cardComm,
      body: cardBody,
      counter: cardCounter,
    }
  }

  function onChangeHandler(cardFieldName: string) {
    return (ev: any) => {
      const value = ev.target.value
      const cardCurrentObj = cardCurrent()
      let obj = {...cardCurrentObj, [cardFieldName]: value};
      const someNotEmpty = obj.title || obj.comm || obj.body || _.isFinite(_.toInteger(obj.counter))
      if (!someNotEmpty) {
        // @ts-ignore
        obj = null
      }
      dispatch(cardsSlice.actions.cardCurrentSet(obj))
    };
  }

  return <div className={'form-container'}>
    <form>
      <label className={'card-id'}>id: {cardId || ''}</label>

      <br/>
      <label>
        Title:
        <input type={'text'} value={cardTitle || ''} onChange={onChangeHandler('title')}/>
      </label>

      <br/>
      <label>
        Comment:
        <input type={'text'} value={cardComm || ''} onChange={onChangeHandler('comm')}/>
      </label>

      <br/>
      <label>
        Body:
        <textarea value={cardBody || ''} onChange={onChangeHandler('body')}/>
      </label>

      <br/>
      <label>
        Counter:
        <input type={'number'} value={cardCounter || ''} onChange={onChangeHandler('counter')}/>
      </label>

    </form>
  </div>
}

const ZvazCUDElem = () => {
  console.log(`!!-!!-!! 1317- -> :::::::::::::: ZvazCUDElem() {210927131725}:${Date.now()}`); // del+

  // --- cardId
  const match = useRouteMatch()
  const cardId = _.get(match, 'params.cardId', null)

  // --- card
  const card = useSelector((state) => {
    const cards = _.get(state, 'cards.cards', null)
    return _.find(cards, el => el.id === _.toInteger(cardId))
  })
  console.log('!!-!!-!! card {210926214706}\n', card); // del+

  // ---
  return (<div className={"zvaz-cudelem-container"}>
    <ZvazCUDButtons/>
    <CardForm/>
  </div>)
}

export default ZvazCUDElem;
