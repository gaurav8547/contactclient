import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './View/customer.component';

export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'customer', component: CustomerComponent }
];
