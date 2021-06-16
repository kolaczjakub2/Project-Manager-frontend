import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users`);
  }

  getContext(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/context`);
  }
}
