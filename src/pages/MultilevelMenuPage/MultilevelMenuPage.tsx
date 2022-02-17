import './multilevelMenuPageStyles.scss';
import SaucMLMenuFCC, { SaucMenuElem } from '../../utils/SaucMLMenu/SaucMLMenuFCC';
import { ReactComponent as IconBell } from '../../utils/SaucMLMenu/icons/bell.svg';
import { ReactComponent as IconCaret } from '../../utils/SaucMLMenu/icons/caret.svg';
import { useState } from 'react';

export default function MultilevelMenuPage() {

  const [$value, $valueSet] = useState('');

  function cbItem(el: SaucMenuElem) {
    $valueSet(el.id)
  }

  const menuElemsSTA: SaucMenuElem[] = [
    {
      id: 'auto',
      body: (<div>Автомобили</div>),
      cb: cbItem,
      icon: (<IconBell/>),
      children: [
        {
          id: 'su',
          body: (<div>Отечественные</div>),
          cb: cbItem,
          children: [
            {id: 'lada', body: (<div>LADA</div>)},
            {id: 'gaz', body: (<div>ГАЗ</div>)},
            {id: 'zaz', body: (<div>ЗАЗ</div>)},
            {id: 'uaz', body: (<div>УАЗ</div>)},
          ]
        },
        {
          id: 'in',
          body: (<div>Иномарки</div>),
          children: [
            {
              id: 'Mazda', body: (<div>Mazda</div>), cb: cbItem
            },
            {
              id: 'Honda', body: (<div>Honda</div>), cb: cbItem
            },
            {
              id: 'BMW', body: (<div>BMW</div>), cb: cbItem
            }
          ],

        }
      ]
    },
    {
      id: 'estate',
      body: (<div>Недвижимость</div>),
      cb: cbItem,
      children: [
        {
          id: 'country',
          body: (<div>Загородная</div>),
          children: [
            {
              id: 'moscow', body: (<div>Москва</div>),
              children: [
                {id: 'centr', body: (<div>Центральный район</div>)},
                {id: 'severo-zap', body: (<div>Северо-Западный район</div>)},
              ]
            },
            {id: 'moscow-obl', body: (<div>Московская обл.</div>)},
          ]
        },
        {
          id: 'city',
          body: (<div>Городская</div>),
          children: [
            {
              id: 'moscow2', body: (<div>Москва</div>), children: [
                {id: 'centr2', body: (<div>Центральный район</div>)},
                {id: 'severo-zap2', body: (<div>Северо-Западный район</div>)},
              ]
            },
            {id: 'moscow-obl2', body: (<div>Московская обл.</div>)},
          ]
        }
      ]
    },
    {
      id: 'other',
      body: (<div>Прочее</div>),
      cb: cbItem
    }
  ]

  return (<div>
    <div className="a-bar">
      <SaucMLMenuFCC menuElems={menuElemsSTA} isOverflow={true}>
        <IconCaret className="a-icon"/>
      </SaucMLMenuFCC>
    </div>
    <div>value: {$value}</div>
    <button className="a-btn" onClick={() => {
      alert(111)
    }}>temp
    </button>
  </div>)
}
