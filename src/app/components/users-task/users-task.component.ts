import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../../services/task.service';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-users-task',
  templateUrl: './users-task.component.html',
  styleUrls: ['./users-task.component.css']
})
export class UsersTaskComponent implements OnInit {
  displayedColumns: string[] = ['type', 'key', 'summary', 'priority'];

  users;
  tasks;

  constructor(private router: Router,
              private taskService: TaskService) {
  }

  onClickRow($event: any) {
    this.router.navigateByUrl('issues/' + $event.key).then();
  }

  ngOnInit(): void {
    this.taskService.onAddTask.subscribe(() => {
      this.getTasks();
    });
   this.getTasks();
  }

  private getTasks() {
    this.taskService.getTasksByUserId(localStorage.getItem('userId'))
      .subscribe(value => this.tasks = value);
  }
}

