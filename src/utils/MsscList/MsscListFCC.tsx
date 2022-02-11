import React, { ReactNode, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import './msscListStyles.scss';
import { MsscIdObject, MsscSource } from './msscUtils/MsscSource';
import {
  RsuvEnResultCrudSet,
  RsuvEnSort,
  RsuvPaginationGyth,
  RsuvTxNumIntAB,
  RsuvTxNumIntDiap,
  RsuvTxSort,
  RsuvTxStringAC
} from 'rsuv-lib';
import { MsscElem } from './msscUtils/MsscElem';
import MenuAsau54FCC, { DataAtAsau54, ItemAtAsau54, SelectResultAtAsau54 } from './commonUI/MenuFCC/MenuAsau54FCC';
import MsscDialogFCC from './msscComponents/MsscDialogFCC/MsscDialogFCC';
import ListModelAsau59 from './commonUtils/ListModelAsau59';
import SvgIconTrash from './commonIcons/SvgIconTrash/SvgIconTrash';
import SvgIconPlus from './commonIcons/SvgIconPlus/SvgIconPlus';
import SvgIconUnckecked from './commonIcons/SvgIconUnchecked/SvgIconUnckecked';
import { ColorsAsau61 } from './commonIcons/utils/ColorsAsau61';
import useScrollFix from '../useScrollFix';
import BrSpinner from './commonUI/BrSpinner/BrSpinner';
import { BrSelectId, BrSelectItem, BrSelectSortData } from './commonUI/BrSelect/brSelectUtils';
import BrSelect from './commonUI/BrSelect/BrSelect';
import { MsscColumnName } from './msscUtils/msscUtils';
import BrInput, { BrInputEnIcon } from './commonUI/BrFilter/BrInput';
import { MsscFilter } from './msscUtils/MsscFilter';
import SvgIconDice from './commonIcons/SvgIconDice/SvgIconDice';
import MsscPaginatorFCC from './msscComponents/MsscPaginatorFCC/MsscPaginatorFCC';
import classNames from 'classnames';
import BrMultiselect, { DataElemAtAsau73 } from './commonUI/BrMultiselect/BrMultiselect';

export interface Ty1159 {
  infosJsx?: JSX.Element
  paginator1Jsx?: JSX.Element
  paginator2Jsx?: JSX.Element
  buttonsJsx?: {
    btnDelete?: JSX.Element,
    btnCreate?: JSX.Element,
    btnDeselectAll?: JSX.Element,
    btnDice?: JSX.Element,
  }
  sortJsx?: JSX.Element
  listJsx?: JSX.Element
  searchJsx?: JSX.Element
  multiselectJsx?: JSX.Element
}

export enum EnMsscMenuAction {
  EDIT = 'edit',
  SELECT = 'select',
  DELETE = 'delete'
}

export type Ty1609 = { isActive?: boolean, checkboxJsx?: JSX.Element, bodyJsx?: JSX.Element, menuJsx?: JSX.Element }

interface MsscListProps {
  source: MsscSource<any> | null
  sortData?: BrSelectSortData<MsscColumnName>
  listElemStruct?: ({
                      checkboxJsx,
                      bodyJsx,
                      menuJsx
                    }: Ty1609) => JSX.Element
  children?: any
  tagsFieldName?: string
}

const MsscListFCC = ({source, sortData, children, listElemStruct, tagsFieldName}: MsscListProps): JSX.Element => {
  // source = null; // del+

  const config = {
    // записей на странице
    elemsOnPage: 10
  }

  const menuDataSTA = {
    id: '',
    items: [
      {idAction: EnMsscMenuAction.EDIT, text: 'Изменить'} as ItemAtAsau54,
      {idAction: EnMsscMenuAction.SELECT, text: 'Выбрать'} as ItemAtAsau54,
      {idAction: EnMsscMenuAction.DELETE, text: 'Удалить'} as ItemAtAsau54
    ]
  } as DataAtAsau54

  // номер текущей страницы (пагинация)
  const [$pageNumCurrent, $pageNumCurrentSet] = useState(1);
  // номер страницы который был перед тем как изменить его на новый
  const [$pageNumBeforChange, $pageNumBeforChangeSet] = useState(1);
  // всего страниц
  const [$pageCountAll, $pageCountAllSet] = useState(0);
  // текущие элементы для отображения
  const [$elems, $elemsSet] = useState<MsscElem[]>([]);
  // общее количество элементов хранилища (без учёта каких-либо фильтров)
  const [$elemsCountAll, $elemsCountAllSet] = useState(-1);
  // общее количество элементов хранилища по фильтру
  const [$elemsCountByFilter, $elemsCountByFilterSet] = useState(0);
  // сколько отображается элементов сейчас на текущей странице
  const [$elemsOnCurrPage, $elemsOnCurrPageSet] = useState(0);
  // для показа спиннера при первоначальной загрузке
  const [$loading, $loadingSet] = useState(false);
  // для показа спиннера при запросе данных страницы (пагинация страниц)
  const [$loadingB, $loadingBSet] = useState(false);
  // показ спиннера для диалогов
  const [$loadingAtDialog, $loadingAtDialogSet] = useState(false);
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
  const [$dialogCreateEditJsx, $dialogCreateEditJsxSet] = useState<JSX.Element | null>(null);
  const [$dialogCreateEditShowed, $dialogCreateEditShowedSet] = useState(false);
  // ---
  const [$listModel] = useState(() => {
    return new ListModelAsau59()
  });
  const [$refresh, $refreshSet] = useState(false);
  // ---
  // id выбранной в настоящее время сортировки
  const [$sortIdCurr, $sortIdCurrSet] = useState<BrSelectId | undefined>(sortData?.selectedId);
  const [$searchText, $searchTextSet] = useState('');
  const [$randomEnabled, $randomEnabledSet] = useState(false);
  const [$idsShuffled, $idsShuffledSet] = useState<string[]>([]);
  const [$tags, $tagsSet] = useState<DataElemAtAsau73[]>([]);
  const [$tagsSelected, $tagsSelectedSet] = useState<DataElemAtAsau73[]>([]);

  // ---
  const scrollFixFn = useScrollFix($dialogCreateEditShowed)

  const shuffleUtils = {
    /**
     * Получить ids из {@link $idsShuffled} начиная с (1) включительно по (2) исключительно
     * @param ixStart (1) -- индекс
     * @param ixEnd (2) -- индекс
     */
    elems(ixStart: number, ixEnd: number): MsscIdObject[] {
      return $idsShuffled.slice(ixStart, ixEnd + 1).map((el) => ({id: el}))
    },
    // /**
    //  * вставляет id из (1) случаным образом в {@link $idsShuffled}
    //  * @param ids
    //  */
    // elemsAdd(ids: string[]) {
    //   ids.forEach(elId => {
    //     const ixPut = _.random($idsShuffled.length)
    //     $idsShuffled.splice(ixPut, 0, elId)
    //   })
    // },
    // /**
    //  * удаляет из {@link $idsShuffled} id присутствующие в (1)
    //  * @param ids
    //  */
    // elemsDelete(ids: string[]) {
    //   const filtered = $idsShuffled.filter(elId => ids.includes(elId))
    //   $idsShuffledSet(filtered)
    // }
  }

  const fnError = () => {
    $isErrorSet(true)
    setTimeout(() => {
      $isErrorSet(false)
    }, 2000);
  }

  function fnFiltersCreate(source: MsscSource<any>): MsscFilter[] {
    let filterTags: MsscFilter[] = []
    if (tagsFieldName) {
      const tags = $tagsSelected.map(el => {
        return el.id
      })
      filterTags = source?.filterFromTags(tags) || []
    }
    console.log('!!-!!-!! filterTags {220210170830}\n', filterTags) // del+
    // ---
    // [[220130145735]]
    const filterSearchText = source?.filterFromSearchText($searchText) || []
    // ---
    return [...filterTags, ...filterSearchText];
  }

  function fnSorts() {
    function fnRsuvTxSort(sortItem: BrSelectItem<string>) {
      if (!sortItem.payload) {
        return null;
      } else {
        const columnName = new RsuvTxStringAC(sortItem.payload);
        return new RsuvTxSort(columnName, sortItem.direction as RsuvEnSort);
      }
    }

    let rsuvTxSort0 = null
    let item: BrSelectItem<string> | undefined;
    if ($sortIdCurr) {
      item = sortData?.items.find(el => el.idElem === $sortIdCurr);
      if (item) {
        rsuvTxSort0 = fnRsuvTxSort(item)
      }
    }
    return rsuvTxSort0 ? [rsuvTxSort0] : [];
  }

  const requestFirst = async (source: MsscSource<any>) => {

    try {
      // --- общее кол-во элементов без учета фильтра
      $elemsCountAllSet(-1)
      source?.elemsCountByFilter([]).then((result) => {
        $elemsCountAllSet(result.val)
      }).catch((err) => {
        console.log('!!-!!-!! err {220130133850}\n', err)
      })
      // ---
      $loadingSet(true)
      // --- получение общего количества элементов с учетом фильтра
      const filters: MsscFilter[] = fnFiltersCreate(source);
      let elemsCountByFilter: number = 0;
      if ($randomEnabled) {
        const sorts = fnSorts()
        const ids = await source?.idsAll(filters, sorts) // AWAIT
        if (ids) {
          elemsCountByFilter = ids.length
          const idsShuffled = _.shuffle(ids)
          $idsShuffledSet(idsShuffled)
        }
      } else {
        const rr: RsuvTxNumIntAB = await source?.elemsCountByFilter(filters)
        if (rr) {
          elemsCountByFilter = rr.val;
        }
      }
      // --- получение тегов
      if (tagsFieldName) {
        const tags = await source?.tags(filters, tagsFieldName)
        console.log('!!-!!-!! tags {220210130326}\n', tags) // del+
        const tags0 = tags.map(el => {
          return new DataElemAtAsau73(el.value, `${el.value} (${el.count})`)
        })
        // ---
        tags0.forEach(elTag => {
          const b1 = $tagsSelected.find(el => el.id === elTag.id)
          if (b1) {
            elTag.checked = true;
          }
        })
        // ---
        $tagsSet(tags0)
      }
      // --- pagination - pageCountAll
      const pagination = new RsuvPaginationGyth(elemsCountByFilter, config.elemsOnPage)
      // ---
      $pageCountAllSet(pagination.pageCount)
      $elemsCountByFilterSet(elemsCountByFilter)
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
      const pagination = new RsuvPaginationGyth($elemsCountByFilter, config.elemsOnPage)
      if ($pageNumCurrent > pagination.pageCount) {
        // если в результате удаления элементов, страниц стало меньше чем было раньше
        $pageNumCurrentSet(pagination.pageCount)
      }
      const indexes = pagination.indexesByPageNum($pageNumCurrent)
      const ixStart = indexes.indexStart
      const ixEnd = indexes.indexLast
      // --- --- получение элементов из source
      // --- сортировка
      const sorts = fnSorts();
      // --- filters
      const filter0 = fnFiltersCreate(source);
      // ---
      let elemsResult: MsscElem[] = []
      if (!$randomEnabled) {
        elemsResult = await source.elems(
          new RsuvTxNumIntDiap(new RsuvTxNumIntAB(ixStart), new RsuvTxNumIntAB(ixEnd)),
          filter0 || [],
          sorts
        )
      } else {
        const idObjs = shuffleUtils.elems(ixStart, ixEnd)
        elemsResult = (await source?.elemsById(idObjs)) || []
      }
      // --- ---
      $elemsOnCurrPageSet(elemsResult.length)
      // ---
      $elemsSet(elemsResult)
    } catch (err) {
      console.log('!!-!!-!! err {220119120754}\n', err)
      // возвращаем старый номер страницы
      $pageNumCurrentSet($pageNumBeforChange)
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
    if (source && $fdone) {
      (async () => {
        await requestTwo(source)
      })();
    }
  }, [$fdone, $needUpdate2]);

  function refreshPageData() {
    $needUpdate2Set(!$needUpdate2)
  }

  /**
   * Выполнение полного перезапроса всех данных
   *
   * СМ, ТАКЖЕ {@link refresh}
   */
  function refreshWhole() {
    $needUpdate1Set(!$needUpdate1)
  }

  /**
   * Перезапрос данных страницы только.
   *
   * СМ. ТАКЖЕ {@link refreshWhole}
   */
  const refresh = () => {
    $refreshSet(!$refresh)
  }

  const dialogDeleteShow = () => {
    $dialogTitleSet('удаление')
    $dialogBodySet(`удалить элемент(ы) ? ${$listModel.selectElemsCount()} шт.`)
    $dialogDeleteShowedSet(true)
  }

  const dialogCreateEditCallbacks = {
    /**
     * [[220128213044]]
     * Будет вызыван при нажатии ОК в диалоге создания/редактировании элемента. Если у (1) не пустое (truthy) поле `id` то
     * значит нужно обновить элемент, иначе - создать элемент
     * @param model
     */
    ok: async (model: any) => {
      let success = false;
      try {
        $loadingAtDialogSet(true)
        if (!model.id) {
          // ^ создание нового элемента
          const result = await source?.elemsAdd([model])
          if (result && result.length === 1 && result[0]['id']) {
            success = true;
            $listModel.activeIdSet(result[0]['id'])
            $searchTextSet('')
          }
        } else {
          // ^ обновление элемента
          const result = await source?.elemsSet([model])
          if (result && result.length === 1) {
            const rr = result[0];
            if (rr.success) {
              const enCrudResult: RsuvEnResultCrudSet | undefined = rr.value
              if (!enCrudResult) throw new Error('[[220129123729]]')
              if (enCrudResult === RsuvEnResultCrudSet.ERROR) throw new Error('[[220129123837]]')
              success = true;
            } else {
              throw new Error('[[220129123902]]')
            }
          } else {
            throw new Error('[[220129123916]]')
          }
        }
      } catch (err) {
        console.log('!!-!!-!! err {220126221404}\n', err)
      } finally {
        $loadingAtDialogSet(false)
        scrollFixFn(false)
        if (success) {
          $dialogCreateEditShowedSet(false)
          refreshWhole()
        } else {
          fnError()
        }
      }

    },
    /**
     * для вызова при нажатии Cancel в диалоге создания/редатирования нового элемента
     */
    cancel: async () => {
      $dialogCreateEditShowedSet(false)
      scrollFixFn(false)
    }
  }

  function ParamUiLocalFCC({str1, str2}: { str1: string, str2?: any }) {
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

  function ParamUiLocalFCC_B({str1, str2}: { str1: string, str2?: any }) {
    return (
      <div
        className="mssc-infos-b__value"
        title={str1}
      >
        {(str2 || str2 === 0) ? str2 : '-'}
      </div>
    )
  }

  function ListElemLocalFCC({elem}: { elem: MsscElem }) {
    const jsxElem: JSX.Element = elem.elem

    /**
     * [[220129111758]]
     * @param obj
     */
    const menuElemOnSelected = async (obj: SelectResultAtAsau54) => {
      switch (obj.idAction) {
        case EnMsscMenuAction.DELETE:
          if (obj.idElem) {
            // чистим если что-то уже выбрано
            $listModel.selectElemsClear()
            $listModel.selectElemsAdd([obj.idElem])
            $listModel.activeIdSet(obj.idElem)
            refresh()
          }
          dialogDeleteShow()
          break;
        case EnMsscMenuAction.SELECT:
          if (obj.idElem) {
            $listModel.selectElemsAdd([obj.idElem])
            $listModel.activeIdSet(obj.idElem)
            refresh()
          }
          break;
        case EnMsscMenuAction.EDIT:
          if (obj.idElem) {
            const elem = $elems.find(el => el.id.val === obj.idElem)
            if (elem) {
              $listModel.activeIdSet(elem.id.val)
              const jsxEdit = await source?.dialogCreateOrEdit(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel, elem.elemModel)
              $dialogCreateEditJsxSet(jsxEdit || null)
              if (jsxEdit) {
                $dialogCreateEditShowedSet(true)
              }
            }
          }
          break;
      }
    }

    /**
     * [[220129135526]]
     * @param id
     */
    const checkboxOnChange = (id: string) => (ev: any) => {
      const checked = ev.target.checked
      if (checked) {
        $listModel.selectElemsAdd([id])
        $listModel.activeIdSet(id)
      } else {
        $listModel.selectElemsDelete([id])
        $listModel.activeIdSet(id)
      }
      refresh()
    }

    function RkCheckboxLocalFCC() {
      return (
        <div className="mssc-list-elem__checkbox">
          <input
            type="checkbox"
            checked={$listModel.selectElemIs(elem.id.val)}
            onChange={checkboxOnChange(elem.id.val)}
          />
        </div>
      )
    }

    function RkBodyLocalFCC() {
      return (
        <div className="mssc-list-elem__body">{jsxElem}</div>
      )
    }

    function RkMenuLocalFCC() {
      return (
        <div className="mssc-list-elem__menu">
          <MenuAsau54FCC
            data={Object.assign({}, menuDataSTA, {id: elem.id.val})}
            cbOnSelected={menuElemOnSelected}
          />
        </div>
      )
    }

    const containerCn = classNames('mssc-list-elem', {'mssc-list-elem_active': $listModel.activeIdIs(elem.id.val)})

    return listElemStruct
      ? (<div className={containerCn}>
        {listElemStruct({
          isActive: $listModel.activeIdIs(elem.id.val),
          checkboxJsx: <RkCheckboxLocalFCC/>,
          bodyJsx: <RkBodyLocalFCC/>,
          menuJsx: <RkMenuLocalFCC/>
        })}
      </div>)
      : (
        <div className={containerCn}>
          <RkCheckboxLocalFCC/>
          <RkBodyLocalFCC/>
          <RkMenuLocalFCC/>
        </div>
      )
  }

  function SearchLocalFCC() {
    /**
     * [[220130110028]]
     */
    function searchHandler(value: string) {
      $searchTextSet(value)
      refreshWhole()
    }

    return (
      // [[220130103738]]
      <BrInput
        icon={BrInputEnIcon.SEARCH}
        cbOnChange={searchHandler}
        initialValue={$searchText}
        autoFocus={true}
      />
    )
  }

  function SortLocalFCC() {


    /**
     * [[220129163836]]
     * @param sortItem
     */
    const sortHandler = (sortItem: BrSelectItem<MsscColumnName>) => {
      $sortIdCurrSet(sortItem.idElem)
      refreshWhole()
    }

    return (
      <>
        {
          sortData && <div className="mssc-body__sort-filter-container">
            {/* [[220129214739]] */}
						<BrSelect data={sortData} cbSelect={sortHandler} selectedId={$sortIdCurr} />
					</div>
        }
      </>
    )
  }

  function PaginatorLocalFCC() {

    async function fnPaginationHandle(nextPage: number) {
      $pageNumBeforChangeSet($pageNumCurrent)
      $pageNumCurrentSet(nextPage)
      refreshPageData()
    }

    return (
      <div className="mssc-list-paginator">
        <MsscPaginatorFCC
          pageCurrNum={$pageNumCurrent}
          pageAllCountNum={$pageCountAll}
          cbChange={fnPaginationHandle}
          disabled={$loadingB}
        />
      </div>
    )
  }

  const iconsConf = {
    svgProps: {width: '20px', height: '20px'},
    colors: new ColorsAsau61().buNormal('#474747')
  }

  function ButtonDeleteLocalFCC() {
    const deleteHandler = () => {
      dialogDeleteShow()
    }
    return (
      <button disabled={$listModel.selectElemsCount() < 1} title="удалить выбранные элементы"
              onClick={deleteHandler}>
        <SvgIconTrash {...iconsConf}/>
      </button>
    )
  }

  function ButtonCreateLocalFCC() {
    const createHandler = async () => {
      const jsxCreate = await source?.dialogCreateOrEdit(dialogCreateEditCallbacks.ok, dialogCreateEditCallbacks.cancel)
      $dialogCreateEditJsxSet(jsxCreate || null)
      if (jsxCreate) {
        $dialogCreateEditShowedSet(true)
      }
    }
    return (
      <button title="создать новый элемент" onClick={createHandler}>
        <SvgIconPlus {...iconsConf}/>
      </button>
    )
  }

  function ButtonDeselectAllLocalFCC() {
    const deselectAllHandler = () => {
      $listModel.selectElemsClear()
      refresh()
    }
    return (
      <button disabled={$listModel.selectElemsCount() < 1} title="отменить выбор всех элементов"
              onClick={deselectAllHandler}>
        <SvgIconUnckecked {...iconsConf}/>
      </button>
    )
  }

  function ButtonDiceLocalFCC() {
    const fnColorsForRandom = () => {
      if (!$randomEnabled) {
        return new ColorsAsau61()
      }
      return new ColorsAsau61().buNormal('#71fc22').buHover('#71fc22')
    }

    /**
     * [[220130202338]]
     */
    function diceHandler() {
      $randomEnabledSet(!$randomEnabled)
      refreshWhole()
    }

    // [[220130202258]] random button
    return (
      <button onClick={diceHandler} title="random">
        <SvgIconDice svgProps={{width: '20px', height: '20px'}} colors={fnColorsForRandom()}/>
      </button>
    )
  }

  function ButtonsLocalFCC() {
    return (
      <div className="mssc-body__buttons">
        <ButtonDeleteLocalFCC/>
        <ButtonCreateLocalFCC/>
        <ButtonDeselectAllLocalFCC/>
        <ButtonDiceLocalFCC/>
      </div>
    )
  }

  function DialogDeleteLocalFCC() {
    /**
     * [[220128215639]]
     */
    const dialogDeleteHandlers = {
      cancel: () => {
        $listModel.selectElemsClear()
        $dialogDeleteShowedSet(false)
      },
      ok: async () => {
        if ($listModel.selectElemsCount() > 0) {
          const ids: MsscIdObject[] = $listModel.selectElems().map(el => ({id: el}))
          try {
            $loadingAtDialogSet(true)
            const noDeletedElems = await source?.elemsDelete(ids)
            if (noDeletedElems) {
              if (noDeletedElems.length === 0) {
                $listModel.selectElemsClear()
                scrollFixFn(false)
                $dialogDeleteShowedSet(false)
                refreshWhole()
              } else {
                console.warn(`[${noDeletedElems.length}] elems not deleted`)
                fnError()
              }
            }
          } catch (err) {
            console.log('!!-!!-!! err {220128215806}\n', err)
          } finally {
            $loadingAtDialogSet(false)
          }
        }
      }
    }

    return (
      <MsscDialogFCC
        show={$dialogDeleteShowed}
        title={$dialogTitle}
        body={$dialogBody}
        cbCancel={dialogDeleteHandlers.cancel}
        cbOk={dialogDeleteHandlers.ok}
      />
    )
  }

  function InfosLocalFCC() {
    return (
      <div className="mssc-base__infos">
        <ParamUiLocalFCC str1="элементов на текущ. странице" str2={$elemsOnCurrPage}/>
        <ParamUiLocalFCC str1="элементов всего по фильтру" str2={$elemsCountByFilter}/>
        <ParamUiLocalFCC str1="элементов всего" str2={$elemsCountAll === -1 ? '-' : $elemsCountAll}/>
        <ParamUiLocalFCC str1="элементов выбрано" str2={$listModel.selectElemsCount()}/>
      </div>
    )
  }

  function InfosLocalFCC_B() {
    return (
      <div className="mssc-infos-b">
        <ParamUiLocalFCC_B str1="элементов на текущ. странице" str2={$elemsOnCurrPage}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов всего по фильтру" str2={$elemsCountByFilter}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов всего" str2={$elemsCountAll === -1 ? '-' : $elemsCountAll}/>
        <span className="mssc-infos-b__divider">/</span>
        <ParamUiLocalFCC_B str1="элементов выбрано" str2={$listModel.selectElemsCount()}/>
      </div>
    )
  }

  function ListLocalFCC() {
    return (
      <div className="mssc-list-block" style={{position: 'relative'}}>
        <BrSpinner show={$loadingB} fullscreen={false}/>
        {
          $elems.map((elObj: MsscElem) => {
            return (<ListElemLocalFCC key={elObj.id.val} elem={elObj}/>)
          })
        }
      </div>
    )
  }

  function MultiselectLocalFCC() {
    const onChangeHandle = (checkedElems: DataElemAtAsau73[]) => {
      console.log('!!-!!-!! checkedElems {220209223245}\n', checkedElems) // del+
      $tagsSelectedSet(checkedElems)
      refreshWhole()
    }

    return (
      <div className="mscc-mselect">
        <BrMultiselect datas={$tags} cbOnChange={onChangeHandle} text="теги"/>
      </div>
    )
  }

  // --- === ---

  return (
    <div className="mssc-base">
      {$isError ? <div className="mssc-base__error">ошибка</div> : null}

      {/* // del+ mass */}
      {/*{!$loading && <div className="mssc-base__list">*/}
      {/*	<InfosLocalFCC/>*/}
      {/*	<div className="mssc-base__body">*/}
      {/*    /!* [[220129145117]] *!/*/}
      {/*		<ButtonsLocalFCC/>*/}
      {/*		<SortLocalFCC/>*/}
      {/*	</div>*/}
      {/*	<PaginatorLocalFCC/>*/}
      {/*	<ListLocalFCC/>*/}
      {/*	<PaginatorLocalFCC/>*/}
      {/*</div>*/}
      {/*}*/}

      {
        !$loading && children?.({
          infosJsx: <InfosLocalFCC_B/>,
          paginator1Jsx: <PaginatorLocalFCC/>,
          paginator2Jsx: <PaginatorLocalFCC/>,
          buttonsJsx: {
            btnDelete: <ButtonDeleteLocalFCC/>,
            btnCreate: <ButtonCreateLocalFCC/>,
            btnDeselectAll: <ButtonDeselectAllLocalFCC/>,
            btnDice: <ButtonDiceLocalFCC/>
          },
          sortJsx: <SortLocalFCC/>,
          searchJsx: <SearchLocalFCC/>,
          listJsx: <ListLocalFCC/>,
          multiselectJsx: <MultiselectLocalFCC/>
        } as Ty1159)
      }

      {/* ^^dialog delete^^ */}
      <DialogDeleteLocalFCC/>
      {/* ^^dialog create/edit ^^ */}
      {$dialogCreateEditShowed && $dialogCreateEditJsx}
      {/* spinner */}
      <BrSpinner show={$loading || $loadingAtDialog}/>
    </div>
  )
}

export default MsscListFCC;
