import { Routes } from '@angular/router';
import {Form} from './pages/form/form';

export const routes: Routes = [
  { path: 'generate', component: Form },
  { path: '**', redirectTo: 'generate' }
];
