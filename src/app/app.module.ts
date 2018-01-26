import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { CustomerComponent } from './View/customer.component';
import { GridComponent } from './Common/Component/grid.component';
import { SupplierComponent } from './View/supplier.component';

const modules = [BrowserModule, FormsModule, HttpModule ];

@NgModule({
  declarations: [
    AppComponent, CustomerComponent, SupplierComponent, GridComponent
  ],
  imports: [
    ...modules,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false   } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
