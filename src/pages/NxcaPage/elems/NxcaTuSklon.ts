import { NxcaEnSklon } from './NxcaEnSklon';

enum DeclensionForm {
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

function sklonFormTrans(sklonForm: DeclensionForm): string {
  switch (sklonForm) {
    case DeclensionForm.BASE:
      return 'базовая форма'
    case DeclensionForm.IFORM_A:
      return 'настоящее: я';
    case DeclensionForm.YOU_A:
      return 'настоящее: ты';
    case DeclensionForm.WE_A:
      return 'настоящее: мы';
    case DeclensionForm.THEY_A:
      return 'настоящее: они';
    case DeclensionForm.HE_A:
      return 'настоящее: он';
    case DeclensionForm.SHE_A:
      return 'настоящее: она';
    case DeclensionForm.IFORM_B:
      return 'прошлое: я';
    case DeclensionForm.YOU_B:
      return 'прошлое: ты';
    case DeclensionForm.WE_B:
      return 'прошлое: мы';
    case DeclensionForm.THEY_B:
      return 'прошлое: они';
    case DeclensionForm.HE_B:
      return 'прошлое: он';
    case DeclensionForm.SHE_B:
      return 'прошлое: она';
    case DeclensionForm.IFORM_F:
      return 'будущее: я';
    case DeclensionForm.YOU_F:
      return 'будущее: ты';
    case DeclensionForm.WE_F:
      return 'будущее: мы';
    case DeclensionForm.THEY_F:
      return 'будущее: они';
    case DeclensionForm.HE_F:
      return 'будущее: он';
    case DeclensionForm.SHE_F:
      return 'будущее: она';
  }
}

export class NxcaResElem {
  res: string = ''

  constructor(public form: DeclensionForm, public val: string) {
    const val0 = sklonFormTrans(form)
    this.res = val0 + ' ' + val
  }
}

export class NxcaResElemB {
  constructor(public sklonEnum: NxcaEnSklon, public elems: NxcaResElem[]) {

  }
}

export class NxcaTuSklon {
  static sklonB(wordPart: string, sklonEnum: NxcaEnSklon) {

  }

  static sklon(wordPart: string, sklonEnum: NxcaEnSklon) {
    const ret: NxcaResElem[] = []

    const fn1 = (sklonForm: DeclensionForm, suffix: string = '', prefix: string = '') => {
      ret.push(new NxcaResElem(sklonForm, prefix + wordPart + suffix))
    }

    switch (sklonEnum) {
      case NxcaEnSklon.S1:
        fn1(DeclensionForm.BASE, 'ить')
        // ---
        fn1(DeclensionForm.IFORM_A, 'лю')
        fn1(DeclensionForm.YOU_A, 'ишь')
        fn1(DeclensionForm.WE_A, 'им')
        fn1(DeclensionForm.THEY_A, 'ят')
        fn1(DeclensionForm.HE_A, 'ит')
        fn1(DeclensionForm.SHE_A, 'ит')
        // ---
        fn1(DeclensionForm.IFORM_B, 'ил')
        fn1(DeclensionForm.YOU_B, 'ил')
        fn1(DeclensionForm.WE_B, 'или')
        fn1(DeclensionForm.THEY_B, 'или')
        fn1(DeclensionForm.HE_B, 'ил')
        fn1(DeclensionForm.SHE_B, 'ила')
        // ---
        fn1(DeclensionForm.IFORM_F, 'ить', 'буду ')
        fn1(DeclensionForm.YOU_F, 'ить', 'будешь ')
        fn1(DeclensionForm.WE_F, 'ить', 'будем ')
        fn1(DeclensionForm.THEY_F, 'ить', 'будут ')
        fn1(DeclensionForm.HE_F, 'ить', 'будет ')
        fn1(DeclensionForm.SHE_F, 'ить', 'будет ')
        break;
      case NxcaEnSklon.S2:
        fn1(DeclensionForm.BASE, 'ать')
        // ---
        fn1(DeclensionForm.IFORM_A, 'у')
        fn1(DeclensionForm.YOU_A, 'ишь')
        fn1(DeclensionForm.WE_A, 'им')
        fn1(DeclensionForm.THEY_A, 'ат')
        fn1(DeclensionForm.HE_A, 'ит')
        fn1(DeclensionForm.SHE_A, 'ит')
        // ---
        fn1(DeclensionForm.IFORM_B, 'ал')
        fn1(DeclensionForm.YOU_B, 'ал')
        fn1(DeclensionForm.WE_B, 'али')
        fn1(DeclensionForm.THEY_B, 'али')
        fn1(DeclensionForm.HE_B, 'ал')
        fn1(DeclensionForm.SHE_B, 'ала')
        // ---
        fn1(DeclensionForm.IFORM_F, 'ать', 'буду ')
        fn1(DeclensionForm.YOU_F, 'ать', 'будешь ')
        fn1(DeclensionForm.WE_F, 'ать', 'будем ')
        fn1(DeclensionForm.THEY_F, 'ать', 'будут ')
        fn1(DeclensionForm.HE_F, 'ать', 'будет ')
        fn1(DeclensionForm.SHE_F, 'ать', 'будет ')
        break;
      case NxcaEnSklon.S3:
        fn1(DeclensionForm.BASE, 'ить')
        // ---
        fn1(DeclensionForm.IFORM_A, 'ю')
        fn1(DeclensionForm.YOU_A, 'ишь')
        fn1(DeclensionForm.WE_A, 'им')
        fn1(DeclensionForm.THEY_A, 'ят')
        fn1(DeclensionForm.HE_A, 'ит')
        fn1(DeclensionForm.SHE_A, 'ит')
        // ---
        fn1(DeclensionForm.IFORM_B, 'ил')
        fn1(DeclensionForm.YOU_B, 'ил')
        fn1(DeclensionForm.WE_B, 'или')
        fn1(DeclensionForm.THEY_B, 'или')
        fn1(DeclensionForm.HE_B, 'ил')
        fn1(DeclensionForm.SHE_B, 'ила')
        // ---
        fn1(DeclensionForm.IFORM_F, 'ить', 'буду ')
        fn1(DeclensionForm.YOU_F, 'ить', 'будешь ')
        fn1(DeclensionForm.WE_F, 'ить', 'будем ')
        fn1(DeclensionForm.THEY_F, 'ить', 'будут ')
        fn1(DeclensionForm.HE_F, 'ить', 'будет ')
        fn1(DeclensionForm.SHE_F, 'ить', 'будет ')
        break;
      case NxcaEnSklon.S4:
        fn1(DeclensionForm.BASE, 'ать')
        // ---
        fn1(DeclensionForm.IFORM_A, 'аю')
        fn1(DeclensionForm.YOU_A, 'аешь')
        fn1(DeclensionForm.WE_A, 'аем')
        fn1(DeclensionForm.THEY_A, 'ают')
        fn1(DeclensionForm.HE_A, 'ает')
        fn1(DeclensionForm.SHE_A, 'ает')
        // ---
        fn1(DeclensionForm.IFORM_B, 'ал')
        fn1(DeclensionForm.YOU_B, 'ал')
        fn1(DeclensionForm.WE_B, 'али')
        fn1(DeclensionForm.THEY_B, 'али')
        fn1(DeclensionForm.HE_B, 'ал')
        fn1(DeclensionForm.SHE_B, 'ала')
        // ---
        fn1(DeclensionForm.IFORM_F, 'ать', 'буду ')
        fn1(DeclensionForm.YOU_F, 'ать', 'будешь ')
        fn1(DeclensionForm.WE_F, 'ать', 'будем ')
        fn1(DeclensionForm.THEY_F, 'ать', 'будут ')
        fn1(DeclensionForm.HE_F, 'ать', 'будет ')
        fn1(DeclensionForm.SHE_F, 'ать', 'будет ')
        break;
    }

    return ret;
  }
}
