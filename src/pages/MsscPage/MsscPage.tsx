import React from 'react';
import './style.scss';
import MsscListFCC from '../../utils/MsscList/MsscListFCC';
import { AirSource, Cls0040 } from '../../utils/MsscList/commonUtils/AirSource';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'

enum EnField {
  TITLE = 'title',
  COMM = 'comm',
  URL = 'url'
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
  dialogCreateJsx: async (cb: (newElemData: Cls0040) => void) => {
    return (
      <div>
        <Formik
          initialValues={{
            [EnField.TITLE]: '',
            [EnField.COMM]: '',
            [EnField.URL]: ''
          }}
          validationSchema={Yup.object({
            [EnField.TITLE]: Yup.string().required('обязательное поле')
          })}
          onSubmit={() => {

          }}
        >
          <Form className="cls2326Form">
            <div className="cls2326Title">Создание элемента</div>
            <div className="cls2326ELem">
              <label>{EnField.TITLE}</label>
              <Field type="text" name={EnField.TITLE}/>
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
              <button>Отмена</button>
              <button type="submit">Создать</button>
            </div>
          </Form>
        </Formik>
      </div>
    )
  }
})

export function MsscPage() {

  return (<div>
    <div className="title">MsscPage</div>
    <MsscListFCC source={airSource}/>
  </div>)
}
