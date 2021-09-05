import React from 'react';
import './style.css';
import { ZvazMenu } from '../ZvazMenu/ZvazMenu';
import { Route, Redirect } from 'react-router-dom';
import { EPageValues, pages } from '../../consts';
import { Learn01 } from '../../pages/Learn01/Learn01';
import { Learn02 } from '../../pages/Learn02/Learn02';

function ZvazLayoutMain() {
  return (
    <div className="main">
      <ZvazMenu/>
      <div className={'body'}>
        <Route exact path={pages.options.find(el => el.value === EPageValues.MAIN)?.subValue}>
          <div>Главная</div>
        </Route>
        <Route exact path={pages.options.find(el => el.value === EPageValues.LEARN_01)?.subValue}
               component={Learn01}/>
        <Route exact path={pages.options.find(el => el.value === EPageValues.LEARN_02)?.subValue}
               component={Learn02}/>
        <Redirect to={'/'}/>
      </div>
    </div>
  )
}

export default ZvazLayoutMain;
