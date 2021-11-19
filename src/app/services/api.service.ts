import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/authData';
import { Competition } from '../models/competition';
import { Login } from '../models/login';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.base_url;
  private authenticateSubject = new ReplaySubject<AuthData | null>();
  authData$ = this.authenticateSubject.asObservable();

  private isAuthenticated = new ReplaySubject<boolean>();
  isAuthenticated$ = this.isAuthenticated.asObservable();
  constructor(private http: HttpClient) { }

  getCompetitions() {
    return this.http.get<{data: Competition[], size: number}>(`${this.baseUrl}/competition?pageSize=${10}&pageNumber=${1}`);
  }
  getParticipants(id: string) {
    return this.http.get<{data: Student[], size: number}>(`${this.baseUrl}/competition/${id}?pageSize=${10}&pageNumber=${1}`);
  }

  login(data: Login) {
    return this.http.post<AuthData>(`${this.baseUrl}/account/login`, data).pipe(
      map(authData => {
        this.saveUserLocal(authData);
        this.setUser(authData);
      })
    );
  }
  logout() {
    localStorage.removeItem('authData');
    this.authenticateSubject.next(null);
    this.isAuthenticated.next(false);
  }
  setUser(authData: AuthData | null) {
    this.authenticateSubject.next(authData);
    this.isAuthenticated.next(authData ? true : false);
  }
  saveUserLocal(authData: AuthData) { // Save minimal authData
    let saveAuthData: AuthData = {
      id: authData.id, 
      token: authData.token, 
      username: authData.username
    };
    localStorage.setItem('authData', JSON.stringify(saveAuthData)); 
  }
  refrestToken(authData: AuthData) {
    return this.http.post<AuthData>(`${this.baseUrl}/account/refresh`, authData);
  }
  emitOldAuthData(authData: AuthData) {
    this.authenticateSubject.next(authData);
  }
}
