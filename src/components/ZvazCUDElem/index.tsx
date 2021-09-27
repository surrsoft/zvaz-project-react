import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './style.scss'
import ZvazCUDButtons from './ZvazCUDButtons';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { EActionType } from '../../consts';

const CardForm: React.FC<any> = ({card}) => {
  console.log('!!-!!-!! 0937- fn card {210927093201}\n', card); // del+

  const dispatch = useDispatch()

  const [cardTitle, cardTitleSet] = useState(card.title);
  const [cardComm, cardCommSet] = useState(card.comm);
  const [cardBody, cardBodySet] = useState(card.body);
  const [cardCounter, cardCounterSet] = useState(card.counter);

  useEffect(() => {
    console.log('!!-!!-!! 0937- useEffect card {210927093717}\n', card); // del+
    cardTitleSet(card.title)
    cardCommSet(card.comm)
    cardBodySet(card.body)
    cardCounterSet(card.counter)
  }, [card]);

  const cardCurrent = () => {
    return {
      title: cardTitle,
      comm: cardComm,
      body: cardBody,
      counter: cardCounter,
    }
  }

  return <div className={'form-container'}>
    <form>
      <label className={'card-id'}>id: {card.id}</label>

      <br/>
      <label>
        Title:
        <input type={'text'} value={cardTitle} onChange={(ev) => {
          const value = ev.target.value
          cardTitleSet(value);
          dispatch({type: EActionType.CARD_CURRENT_SET, payload: {...(cardCurrent()), title: value}})
        }}/>
      </label>

      <br/>
      <label>
        Comment:
        <input type={'text'} value={cardComm} onChange={(ev) => cardCommSet(ev.target.value)}/>
      </label>

      <br/>
      <label>
        Body:
        <textarea onChange={(ev) => cardBodySet(ev.target.value)}>{cardBody}</textarea>
      </label>

      <br/>
      <label>
        Counter:
        <input type={'number'} value={cardCounter} onChange={(ev) => cardCounterSet(ev.target.value)}/>
      </label>

    </form>
  </div>
}

interface ZvazCUDElemProps {
  some?: string
}

const ZvazCUDElem: React.FC<ZvazCUDElemProps> = ({children, some}) => {
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
    {!card
      ? <div>no data</div>
      : <CardForm card={card}/>
    }

  </div>)
}

export default ZvazCUDElem;
