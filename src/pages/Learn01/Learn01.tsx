import ZvazCUDElem from '../../components/ZvazCUDElem';
import ZvazCardList from '../../components/ZvazCardList';
import './style.scss'
import { useDispatch, useSelector } from 'react-redux';
import { EActionType } from '../../consts';
import { useEffect } from 'react';

export function Learn01() {
  const dispatch = useDispatch()
  // @ts-ignore
  const cards = useSelector(state => state.cards)

  const fnCards = (cards: any) => {
    if (cards) {
      return cards.length
    }
    return 0
  }

  useEffect(() => {
    dispatch({type: EActionType.CARD_LIST_INIT})
  }, []);

  return (<div className={'learn01-container'}>
    <ZvazCUDElem/>
    <ZvazCardList/>
    <div>count: {fnCards(cards)}</div>
  </div>)
}

