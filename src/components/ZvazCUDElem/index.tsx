import React from 'react';
import './style.scss'

interface ZvazCUDElemProps {
  some?: string
}

const ZvazCUDElem: React.FC<ZvazCUDElemProps> = ({children, some}) => <>
  <div className={"zvaz-cudelem-container"}>
    ZvazCUDElem
  </div>
</>

export default ZvazCUDElem;
