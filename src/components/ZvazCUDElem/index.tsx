import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import './style.scss'
import ZvazCUDButtons from './ZvazCUDButtons';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const CardForm: React.FC<any> = ({card}) => {
  return <div className={'form-container'}>
    <form>
      <label>id: {card.id}</label>

      <br/>
      <label>
        Title:
        <input type={'text'} value={card.title}/>
      </label>

      <br/>
      <label>
        Comment:
        <input type={'text'} value={card.comm}/>
      </label>

      <br/>
      <label>
        Body:
        <input type={'text'} value={card.body}/>
      </label>

      <br/>
      <label>
        Counter:
        <input type={'number'} value={card.counter}/>
      </label>

    </form>
  </div>
}

interface ZvazCUDElemProps {
  some?: string
}

const ZvazCUDElem: React.FC<ZvazCUDElemProps> = ({children, some}) => {
  const match = useRouteMatch()
  console.log('!!-!!-!! match {210926212824}\n', match); // del+

  const cardId = _.get(match, 'params.cardId', null)

  const card = useSelector((state) => {
    const cards = _.get(state, 'cards.cards', null)
    return _.find(cards, el => el.id === _.toInteger(cardId))
  })
  console.log('!!-!!-!! card {210926214706}\n', card); // del+

  return (<div className={"zvaz-cudelem-container"}>
    <ZvazCUDButtons/>
    {!card
      ? <div>no data</div>
      : <CardForm card={card}/>
    }

  </div>)
}

export default ZvazCUDElem;
