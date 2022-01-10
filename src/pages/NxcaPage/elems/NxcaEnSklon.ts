export enum NxcaEnSklon {
  /** люб|ить */
  S1 = 's1',
  /** дыш|ать */
  S2 = 's2',
  /**
   * Отличается от S1 только "я" в настоящем времени (добавляется не "лю" а "ю")
   * вал/ить
   */
  S3 = 's3',
  /** мечт|ать . Отличается от S2 только склонением в настоящем времени */
  S4 = 's4',
  /** ви|деть */
  S5 = 's5',
  /** прихо|дить */
  S6 = 's6',
  /** ж|ить */
  S7 = 's7',
  /** нрав|ится */
  S8 = 's8',
  /** ид/ти */
  S9_GO = 's9-go',
  /** рис/овать */
  S10 = 's10',
}

export const NxcaEnSklonAll: NxcaEnSklon[] = Object.values(NxcaEnSklon)
