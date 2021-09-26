import React from 'react';
import './style.css';
import { ZvazMenu } from '../ZvazMenu/ZvazMenu';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { EPageName, pages } from '../../consts';
import { Learn01 } from '../../pages/Learn01/Learn01';
import { Learn02 } from '../../pages/Learn02/Learn02';

function fnPath(pageName: string) {
  return pages.options.find(el => el.value === pageName)?.subValue || ''
}

function ZvazLayoutMain() {
  const history = useHistory()
  console.log('!!-!!-!! history {210924205713}\n', history); // del+

  return (
    <div className="main">
      <ZvazMenu/>
      <div className={'body'}>
        <Switch>
          <Route exact path={fnPath(EPageName.MAIN)}>
            <div>Главная</div>
          </Route>
          <Route
            path={[fnPath(EPageName.LEARN_01) + '/:cardId', fnPath(EPageName.LEARN_01)]}
            render={(routeProps) => <Learn01 {...routeProps}/>}
          />
          <Route exact path={fnPath(EPageName.LEARN_02)}>
            <Learn02/>
          </Route>
          <Redirect to={fnPath(EPageName.MAIN) || '/'}/>
        </Switch>
      </div>
    </div>
  )
}

export default ZvazLayoutMain;
