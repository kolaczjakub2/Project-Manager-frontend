import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.css']
})
export class UserListDialogComponent implements OnInit {

  users;
  displayedColumns: string[] = ['username', 'firstName', 'lastName'];
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.users = this.data.users;
  }

}
