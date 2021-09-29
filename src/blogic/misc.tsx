import { Input, Textarea, Checkbox } from '@chakra-ui/react';

export interface FieldNT {
  nameTech: TN
  nameVisual: string
}

export enum TN {
  TEXT_FIELD = 'TextField',
  DATE = 'Date',
  DATETIME_LOCAL = 'DateTimeLocal',
  DATE_MONTH = 'DateMonth',
  DATE_WEEK = 'DateWeek',
  DATE_TIME = 'DateTime',
  EMAIL = 'Email',
  TEXT_AREA = 'TextArea',
  COLOR = 'Color',
  NUMBER = 'Number',
  RANGE = 'Range',
  PASSWORD = 'Password',
  TEL = 'Tel',
  CHECKBOX = 'Checkbox',
  URL = 'URL',
  IMAGE = 'Image',
  FILE = 'File',
  HIDDEN = 'Hidden',
  RESET = 'Reset',
  SEARCH = 'Search',
  SUBMIT = 'Submit',
  BUTTON = 'Button',
}

export class Fields {
  static values(): FieldNT[] {
    return [
      {nameTech: TN.TEXT_FIELD, nameVisual: 'Text Field'} as FieldNT,
      {nameTech: TN.DATE, nameVisual: 'Date'} as FieldNT,
      {nameTech: TN.DATETIME_LOCAL, nameVisual: 'Date & time local'} as FieldNT,
      {nameTech: TN.DATE_MONTH, nameVisual: 'Month'} as FieldNT,
      {nameTech: TN.DATE_WEEK, nameVisual: 'Week'} as FieldNT,
      {nameTech: TN.DATE_TIME, nameVisual: 'Time'} as FieldNT,
      {nameTech: TN.EMAIL, nameVisual: 'Email'} as FieldNT,
      {nameTech: TN.PASSWORD, nameVisual: 'Password'} as FieldNT,
      {nameTech: TN.TEL, nameVisual: 'Tel'} as FieldNT,
      {nameTech: TN.TEXT_AREA, nameVisual: 'Text area'} as FieldNT,
      {nameTech: TN.COLOR, nameVisual: 'Color'} as FieldNT,
      {nameTech: TN.NUMBER, nameVisual: 'Number'} as FieldNT,
      {nameTech: TN.RANGE, nameVisual: 'Range'} as FieldNT,
      {nameTech: TN.CHECKBOX, nameVisual: 'Checkbox'} as FieldNT,
      {nameTech: TN.URL, nameVisual: 'URL'} as FieldNT,
      {nameTech: TN.IMAGE, nameVisual: 'Image'} as FieldNT,
      {nameTech: TN.FILE, nameVisual: 'File'} as FieldNT,
      {nameTech: TN.HIDDEN, nameVisual: 'Hidden'} as FieldNT,
      {nameTech: TN.RESET, nameVisual: 'Reset'} as FieldNT,
      {nameTech: TN.SEARCH, nameVisual: 'Search'} as FieldNT,
      {nameTech: TN.SUBMIT, nameVisual: 'Submit'} as FieldNT,
      {nameTech: TN.BUTTON, nameVisual: 'Button'} as FieldNT,
    ]
  }

  static inputByField(field: FieldNT): JSX.Element {
    switch (field.nameTech) {
      case TN.TEXT_FIELD:
        return <Input type={'text'}/>
      case TN.DATE:
        return <Input type={'date'}/>
      case TN.DATETIME_LOCAL:
        return <Input type={'datetime-local'}/>
      case TN.DATE_MONTH:
        return <Input type={'month'}/>
      case TN.DATE_WEEK:
        return <Input type={'week'}/>
      case TN.DATE_TIME:
        return <Input type={'time'}/>
      case TN.EMAIL:
        return <Input type={'email'}/>
      case TN.TEXT_AREA:
        return <Textarea />
      case TN.COLOR:
        return <Input type={'color'}/>
      case TN.NUMBER:
        return <Input type={'number'}/>
      case TN.RANGE:
        return <Input type={'range'}/>
      case TN.PASSWORD:
        return <Input type={'password'}/>
      case TN.TEL:
        return <Input type={'tel'}/>
      case TN.CHECKBOX:
        return <Checkbox />
      case TN.URL:
        return <Input type={'url'}/>
      case TN.IMAGE:
        return <Input type={'image'} alt={'image'}/>
      case TN.FILE:
        return <Input type={'file'}/>
      case TN.HIDDEN:
        return <Input type={'hidden'}/>
      case TN.RESET:
        return <Input type={'reset'}/>
      case TN.SEARCH:
        return <Input type={'search'}/>
      case TN.SUBMIT:
        return <Input type={'submit'}/>
      case TN.BUTTON:
        return <Input type={'button'}/>
    }
    return <Input type={'text'}/>
  }
}
