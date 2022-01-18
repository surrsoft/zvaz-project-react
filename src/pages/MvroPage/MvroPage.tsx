import { useState } from 'react';
import { MvroRandom } from './elems/MvroRandom';
import './styles.scss'
import { Formik, Form, Field } from 'formik'

enum EnQuestionLang {
  EN = 'en',
  RU = 'ru'
}


export function MvroPage() {
  const langInit = EnQuestionLang.RU
  const [phraseEn, phraseEnSet] = useState('');
  const [phraseRu, phraseRuSet] = useState('');
  const [questionLang, questionLangSet] = useState(langInit);
  const [show, showSet] = useState(false);


  function genHandle() {
    if (!show && !!phraseEn) {
      showSet(true)
    } else {
      const phrase = MvroRandom.generate()
      showSet(false)
      phraseEnSet(phrase.enForm)
      phraseRuSet(phrase.rusForm)
    }
  }

  function BtnCMP() {

    function clickHandle() {
      showSet(!show)
    }

    return (<div>
      <input className="inputButton" type="button" value="show" onClick={clickHandle}/>
      <div className="phrase"
           style={{display: !show ? 'none' : 'block'}}>{questionLang === EnQuestionLang.EN ? phraseRu : phraseEn}</div>
    </div>)
  }

  return (<div>
    <div>MvroPage</div>

    <Formik
      initialValues={{picked: langInit}}
      onSubmit={() => {
      }}
      validateOnChange={true}
      validate={(values) => {
        questionLangSet(values.picked as EnQuestionLang)
      }}
    >
      {() => (
        <Form>
          <label className="labelForm">
            <Field className="fieldForm" type="radio" name="picked" value={EnQuestionLang.EN}/>
            {EnQuestionLang.EN}
          </label>
          <label className="labelForm">
            <Field className="fieldForm" type="radio" name="picked" value={EnQuestionLang.RU}/>
            {EnQuestionLang.RU}
          </label>
        </Form>
      )}
    </Formik>

    <input className='inputButton' type="button" value="generate" onClick={genHandle}/>

    {questionLang === EnQuestionLang.EN
      ? <div className="phrase">{phraseEn}</div> : <div className="phrase">{phraseRu}</div>}
    <BtnCMP/>
  </div>)
}
