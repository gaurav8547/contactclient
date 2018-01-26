import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { ICustomer } from '../Interface/ICustomer';
import { customer_service, options } from './service.config';

@Injectable()
export class CustomerService {
    constructor(private http: Http) {}

    private api: string = customer_service;
    Get(): Promise<any> {
        return this.http
        .get(customer_service)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    Save(customer: ICustomer): Promise<any> {
        return this.http.post(this.api, JSON.stringify(customer), options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }

    extractData(res: any) {
        const body = res.json();
        return body || {};
    }

    handleError(err: any) {
        console.error('An error occurred', err);
        return Promise.reject(err.message || err);
    }
}
