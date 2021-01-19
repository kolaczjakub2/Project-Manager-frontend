import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreateTaskDialogComponent} from '../create-task-dialog/create-task-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {WorkLogDialogComponent} from '../work-log-dialog/work-log-dialog.component';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {ReleaseService} from '../../services/release.service';
import {TaskService} from '../../services/task.service';
import {ConvertToSubTaskDialogComponent} from '../convert-to-sub-task-dialog/convert-to-sub-task-dialog.component';

@Component({
  selector: 'app-task-actions',
  templateUrl: './task-actions.component.html',
  styleUrls: ['./task-actions.component.css']
})
export class TaskActionsComponent implements OnInit {

  @Input() task;
  @Output() commentClick = new EventEmitter();
  @Output() logTimeSubmit = new EventEmitter();
  @Output() statusEmitter = new EventEmitter();
  dialogRef;
  releases: any;

  constructor(public dialog: MatDialog,
              public projectService: ProjectService,
              public userService: UserService,
              public releasesService: ReleaseService,
              public taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  onCommentClick() {
    this.commentClick.emit();
  }

  logWork() {

    this.dialogRef = this.dialog.open(WorkLogDialogComponent, {
      height: '60%',
      width: '50%',
      data: {
        task: this.task
      }
    });

    this.dialogRef.afterClosed().subscribe(value => {
        this.logTimeSubmit.emit(value);
      }
    );
  }

  changeStatus(status) {
    this.statusEmitter.emit(status);
  }

  async createSubTask() {
    const projects = await this.projectService.getAllProjects().toPromise();
    const users = await this.userService.getAllUsers().toPromise();
    this.dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '60%',
      width: '50%',
      data: {
        projects: projects,
        users: users,
        releases: this.releases,
        subtask: true,
        projectId: this.task.projectId
      }
    });

    this.dialogRef.afterClosed().subscribe(value => {
        if (value) {
          value['mainTaskKey'] = this.task.key;
          this.taskService.createTask(value).subscribe(() => {
            this.taskService.onAddTask.emit();
          });
        }
      }
    );

    this.dialogRef.componentInstance.onAdd.subscribe((projectId) => {
      this.releasesService.getReleasesById(projectId).subscribe(value => this.dialogRef.componentInstance.data.releases = value);
    });
  }

  async convertToSubTask() {
    const tasks = await this.taskService.getAllTasks(this.task.projectId).toPromise();
    this.dialogRef = this.dialog.open(ConvertToSubTaskDialogComponent, {
      height: '60%',
      width: '50%',
      data: {
        tasks: tasks
      }
    });

    this.dialogRef.afterClosed().subscribe(value => {
        if (value) {
          this.taskService.convertToSubTask(value,this.task.key).subscribe(() => {
            this.taskService.onAddTask.emit();
          });
        }
      }
    );
  }
}
