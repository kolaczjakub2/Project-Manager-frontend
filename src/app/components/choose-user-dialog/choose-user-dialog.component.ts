import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-choose-user-dialog',
  templateUrl: './choose-user-dialog.component.html',
  styleUrls: ['./choose-user-dialog.component.css']
})
export class ChooseUserDialogComponent implements OnInit {

  users;
  formGroup: FormGroup;
  filteredUsers;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      user: [''],
    });
  }

  ngOnInit(): void {
    this.users = this.data.users;
    this.formGroup.get('user').setValue(this.users.find(user => user.id === this.data.assigneeId));

    this.filteredUsers = this.formGroup.get('user').valueChanges
      .pipe(
        startWith(''),
        map(user => user ? this._filterUser(user) : this.users)
      );
  }

  displayFn(user): string {
    return `${user.firstName} ${user.lastName}`;
  }

  private _filterUser(value) {
    const filterValue = value.firstName !== undefined || value.lastName !== undefined ? `${value.firstName.toLowerCase()} ${value.lastName.toLowerCase()}` : value.toLowerCase();

    return this.users.filter(user => {
      return `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.indexOf(filterValue) > -1 ||
        `${user.lastName.toLowerCase()} ${user.firstName.toLowerCase()}`.indexOf(filterValue) > -1;
    });
  }
}
