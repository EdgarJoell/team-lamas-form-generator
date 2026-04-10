import {Injectable} from '@angular/core';
import {CustomPDFFields} from '../../models/CustomPDFFields';
import {FormTypeEnum} from '../../models/FormType';
import {FormFields} from '../../models/FormFields';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  buildFormObject(formBody: FormGroup<FormFields>, type: FormTypeEnum): CustomPDFFields {
    let builtSi: string = "";

    if (type === FormTypeEnum.GUARANTEE) {
      builtSi = `Guarantee Pay: $${formBody.value.specialInstructions?.owed} Freight Bill: ${formBody.value.specialInstructions?.freightBill} Truck #: ${formBody.value.specialInstructions?.truckNumber}`
    } else {
      builtSi = `${type}: ${formBody.value.specialInstructions?.emptyMiles} - FREIGHT BILL: ${formBody.value.specialInstructions?.freightBill} - OWED: ${formBody.value.specialInstructions?.owed} per mile for ${formBody.value.specialInstructions?.emptyMiles} Miles - TRUCK #: ${formBody.value.specialInstructions?.truckNumber}`
    }

    return {
      date: formBody.value.date,
      sfname: formBody.value.shipFrom?.name,
      sfadd: formBody.value.shipFrom?.address,
      sfcsz: `${formBody.value.shipFrom?.city}, ${formBody.value.shipFrom?.state}, ${formBody.value.shipFrom?.zip}`,
      sfsid: formBody.value.shipFrom?.sid?.length === 0 ? formBody.value.specialInstructions?.freightBill : formBody.value.shipFrom?.sid,
      cn: `Landstar (Truck # - ${formBody.value.specialInstructions?.truckNumber})`,
      stname: formBody.value.shipTo?.name,
      stadd: formBody.value.shipTo?.address,
      tn: formBody.value.trailerNumber,
      stcsz: `${formBody.value.shipTo?.city}, ${formBody.value.shipTo?.state}, ${formBody.value.shipTo?.zip}`,
      scac: "LSTR",
      stsid: formBody.value.shipTo?.cid,
      pro: formBody.value.specialInstructions?.freightBill,
      si: builtSi,
      pp: "X",
      con1: `${type}`,
      pkgs1: formBody.value.specialInstructions?.emptyMiles,
      wgt1: "1",
      psy1: "N",
      psn1: "N",
      asi1: `REIMBURSE ${type} (${formBody.value.specialInstructions?.emptyMiles})`,
      cd1: `${type} (${formBody.value.specialInstructions?.emptyMiles})`,
      cd2: `*** ${type} ${formBody.value.specialInstructions?.emptyMiles} ${type}`,
      value: `${formBody.value.specialInstructions?.owed}c/mi`,
      per: "Mile",
      "Check Box6": "X",
      "Check Box8": "X",
      "Check Box9": "X",
      Text1: formBody.value.date,
      Text2: formBody.value.specialInstructions?.truckNumber
    }
  }
}
