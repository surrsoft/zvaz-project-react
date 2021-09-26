import React from 'react';
import './style.scss'

interface ZvazCUDButtonsProps {
  some?: string
}

const ZvazCUDButtons: React.FC<ZvazCUDButtonsProps> = ({children, some}) => {
  const createHandle = () => {

  }
  const deleteHandle = () => {

  }
  const updateHandle = () => {

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
