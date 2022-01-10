/**
 * формы склонения (declension) глаголов
 */
export enum MvroEnVerbDeclension {
  /**
   * утверждение
   */
  STATEMENT = 'statement',
  /**
   * отрицание
   */
  NEGATION = 'negation',
  /**
   * вопрос
   */
  QUESTION = 'question',
}

export const MvroEnVerbDeclensionAll: MvroEnVerbDeclension[] = Object.values(MvroEnVerbDeclension)
