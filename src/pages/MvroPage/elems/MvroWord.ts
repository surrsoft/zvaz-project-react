import { MvroEnWordType } from './MvroEnWordType';
import { MvroWordRus } from './MvroWordRus';

export class MvroWord {
  id: string = ''
  /**
   * базовая форма
   */
  wordBaseForm: string = ''
  /**
   * базовая форма на русском языке
   */
  wordBaseFormRus: string = ''
  /**
   *
   */
  types: MvroEnWordType[] = []
  /**
   * форма неправильного глагола (утверждение в прошедшем времени)
   */
  wordFormVerbIrregular?: string

  wordRus?: MvroWordRus
}

