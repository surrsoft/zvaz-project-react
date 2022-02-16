import React from 'react';
import './style.css';
import { ZvazMenu } from '../ZvazMenu/ZvazMenu';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { EPageName, pages } from '../../consts';
import { Learn01 } from '../../pages/Learn01/Learn01';
import { Learn02 } from '../../pages/Learn02/Learn02';
import { MsscPage } from '../../pages/MsscPage/MsscPage';
import NxcaPage from '../../pages/NxcaPage/NxcaPage';
import { MvroPage } from '../../pages/MvroPage/MvroPage';
import NotionPage from '../../pages/NotionPage/NotionPage';
import MultilevelMenuPage from '../../pages/MultilevelMenuPage/MultilevelMenuPage';
import Temp01Page from '../../pages/Temp01/Temp01Page';

function fnPath(pageName: string) {
  return pages.options.find(el => el.value === pageName)?.subValue || ''
}

function ZvazLayoutMain() {
  const history = useHistory()

  return (
    <div className="main">
      <ZvazMenu/>
      <div className={'body'}>
        {/* routes */}
        <Switch>
          <Route exact path={fnPath(EPageName.MAIN)}>
            <div>Главная</div>
          </Route>
          <Route path={[fnPath(EPageName.LEARN_01) + '/:cardId', fnPath(EPageName.LEARN_01)]}>
            <Learn01/>
          </Route>
          <Route exact path={fnPath(EPageName.LEARN_02)}>
            <Learn02/>
          </Route>
          <Route exact path={fnPath(EPageName.MSSC)}>
            <MsscPage/>
          </Route>
          <Route exact path={fnPath(EPageName.NXCA)}>
            <NxcaPage/>
          </Route>
          <Route exact path={fnPath(EPageName.MVRO)}>
            <MvroPage/>
          </Route>
          <Route exact path={fnPath(EPageName.NOTION_PAGE)}>
            <NotionPage/>
          </Route>
          <Route exact path={fnPath(EPageName.MULTILEVELMENU_PAGE)}>
            <MultilevelMenuPage/>
          </Route>
          <Route exact path={fnPath(EPageName.TEMP_01)}>
            <Temp01Page/>
          </Route>
          <Redirect to={fnPath(EPageName.MAIN) || '/'}/>
        </Switch>
      </div>
    </div>
  )
}

export default ZvazLayoutMain;
