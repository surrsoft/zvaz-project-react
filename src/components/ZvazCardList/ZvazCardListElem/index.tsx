import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import { EPageName, ZvazPageUtils } from '../../../consts';

interface ZvazCardListElemProps {
  card?: any
}

const ZvazCardListElem: React.FC<ZvazCardListElemProps> = ({card}) => {
  const history = useHistory()

  const showHandle = (cardId: string | number) => {
    const pagePath = ZvazPageUtils.pagePathByName(EPageName.LEARN_01)
    if (pagePath) {
      history.push(`${pagePath}/${cardId}`)
    }
  }

  return <div className={'zvaz-cardlist-elem-container'}>
    <div className={'cardContainer'} key={card.id}>
      <button className={'button'} onClick={() => showHandle(card.id)}>{'<'}</button>
      <div className={'id'}>id: {card.id}</div>
      <div className={'title'}>{card.title}</div>
      <div className={'comm'}>{card.comm}</div>
      <div className={'body'}>{card.body}</div>
      <div className={'counter'}>{card.counter}</div>
    </div>
  </div>
}

export default ZvazCardListElem;
