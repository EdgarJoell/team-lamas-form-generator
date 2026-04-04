import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-loading',
    imports: [
        NgOptimizedImage
    ],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {}
