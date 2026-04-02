import {Injectable} from '@angular/core';
import {PDFCheckBox, PDFDocument, PDFDropdown, PDFField, PDFRadioGroup, PDFTextField} from "pdf-lib";
import {CustomPDFFields} from '../../models/CustomPDFFields';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfBytes: ArrayBuffer | null = null;

  async fetchAndBuild(): Promise<PDFDocument> {
    this.pdfBytes ??= await fetch('assets/blank-pdf.pdf').then(r => r.arrayBuffer());

    if (!this.pdfBytes) {
      throw new Error('No pdf available');
    }

    return await PDFDocument.load(this.pdfBytes);
  }

  async fetchAndSetPdfBytes() {
    this.pdfBytes = await fetch('assets/blank-pdf.pdf').then(r => r.arrayBuffer());
  }

  // SHOULD ONLY BE USED TO RETRIEVE PDF FIELDS WHEN IN DEVELOPMENT!!
  // SHOULD NOT BE USED IN PRODUCTION!!
  async inspectFields(): Promise<void> {
    const document: PDFDocument = await this.fetchAndBuild();

    const fields: PDFField[] = document.getForm().getFields();
    fields.forEach((field: PDFField) => {
      console.log(field.getName());
    });
  }

  async fillOutPDFFields(fields: CustomPDFFields): Promise<void> {
    const fileName: string = `${fields.date}-bill-of-lading-${fields.con1}.pdf`;
    const pdfDoc: PDFDocument = await this.fetchAndBuild();

    for (const [fieldName, value] of Object.entries(fields)) {
      const field: PDFField = pdfDoc.getForm().getField(fieldName);

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

    pdfDoc.getForm().flatten()
    const pdfBytes: Uint8Array = await pdfDoc.save();

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
