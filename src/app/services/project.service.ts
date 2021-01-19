import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
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

  getAllTasks() {

  }
}
