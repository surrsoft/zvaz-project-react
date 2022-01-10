
/**
 * времена глоголов
 */
export enum MvroEnVerbTense {
  /**
   * настоящее
   */
  PRESENT = 'present',
  /**
   * прошедшее
   */
  PAST = 'past',
  /**
   * будущее
   */
  FUTURE = 'future',
}


export const MvroEnVerbTenseAll: MvroEnVerbTense[] = Object.values(MvroEnVerbTense)
