import {inject, Injectable} from '@angular/core';
import {PdfService} from '../pdf/pdf-service';

@Injectable({
  providedIn: 'root',
})
export class InitializerService {
  pdfService: PdfService = inject(PdfService);
  constructor() {}

  async initializeApp() {
    console.log("Initializing App");
    await this.pdfService.fetchAndSetPdfBytes();
  }
}
