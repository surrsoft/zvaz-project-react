import { EPageName } from '../consts'

// [wnou] - универсальная copy-библиотека стандартного TS-кода

/**
 * ID [[210808105738]] rev 1 1.0.0 2021-08-08
 */
export type WnouT2<T> = {
  options: WnouT3<T>[]
  selectedValue: EPageName
}

/**
 * ID [[210808105806]] rev 1 1.1.0 2021-08-08
 */
export type WnouT3<T> = {
  value: T | string
  text: string
  subValue: T | string
  callback?: (event?: any) => void
}

export class WnouResultAsau21<T> {
  success: boolean
  errCode: string
  errMessage: string
  value: T
  constructor(
    success: boolean = false,
    value: T,
    errCode: string = '',
    errMessage: string = '',
  ) {
    this.success = success
    this.value = value
    this.errCode = errCode
    this.errMessage = errMessage
  }
}
