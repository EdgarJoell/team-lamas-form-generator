import {Component, signal, WritableSignal} from '@angular/core';
import {FormType} from '../../models/FormType';
import {EmptyMilesForm} from '../../forms/empty-miles-form/empty-miles-form';
import {LayoverForm} from '../../forms/layover-form/layover-form';
import {GuaranteeForm} from '../../forms/guarantee-form/guarantee-form';
import {NgComponentOutlet} from '@angular/common';

@Component({
  selector: 'app-base-form-container',
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './base-form-container.html',
  styleUrl: './base-form-container.css',
})
export class BaseFormContainer {
  forms: FormType[] = [
    { name: 'empty-miles', title: "Empty Miles", component: EmptyMilesForm },
    { name: "layover", title: "Layover", component: LayoverForm },
    { name: "guarantee", title: "Guarantee", component: GuaranteeForm }
  ]
  chosenForm: WritableSignal<FormType | null> = signal(null);

  chosen(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.chosenForm.set(this.forms.find(form => form.name === value) ?? null);
  }
}
