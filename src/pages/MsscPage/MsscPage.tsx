import React from 'react';
import './style.scss';
import MsscListFCC from '../../utils/MsscList/MsscListFCC';
import { AirSource } from '../../utils/MsscList/commonUtils/AirSource';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import useScrollFix from '../../utils/useScrollFix';
import { RsuvEnSort } from 'rsuv-lib';
import { BrSelectSortData } from '../../utils/MsscList/commonUI/BrSelect/brSelectUtils';
import { MsscColumnName } from '../../utils/MsscList/msscUtils/msscUtils';

enum EnField {
  TITLE = 'title',
  COMM = 'comm',
  URL = 'url',
  DATE_CREATED = 'time_created'
}

const airSource = new AirSource({
  dbKey: 'appskGCKvIZEdVBTO',
  tableName: 'main',
  columns: ['id', 'url', 'title', 'comm', 'body', 'trans_count', 'trans_date_last', 'show_date_last'],
  elemJsx: (elObj: any) => {
    return (
      <div className="zslistElem" key={elObj.tid}>
        <div>{elObj.title}</div>
        <div><a className="cls1452" href={elObj.url} target="_blank">{elObj.url}</a></div>
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
            console.log('!!-!!-!! values {220124124716}\n', values) // del+
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
        payload: EnField.DATE_CREATED
      },
      {
        idElem: 'date-create_desc',
        direction: RsuvEnSort.DESC,
        text: 'дата создания (от свежих к старым)',
        payload: EnField.DATE_CREATED
      },
      {idElem: 'title_asc', direction: RsuvEnSort.ASC, text: 'заголовок (по возрастанию)', payload: EnField.TITLE},
      {idElem: 'title_desc', direction: RsuvEnSort.DESC, text: 'заголовок (по убыванию)', payload: EnField.TITLE},
    ]
  } as BrSelectSortData<MsscColumnName>

  return (<div>
    <div className="title">MsscPage</div>
    <MsscListFCC source={airSource} sortData={sortDataSTA}/>
  </div>)
}
