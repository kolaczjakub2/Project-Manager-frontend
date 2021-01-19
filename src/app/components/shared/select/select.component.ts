import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Input() public form: FormGroup;
  @Input() public values;
  @Input() public placeholder: any;
  @Input() public controlName: any;
  @Input() public valueField;
  @Input() public type;

  @Output() clicked = new EventEmitter<string>();
  @Output() onBlur = new EventEmitter<string>();
  @Output() onChanged = new EventEmitter<string>();
  defaultDisable;

  constructor() {
  }

  onClick() {
    this.clicked.emit(this.controlName);
  }

  unBlur() {
    this.onBlur.emit(this.controlName);
  }

  onChange() {
    this.onChanged.emit(this.controlName);
  }
}
