import { FormControl, FormGroup } from '@angular/forms';

interface ShipFrom {
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
  sid: FormControl<string | null>;
}

interface ShipTo {
  name: FormControl<string | null>;
  address: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  zip: FormControl<string | null>;
  cid: FormControl<string | null>;
}

interface SpecialInstructions {
  emptyMiles: FormControl<string | null>;
  freightBill: FormControl<string | null>;
  owed: FormControl<string | null>;
  truckNumber: FormControl<string | null>;
}

export interface FormFields {
  date: FormControl<string | null>;
  trailerNumber: FormControl<string | null>;
  shipFrom: FormGroup<ShipFrom>;
  shipTo: FormGroup<ShipTo>;
  specialInstructions: FormGroup<SpecialInstructions>;
}
