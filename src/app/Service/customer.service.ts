import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ICustomer } from '../Interface/ICustomer';
import { customer_service, options } from './service.config';
import { Helper } from '../Common/helper';

@Injectable()
export class CustomerService {
    constructor(private http: Http) { }

    private api: string = customer_service;
    Get(): Promise<any> {
        return this.http
            .get(customer_service)
            .toPromise()
            .then(Helper.extractData)
            .catch(Helper.handleError);
    }

    Save(customer: ICustomer): Promise<any> {
        const body = {
            Id: customer.id,
            FirstName: customer.firstName,
            LastName: customer.lastName,
            BirthDay: customer.birthDay,
            Email: customer.email
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
