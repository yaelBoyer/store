import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string;
  public role$: BehaviorSubject<Role> = new BehaviorSubject(null);

  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}users`;
  }

  checkEmailUnique(email: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/checkEmailUniqu`, { email: email });
  }

  getDetails(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/details`).pipe(
      map((res) => {
        this.role$.next(res.role);
        return res;
      }),
    );
  }
}
