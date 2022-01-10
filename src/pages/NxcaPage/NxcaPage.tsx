import React, { useRef, useState } from 'react';
import './styles.scss';
import { NXCA_NEGATE, NxcaResElem, NxcaResElemB, NxcaTuSklon } from './elems/NxcaTuSklon';
import { NxcaEnSklonAll } from './elems/NxcaEnSklon';

function InputCMP() {
  const refWordInput = useRef(null)

  const [result, resultSet] = useState<NxcaResElemB[]>([]);

  function clickHandle() {
    const val = (refWordInput.current as any).value;
    // ---
    const res00 = NxcaEnSklonAll.map(elSclonEnum => {
      const res = NxcaTuSklon.sklon(val, elSclonEnum)
      return new NxcaResElemB(elSclonEnum, res)
    })
    console.log('!!-!!-!! res {220109113848}\n', res00) // del+
    resultSet(res00)
  }

  const fn2 = (el: NxcaResElemB, ix: number) => {
    return (<div className="cn3">
      <div>{el?.sklonEnum}</div>
      {
        el?.elems.map((el0) => {
          return (<div>{el0.res?.filter(el => el !== NXCA_NEGATE).join(' ')}</div>)
        })
      }
    </div>)
  }

  return (
    <div>
      <form onSubmit={clickHandle}>
        <label className="cnLabel">слово</label>
        <input className="cnInput" ref={refWordInput} type="text"/>
        <input className="cnButton" type="button" onClick={clickHandle} value="GO"/>
      </form>

      <div className="cn2">
        {
          result.map(fn2)
        }
      </div>
    </div>
  )
}

const NxcaPage = (): JSX.Element => {
  console.log(`!!-!!-!! 1217- -> :::::::::::::: NxcaPage() {220109121749}:${Date.now()}`) // del+
  return (<div>
    <div>
      <InputCMP/>
    </div>

    <div className="cn1">
      <div>S1: люб|дым|(ить),</div>
      <div>S3: вал|пар|бан|стел|мор|сверл|(ить)</div>
      <div>S2: дыш|крич|торч|(ать)</div>
      <div>S4: мечт - открыв - зн - дум - (ать)</div>
      <div>S5: ви - (деть)</div>
      <div>S6: прихо - (дить)</div>
      <div>S7: ж - (ить)</div>
      <div>марин|овать</div>
    </div>
  </div>)
}

export default NxcaPage;
