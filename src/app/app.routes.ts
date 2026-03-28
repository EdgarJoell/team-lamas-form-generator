import { Routes } from '@angular/router';
import {BaseFormContainer} from './pages/base-form-container/base-form-container';

export const routes: Routes = [
  { path: 'generate', component: BaseFormContainer },
  { path: '**', redirectTo: 'generate' }
];
