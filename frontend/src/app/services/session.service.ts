import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of as observableOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthResult } from '../models/auth-result';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl: string;

  constructor(public httpClient: HttpClient,
    protected tokenService: TokenService) {
    this.baseUrl = `${environment.baseUrl}sessions`;
  }

  /**
   * Retrieves current authenticated token stored
   * @returns {Observable<any>}
   */
  getToken(): Observable<string> {
    return this.tokenService.get();
  }

  /**
   * Returns true if auth token is present in the token storage
   * @returns {Observable<boolean>}
   */
  isAuthenticated(): Observable<boolean> {
    return this.getToken()
      .pipe(map((token: string) => token ? true : false));
  }

  /**
   * Returns tokens stream
   * @returns {Observable<string>}
   */
  onTokenChange(): Observable<string> {
    return this.tokenService.tokenChange();
  }

  /**
   * Returns authentication status stream
   * @returns {Observable<boolean>}
   */
  onAuthenticationChange(): Observable<boolean> {
    return this.onTokenChange()
      .pipe(map((token: string) => token ? true : false));
  }

  /**
  * Authenticates with the selected strategy
  * Stores received token in the token storage
  *
  * Example:
  * authenticate('email', {email: 'email@example.com', password: 'test'})
  *
  * @param data
  * @returns {Observable<AuthResult>}
  */
  authenticate(data?: any): Observable<AuthResult> {
    return this.httpClient.post(`${this.baseUrl}`, data)
      .pipe(
        map((res) => {
          return new AuthResult(
            true,
            res,
            '',
            [],
            ['You log in to shop'],
            res['refreshToken']
          );
        }),
        catchError((res) => this.handleResponseError(res)),
      )
      .pipe(
        switchMap((result: AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  private processResultToken(result: AuthResult) {
    if (result.isSuccess() && result.getToken()) {
      return this.tokenService.set(result.getToken())
        .pipe(
          map((token: string) => {
            return result;
          }),
        );
    }

    return observableOf(result);
  }

  /**
   * Registers with the selected strategy
   * Stores received token in the token storage
   *
   * Example:
   * register('email', {email: 'email@example.com', name: 'Some Name', password: 'test'})
   *
   * @param strategyName
   * @param data
   * @returns {Observable<NbAuthResult>}
   */
  register(data?: User): Observable<AuthResult> {
    return this.httpClient.post<AuthResult>(`${environment.baseUrl}users`, data)
      .pipe(
        map((res) => {
          return new AuthResult(
            true,
            res,
            'main',
            [],
            ['You Register to shop'],
            res['refreshToken']
          );
        }),
        catchError((res) => this.handleResponseError(res)),
      )
      .pipe(
        switchMap((result: AuthResult) => {
          return this.processResultToken(result);
        }),
      );
  }

  /**
   * Sign outs
   * Removes token from the token storage
   *
   * Example:
   * logout()
   *
   */
  logout(): boolean {
    this.tokenService.clear();
    this.tokenService.token$.next('');
    return true;
  }

  protected handleResponseError(res: any): Observable<AuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      if (res.error.error_description) {
        errors.push(res.error.error_description);
      } else {
        errors = ['email or password not currect'];
      }
    } else {
      errors.push('Something went wrong.');
    }

    return observableOf(new AuthResult(false, res, '', errors, []));
  }

  protected handleResponseRegisterError(res: any): Observable<AuthResult> {
    let errors = [];
    if (res instanceof HttpErrorResponse) {
      if (res.error.error_description) {
        errors.push(res.error.error_description);
      } else {
        errors = ['Register fail'];
      }
    } else {
      errors.push('Something went wrong.');
    }
    return observableOf(new AuthResult(false, res, '', errors, []));
  }


}
