import { IPerson } from './IPerson';
import { IProperty } from './IProperty';

export interface ICustomer extends IPerson {
    birthday: string;
    email: string;
}
