import { RequestOptions, Headers } from '@angular/http';

const baseUrl = 'http://localhost:55751/api/';
const header = new Headers({ 'content-type': 'application/json' });
export const options = new RequestOptions({ headers: header});

export const customer_service: string =  baseUrl + 'customer';
export const supplier_service: string =  baseUrl + 'supplier';
