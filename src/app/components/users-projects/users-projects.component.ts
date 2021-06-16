import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';

class SimpleUser {
  id: string;
  firstName: string;
  lastName: string;
}

class Project {
  code: string;
  name: string;
  leader: SimpleUser;
  description: string;
}

@Component({
  selector: 'app-users-projects',
  templateUrl: './users-projects.component.html',
  styleUrls: ['./users-projects.component.css']
})
export class UsersProjectsComponent implements OnInit {
  projects: Project[];


  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(value => this.projects = value);
  }


}



