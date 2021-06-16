import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  onAddTask = new EventEmitter<any>();
  onAddLogWork = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  createTask(value): Observable<any> {
    return this.http.post(`${environment.apiUrl}/tasks`, value);
  }

  getTasksByUserId(userId: string) {
    return this.http.get(`${environment.apiUrl}/tasks/${userId}`);
  }

  getTaskByKey(key: any) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}`);
  }

  updateTask($event: string, value: any, key: any) {
    let object = {};
    object[$event] = value;
    console.log(object);
    return this.http.patch(`${environment.apiUrl}/tasks/key/${key}`, object);
  }

  addComment(value: any, key: any) {
    return this.http.post(`${environment.apiUrl}/tasks/key/${key}/comments`, value);
  }

  getComments(key: string) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}/comments`);
  }

  updateComment($event, key) {
    return this.http.patch(`${environment.apiUrl}/tasks/key/${key}/comments/${$event.commentId}`, {content: $event.content});
  }

  logWork(value, key) {
    return this.http.post(`${environment.apiUrl}/tasks/key/${key}/workLog`, value);
  }

  getWorkLogs(key: string) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}/workLog`);
  }

  changeStatus($event: any, key) {
    return this.http.patch(`${environment.apiUrl}/tasks/key/${key}/status`, $event);
  }

  getSubTasksByKey(key) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}/subtask`);
  }

  getAllTasks(projectId) {
    return this.http.get(`${environment.apiUrl}/tasks/project/${projectId}`);
  }

  convertToSubTask(value, key) {
    return this.http.patch(`${environment.apiUrl}/tasks/key/${key}/mainTask`, value);
  }

  voteForTask(userId, key) {
    return this.http.post(`${environment.apiUrl}/tasks/key/${key}/vote`, userId);
  }

  getVoters(key) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}/voters`);
  }

  getWatchers(key) {
    return this.http.get(`${environment.apiUrl}/tasks/key/${key}/watchers`);
  }

  watchTask(userId: any, key) {
    return this.http.post(`${environment.apiUrl}/tasks/key/${key}/watcher`, userId);
  }

  linkTask(value: any, key) {
    return this.http.post(`${environment.apiUrl}/tasks/key/${key}/linkTask`, value);
  }
}

