import React from 'react';
import './styles.scss';

interface ZvazCardListElemProps {
  card?: any
}

const ZvazCardListElem: React.FC<ZvazCardListElemProps> = ({card}) => {

  return <div className={'zvaz-cardlist-elem-container'}>
    <div className={'cardContainer'} key={card.id}>
      <div className={'id'}>id: {card.id}</div>
      <div className={'title'}>{card.title}</div>
      <div className={'comm'}>{card.comm}</div>
      <div className={'body'}>{card.body}</div>
      <div className={'counter'}>{card.counter}</div>
    </div>
  </div>
}

export default ZvazCardListElem;
