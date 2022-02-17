import { useContext } from 'react';
import { AB, ValuesContext } from './CompAB';

export interface CompSProps {
  symb: AB
}

let renderCounter = 0;

export default function CompS({symb}: CompSProps) {
  renderCounter++;
  const vc = useContext(ValuesContext)

  function btnHandle() {
    vc.increment(symb)
  }

  return (
    <div style={{border: '1px solid silver', borderRadius: '8px', padding: 8}}>
      <div>value: {symb === AB.A ? vc.a : vc.b}</div>
      <button style={{border: '1px solid black', borderRadius: 6, padding: '0 8px'}} onClick={btnHandle}>{symb}++
      </button>
      <div>render count: {renderCounter}</div>
    </div>
  )
}
