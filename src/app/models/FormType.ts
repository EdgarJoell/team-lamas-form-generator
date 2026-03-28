import {Type} from '@angular/core';

export interface FormType {
  name: string,
  title: string,
  component: Type<any> | null
}
