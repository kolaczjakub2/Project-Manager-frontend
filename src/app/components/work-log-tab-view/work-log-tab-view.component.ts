import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-work-log-tab-view',
  templateUrl: './work-log-tab-view.component.html',
  styleUrls: ['./work-log-tab-view.component.css']
})
export class WorkLogTabViewComponent implements OnInit {

  @Input() taskKey: string;
  @Input() users = [];

  workLogs;

  constructor(private taskService: TaskService,
              private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(routeParams => {
      this.getWorkLog(routeParams.id);
    });

  }

  ngOnInit(): void {
    this.taskService.onAddLogWork.subscribe(() => {
      this.getWorkLog(this.taskKey);
    });
    this.getWorkLog(this.taskKey);
  }

  private getWorkLog(key) {
    this.taskService.getWorkLogs(key).subscribe(value => this.workLogs = value);
  }
}
