import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProjectService} from '../../services/project.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {
  public projectCode: string;
  public project$: Observable<any>;
  public projectTasks$: Observable<any>;

  displayedColumns: string[] = ['type', 'key', 'summary', 'priority'];

  constructor(public projectService: ProjectService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((queryParams: Params) => {
      this.projectCode = queryParams.id;
      this.project$ = this.projectService.getProject(this.projectCode);
      this.projectTasks$ = this.projectService.getAllTasks(this.projectCode);
    });
  }
}
