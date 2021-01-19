import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-work-log',
  templateUrl: './work-log.component.html',
  styleUrls: ['./work-log.component.css']
})
export class WorkLogComponent implements OnInit {

  @Input() workLog;
  @Input() users;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCreatedDate(date) {
    return new Date(date).toLocaleString();
  }

  getWorkLogCreator(userId: any) {
    let user = this.users.filter(user => user.id === userId);
    return user[0].firstName + ' ' + user[0].lastName;
  }


}
