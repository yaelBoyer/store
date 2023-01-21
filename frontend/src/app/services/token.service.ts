import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, share ,of as observableOf} from 'rxjs';
import { TokenStorage } from '../utils/token-storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public token$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(protected tokenStorage: TokenStorage) {
    this.publishStoredToken();
  }

  /**
  * Publishes token when it changes.
  * @returns {Observable<string>}
  */
  tokenChange(): Observable<string> {
    return this.token$
      .pipe(
        filter(value => !!value),
        share(),
      );
  }

  /**
   * Sets a token into the storage. This method is used by the AuthService automatically.
   *
   * @param {string} token
   * @returns {Observable<any>}
   */
  set(token: string): Observable<null> {
    this.tokenStorage.set(token);
    this.publishStoredToken();
    return observableOf(null);
  }

  /**
   * Returns observable of current token
   * @returns {Observable<string>}
   */
  get(): Observable<string> {
    const token = this.tokenStorage.get();
    return observableOf(token);
  }

  /**
   * Removes the token and published token value
   *
   * @returns {Observable<any>}
   */
  clear(): Observable<null> {
    this.tokenStorage.clear();
    this.publishStoredToken();
    return observableOf(null);
  }

  protected publishStoredToken() {
    this.token$.next(this.tokenStorage.get());
  }
}
