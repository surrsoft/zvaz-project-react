/*
[[asau48]]
 */

import { MvroEnVerbPerson } from './MvroPage/elems/MvroEnVerbPerson';
import { MvroEnVerbTense } from './MvroPage/elems/MvroEnVerbTense';
import { NxcaDeclensionForm } from './NxcaPage/elems/NxcaTuSklon';

export function nxcaFrom(enPerson: MvroEnVerbPerson, enTense: MvroEnVerbTense): NxcaDeclensionForm {
  let ret = NxcaDeclensionForm.BASE
  switch (enPerson) {
    case MvroEnVerbPerson.I:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.IFORM_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.IFORM_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.IFORM_F
          break;
      }
      break;
    case MvroEnVerbPerson.YOU:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.YOU_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.YOU_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.YOU_F
          break;
      }
      break;
    case MvroEnVerbPerson.WE:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.WE_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.WE_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.WE_F
          break;
      }
      break;
    case MvroEnVerbPerson.THEY:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.THEY_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.THEY_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.THEY_F
          break;
      }
      break;
    case MvroEnVerbPerson.IT:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.YOU_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.YOU_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.YOU_F
          break;
      }
      break;
    case MvroEnVerbPerson.HE:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.HE_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.HE_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.HE_F
          break;
      }
      break;
    case MvroEnVerbPerson.SHE:
      switch (enTense) {
        case MvroEnVerbTense.PRESENT:
          ret = NxcaDeclensionForm.SHE_A
          break;
        case MvroEnVerbTense.PAST:
          ret = NxcaDeclensionForm.SHE_B
          break;
        case MvroEnVerbTense.FUTURE:
          ret = NxcaDeclensionForm.SHE_F
          break;
      }
      break;
  }
  return ret;
}
