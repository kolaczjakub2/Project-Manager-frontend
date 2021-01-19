import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-convert-to-sub-task-dialog',
  templateUrl: './convert-to-sub-task-dialog.component.html',
  styleUrls: ['./convert-to-sub-task-dialog.component.css']
})
export class ConvertToSubTaskDialogComponent implements OnInit {

  tasks;
  formGroup: FormGroup;
  filteredTasks;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      task: [''],
    });
  }

  ngOnInit(): void {
    this.tasks = this.data.tasks;
    this.formGroup.get('task').setValue(this.tasks[0]);

    this.filteredTasks = this.formGroup.get('task').valueChanges
      .pipe(
        startWith(''),
        map(task => task ? this._filterTask(task) : this.tasks)
      );
  }

  displayFn(task): string {
    return `(${task.key}) ${task.summary}`;
  }

  private _filterTask(value) {
    const filterValue = value.summary !== undefined ? value.summary.toLowerCase() : value.toLowerCase();

    return this.tasks.filter(tasks => tasks.summary.toLowerCase().indexOf(filterValue) === 0);
  }
}
