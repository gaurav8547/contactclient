import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerComponent } from './View/customer.component';
import { SupplierComponent } from './View/supplier.component';

export const appRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'customer', component: CustomerComponent },
    { path: 'supplier', component: SupplierComponent }
];
