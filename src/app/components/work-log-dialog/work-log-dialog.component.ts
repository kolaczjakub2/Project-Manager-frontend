import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-work-log-dialog',
  templateUrl: './work-log-dialog.component.html',
  styleUrls: ['./work-log-dialog.component.css']
})
export class WorkLogDialogComponent implements OnInit {

  task;
  formGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.task = this.data.task;
    this.formGroup = this.fb.group({
      comment: [''],
      date: [''],
      from: [''],
      to: [''],
      worked: [''],
    });
  }

}
