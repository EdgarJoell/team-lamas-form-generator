export interface FormType {
  name: string,
  title: string,
  formEnum: FormTypeEnum
}

export enum FormTypeEnum {
  EMPTY_MILES = "Empty Miles",
  LAYOVER = "TONU",
  GUARANTEE = "Guarantee"
}
