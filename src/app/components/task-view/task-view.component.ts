import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../../services/task.service';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  formGroup: FormGroup;
  priorities = ['BLOCKER', 'HIGH', 'MEDIUM', 'LOW'];
  types = ['BUG', 'STORY', 'TASK', 'EPIC'];
  resolution = ['NONE', 'FIXED', 'DUPLICATE', 'WONT_FIX', 'INCOMPLETE', 'CANNOT_REPRODUCE'];
  statuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REOPEN'];
  task;
  users;
  description: string = 'LABEL';
  summary: string = 'LABEL';
  taskKey;

  eventsSubject: Subject<void> = new Subject<void>();
  bufferValue: number;
  loggedTime;
  estimatedTime;
  remainingTime;
  remainingTimeString: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private taskService: TaskService,
              private userService: UserService) {
    this.userService.getAllUsers().subscribe(
      value => this.users = value
    );
    this.getTask();


    this.formGroup = this.fb.group({
      projectId: [''],
      releaseId: [''],
      creatorId: [{
        value: null,
        disabled: true
      }],
      assigneeId: [{
        value: null,
        disabled: true
      }],
      estimatedTime: [{
        value: null,
        disabled: true
      }],
      description: [{
        value: null,
        disabled: true
      }],
      resolution: [{
        value: null,
        disabled: true
      }],
      summary: [''],
      priority: [{
        value: null,
        disabled: true
      }],
      status: [{
        value: null,
        disabled: true
      }],

      type: [{
        value: null,
        disabled: true
      }],
      createdDate: [{
        value: null,
        disabled: true
      }],
      lastModifiedDate: [{
        value: null,
        disabled: true
      }],
    });

  }

  private getTask() {
    this.route.params.subscribe(value => {
      this.taskKey = value.id;
      this.taskService.getTaskByKey(value.id).subscribe(
        task => {
          this.task = task;
          this.fillForm();
        }
      );
    });
  }

  private fillForm() {
    this.formGroup.patchValue(this.task);
    this.formGroup.get('createdDate').setValue(new Date(this.task.createdDate).toLocaleString());
    this.formGroup.get('lastModifiedDate').setValue(new Date(this.task.lastModifiedDate).toLocaleString());
    this.countTimes();
  }

  ngOnInit(): void {
  }

  enableField($event) {
    this.formGroup.get($event).enable();
  }

  disableField($event) {
    this.formGroup.get($event).disable();
  }

  updateTask($event: string) {
    this.taskService.updateTask($event, this.formGroup.get($event).value, this.task.key).subscribe(() => {
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onLabelClick($event: string) {
    console.log($event);
    this[$event] = 'TEXTAREA';
    this.enableField($event);
  }

  onInputBlur($event: string) {
    this.updateTask($event);
    this.disableField($event);
    this[$event] = 'LABEL';
  }

  onCommentClick() {
    this.eventsSubject.next();
  }

  logTimeSubmit($event) {
    $event['creatorId'] = localStorage.getItem('userId');
    this.taskService.logWork($event, this.taskKey).subscribe(() => {
      this.taskService.onAddLogWork.emit();
    });
  }

  private countTimes() {
    this.loggedTime = this.countMinutes(this.task.loggedTime);
    this.estimatedTime = this.countMinutes(this.task.estimatedTime);
    this.bufferValue = this.loggedTime > this.estimatedTime ? this.loggedTime : this.estimatedTime;

    this.loggedTime = (this.loggedTime / this.bufferValue) * 100;
    this.estimatedTime = (this.estimatedTime / this.bufferValue) * 100;
  }

  private countMinutes(worked) {
    let sum = 0;
    let rest = worked;
    if (worked.includes('d')) {
      sum += worked.split('d')[0] * 1440;
      if (worked.includes('h') || worked.includes('m')) {
        rest = worked.split('d')[1];
      }
    }
    if (worked.includes('h')) {
      sum += rest.split('h')[0] * 60;
      if (worked.includes('m')) {
        rest = rest.split('h')[1];
      }
    }
    if (worked.includes('m')) {
      sum += rest.split('m')[0];
    }

    return sum;
  }

  changeStatus($event: any) {
    this.taskService.changeStatus($event, this.taskKey).subscribe(() => {
      this.getTask();
    });
  }
}
