import {Component, inject, signal, WritableSignal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {PdfService} from '../../services/pdf/pdf-service';
import {EmptyMilesPDFFields} from '../../models/CustomPDFFields';
import {VerificationModal} from '../../components/verification-modal/verification-modal';
import {VerificationService} from '../../services/verification/verification-service';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    VerificationModal
  ],
  templateUrl: './empty-miles-form.html',
  styleUrl: './empty-miles-form.css',
})
export class EmptyMilesForm {
  formBuilder: FormBuilder = inject(FormBuilder);
  pdfService: PdfService = inject(PdfService);
  verificationService: VerificationService = inject(VerificationService);
  today: Date = new Date();
  buildDate: string = `${this.today.getFullYear()}-${String(this.today.getMonth() + 1).padStart(2, '0')}-${String(this.today.getDate()).padStart(2, '0')}`;
  isInVerification: WritableSignal<boolean> = signal(false);

  formBody = this.formBuilder.group({
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

    const pdfFields: EmptyMilesPDFFields = {
      date: this.formBody.value.date,
      sfname: this.formBody.value.shipFrom?.name,
      sfadd: this.formBody.value.shipFrom?.address,
      sfcsz: `${this.formBody.value.shipFrom?.city}, ${this.formBody.value.shipFrom?.state} ${this.formBody.value.shipFrom?.city}`,
      sfsid: this.formBody.value.shipFrom?.sid?.length === 0 ? this.formBody.value.specialInstructions?.freightBill : this.formBody.value.shipFrom?.sid,
      cn: `Landstar (Truck # - ${this.formBody.value.specialInstructions?.truckNumber})`,
      stname: this.formBody.value.shipTo?.name,
      stadd: this.formBody.value.shipTo?.address,
      tn: this.formBody.value.trailerNumber,
      stcsz: `${this.formBody.value.shipTo?.city}, ${this.formBody.value.shipTo?.state} ${this.formBody.value.shipTo?.city}`,
      scac: "LSTR",
      stsid: this.formBody.value.shipTo?.cid,
      pro: this.formBody.value.specialInstructions?.freightBill,
      si: `EMPTY MILES: ${this.formBody.value.specialInstructions?.emptyMiles} - FREIGHT BILL: ${this.formBody.value.specialInstructions?.freightBill} - OWED: ${this.formBody.value.specialInstructions?.owed} per mile for ${this.formBody.value.specialInstructions?.emptyMiles} Miles - TRUCK #: ${this.formBody.value.specialInstructions?.truckNumber}`,
      pp: "X",
      con1: "Empty Miles",
      pkgs1: this.formBody.value.specialInstructions?.emptyMiles,
      wgt1: "1",
      psy1: "N",
      psn1: "N",
      asi1: `REIMBURSE EMPTY MILES (${this.formBody.value.specialInstructions?.emptyMiles})`,
      cd1: `EMPTY MILES (${this.formBody.value.specialInstructions?.emptyMiles})`,
      cd2: `*** REIMBURSE ${this.formBody.value.specialInstructions?.emptyMiles} EMPTY MILES`,
      value: `${this.formBody.value.specialInstructions?.owed}c/mi`,
      per: "Mile",
      "Check Box6": "X",
      "Check Box8": "X",
      "Check Box9": "X",
      Text1: this.formBody.value.date,
      Text2: this.formBody.value.specialInstructions?.truckNumber
    }
    await this.pdfService.fillOutPDFFields(pdfFields);
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
