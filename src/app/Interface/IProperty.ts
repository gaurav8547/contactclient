export interface IProperty {
    type: string;
    required?: boolean;
    id: string;
    value?: any;
    validate?: Function;
}
