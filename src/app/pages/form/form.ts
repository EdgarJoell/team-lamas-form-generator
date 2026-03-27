import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  formBuilder = inject(FormBuilder);

  formBody = this.formBuilder.group({
    date: ['', Validators.required],
    trailerNumber: ['', Validators.required],
    proNumber: ['', Validators.required],
    shipFrom: this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      sid: ['', Validators.required],
    }),
    shipTo: this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      cid: ['', Validators.required],
    }),
    specialInstructions: this.formBuilder.group({
      emptyMiles: ['', Validators.required],
      freightBill: ['', Validators.required],
      owed: ['', Validators.required],
      truckNumber: ['', Validators.required],
    })
  })

  submitForm() {
    const builtObject = {
      date: this.formBody.get('date'),
      carrierName: `Landstar (Truck # - ${this.formBody.value.specialInstructions?.truckNumber}`,
      trailerNumber: this.formBody.value.trailerNumber,
      proNumber: this.formBody.value.specialInstructions?.freightBill,
      scac: "LSTR",
      shipFrom: {
        name: this.formBody.value.shipFrom?.name,
        address: this.formBody.value.shipFrom?.address,
        cityStateZip: `${this.formBody.value.shipFrom?.city}, ${this.formBody.value.shipFrom?.state} ${this.formBody.value.shipFrom?.city}`,
        sid: this.formBody.value.shipFrom?.sid,
      },
      shipTo: {
        name: this.formBody.value.shipTo?.name,
        address: this.formBody.value.shipTo?.address,
        cityStateZip: `${this.formBody.value.shipTo?.city}, ${this.formBody.value.shipTo?.state} ${this.formBody.value.shipTo?.city}`,
        cid: this.formBody.value.shipTo?.cid
      },
      specialInstructions: `EMPTY MILES: ${this.formBody.value.specialInstructions?.emptyMiles} - FREIGHT BILL: ${this.formBody.value.specialInstructions?.freightBill} - OWED: ${this.formBody.value.specialInstructions?.owed} per mile for ${this.formBody.value.specialInstructions?.emptyMiles} Miles - TRUCK #: ${this.formBody.value.specialInstructions?.truckNumber}`,
    }

    console.log("Object So Far: ", builtObject);
  }

  protected readonly Date = Date;
}
