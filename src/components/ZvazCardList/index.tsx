import React from 'react';
import _ from 'lodash';
import './style.scss'
import ZvazCardListElem from './ZvazCardListElem';

interface ZvazCardListProps {
  cards?: any[]
}

const ZvazCardList: React.FC<ZvazCardListProps> = ({cards}) => {

  if (_.isEmpty(cards)) {
    return <div>--</div>
  }

  const fnCards = (argCards: any[]) => {
    return argCards.map((el) => {
      return <ZvazCardListElem key={el.id} card={el}/>
    })
  }

  const cards0 = cards || []
  return <div className={'zvaz-cardlist-container'}>
    <div className={'cards-container'}>{fnCards(cards0)}</div>
  </div>
}

export default ZvazCardList;
