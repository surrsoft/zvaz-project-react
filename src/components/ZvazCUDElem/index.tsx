import React from 'react';

interface ZvazCUDElemProps {
  some?: string
}

const ZvazCUDElem: React.FC<ZvazCUDElemProps> = ({children, some}) => <>
  <div>
    ZvazCUDElem
  </div>
</>

export default ZvazCUDElem;
