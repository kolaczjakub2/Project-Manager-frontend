import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentToken;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(loginRequest) {
   return this.http.post<any>(environment.apiUrl + '/login', loginRequest, {observe: 'response'})
      .pipe(map(resp => {
        this.currentToken = resp.headers.get('Authorization');
        localStorage.setItem('currentUser', resp.headers.get('Authorization'));
        this.currentUserSubject.next(this.currentToken);
        return this.currentToken;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
