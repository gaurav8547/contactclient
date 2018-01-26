import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { supplier_service, options } from './service.config';
import { Helper } from '../Common/helper';
import { ISupplier } from '../Interface/ISupplier';

@Injectable()
export class SupplierService {
    constructor(private http: Http) { }

    private api: string = supplier_service;
    Get(): Promise<any> {
        return this.http
            .get(supplier_service)
            .toPromise()
            .then(Helper.extractData)
            .catch(Helper.handleError);
    }

    Save(supplier: ISupplier): Promise<any> {
        const body = {
            Id: supplier.id,
            FirstName: supplier.firstName,
            LastName: supplier.lastName,
            Telephone: supplier.telephone
        };
        return this.http.post(this.api, JSON.stringify(body), options)
            .toPromise()
            .then(Helper.extractData)
            .catch(Helper.handleError);
    }

    Edit(id: number) {
        options.params.set('id', id.toString());
        return this.http.get(this.api + '/' + id, options)
            .toPromise()
            .then(Helper.extractData)
            .catch(Helper.handleError);
    }

    Delete(id: number) {
        options.params.set('id', id.toString());

        return this.http.delete(this.api, options)
            .toPromise()
            .then(Helper.extractData)
            .catch(Helper.handleError);
    }
}
