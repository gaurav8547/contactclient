import { Component, AfterViewInit, transition } from '@angular/core';
import { CustomerService } from '../Service/customer.service';
import { GridComponent } from '../Common/Component/grid.component';
import { IProperty } from '../Interface/IProperty';
import { ICustomer } from '../Interface/ICustomer';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-customer',
    template: `
    <app-grid [columns]="columns" 
        [property]="property" 
        (saveClik)="Save()" 
        (deleteClick)="Delete($event)"
        (editClick)="Edit($event)"
        [map_data]="map_data" 
        [rows]=rows>
    </app-grid>
    `,
    providers: [CustomerService, DatePipe]
})

export class CustomerComponent {
    columns: string[] = ['ID', 'First Name', 'Last Name', 'Birth Day', 'Email'];
    map_data: IProperty[] = [
        { id: 'id', type: 'text' },
        { id: 'firstName', type: 'text', required: true },
        { id: 'lastName', type: 'text', required: true },
        {
            id: 'birthDay', type: 'date', validate: (e: string) => {
                if (e !== undefined && e !== '') {
                    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
                    return pattern.test(e);
                }
                return false;
            }
        },
        {
            id: 'email', type: 'text', required: true, validate: (e: string) => {
                if (e !== undefined && e !== '') {
                    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(e);
                }
                return false;
            }
        }
    ];
    rows: any[] = [];

    property: ICustomer = { id: 0, firstName: '', lastName: '', birthDay: '', email: '' };
    constructor(private service: CustomerService, private datePipe: DatePipe) {
        this.Load();
    }

    Load() {
        this.service.Get().then(data => {
            this.rows = data;
        });
    }

    Save() {
        this.service.Save(this.property).then(_ => {
            this.property = { id: 0, firstName: '', lastName: '', birthDay: '', email: '' };
            this.Load();
        }).catch(_ => {
            alert('Unable to save ' + _);
        });

        console.log(this.property);
    }

    Edit(id: number) {
        this.service.Edit(id)
            .then(customer => {
                this.property = {
                    id: customer.id,
                    firstName: customer.firstName, 
                    lastName: customer.lastName, 
                    birthDay: customer.birthDay === null ? '' : this.datePipe.transform(customer.birthDay, 'MM/dd/yyyy'),
                    email: customer.email
                };
            }).catch(_ => { alert(_); });
    }

    Delete(id: number) {
        if (id && id > 0) {
            this.service.Delete(id)
                .then(_ => {
                    this.Load();
                }).catch(_ => {
                    alert('Unable to delete ' + _)
                });
        }
    }
}
