import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-sub-task-view',
  templateUrl: './sub-task-view.component.html',
  styleUrls: ['./sub-task-view.component.css']
})
export class SubTaskViewComponent implements OnInit {

  @Input() task;
  @Input() users: any[];
  tasks: any;
  displayedColumns: string[] = ['type', 'key', 'summary', 'priority', 'assignee', 'loggedTime'];

  constructor(private router: Router, private activeRoute: ActivatedRoute,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.getTasks(routeParams.id);
    });


    this.taskService.onAddTask.subscribe(() => {
      this.getTasks(this.task.key);
    });
    this.getTasks(this.task.key);
  }

  onClickRow($event: any) {
    this.router.navigateByUrl('issues/' + $event.key).then();
  }

  private getTasks(key) {
    this.taskService.getSubTasksByKey(key)
      .subscribe((value: any[]) => {
        value.forEach(element => {
          let user = this.users.filter(user => user.id === element.assigneeId)[0];
          element['assignee'] = user.firstName + ' ' + user.lastName;
        });
        this.tasks = value;
      });
  }
}
