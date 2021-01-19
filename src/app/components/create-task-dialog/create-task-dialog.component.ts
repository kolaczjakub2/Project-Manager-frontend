import {Component, Inject, OnInit, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  formGroup: FormGroup;
  assignee: any;
  filteredProjects;
  onAdd = new EventEmitter<string>();

  priorities = ['BLOCKER', 'HIGH', 'MEDIUM', 'LOW'];
  types = ['BUG', 'STORY', 'TASK', 'EPIC'];

  onProjectChange(event) {
    this.onAdd.emit(event.option.value.projectId);
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      projectId: [''],
      releaseId: [''],
      creatorId: [''],
      assigneeId: [''],
      estimatedTime: [''],
      description: [''],
      summary: [''],
      priority: [''],
      taskType: ['']
    });


    this.filteredProjects = this.formGroup.get('projectId').valueChanges
      .pipe(
        startWith(''),
        map(project => project ? this._filterProjects(project) : this.data.projects.slice())
      );
  }

  private _filterProjects(value) {
    const filterValue = value.name !== undefined ? value.name.toLowerCase() : value.toLowerCase();

    return this.data.projects.filter(project => project.name.toLowerCase().indexOf(filterValue) === 0).concat(
      this.data.projects.filter(project => project.code.toLowerCase().indexOf(filterValue) === 0)
    );
  }

  ngOnInit(): void {
    this.formGroup.get('projectId').setValue(this.data.projectId ? this.data.projectId : this.data.projects[0]);
    this.onAdd.emit(this.data.projectId ? this.data.projectId : this.data.projects[0].projectId);
  }

  displayFn(project): string {
    return `${project.name} ( ${project.code})`;
  }

}
