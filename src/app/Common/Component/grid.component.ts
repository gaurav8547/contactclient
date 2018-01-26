import { Component, Input, EventEmitter, Output, transition } from '@angular/core';
import { IProperty } from '../../Interface/IProperty';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})

export class GridComponent {
    @Input() rows: any[] = [];
    @Input() columns: string[] = [];
    @Input() map_data: IProperty[];
    @Output() saveClik = new EventEmitter<any>();

    private element: any = [];
    private showerrors = false;
    private show_button = false;
    private is_edit = false;
    private message: string[];
    @Input() property: any = {};

    Save(e: any) {
        if (this.map_data.length > 0) {
            this.map_data.forEach(el => {
                if (el.required && el.validate) {
                    this.showerrors = el.validate(this.property[el.id]);
                }
            });
        }

        if (this.showerrors) {
            this.saveClik.emit();
        }
    }

    Validate(e: any) {
        this.message = [];
        this.map_data.forEach((el, i) => {
            if (el.id !== 'id') {
                const value = this.property[el.id];
                if (el.required && el.validate !== undefined) {
                    this.show_button = el.validate(value);
                    this.message.push(this.columns[i] + ' is invalid');
                } else if (value !== undefined && value !== '') {
                    this.show_button = true;
                }
            }
        });
        if (this.show_button) {
            this.message = [];
        }
    }
}
