import {Component, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskDialogComponent} from '../create-task-dialog/create-task-dialog.component';
import {ProjectService} from '../../services/project.service';
import {UserService} from '../../services/user.service';
import {ReleaseService} from '../../services/release.service';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  releases: any;
  dialogRef;

  constructor(public dialog: MatDialog,
              public projectService: ProjectService,
              public userService: UserService,
              public releasesService: ReleaseService,
              public taskService: TaskService) {
  }

  ngOnInit(): void {
  }

  async openDialog() {
    const projects = await this.projectService.getAllProjects().toPromise();
    const users = await this.userService.getAllUsers().toPromise();
    this.dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      height: '60%',
      width: '50%',
      data: {
        projects: projects,
        users: users,
        releases: this.releases
      }
    });

    this.dialogRef.afterClosed().subscribe(value => {
        if (value) {
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
}


