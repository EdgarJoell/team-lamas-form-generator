import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {VerificationModal} from '../../components/verification-modal/verification-modal';
import {PdfService} from '../../services/pdf/pdf-service';
import {VerificationService} from '../../services/verification/verification-service';
import {FormFields} from '../../models/FormFields';
import {FormType, FormTypeEnum} from '../../models/FormType';
import {FormService} from '../../services/form/form-service';

@Component({
  selector: 'app-base-form-container',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    VerificationModal
  ],
  templateUrl: './base-form-container.html',
  styleUrl: './base-form-container.css',
})
export class BaseFormContainer {
  formBuilder: FormBuilder = inject(FormBuilder);
  pdfService: PdfService = inject(PdfService);
  verificationService: VerificationService = inject(VerificationService);
  formService: FormService = inject(FormService);
  chosenForm: WritableSignal<FormType | null> = signal(null);
  today: Date = new Date();
  buildDate: string = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, '0')}-${String(this.today.getDate()).padStart(2, '0')}`;
  isInVerification: WritableSignal<boolean> = signal(false);
  forms: FormType[] = [
    { name: 'empty-miles', title: "Empty Miles", formEnum: FormTypeEnum.EMPTY_MILES },
    { name: "layover", title: "Layover (TONU)", formEnum: FormTypeEnum.LAYOVER },
    { name: "guarantee", title: "Guarantee", formEnum: FormTypeEnum.GUARANTEE }
  ]

  chosen(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.chosenForm.set(this.forms.find(form => form.name === value) ?? null);
  }

  formBody: FormGroup<FormFields> = this.formBuilder.group({
    date: [this.buildDate, Validators.required],
    trailerNumber: ['', Validators.required],
    shipFrom: this.formBuilder.group({
      name: ['Google, LLC', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      sid: [''],
    }),
    shipTo: this.formBuilder.group({
      name: ['Google, LLC', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      cid: [''],
    }),
    specialInstructions: this.formBuilder.group({
      emptyMiles: ['', Validators.required],
      freightBill: ['', Validators.required],
      owed: ['', Validators.required],
      truckNumber: ['580636', Validators.required],
    })
  })

  async submitForm() {
    if (!this.formBody || !this.verificationService.isVerified()) return

    const fields = this.formService.buildFormObject(this.formBody, this.chosenForm()?.formEnum!)
    await this.pdfService.fillOutPDFFields(fields);
  }

  async handleIsVerified(isTeamLamas: boolean) {
    if (this.verificationService.isVerified()) return;

    if (isTeamLamas) {
      this.verificationService.isVerified.set(true);
      await this.submitForm();
    } else {
      this.verificationService.isVerified.set(false);
    }

    this.isInVerification.set(false);
  }

  async startVerification() {
    if (this.verificationService.isVerified()) {
      await this.submitForm();
    } else {
      this.isInVerification.set(true);
    }
  }

  resetForm() {
    this.formBody.reset({
      date: this.buildDate,
      trailerNumber: '',
      shipFrom: {
        name: 'Google, LLC',
        address: '',
        city: '',
        state: '',
        zip: '',
        sid: '',
      },
      shipTo: {
        name: 'Google, LLC',
        address: '',
        city: '',
        state: '',
        zip: '',
        cid: '',
      },
      specialInstructions: {
        emptyMiles: '',
        freightBill: '',
        owed: '',
        truckNumber: '580636',
      }
    });
  }
}
