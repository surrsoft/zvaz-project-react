import './multilevelMenuPageStyles.scss';
import SaucMLMenuFCC, { SaucElemStruct, SaucMenuElem } from '../../utils/SaucMLMenu/SaucMLMenuFCC';
import { ReactComponent as IconCaret } from './icons/caret.svg';
import { ReactComponent as IconEstate } from './icons/estate.svg';
import { ReactComponent as IconAutomobile } from './icons/automobile.svg';
import { ReactComponent as IconSoft } from './icons/soft.svg';
import { ReactComponent as IconAutoBrandLada } from './icons/auto-brands/lada.svg';
import { ReactComponent as IconAutoBrandMazda } from './icons/auto-brands/mazda.svg';
import { ReactComponent as IconAutoBrandHonda } from './icons/auto-brands/honda.svg';
import { ReactComponent as IconAutoBrandBmw } from './icons/auto-brands/bmw.svg';
import { ReactComponent as IconOsWindows } from './icons/os/windows.svg';
import { ReactComponent as IconOsMac } from './icons/os/mac.svg';
import { useState } from 'react';

export default function MultilevelMenuPage() {

  const [$value, $valueSet] = useState('');

  function cbItem(el: SaucMenuElem) {
    $valueSet(el.id)
  }

  function IconFCC(props: any): JSX.Element {
    return (
      <div className="mmp-wrap">
        <div className="mmp-icon">{props.children}</div>
      </div>
    )
  }

  const menuElemsSTA: SaucMenuElem[] = [
    {
      id: 'auto',
      body: (<div>Автомобили</div>),
      cb: cbItem,
      icon: (<IconFCC><IconAutomobile/></IconFCC>),
      children: [
        {
          id: 'su',
          body: (<div>Отечественные</div>),
          cb: cbItem,
          icon: (<IconFCC><IconAutomobile/></IconFCC>),
          children: [
            {
              id: 'lada', body: (<div>LADA</div>),
              icon: (<IconFCC><IconAutoBrandLada/></IconFCC>),
            },
            {id: 'gaz', body: (<div>ГАЗ</div>)},
            {id: 'zaz', body: (<div>ЗАЗ</div>)},
            {id: 'uaz', body: (<div>УАЗ</div>)},
          ]
        },
        {
          id: 'in',
          body: (<div>Иномарки</div>),
          icon: (<IconFCC><IconAutomobile/></IconFCC>),
          children: [
            {
              id: 'Mazda', body: (<div>Mazda</div>), cb: cbItem, icon: (<IconFCC><IconAutoBrandMazda/></IconFCC>),
            },
            {
              id: 'Honda', body: (<div>Honda</div>), cb: cbItem, icon: (<IconFCC><IconAutoBrandHonda/></IconFCC>),
            },
            {
              id: 'BMW', body: (<div>BMW</div>), cb: cbItem, icon: (<IconFCC><IconAutoBrandBmw/></IconFCC>),
            }
          ],

        }
      ]
    },
    {
      id: 'estate',
      body: (<div>Недвижимость</div>),
      cb: cbItem,
      icon: (<IconFCC><IconEstate/></IconFCC>),
      children: [
        {
          id: 'country',
          body: (<div>Загородная</div>),
          icon: (<IconFCC><IconEstate/></IconFCC>),
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
          icon: (<IconFCC><IconEstate/></IconFCC>),
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
      id: 'soft',
      body: (<div>Софт</div>),
      icon: (<IconFCC><IconSoft/></IconFCC>),
      cb: cbItem,
      children: [
        {
          id: 'soft-windows',
          body: (<div>Windows</div>),
          icon: (<IconFCC><IconOsWindows/></IconFCC>),
          cb: cbItem
        },
        {
          id: 'soft-mac',
          body: (<div>MacOS</div>),
          icon: (<IconFCC><IconOsMac/></IconFCC>),
          cb: cbItem
        }
      ]
    },
    {
      id: 'other',
      body: (<div>Прочее</div>),
      cb: cbItem
    }
  ]

  const elemStruct: SaucElemStruct = (icon, body, subIcon) => {
    return (
      <div className="a-elem">
        {icon}
        <div className="a-elem__body">{body}</div>
        {subIcon}
      </div>
    )
  }

  return (<div>
    <div className="a-bar">
      <SaucMLMenuFCC menuElems={menuElemsSTA} elemCustomStruct={elemStruct}>
        <div className="a-icon-wrap">
          <IconCaret className="a-icon"/>
        </div>
      </SaucMLMenuFCC>
    </div>
    <div>value: {$value}</div>
    <button className="a-btn" onClick={() => {
      alert(111)
    }}>temp
    </button>
  </div>)
}
