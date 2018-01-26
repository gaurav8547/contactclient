import { IPerson } from './IPerson';
import { IProperty } from './IProperty';

export interface ICustomer extends IPerson {
    birthDay: string;
    email: string;
}
