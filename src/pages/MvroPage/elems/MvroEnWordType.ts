export enum MvroEnWordType {
  /**
   * существительное
   */
  NOUN = 'noun',
  /**
   * глагол
   */
  VERB = 'verb',
  /**
   * глагол правильный
   */
  VERB_REGULAR = 'verb_regular',
  /**
   * глагол неправильный
   */
  VERB_IRREGULAR = 'verb_irregular',

}

export const MvroEnWordTypeAll: MvroEnWordType[] = Object.values(MvroEnWordType)
