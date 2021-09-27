import React from 'react';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { cardUpdateThunk } from '../../../pages/Learn01/Learn01';

interface ZvazCUDButtonsProps {
  some?: string
}

const ZvazCUDButtons: React.FC<ZvazCUDButtonsProps> = ({children, some}) => {
  const dispatch = useDispatch()

  const createHandle = () => {

  }
  const deleteHandle = () => {

  }
  const updateHandle = () => {
    dispatch(cardUpdateThunk)
  }
  const cloneHandle = () => {

  }

  return (<div className={'zvaz-cudbuttons'}>
    <button onClick={createHandle}>create</button>
    <button onClick={deleteHandle}>delete</button>
    <button onClick={updateHandle}>update</button>
    <button onClick={cloneHandle}>clone</button>
  </div>)
}

export default ZvazCUDButtons;
