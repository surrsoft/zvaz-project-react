import { CSSProperties, ReactNode } from 'react';
import { SaucMenuElemType } from './SaucMenuElemType';
import { SaucElemStructType } from './SaucElemStructType';

export interface SaucPropsType {
  /**
   * базовый элемент, при нажатии на который будет появляеться выпадающее меню
   */
  children?: ReactNode
  /**
   * базовый источник данных для выпадающего меню
   */
  menuElems: SaucMenuElemType[]
  /**
   * иконка для показа справа у пунктов меню имеющих подменю
   */
  iconSubmenu?: JSX.Element
  /**
   * элемент для кастомизации расположения комонентов внутри отдельного элемента меню
   */
  elemCustomStruct?: SaucElemStructType
  /**
   * стили для применения к контейнеру выпадающего меню. Здесь можно задать фон, рамку и пр.
   */
  containerStyles?: Omit<CSSProperties, "top" | "right" | "width" | "position" | "overflow"> | {}
  /**
   * если указать здесь цвет, то он переопределит цвет *л-иконок
   */
  iconsColorOverwrite?: string
  /**
   * если TRUE то пункты "назад" показываются все (всех предков), а не только один. По умолчанию FALSE
   */
  showAllBackLevels?: boolean
}
