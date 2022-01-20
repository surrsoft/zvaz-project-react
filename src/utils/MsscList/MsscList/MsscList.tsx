import React, { ReactNode, useEffect, useState } from 'react';
import './styles.scss';
import { MsscSource } from '../MsscSource';
import { RsuvPaginationGyth, RsuvTxNumIntAB, RsuvTxNumIntDiap } from 'rsuv-lib';
import { MsscElem } from '../MsscElem';
import SvgIconChevron from './SvgIconChevron/SvgIconChevron';

interface MsscListProps {
  source: MsscSource<any> | null
}

// для возврата номера страницы если не удалось получить данные
let isPageUp = false;

const MsscList = ({source}: MsscListProps): JSX.Element => {
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
  // для инициации запроса данных при нажатии изменения страницы в пагинации
  const [$needUpdate, $needUpdateSet] = useState(false);
  // для показа ошибки запроса данных
  const [$isError, $isErrorSet] = useState(false);

  const fnError = () => {
    $isErrorSet(true)
    setTimeout(() => {
      $isErrorSet(false)
    }, 2000);
  }

  const requestFirst = async (source: MsscSource<any>) => {
    try {
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
      console.log(`!!-!!-!! -> :::::::::::::: 1323- {220119132349}:${Date.now()}`) // del+
      $loadingSet(false)
      $fdoneSet(true)
    }
  };

  const requestTwo = async (source: MsscSource<any>) => {
    try {
      $loadingBSet(true)
      // --- pagination - ixStart, ixEnd
      const pagination = new RsuvPaginationGyth($elemsCountAll, config.elemsOnPage)
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
      console.log('!!-!!-!! isPageUp {220119134741}\n', isPageUp) // del+
      // возврат номера страницы
      $pageNumCurrentSet($pageNumCurrent + (isPageUp ? -1 : 1))
      fnError()
    } finally {
      $loadingBSet(false)
    }
  }

  useEffect(() => {
    if (source) {
      (async () => {
        await requestFirst(source)
      })()
    }
  }, []);

  useEffect(() => {
    console.log('!!-!!-!! 1323- $fdone {220119132235}\n', $fdone) // del+
    if (source && $fdone) {
      (async () => {
        await requestTwo(source)
      })();
    }
  }, [$fdone, $needUpdate]);

  const paginationHandlers = {
    up: () => {
      if ($pageNumCurrent < $pageCountAll) {
        isPageUp = true
        $pageNumCurrentSet($pageNumCurrent + 1)
        $needUpdateSet(!$needUpdate)
      }
    },
    down: () => {
      if ($pageNumCurrent > 1) {
        isPageUp = false
        $pageNumCurrentSet($pageNumCurrent - 1)
        $needUpdateSet(!$needUpdate)
      }
    },
  }

  function PaginationFCC() {
    return (
      <div className="msscPaginatorBlock">

        <button className="msscButton2"><SvgIconChevron svgProps={{width: "24px", height: "24px"}}/></button>

        <button className="msscButton svgIcon" disabled={$loadingB} onClick={paginationHandlers.down}/>
        <div className="msscPaginatorBlock_num">{$pageNumCurrent} / {$pageCountAll}</div>
        <button className="msscButton svgIcon iconRotate" disabled={$loadingB} onClick={paginationHandlers.up}/>
        {$loadingB ? <div>loading...</div> : null}
      </div>
    )
  }

  function ParamUiFCC({str1, str2}: { str1: string, str2?: any }) {
    return (
      <div style={{display: 'flex', alignItems: 'center', columnGap: 6, fontFamily: 'monospace'}}>
        <div style={{color: 'blue'}}>{str1}</div>
        <div style={{border: '1px solid silver', borderRadius: 4, padding: '0 8px 0 8px'}}>{str2 || '-'}</div>
      </div>
    )
  }

  return (<div className="msscListBase">
    {$isError ? <div className="msscError">ошибка</div> : null}
    <div>MsscList</div>
    <div className="msscList">
      {$loading ? <div>loading ...</div> : null}
      {!$loading && <>
        <div className="msscListInfoBlock">
          <ParamUiFCC str1="элементов на текущ. странице" str2={$elemsOnCurrPage}/>
          <ParamUiFCC str1="элементов всего по фильтру" str2={"-"}/>
          <ParamUiFCC str1="элементов всего" str2={$elemsCountAll}/>
        </div>
        <PaginationFCC/>
        <div className="msscListBlock">
          {
            $elems.map((elObj: MsscElem) => {
              const jsxElem: JSX.Element = elObj.elem
              return (<div className="msscListElemContainer">
                {jsxElem}
              </div>)
            })
          }
        </div>
        <PaginationFCC/>
      </>}
    </div>
  </div>)
}

export default MsscList;
