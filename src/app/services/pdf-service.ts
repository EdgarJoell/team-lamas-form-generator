import { Injectable } from '@angular/core';
import {PDFCheckBox, PDFDocument, PDFDropdown, PDFRadioGroup, PDFTextField} from "pdf-lib";
import {PDFFields} from '../models/PDFFields';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  async inspectFields() {
    const formBytes = await fetch('assets/blank-pdf.pdf').then(r => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formBytes);
    const form = pdfDoc.getForm();

    const fields = form.getFields();
    fields.forEach(field => {
      console.log(field.getName());
    });
  }

  async fillOutPDFFields(fields: PDFFields) {
    const fileName: string = `${fields.date}-bill-of-lading.pdf`;
    const formBytes = await fetch('assets/blank-pdf.pdf').then(r => r.arrayBuffer());
    const pdfDoc = await PDFDocument.load(formBytes);
    const form = pdfDoc.getForm();

    for (const [fieldName, value] of Object.entries(fields)) {
      const field = form.getField(fieldName);

      if (field instanceof PDFTextField) {
        if (fieldName === 'si') {
          field.enableMultiline();
          field.setFontSize(0);
          field.setText(fields.si);
        } else {
          field.setText(String(value));
        }
      } else if (field instanceof PDFCheckBox) {
        value ? field.check() : field.uncheck();
      } else if (field instanceof PDFDropdown) {
        field.select(String(value));
      } else if (field instanceof PDFRadioGroup) {
        field.select(String(value));
      }
    }


    await pdfDoc.save();
    form.flatten()
    const pdfBytes = await pdfDoc.save();

    this.triggerDownload(pdfBytes, fileName);
  }

  private triggerDownload(pdfBytes: Uint8Array, fileName: string) {
    const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url); // clean up
  }
}
