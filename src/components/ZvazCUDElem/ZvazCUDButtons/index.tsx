import React from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { cardCreateThunk, cardDeleteThunk, cardUpdateThunk } from '../../../pages/Learn01/Learn01';
import { useHistory } from 'react-router-dom';
import { cardsSlice } from '../../../store/store';
import _ from 'lodash';
import { EPageName, ZvazPageUtils } from '../../../consts';

interface ZvazCUDButtonsProps {
  some?: string
}

const ZvazCUDButtons: React.FC<ZvazCUDButtonsProps> = ({children, some}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const cardCurrent = useSelector(state => _.get(state, 'cards.cardCurrent', null))

  const createHandle = () => {
    dispatch(cardCreateThunk(history))
  }
  const deleteHandle = () => {
    dispatch(cardDeleteThunk(history))
  }
  const updateHandle = () => {
    dispatch(cardUpdateThunk)
  }
  const clearHandle = () => {
    dispatch(cardsSlice.actions.cardCurrentSet(null))
    history.push(ZvazPageUtils.pagePathByName(EPageName.LEARN_01) || '/')
  }

  const disabled0 = !cardCurrent || !_.get(cardCurrent, 'id', false)

  return (<div className={'zvaz-cudbuttons'}>
    <button onClick={createHandle} disabled={!cardCurrent}>create new</button>
    <button onClick={deleteHandle} disabled={disabled0}>delete</button>
    <button onClick={updateHandle} disabled={disabled0}>update</button>
    <button onClick={clearHandle} disabled={!cardCurrent}>clear</button>
  </div>)
}

export default ZvazCUDButtons;
