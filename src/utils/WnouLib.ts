import { EPageValues } from '../consts';

/**
 * ID [[210808105738]] rev 1 1.0.0 2021-08-08
 */
export type WnouT2<T> = {
  options: WnouT3<T>[],
  selectedValue: EPageValues
}

/**
 * ID [[210808105806]] rev 1 1.1.0 2021-08-08
 */
export type WnouT3<T> = {
  value: T | string,
  text: string,
  subValue: T | string,
  callback?: (event?: any) => void
}
