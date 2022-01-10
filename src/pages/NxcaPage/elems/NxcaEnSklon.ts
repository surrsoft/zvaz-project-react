export enum NxcaEnSklon {
  /** люб/ить */
  S1 = 's1',
  /** дыш/ать */
  S2 = 's2',
  /**
   * Отличается от S1 только "я" в настоящем времени (добавляется не "лю" а "ю")
   * вал/ить
   */
  S3 = 's3',
  /** мечт|ать . Отличается от S2 только склонением в настоящем времени */
  S4 = 's4',
}

export const NxcaEnSklonAll = [
  NxcaEnSklon.S1,
  NxcaEnSklon.S3,
  NxcaEnSklon.S2,
  NxcaEnSklon.S4,
]
