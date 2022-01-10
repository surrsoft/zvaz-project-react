import { useState } from 'react';
import { MvroRandom } from './elems/MvroRandom';
import './styles.scss'

export function MvroPage() {
  const [phrase, phraseSet] = useState('');
  const [phraseRus, phraseRusSet] = useState('');

  function genHandle() {
    const phrase = MvroRandom.generate()
    phraseSet(phrase.enForm)
    phraseRusSet(phrase.rusForm)
  }

  return (<div>
    <div>MvroPage</div>
    <input className='inputButton' type="button" value="generate" onClick={genHandle}/>
    <div className="phrase">{phrase}</div>
    <div className="phraseRus">{phraseRus}</div>
  </div>)
}
