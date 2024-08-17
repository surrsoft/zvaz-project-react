import { SaucMenuElemIdType } from './SaucMenuElemIdType';

export interface SaucMenuElemType {
  id: SaucMenuElemIdType
  icon?: JSX.Element
  body?: JSX.Element
  children?: SaucMenuElemType[]
  cb?: (elem: SaucMenuElemType) => void
}
