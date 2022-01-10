import { mvroWords } from './MvroWords';
import _ from 'lodash';
import { MvroEnVerbDeclension } from './MvroEnVerbDeclension';
import { MvroEnVerbTense } from './MvroEnVerbTense';
import { MvroWord } from './MvroWord';
import { MvroEnVerbPerson } from './MvroEnVerbPerson';
import { MvroEnWordType } from './MvroEnWordType';

export class MvroRandom {
  /**
   * генерирует случайную фразу
   */
  static generate() {
    const wordObjRand: MvroWord = _.sample(mvroWords) || mvroWords[0]
    const declensionRand: MvroEnVerbDeclension = _.sample(MvroEnVerbDeclension) || MvroEnVerbDeclension.STATEMENT
    const tenseRand: MvroEnVerbTense = _.sample(MvroEnVerbTense) || MvroEnVerbTense.PRESENT
    const personRand: MvroEnVerbPerson = _.sample(MvroEnVerbPerson) || MvroEnVerbPerson.I
    // ---
    let ret = ''
    switch (declensionRand) {
      case MvroEnVerbDeclension.STATEMENT:
        switch (tenseRand) {
          case MvroEnVerbTense.PRESENT:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
                ret = personRand + ' ' + wordObjRand.wordBaseForm
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = personRand + ' ' + wordObjRand.wordBaseForm + 's'
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                if (wordObjRand.types.includes(MvroEnWordType.VERB_IRREGULAR)) {
                  ret = personRand + ' ' + wordObjRand.wordFormVerbIrregular
                } else {
                  const nx = wordObjRand.wordBaseForm[wordObjRand.wordBaseForm.length - 1] === 'e' ? '' : 'e'
                  ret = personRand + ' ' + wordObjRand.wordBaseForm + nx + 'd'
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
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = personRand + ' will ' + wordObjRand.wordBaseForm
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
              case MvroEnVerbPerson.IT:
                ret = personRand + ' don\'t ' + wordObjRand.wordBaseForm
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = personRand + ' doesn\'t ' + wordObjRand.wordBaseForm
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = personRand + ' didn\'t ' + wordObjRand.wordBaseForm
                break;
            }
            break;
          case MvroEnVerbTense.FUTURE:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = personRand + ' will not ' + wordObjRand.wordBaseForm
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
              case MvroEnVerbPerson.IT:
                ret = `Do ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = `Does ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
          case MvroEnVerbTense.PAST:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = `Did ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
          case MvroEnVerbTense.FUTURE:
            switch (personRand) {
              case MvroEnVerbPerson.I:
              case MvroEnVerbPerson.YOU:
              case MvroEnVerbPerson.WE:
              case MvroEnVerbPerson.THEY:
              case MvroEnVerbPerson.IT:
              case MvroEnVerbPerson.HE:
              case MvroEnVerbPerson.SHE:
                ret = `Will ${personRand} ${wordObjRand.wordBaseForm}?`
                break;
            }
            break;
        }
        break;
    }
    return ret;
  }
}
