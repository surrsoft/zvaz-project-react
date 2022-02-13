import React from 'react';
import classNames from 'classnames';
import './style.scss';

import MsscListFCC, { MsscMultFields, Ty1159, Ty1609 } from '../../utils/MsscList/MsscListFCC';
import { AirSource } from '../../utils/MsscList/commonUtils/AirSource';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { RsuvEnSort, RsuvTxStringAC } from 'rsuv-lib';
import { BrSelectSortData } from '../../utils/MsscList/commonUI/BrSelect/brSelectUtils';
import { MsscColumnName, SquareBrackets } from '../../utils/MsscList/msscUtils/msscUtils';
import { MsscFilter } from '../../utils/MsscList/msscUtils/MsscFilter';
import _ from 'lodash';

enum EnField {
  TITLE = 'title',
  COMM = 'comm',
  URL = 'url',
  TIME_CREATED = 'time_created',
  TIME_LAST_MODIFIED = 'time_last_modified',
  TAGS = 'tags',
  TAGS2 = 'tags2',
}

const tagsFieldNameArr = [
  {id: EnField.TAGS, fieldName: EnField.TAGS, visibleName: 'теги'} as MsscMultFields,
  {id: EnField.TAGS2, fieldName: EnField.TAGS2, visibleName: 'теги-2'} as MsscMultFields,
];

const airSource = new AirSource({
  dbKey: 'appZoHaX4a5tRLJlv', // mssc-training-3
  // dbKey: 'appXv6ry7Vn262nGR', // sites
  // dbKey: 'appskGCKvIZEdVBTO',
  // dbKey: 'appHOzDglc28fCztP',
  tableName: 'main',
  columns: [
    'id',
    EnField.URL,
    EnField.TITLE,
    EnField.COMM,
    'body',
    'trans_count',
    'trans_date_last',
    'show_date_last',
    EnField.TIME_CREATED,
    EnField.TIME_LAST_MODIFIED,
    EnField.TAGS,
    EnField.TAGS2,
  ],
  elemJsx: (elObj: any) => {
    return (
      <div className="list-elem" key={elObj.tid}>
        <div className="list-elem__title">{elObj.title}</div>
        <div><a className="list-elem__url" href={elObj.url} target="_blank">{elObj.url}</a></div>
        <div className="list-elem__comm">{elObj[EnField.COMM] || ''}</div>
        <div className="list-elem__tags-con">
          {(!elObj.tags || elObj.tags.length < 0) ? null : <div className="list-elem__tags">
            {
              elObj.tags.map((elTag: string) => {
                return (
                  <div key={elTag} className="list-elem__tag">{SquareBrackets.bracketsRemove(elTag)}</div>
                )
              })
            }
          </div>}
          {_.isEmpty(elObj[EnField.TAGS2]) ? null : <div className="list-elem__tags2">
            {elObj[EnField.TAGS2].map((elTag: string) => {
              return (<div key={elTag} className="list-elem__tag2">{SquareBrackets.bracketsRemove(elTag)}</div>)
            })}
          </div>}
        </div>
        <div className="list-elem__times">
          <div className="list-elem__time-lastmodif">
            <span className="list-elem__name">last modif:</span> {elObj[EnField.TIME_LAST_MODIFIED] || ''}
          </div>
          <div className="list-elem__time-created">
            <span className="list-elem__name">created:</span> {elObj[EnField.TIME_CREATED] || ''}
          </div>
        </div>
        <div className="list-elem__id">{elObj.tid}</div>
      </div>
    )
  },
  // ^^dialog create/edit ^^
  /**
   * [[220129101243]]
   * Диалог создания/редактирования элемента
   * @param cbOk (1) -- сюда *с-компонент подставляет колбэк который нужно вызвать при нажатии ОК
   * @param cbCancel (2) -- сюда *с-компонент подставляет колбэк который нужно вызвать при нажатии Cancel
   * @param initialValues (3) --
   */
  dialogCreateEditJsx: async (cbOk: (newElemData: any) => void, cbCancel: () => void, initialValues) => {
    const isEditMode = !!initialValues
    const isCreateMode = !isEditMode

    const btnHandlers = {
      cancel: () => {
        cbCancel?.()
      },
      ok: async (model: any) => {
        const obj = Object.assign({}, {id: ''}, model)
        if (isEditMode) {
          obj.id = (initialValues as any).id
        }
        cbOk?.(obj)
      }
    }

    const fieldNames = [EnField.TITLE, EnField.COMM, EnField.URL]
    const initialValues0 = fieldNames.reduce((acc: any, elFieldName) => {
      acc[elFieldName] = initialValues ? ((initialValues as any)[elFieldName] || '') : '';
      return acc;
    }, {})

    return (
      <div className="cls2326FormContainer">
        <Formik
          initialValues={initialValues0}
          validationSchema={Yup.object({
            [EnField.TITLE]: Yup.string().required('обязательное поле')
          })}
          onSubmit={async (values) => {
            return btnHandlers.ok(values)
          }}
        >
          {({errors}) => (<Form className="cls2326Form">
            <div className="cls2326Title">{isCreateMode ? 'Создание' : 'Редактирование'} элемента</div>
            <div className="cls2326ELem">
              <label>{EnField.TITLE}</label>
              <Field type="text" name={EnField.TITLE}/>
              <ErrorMessage className="cls2326FieldError" name={EnField.TITLE} component="div"/>
            </div>
            <div className="cls2326ELem">
              <label>{EnField.COMM}</label>
              <Field type="text" name={EnField.COMM}/>
            </div>
            <div className="cls2326ELem">
              <label>{EnField.URL}</label>
              <Field type="text" name={EnField.URL}/>
            </div>
            <div className="cls2326Buttons">
              <button onClick={btnHandlers.cancel}>Отмена</button>
              <button type="submit">OK</button>
            </div>
          </Form>)}
        </Formik>
      </div>
    )
  },
  cbFilterFromSearchText: (searchText: string): MsscFilter[] | null => {
    if (searchText) {
      const fieldNameTitle = new RsuvTxStringAC(EnField.TITLE)
      const fieldNameComm = new RsuvTxStringAC(EnField.COMM)
      const fieldNameUrl = new RsuvTxStringAC(EnField.URL)
      return [
        {paramId: fieldNameTitle, filterValue: searchText} as MsscFilter,
        {paramId: fieldNameComm, filterValue: searchText} as MsscFilter,
        {paramId: fieldNameUrl, filterValue: searchText} as MsscFilter,
      ];
    }
    return null
  },
  cbFilterFromTags: (tags: string[], fieldName: string): MsscFilter[] | null => {
    if (tags && tags.length > 0) {
      const filters: MsscFilter[] = []
      tags.map(elTag => {
        const fieldNameTags = new RsuvTxStringAC(fieldName)
        const filter = {paramId: fieldNameTags, filterValue: elTag, isArrElemFind: true} as MsscFilter
        filters.push(filter)
      })
      return filters;
    }
    return null;
  }
})

export function MsscPage() {

  const sortDataSTA = {
    selectedId: 'date-create_desc',
    items: [
      {idElem: 'default', direction: RsuvEnSort.ASC, text: 'по умолчанию', payload: ''},
      {
        idElem: 'date-create_asc',
        direction: RsuvEnSort.ASC,
        text: 'дата создания (от старых к свежим)',
        payload: EnField.TIME_CREATED
      },
      {
        idElem: 'date-create_desc',
        direction: RsuvEnSort.DESC,
        text: 'дата создания (от свежих к старым)',
        payload: EnField.TIME_CREATED
      },
      {idElem: 'title_asc', direction: RsuvEnSort.ASC, text: 'заголовок (по возрастанию)', payload: EnField.TITLE},
      {idElem: 'title_desc', direction: RsuvEnSort.DESC, text: 'заголовок (по убыванию)', payload: EnField.TITLE},
      {
        idElem: 'time-last-modif_asc',
        direction: RsuvEnSort.ASC,
        text: 'дата последнего изменения (от старых правок к свежим)',
        payload: EnField.TIME_LAST_MODIFIED
      },
      {
        idElem: 'time-last-modif_desc',
        direction: RsuvEnSort.DESC,
        text: 'дата последнего изменения (от свежих правок к старым)',
        payload: EnField.TIME_LAST_MODIFIED
      },
    ]
  } as BrSelectSortData<MsscColumnName>

  function listElemStructBuilder({checkboxJsx, bodyJsx, menuJsx}: Ty1609) {
    return (
      <>
        {checkboxJsx}
        {bodyJsx}
        {menuJsx}
      </>
    )
  }

  const fnBuilder = ({
                       infosJsx,
                       paginator1Jsx,
                       paginator2Jsx,
                       sortJsx,
                       searchJsx,
                       buttonsJsx,
                       listJsx,
                       multiselectJsxArr
                     }: Ty1159) => {
    return (
      <>
        {paginator1Jsx}
        <div className="block1722">
          <div className="block1722__buttons">
            {buttonsJsx?.btnCreate}
            {buttonsJsx?.btnDelete}
            {buttonsJsx?.btnDeselectAll}
            {buttonsJsx?.btnDice}
          </div>
          {searchJsx}
          {sortJsx}
          {infosJsx}
        </div>
        <div className="blk-tags">
          {multiselectJsxArr?.map(el => {
            return (<div className="block1948">{el}</div>)
          })}
        </div>
        {listJsx}
      </>
    )
  }


  return (<div>
    <MsscListFCC
      source={airSource}
      listElemStruct={listElemStructBuilder}
      sortData={sortDataSTA}
      tagsFieldNameArr={tagsFieldNameArr}
    >{fnBuilder}</MsscListFCC>
  </div>)
}
