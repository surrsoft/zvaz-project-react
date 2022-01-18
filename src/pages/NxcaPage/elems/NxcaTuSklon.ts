import { NxcaEnSklon } from './NxcaEnSklon';

export enum NxcaDeclensionForm {
  /** основная форма, например "любить" */
  BASE = 'base_form',
  /** я "люблю" */
  IFORM_A = 'i_form',
  YOU_A = 'you',
  WE_A = 'we',
  THEY_A = 'they',
  HE_A = 'he',
  SHE_A = 'she',
  // --- прошлое
  IFORM_B = 'i_form_b',
  YOU_B = 'you_b',
  WE_B = 'we_b',
  THEY_B = 'they_b',
  HE_B = 'he_b',
  SHE_B = 'she_b',
  // --- будущее
  IFORM_F = 'i_form_f',
  YOU_F = 'you_f',
  WE_F = 'we_f',
  THEY_F = 'they_f',
  HE_F = 'he_f',
  SHE_F = 'she_f',
}

/**
 * местоимение
 * @param sklonForm
 */
function pronoun(sklonForm: NxcaDeclensionForm): string {
  switch (sklonForm) {
    case NxcaDeclensionForm.BASE:
      return ''
    case NxcaDeclensionForm.IFORM_A:
      return 'я';
    case NxcaDeclensionForm.YOU_A:
      return 'ты';
    case NxcaDeclensionForm.WE_A:
      return 'мы';
    case NxcaDeclensionForm.THEY_A:
      return 'они';
    case NxcaDeclensionForm.HE_A:
      return 'он';
    case NxcaDeclensionForm.SHE_A:
      return 'она';
    case NxcaDeclensionForm.IFORM_B:
      return 'я';
    case NxcaDeclensionForm.YOU_B:
      return 'ты';
    case NxcaDeclensionForm.WE_B:
      return 'мы';
    case NxcaDeclensionForm.THEY_B:
      return 'они';
    case NxcaDeclensionForm.HE_B:
      return 'он';
    case NxcaDeclensionForm.SHE_B:
      return 'она';
    case NxcaDeclensionForm.IFORM_F:
      return 'я';
    case NxcaDeclensionForm.YOU_F:
      return 'ты';
    case NxcaDeclensionForm.WE_F:
      return 'мы';
    case NxcaDeclensionForm.THEY_F:
      return 'они';
    case NxcaDeclensionForm.HE_F:
      return 'он';
    case NxcaDeclensionForm.SHE_F:
      return 'она';
  }
}

export const NXCA_NEGATE = '%n%'

/**
 * строка на русском в виде массива
 */
export class NxcaResElem {
  res: string[] = []

  constructor(public decForm: NxcaDeclensionForm, public val: string) {
    const pronounVal = pronoun(decForm)
    this.res = [pronounVal, NXCA_NEGATE, val]
  }
}

export class NxcaResElemB {
  constructor(public sklonEnum: NxcaEnSklon, public elems: NxcaResElem[]) {

  }
}

export class NxcaTuSklon {

  /**
   *
   * @param wordPart
   * @param sklonEnum
   */
  static sklon(wordPart: string, sklonEnum: NxcaEnSklon): NxcaResElem[] {
    const ret: NxcaResElem[] = []

    const fn1 = (sklonForm: NxcaDeclensionForm, suffix = '', prefix = '', replace = false) => {
      if (!replace) {
        ret.push(new NxcaResElem(sklonForm, prefix + wordPart + suffix))
      } else {
        ret.push(new NxcaResElem(sklonForm, suffix))
      }
    }

    switch (sklonEnum) {
      case NxcaEnSklon.S1:
        fn1(NxcaDeclensionForm.BASE, 'ить')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'лю')
        fn1(NxcaDeclensionForm.YOU_A, 'ишь')
        fn1(NxcaDeclensionForm.WE_A, 'им')
        fn1(NxcaDeclensionForm.THEY_A, 'ят')
        fn1(NxcaDeclensionForm.HE_A, 'ит')
        fn1(NxcaDeclensionForm.SHE_A, 'ит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ил')
        fn1(NxcaDeclensionForm.YOU_B, 'ил')
        fn1(NxcaDeclensionForm.WE_B, 'или')
        fn1(NxcaDeclensionForm.THEY_B, 'или')
        fn1(NxcaDeclensionForm.HE_B, 'ил')
        fn1(NxcaDeclensionForm.SHE_B, 'ила')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ить', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ить', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ить', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ить', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ить', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ить', 'будет ')
        break;
      case NxcaEnSklon.S2:
        fn1(NxcaDeclensionForm.BASE, 'ать')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'у')
        fn1(NxcaDeclensionForm.YOU_A, 'ишь')
        fn1(NxcaDeclensionForm.WE_A, 'им')
        fn1(NxcaDeclensionForm.THEY_A, 'ат')
        fn1(NxcaDeclensionForm.HE_A, 'ит')
        fn1(NxcaDeclensionForm.SHE_A, 'ит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ал')
        fn1(NxcaDeclensionForm.YOU_B, 'ал')
        fn1(NxcaDeclensionForm.WE_B, 'али')
        fn1(NxcaDeclensionForm.THEY_B, 'али')
        fn1(NxcaDeclensionForm.HE_B, 'ал')
        fn1(NxcaDeclensionForm.SHE_B, 'ала')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ать', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ать', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ать', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ать', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ать', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ать', 'будет ')
        break;
      case NxcaEnSklon.S3:
        fn1(NxcaDeclensionForm.BASE, 'ить')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'ю')
        fn1(NxcaDeclensionForm.YOU_A, 'ишь')
        fn1(NxcaDeclensionForm.WE_A, 'им')
        fn1(NxcaDeclensionForm.THEY_A, 'ят')
        fn1(NxcaDeclensionForm.HE_A, 'ит')
        fn1(NxcaDeclensionForm.SHE_A, 'ит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ил')
        fn1(NxcaDeclensionForm.YOU_B, 'ил')
        fn1(NxcaDeclensionForm.WE_B, 'или')
        fn1(NxcaDeclensionForm.THEY_B, 'или')
        fn1(NxcaDeclensionForm.HE_B, 'ил')
        fn1(NxcaDeclensionForm.SHE_B, 'ила')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ить', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ить', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ить', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ить', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ить', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ить', 'будет ')
        break;
      case NxcaEnSklon.S4:
        fn1(NxcaDeclensionForm.BASE, 'ать')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'аю')
        fn1(NxcaDeclensionForm.YOU_A, 'аешь')
        fn1(NxcaDeclensionForm.WE_A, 'аем')
        fn1(NxcaDeclensionForm.THEY_A, 'ают')
        fn1(NxcaDeclensionForm.HE_A, 'ает')
        fn1(NxcaDeclensionForm.SHE_A, 'ает')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ал')
        fn1(NxcaDeclensionForm.YOU_B, 'ал')
        fn1(NxcaDeclensionForm.WE_B, 'али')
        fn1(NxcaDeclensionForm.THEY_B, 'али')
        fn1(NxcaDeclensionForm.HE_B, 'ал')
        fn1(NxcaDeclensionForm.SHE_B, 'ала')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ать', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ать', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ать', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ать', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ать', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ать', 'будет ')
        break;
      case NxcaEnSklon.S5:
        fn1(NxcaDeclensionForm.BASE, 'деть')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'жу')
        fn1(NxcaDeclensionForm.YOU_A, 'дишь')
        fn1(NxcaDeclensionForm.WE_A, 'дим')
        fn1(NxcaDeclensionForm.THEY_A, 'дят')
        fn1(NxcaDeclensionForm.HE_A, 'дит')
        fn1(NxcaDeclensionForm.SHE_A, 'дит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'дел')
        fn1(NxcaDeclensionForm.YOU_B, 'дел')
        fn1(NxcaDeclensionForm.WE_B, 'дели')
        fn1(NxcaDeclensionForm.THEY_B, 'дели')
        fn1(NxcaDeclensionForm.HE_B, 'дел')
        fn1(NxcaDeclensionForm.SHE_B, 'дела')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'деть', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'деть', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'деть', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'деть', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'деть', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'деть', 'будет ')
        break;
      case NxcaEnSklon.S6:
        fn1(NxcaDeclensionForm.BASE, 'дить')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'жу')
        fn1(NxcaDeclensionForm.YOU_A, 'дишь')
        fn1(NxcaDeclensionForm.WE_A, 'дим')
        fn1(NxcaDeclensionForm.THEY_A, 'дят')
        fn1(NxcaDeclensionForm.HE_A, 'дит')
        fn1(NxcaDeclensionForm.SHE_A, 'дит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'дил')
        fn1(NxcaDeclensionForm.YOU_B, 'дил')
        fn1(NxcaDeclensionForm.WE_B, 'дили')
        fn1(NxcaDeclensionForm.THEY_B, 'дили')
        fn1(NxcaDeclensionForm.HE_B, 'дил')
        fn1(NxcaDeclensionForm.SHE_B, 'дила')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'дить', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'дить', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'дить', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'дить', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'дить', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'дить', 'будет ')
        break;
      case NxcaEnSklon.S7:
        fn1(NxcaDeclensionForm.BASE, 'ить')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'иву')
        fn1(NxcaDeclensionForm.YOU_A, 'ивёшь')
        fn1(NxcaDeclensionForm.WE_A, 'ивём')
        fn1(NxcaDeclensionForm.THEY_A, 'ивут')
        fn1(NxcaDeclensionForm.HE_A, 'ивёт')
        fn1(NxcaDeclensionForm.SHE_A, 'ивёт')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ил')
        fn1(NxcaDeclensionForm.YOU_B, 'ил')
        fn1(NxcaDeclensionForm.WE_B, 'или')
        fn1(NxcaDeclensionForm.THEY_B, 'или')
        fn1(NxcaDeclensionForm.HE_B, 'ил')
        fn1(NxcaDeclensionForm.SHE_B, 'ила')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ить', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ить', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ить', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ить', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ить', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ить', 'будет ')
        break;
      case NxcaEnSklon.S8:
        fn1(NxcaDeclensionForm.BASE, 'ится')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'люсь')
        fn1(NxcaDeclensionForm.YOU_A, 'ишься')
        fn1(NxcaDeclensionForm.WE_A, 'имся')
        fn1(NxcaDeclensionForm.THEY_A, 'ятся')
        fn1(NxcaDeclensionForm.HE_A, 'ится')
        fn1(NxcaDeclensionForm.SHE_A, 'ится')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'ился')
        fn1(NxcaDeclensionForm.YOU_B, 'ился')
        fn1(NxcaDeclensionForm.WE_B, 'ились')
        fn1(NxcaDeclensionForm.THEY_B, 'ились')
        fn1(NxcaDeclensionForm.HE_B, 'ился')
        fn1(NxcaDeclensionForm.SHE_B, 'илась')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'иться', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'иться', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'иться', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'иться', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'иться', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'иться', 'будет ')
        break;
      case NxcaEnSklon.S9_GO:
        fn1(NxcaDeclensionForm.BASE, 'ти')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'у')
        fn1(NxcaDeclensionForm.YOU_A, 'ёшь')
        fn1(NxcaDeclensionForm.WE_A, 'ём')
        fn1(NxcaDeclensionForm.THEY_A, 'ут')
        fn1(NxcaDeclensionForm.HE_A, 'ёт')
        fn1(NxcaDeclensionForm.SHE_A, 'ёт')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'шёл', '', true)
        fn1(NxcaDeclensionForm.YOU_B, 'шёл', '', true)
        fn1(NxcaDeclensionForm.WE_B, 'шли', '', true)
        fn1(NxcaDeclensionForm.THEY_B, 'шли', '', true)
        fn1(NxcaDeclensionForm.HE_B, 'шёл', '', true)
        fn1(NxcaDeclensionForm.SHE_B, 'шла', '', true)
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'ти', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'ти', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'ти', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'ти', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'ти', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'ти', 'будет ')
        break;
      case NxcaEnSklon.S10:
        fn1(NxcaDeclensionForm.BASE, 'овать')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'ую')
        fn1(NxcaDeclensionForm.YOU_A, 'уешь')
        fn1(NxcaDeclensionForm.WE_A, 'уем')
        fn1(NxcaDeclensionForm.THEY_A, 'уют')
        fn1(NxcaDeclensionForm.HE_A, 'ует')
        fn1(NxcaDeclensionForm.SHE_A, 'ует')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'овал')
        fn1(NxcaDeclensionForm.YOU_B, 'овал')
        fn1(NxcaDeclensionForm.WE_B, 'овали')
        fn1(NxcaDeclensionForm.THEY_B, 'овали')
        fn1(NxcaDeclensionForm.HE_B, 'овал')
        fn1(NxcaDeclensionForm.SHE_B, 'овала')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'овать', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'овать', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'овать', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'овать', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'овать', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'овать', 'будет ')
        break;
      case NxcaEnSklon.S11:
        fn1(NxcaDeclensionForm.BASE, 'тить')
        // ---
        fn1(NxcaDeclensionForm.IFORM_A, 'чу')
        fn1(NxcaDeclensionForm.YOU_A, 'тишь')
        fn1(NxcaDeclensionForm.WE_A, 'тим')
        fn1(NxcaDeclensionForm.THEY_A, 'тят')
        fn1(NxcaDeclensionForm.HE_A, 'тит')
        fn1(NxcaDeclensionForm.SHE_A, 'тит')
        // ---
        fn1(NxcaDeclensionForm.IFORM_B, 'тил')
        fn1(NxcaDeclensionForm.YOU_B, 'тил')
        fn1(NxcaDeclensionForm.WE_B, 'тили')
        fn1(NxcaDeclensionForm.THEY_B, 'тили')
        fn1(NxcaDeclensionForm.HE_B, 'тил')
        fn1(NxcaDeclensionForm.SHE_B, 'тила')
        // ---
        fn1(NxcaDeclensionForm.IFORM_F, 'тить', 'буду ')
        fn1(NxcaDeclensionForm.YOU_F, 'тить', 'будешь ')
        fn1(NxcaDeclensionForm.WE_F, 'тить', 'будем ')
        fn1(NxcaDeclensionForm.THEY_F, 'тить', 'будут ')
        fn1(NxcaDeclensionForm.HE_F, 'тить', 'будет ')
        fn1(NxcaDeclensionForm.SHE_F, 'тить', 'будет ')
        break;
    }

    return ret;
  }
}
