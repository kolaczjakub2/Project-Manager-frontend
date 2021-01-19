import { Component, OnInit } from '@angular/core';

export interface UserData {
  shortName: string;
  Name: string;
  Leader;
  P: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-users-projects',
  templateUrl: './users-projects.component.html',
  styleUrls: ['./users-projects.component.css']
})
export class UsersProjectsComponent implements OnInit {

  users;
  constructor() {
    // Create 100 users
    this.users  = Array.from({length: 5}, (_, k) => createNewUser(k + 1));

  }

  ngOnInit(): void {
  }


}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    shortName: id.toString(),
    Name: name,
    Leader: {name, id},
    P: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}



