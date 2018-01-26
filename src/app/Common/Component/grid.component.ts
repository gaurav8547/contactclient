import { Component, Input, EventEmitter, Output, OnChanges, SimpleChanges, transition } from '@angular/core';
import { IProperty } from '../../Interface/IProperty';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html'
})

export class GridComponent implements OnChanges {
    @Input() rows: any[] = [];
    @Input() columns: string[] = [];
    @Input() map_data: IProperty[];
    @Output() saveClik = new EventEmitter<any>();
    @Output() deleteClick = new EventEmitter<any>();
    @Output() editClick = new EventEmitter<any>();

    private element: any = [];
    private showerrors = false;
    private show_button = false;
    private is_edit = false;
    private message: string[];
    private action_alert = false;
    private action_msg: string;
    @Input() property: any = {};

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['rows']) {
            this.is_edit = false;
            this.action_alert = true;
        }
    }

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
            this.action_msg = 'Customer saved successfully!';
        }
    }

    Delete(id: Number, name: string) {
        const _delete = confirm('Are you sure want to delete customer: ' + name);
        if (_delete) {
            this.deleteClick.emit(id);
            this.action_msg = 'Customer deleted successfully!';
        }
    }

    Edit(id: number) {
        this.editClick.emit(id);
        this.is_edit = true;
        this.show_button = true;
    }

    Validate(e: any) {
        this.ShowMessage();
        this.ShowSaveBtn();
    }

    ShowMessage() {
        this.message = [];
        this.map_data.forEach((el, index) => {
            const field = this.columns[index];
            if (el.validate && this.property[el.id] && this.property[el.id] !== undefined) {
                if (!el.validate(this.property[el.id])) {
                    this.message.push(field + ' has invalid data');
                    this.property[el.id] = '';
                }
            }
        });
    }

    ShowSaveBtn() {
        let valid = true;

        this.map_data
        .filter((a, b) => {
            if (String(this.property[a.id]) !== '') {
                return a;
            } else {
                return b;
            }
        })
        .forEach(el => {
            const value = this.property[el.id];

            if (el.required) {
                let _valid = String(value) !== '' ? true : false;
                if (el.validate) {
                    _valid = el.validate(value);
                }
                valid = _valid && valid;
            }
        });
        this.show_button = valid;
    }
}
