import { Component, AfterViewInit, transition } from '@angular/core';
import { SupplierService } from '../Service/supplier.service';
import { GridComponent } from '../Common/Component/grid.component';
import { IProperty } from '../Interface/IProperty';
import { ISupplier } from '../Interface/ISupplier';

@Component({
    selector: 'app-supplier',
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
    providers: [SupplierService]
})

export class SupplierComponent {
    columns: string[] = ['ID', 'First Name', 'Last Name', 'Telephone'];
    map_data: IProperty[] = [
        { id: 'id', type: 'text' },
        { id: 'firstName', type: 'text', required: true },
        { id: 'lastName', type: 'text', required: true },
        {
            id: 'telephone', required: true, type: 'text', validate: (e: string) => {
                if (e !== undefined && e !== '') {
                    const pattern = /^\d{10}$/;
                    return pattern.test(e);
                }
                return false;
            }
        }
    ];
    rows: any[] = [];

    property: ISupplier = { id: 0, firstName: '', lastName: '', telephone: '' };
    constructor(private service: SupplierService) {
        this.Load();
    }

    Load() {
        this.service.Get().then(data => {
            this.rows = data;
        });
    }

    Save() {
        this.service.Save(this.property).then(_ => {
            this.property = { id: 0, firstName: '', lastName: '', telephone: '' };
            this.Load();
        }).catch(_ => {
            alert('Unable to save ' + _);
        });
    }

    Edit(id: number) {
        this.service.Edit(id)
            .then(supplier => {
                this.property = {
                    id: supplier.id,
                    firstName: supplier.firstName, 
                    lastName: supplier.lastName, 
                    telephone: supplier.telephone
                };
            }).catch(_ => { alert(_); });
    }

    Delete(id: number) {
        if (id && id > 0) {
            this.service.Delete(id)
                .then(_ => {
                    this.Load();
                }).catch(_ => {
                    alert('Unable to delete ' + _);
                });
        }
    }
}
