import { Input, Textarea, Checkbox } from "@chakra-ui/react";
import _ from "lodash";
import { RsuvTuArray } from "rsuv-lib";

export interface FieldNT {
  nameTech: FIELD_NAME_TECH_ASAU9;
  nameVisual: string;
}

// [[asau9]]
export enum FIELD_NAME_TECH_ASAU9 {
  TEXT_FIELD = "TextField",
  DATE = "Date",
  DATETIME_LOCAL = "DateTimeLocal",
  DATE_MONTH = "DateMonth",
  DATE_WEEK = "DateWeek",
  DATE_TIME = "DateTime",
  EMAIL = "Email",
  TEXT_AREA = "TextArea",
  COLOR = "Color",
  NUMBER = "Number",
  RANGE = "Range",
  PASSWORD = "Password",
  TEL = "Tel",
  CHECKBOX = "Checkbox",
  URL = "URL",
  IMAGE = "Image",
  FILE = "File",
  HIDDEN = "Hidden",
  RESET = "Reset",
  SEARCH = "Search",
  SUBMIT = "Submit",
  BUTTON = "Button",
}

export class Fields {
  static values(): FieldNT[] {
    return [
      {
        nameTech: FIELD_NAME_TECH_ASAU9.TEXT_FIELD,
        nameVisual: "Text Field",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.DATE, nameVisual: "Date" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.DATETIME_LOCAL,
        nameVisual: "Date & time local",
      } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.DATE_MONTH,
        nameVisual: "Month",
      } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.DATE_WEEK,
        nameVisual: "Week",
      } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.DATE_TIME,
        nameVisual: "Time",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.EMAIL, nameVisual: "Email" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.PASSWORD,
        nameVisual: "Password",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.TEL, nameVisual: "Tel" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.TEXT_AREA,
        nameVisual: "Text area",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.COLOR, nameVisual: "Color" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.NUMBER,
        nameVisual: "Number",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.RANGE, nameVisual: "Range" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.CHECKBOX,
        nameVisual: "Checkbox",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.URL, nameVisual: "URL" } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.IMAGE, nameVisual: "Image" } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.FILE, nameVisual: "File" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.HIDDEN,
        nameVisual: "Hidden",
      } as FieldNT,
      { nameTech: FIELD_NAME_TECH_ASAU9.RESET, nameVisual: "Reset" } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.SEARCH,
        nameVisual: "Search",
      } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.SUBMIT,
        nameVisual: "Submit",
      } as FieldNT,
      {
        nameTech: FIELD_NAME_TECH_ASAU9.BUTTON,
        nameVisual: "Button",
      } as FieldNT,
    ];
  }

  static fieldByIndex(index: number): FieldNT | null {
    const values = Fields.values();
    return _.get(values, index, null);
  }

  static fieldByTechName(techName: FIELD_NAME_TECH_ASAU9) {
    return _.find(Fields.values(), (el) => {
      return el.nameTech === techName;
    });
  }

  static inputByField(field: FieldNT): JSX.Element {
    switch (field.nameTech) {
      case FIELD_NAME_TECH_ASAU9.TEXT_FIELD:
        return <Input type={"text"} />;
      case FIELD_NAME_TECH_ASAU9.DATE:
        return <Input type={"date"} />;
      case FIELD_NAME_TECH_ASAU9.DATETIME_LOCAL:
        return <Input type={"datetime-local"} />;
      case FIELD_NAME_TECH_ASAU9.DATE_MONTH:
        return <Input type={"month"} />;
      case FIELD_NAME_TECH_ASAU9.DATE_WEEK:
        return <Input type={"week"} />;
      case FIELD_NAME_TECH_ASAU9.DATE_TIME:
        return <Input type={"time"} />;
      case FIELD_NAME_TECH_ASAU9.EMAIL:
        return <Input type={"email"} />;
      case FIELD_NAME_TECH_ASAU9.TEXT_AREA:
        return <Textarea />;
      case FIELD_NAME_TECH_ASAU9.COLOR:
        return <Input type={"color"} />;
      case FIELD_NAME_TECH_ASAU9.NUMBER:
        return <Input type={"number"} />;
      case FIELD_NAME_TECH_ASAU9.RANGE:
        return <Input type={"range"} />;
      case FIELD_NAME_TECH_ASAU9.PASSWORD:
        return <Input type={"password"} />;
      case FIELD_NAME_TECH_ASAU9.TEL:
        return <Input type={"tel"} />;
      case FIELD_NAME_TECH_ASAU9.CHECKBOX:
        return <Checkbox />;
      case FIELD_NAME_TECH_ASAU9.URL:
        return <Input type={"url"} />;
      case FIELD_NAME_TECH_ASAU9.IMAGE:
        return <Input type={"image"} alt={"image"} />;
      case FIELD_NAME_TECH_ASAU9.FILE:
        return <Input type={"file"} />;
      case FIELD_NAME_TECH_ASAU9.HIDDEN:
        return <Input type={"hidden"} />;
      case FIELD_NAME_TECH_ASAU9.RESET:
        return <Input type={"reset"} />;
      case FIELD_NAME_TECH_ASAU9.SEARCH:
        return <Input type={"search"} />;
      case FIELD_NAME_TECH_ASAU9.SUBMIT:
        return <Input type={"submit"} />;
      case FIELD_NAME_TECH_ASAU9.BUTTON:
        return <Input type={"button"} />;
    }
    return <Input type={"text"} />;
  }
}

export class BElemCls {
  id: FIELD_NAME_TECH_ASAU9 = FIELD_NAME_TECH_ASAU9.BUTTON;
}

export class TElemCurrent {
  id: string | null | undefined;
  title: string;
  belems: BElemCls[];

  constructor({ id = null, title = "", belems = [] }: TElemCurrent) {
    this.id = id;
    this.title = title;
    this.belems = [...belems];
  }

  belemAdd(belem: BElemCls, index: number) {
    debugger; // del+
    return RsuvTuArray.elemAdd(this.belems, index, belem);
  }

  // to remove // TODO
  static belemAddB(telemCurrent: TElemCurrent, belem: BElemCls, index: number) {
    if (!telemCurrent.belems) {
      telemCurrent.belems = [];
    }
    return RsuvTuArray.elemAdd(telemCurrent.belems, index, belem);
  }

  belemMove(indexFrom: number, indexTo: number) {
    return RsuvTuArray.elemMove(this.belems, indexFrom, indexTo);
  }
}

export type TelemType = { id: number; title: string };
