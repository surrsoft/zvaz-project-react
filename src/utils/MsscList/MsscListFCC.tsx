import React, { useEffect, useState } from 'react';
import './msscListStyles.scss';
import { MsscIdObject, MsscSource } from './msscUtils/MsscSource';
import { RsuvPaginationGyth, RsuvTxNumIntAB, RsuvTxNumIntDiap } from 'rsuv-lib';
import { MsscElem } from './msscUtils/MsscElem';
import SvgIconChevron from './commonIcons/SvgIconChevron/SvgIconChevron';
import MenuAsau54FCC, { Asau54Item, Asau54Data, Asau54SelectResult } from './commonUI/MenuFCC/MenuAsau54FCC';
import MsscDialogFCC from './msscComponents/MsscDialogFCC/MsscDialogFCC';
import ListModelAsau59 from './commonUtils/ListModelAsau59';
import SvgIconTrash from './commonIcons/SvgIconTrash/SvgIconTrash';
import SvgIconPlus from './commonIcons/SvgIconPlus/SvgIconPlus';
import SvgIconUnckecked from './commonIcons/SvgIconUnchecked/SvgIconUnckecked';
import { ColorsAsau61 } from './commonIcons/utils/ColorsAsau61';
import useScrollFix from '../useScrollFix';

export enum MsscMenuAction {
  EDIT = 'edit',
  SELECT = 'select',
  DELETE = 'delete'
}

async function fnWait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, duration);
  });
}

interface MsscListProps {
  source: MsscSource<any> | null
}

// для возврата номера страницы если не удалось получить данные
let isPageUp = false;

const MsscListFCC = ({source}: MsscListProps): JSX.Element => {
  // source = null; // del+

  const config = {
    // записей на странице
    elemsOnPage: 10
  }

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  // всего страниц
  const [$pageCountAll, $pageCountAllSet] = useState(0);
  // текущие элементы для отображения
  const [$elems, $elemsSet] = useState<MsscElem[]>([]);
  // общее количество элементов хранилища
  const [$elemsCountAll, $elemsCountAllSet] = useState(0);
  // сколько отображается элементов сейчас на текущей странице
  const [$elemsOnCurrPage, $elemsOnCurrPageSet] = useState(0);
  // для показа спиннера при первоначальной загрузке
  const [$loading, $loadingSet] = useState(false);
  // для показа спиннера при запросе данных страницы (пагинация страниц)
  const [$loadingB, $loadingBSet] = useState(false);
  // для того чтобы содержимое второго useEffect отрабатывало строго после содержимого первого
  const [$fdone, $fdoneSet] = useState(false);
  // для инициации полного перезапроса данных, например после удаления/добавления элемента(ов)
  const [$needUpdate1, $needUpdate1Set] = useState(false);
  // для инициации запроса данных при нажатии изменения страницы в пагинации
  const [$needUpdate2, $needUpdate2Set] = useState(false);
  // для показа ошибки запроса данных
  const [$isError, $isErrorSet] = useState(false);
  // --- диалоги
  const [$dialogDeleteShowed, $dialogDeleteShowedSet] = useState(false);
  const [$dialogTitle, $dialogTitleSet] = useState('');
  const [$dialogBody, $dialogBodySet] = useState('');
  const [$dialogCreateJsx, $dialogCreateJsxSet] = useState<JSX.Element | null>(null);
  const [$dialogCreateShowed, $dialogCreateShowedSet] = useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListModelAsau59()
  });
  const [$refresh, $refreshSet] = useState(false);

  const scrollFixFn = useScrollFix($dialogCreateShowed)

  const fnError = () => {
    $isErrorSet(true)
    setTimeout(() => {
      $isErrorSet(false)
    }, 2000);
  }

  const requestFirst = async (source: MsscSource<any>) => {

    try {
      const jsx = await source?.dialogCreate(dialogCreateCallbacks.ok, dialogCreateCallbacks.cancel)
      $dialogCreateJsxSet(jsx)
      // ---
      $loadingSet(true)
      // --- получение общего количества элементов
      const elemsCountResult: RsuvTxNumIntAB = await source.elemsCountByFilter([])
      const elemsCountAll = elemsCountResult.val
      // --- pagination - pageCountAll
      const pagination = new RsuvPaginationGyth(elemsCountAll, config.elemsOnPage)
      // ---
      $pageCountAllSet(pagination.pageCount)
      $elemsCountAllSet(elemsCountAll)
    } catch (err) {
      console.log('!!-!!-!! err {220119120755}\n', err)
      fnError()
    } finally {
      $loadingSet(false)
    }
  };

  const requestTwo = async (source: MsscSource<any>) => {
    try {
      $loadingBSet(true)
      // await fnWait(3000) // del+
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth($elemsCountAll, config.elemsOnPage)
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        $pageNumCurrentSet(pagination.pageCount)
      }
      const indexes = pagination.indexesByPageNum($pageNumCurrent)
      const ixStart = indexes.indexStart
      const ixEnd = indexes.indexLast
      // --- получение элементов из source
      const elemsResult: MsscElem[] = await source.elems(new RsuvTxNumIntDiap(new RsuvTxNumIntAB(ixStart), new RsuvTxNumIntAB(ixEnd)), [], [])
      // ---
      $elemsOnCurrPageSet(elemsResult.length)
      // ---
      $elemsSet(elemsResult)
    } catch (err) {
      console.log('!!-!!-!! err {220119120754}\n', err)
      // возврат номера страницы
      $pageNumCurrentSet($pageNumCurrent + (isPageUp ? -1 : 1))
      fnError()
    } finally {
      $loadingBSet(false)
    }
  }

  useEffect(() => {
    $fdoneSet(false)
    if (source) {
      (async () => {
        await requestFirst(source)
        $fdoneSet(true)
      })()
    }
  }, [$needUpdate1]);

  useEffect(() => {
    console.log('!!-!!-!! 1323- $fdone {220119132235}\n', $fdone) // del+
    if (source && $fdone) {
      (async () => {
        await requestTwo(source)
      })();
    }
  }, [$fdone, $needUpdate2]);

  const paginationHandlers = {
    up: () => {
      if ($pageNumCurrent < $pageCountAll) {
        isPageUp = true
        $pageNumCurrentSet($pageNumCurrent + 1)
        needUpdate()
      }
    },
    down: () => {
      if ($pageNumCurrent > 1) {
        isPageUp = false
        $pageNumCurrentSet($pageNumCurrent - 1)
        needUpdate()
      }
    },
  }

  function needUpdate() {
    $needUpdate2Set(!$needUpdate2)
  }

  function PaginationFCC() {

    return (
      <div className="msscPaginatorBlock">

        <button
          className="msscButton2"
          disabled={$loadingB}
          onClick={paginationHandlers.down}
        >
          <SvgIconChevron svgProps={{width: "20px", height: "20px"}} angle={180}
                          animate={{enabled: true, durationMillisec: 600}}/>
        </button>

        <div className="msscPaginatorBlock_num">{$pageNumCurrent} / {$pageCountAll}</div>

        <button
          className="msscButton2"
          disabled={$loadingB}
          onClick={paginationHandlers.up}
        >
          <SvgIconChevron svgProps={{width: "20px", height: "20px"}} angle={0}
                          animate={{enabled: true, durationMillisec: 600}}/>
        </button>

        {$loadingB ? <div>loading...</div> : null}
      </div>
    )
  }

  function ParamUiFCC({str1, str2}: { str1: string, str2?: any }) {
    return (
      <div style={{display: 'flex', alignItems: 'center', columnGap: 6, fontFamily: 'monospace'}}>
        <div style={{color: 'blue'}}>{str1}</div>
        <div style={{
          border: '1px solid silver',
          borderRadius: 4,
          padding: '0 8px 0 8px'
        }}>{(str2 || str2 === 0) ? str2 : '-'}</div>
      </div>
    )
  }

  const menuData = {
    id: '',
    items: [
      {idAction: MsscMenuAction.EDIT, text: 'Изменить'} as Asau54Item,
      {idAction: MsscMenuAction.SELECT, text: 'Выбрать'} as Asau54Item,
      {idAction: MsscMenuAction.DELETE, text: 'Удалить'} as Asau54Item
    ]
  } as Asau54Data

  const dialogDeleteShow = () => {
    $dialogTitleSet('удаление')
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`)
    $dialogDeleteShowedSet(true)
  }

  function MsscListElemFCC({elem}: { elem: MsscElem }) {
    const jsxElem: JSX.Element = elem.elem

    const menuElemOnSelected = async (obj: Asau54SelectResult) => {
      console.log('!!-!!-!! obj {220122220339}\n', obj) // del+
      switch (obj.idAction) {
        case MsscMenuAction.DELETE:
          if (obj.idElem) {
            // чистим если что-то уже выбрано
            $listModel.selectElemsClear()
            $listModel.selectElemsAdd([obj.idElem])
            refresh()
          }
          dialogDeleteShow()
          break;
        case MsscMenuAction.SELECT:
          if (obj.idElem) {
            $listModel.selectElemsAdd([obj.idElem])
            refresh()
          }
          break;
      }
    }

    const checkboxOnChange = (id: string) => (ev: any) => {
      const checked = ev.target.checked
      console.log('!!-!!-!! id {220123141622}\n', id) // del+
      if (checked) {
        $listModel.selectElemsAdd([id])
      } else {
        $listModel.selectElemsDelete([id])
      }
      refresh()
      console.log('!!-!!-!! $listModel {220123141622}\n', $listModel) // del+
    }

    return (
      <div className="msscListElemContainer">
        <div className="msscListElemCheckbox">
          <input
            type="checkbox"
            checked={$listModel.selectElemIs(elem.id.val)}
            onChange={checkboxOnChange(elem.id.val)}
          />
        </div>
        <div className="msscListElemBody">{jsxElem}</div>
        <div className="msscListElemMenu">
          <MenuAsau54FCC
            data={Object.assign({}, menuData, {id: elem.id.val})}
            cbOnSelected={menuElemOnSelected}
          />
        </div>
      </div>
    )
  }

  /**
   * Выполнение полного перезапроса всех данных
   */
  function updateWhole() {
    $needUpdate1Set(!$needUpdate1)
  }

  const dialogHandlers = {
    cancel: () => {
      $listModel.selectElemsClear()
      $dialogDeleteShowedSet(false)
    },
    ok: async () => {
      console.log(`!!-!!-!! 2025- -> :::::::::::::: ok() {220123202554}:${Date.now()}`) // del+
      if ($listModel.selectElemsCount() > 0) {
        const ids: MsscIdObject[] = $listModel.selectElems().map(el => ({id: el}))
        try {
          const noDeletedElems = await source?.elemsDelete(ids)
          if (noDeletedElems) {
            if (noDeletedElems.length === 0) {
              $listModel.selectElemsClear()
              $dialogDeleteShowedSet(false)
              updateWhole()
            } else {
              console.warn(`[${noDeletedElems.length}] elems not deleted`)
              fnError()
            }
          }
        } catch (err) {

        }
      }
    }
  }

  const iconsConf = {
    svgProps: {width: '20px', height: '20px'},
    colors: new ColorsAsau61().buNormal('#474747')
  }

  const iconsHandlers = {
    delete: () => {
      dialogDeleteShow()
    },
    create: () => {
      $dialogCreateShowedSet(true)
    },
    deselectAll: () => {
      $listModel.selectElemsClear()
      refresh()
    },
  }

  const refresh = () => {
    $refreshSet(!$refresh)
  }

  const dialogCreateCallbacks = {
    /**
     * будет вызыван при нажатии ОК в диалоге создания нового элемента
     * @param model
     */
    ok: async (model: MsscIdObject) => {
      console.log('!!-!!-!! model {220123225610}\n', model) // del+
      // source?.elemsAdd()

    },
    /**
     * для вызова при нажатии Cancel в диалоге создания нового элемента
     */
    cancel: async () => {
      $dialogCreateShowedSet(false)
      scrollFixFn(false)
    }
  }

  return (<div className="msscListBase">
    {$isError ? <div className="msscError">ошибка</div> : null}
    <div className="msscList">
      {$loading ? <div>loading ...</div> : null}
      {!$loading && <>
        <div className="msscListInfoBlock">
          <ParamUiFCC str1="элементов на текущ. странице" str2={$elemsOnCurrPage}/>
          <ParamUiFCC str1="элементов всего по фильтру" str2={"-"}/>
          <ParamUiFCC str1="элементов всего" str2={$elemsCountAll}/>
          <ParamUiFCC str1="элементов выбрано" str2={$listModel.selectElemsCount()}/>
        </div>
        <div className="mssc1454">
          <PaginationFCC/>
          <div className="msscTopButtons">
            {/* ^^delete-button^^ */}
            <button disabled={$listModel.selectElemsCount() < 1} title="удалить выбранные элементы"
                    onClick={iconsHandlers.delete}>
              <SvgIconTrash {...iconsConf}/>
            </button>
            <button title="создать новый элемент" onClick={iconsHandlers.create}>
              <SvgIconPlus {...iconsConf}/>
            </button>
            <button disabled={$listModel.selectElemsCount() < 1} title="отменить выбор всех элементов"
                    onClick={iconsHandlers.deselectAll}>
              <SvgIconUnckecked {...iconsConf}/>
            </button>
          </div>

        </div>
        <div className="msscListBlock">
          {
            $elems.map((elObj: MsscElem) => {
              return (<MsscListElemFCC key={elObj.id.val} elem={elObj}/>)
            })
          }
        </div>
        <PaginationFCC/>
      </>}
    </div>
    {/* ^^dialog^^ */}
    <MsscDialogFCC
      show={$dialogDeleteShowed}
      title={$dialogTitle}
      body={$dialogBody}
      cbCancel={dialogHandlers.cancel}
      cbOk={dialogHandlers.ok}
    />
    {$dialogCreateShowed && $dialogCreateJsx}
  </div>)
}

export default MsscListFCC;
