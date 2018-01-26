import { Component, AfterViewInit, transition } from '@angular/core';
import { CustomerService } from '../Service/customer.service';
import { GridComponent } from '../Common/Component/grid.component';
import { IProperty } from '../Interface/IProperty';
import { ICustomer } from '../Interface/ICustomer';

@Component({
    selector: 'app-customer',
    template: '<app-grid [columns]="columns" [property]="property" (saveClik)="Save(e)" [map_data]="map_data" [rows]=rows></app-grid>',
    providers: [CustomerService]
})

export class CustomerComponent {
    columns: string[] = ['ID', 'First Name', 'Last Name', 'Birth Day', 'Email'];
    map_data: IProperty[] = [
        { id: 'id', type: 'text' },
        { id: 'firstName', type: 'text', required: true },
        { id: 'lastName', type: 'text', required: true },
        { id: 'birthDay', type: 'date' },
        {
            id: 'email', type: 'text', required: true, validate: (e: string) => {
                if (e !== undefined && e !== '') {
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    console.log(pattern.test(e));
                    return pattern.test(e);
                }
                return false;
            }
        }
    ];
    rows: any[] = [];

    property: ICustomer = { id: 0, firstName: '', lastName: '', birthday: '', email: '' };
    constructor(private service: CustomerService) {
        this.Load();
    }

    Load() {
        this.service.Get().then(data => {
            this.rows = data;
        });
    }

    Save(customer: ICustomer) {
        this.service.Save(this.property[0]).then(_ => { console.log(_); });
        this.Load();
        console.log(this.property);
    }
}
