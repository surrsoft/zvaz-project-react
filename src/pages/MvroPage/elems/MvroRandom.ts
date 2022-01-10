import { mvroWords } from './MvroWords';
import _ from 'lodash';
import { MvroEnVerbDeclension } from './MvroEnVerbDeclension';
import { MvroEnVerbTense } from './MvroEnVerbTense';
import { MvroWord } from './MvroWord';
import { MvroEnVerbPerson } from './MvroEnVerbPerson';
import { MvroEnWordType } from './MvroEnWordType';
import { nxcaFrom } from '../../utilsAsau48';
import { NXCA_NEGATE, NxcaDeclensionForm, NxcaResElem, NxcaTuSklon } from '../../NxcaPage/elems/NxcaTuSklon';
import { NxcaEnSklon } from '../../NxcaPage/elems/NxcaEnSklon';

export class MvroRandom {
  /**
   * генерирует случайную фразу
   */
  static generate() {
    const wordObjRand: MvroWord = _.sample(mvroWords) || mvroWords[0]
    const declensionRand: MvroEnVerbDeclension = _.sample(MvroEnVerbDeclension) || MvroEnVerbDeclension.STATEMENT
    const tenseRand: MvroEnVerbTense = _.sample(MvroEnVerbTense) || MvroEnVerbTense.PRESENT
    const personRand: MvroEnVerbPerson = _.sample(MvroEnVerbPerson) || MvroEnVerbPerson.I
    // --- enForm
    let enForm = ''
    switch (declensionRand) {
      case MvroEnVerbDeclension.STATEMENT:
        switch (tenseRand) {
          case MvroEnVerbTense.PRESENT:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
                enForm = personRand + ' ' + wordObjRand.wordBaseForm
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = personRand + ' ' + wordObjRand.wordBaseForm + 's'
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                if (wordObjRand.types.includes(MvroEnWordType.VERB_IRREGULAR)) {
                  enForm = personRand + ' ' + wordObjRand.wordFormVerbIrregular
                } else {
                  const nx = wordObjRand.wordBaseForm[wordObjRand.wordBaseForm.length - 1] === 'e' ? '' : 'e'
                  enForm = personRand + ' ' + wordObjRand.wordBaseForm + nx + 'd'
                }
                break;
            }
            break;
          case MvroEnVerbTense.FUTURE:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = personRand + ' will ' + wordObjRand.wordBaseForm
                break;
            }
            break;
        }
        break;
      case MvroEnVerbDeclension.NEGATION:
        switch (tenseRand) {
          case MvroEnVerbTense.PRESENT:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
                enForm = personRand + ' don\'t ' + wordObjRand.wordBaseForm
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = personRand + ' doesn\'t ' + wordObjRand.wordBaseForm
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = personRand + ' didn\'t ' + wordObjRand.wordBaseForm
                break;
            }
            break;
          case MvroEnVerbTense.FUTURE:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = personRand + ' will not ' + wordObjRand.wordBaseForm
                break;
            }
            break;
        }
        break;
      case MvroEnVerbDeclension.QUESTION:
        switch (tenseRand) {
          case MvroEnVerbTense.PRESENT:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
                enForm = `Do ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = `Does ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = `Did ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
          case MvroEnVerbTense.FUTURE:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                enForm = `Will ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
        }
        break;
    }
    // --- rusForm
    const wordPart = wordObjRand.wordRus?.wordPart;
    const enSklon: NxcaEnSklon | undefined = wordObjRand.wordRus?.enSklon;
    let rusForm = ''
    if (wordPart && enSklon) {
      const sklons: NxcaResElem[] = NxcaTuSklon.sklon(wordPart, enSklon)
      const decForm: NxcaDeclensionForm = nxcaFrom(personRand, tenseRand)
      const sk: NxcaResElem | undefined = sklons.find(el => el.decForm === decForm)
      if (sk) {
        let rs = sk.res;
        if (declensionRand !== MvroEnVerbDeclension.NEGATION) {
          rs = rs.filter(el => el !== NXCA_NEGATE)
        } else {
          rs = rs.map(el => {
            if (el === NXCA_NEGATE) return 'не'
            return el
          })
        }
        if(declensionRand === MvroEnVerbDeclension.QUESTION) {
          rs.push('?')
        }
        rusForm = rs.join(' ')
      }
    }
    // ---
    return {enForm, rusForm};
  }
}
