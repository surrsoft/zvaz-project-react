import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { EPageName, ZvazPageUtils } from '../../../consts';
import { useDispatch } from 'react-redux';
import { cardsSlice } from '../../../store/store';

interface ZvazCardListElemProps {
  card?: any
}

const ZvazCardListElem: React.FC<ZvazCardListElemProps> = ({card}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const showHandle = (cardId: string | number) => {
    const pagePath = ZvazPageUtils.pagePathByName(EPageName.LEARN_01)
    if (pagePath) {
      history.push(`${pagePath}/${cardId}`)
      dispatch(cardsSlice.actions.cardCurrentSet(card))
    }
  }

  return <div className={'zvaz-cardlist-elem-container'}>
    <div className={'cardContainer'} key={card.id}>
      <div className={'id'}>id: {card.id}</div>
      <div className={'button-and-title'}>
        <button className={'button'} onClick={() => showHandle(card.id)}>{'<'}</button>
        <div className={'title'}>{card.title}</div>
      </div>
      {card.comm ? <div className={'comm'}>{card.comm}</div> : null}
      {card.body ? <pre className={'body'}>{card.body}</pre> : null}
      <div className={'counter'}>{card.counter}</div>
    </div>
  </div>
}

export default ZvazCardListElem;
