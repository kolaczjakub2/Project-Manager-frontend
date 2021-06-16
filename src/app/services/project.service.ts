import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getAllProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects`);
  }

  getAllTasks(projectCode): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectCode}/tasks`);
  }

  getProject(projectCode: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/projects/${projectCode}`);
  }
}
