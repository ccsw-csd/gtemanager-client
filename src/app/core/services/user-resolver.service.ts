import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  /**
   * resolve method
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.http.get<any>(
        environment.server + '/security/user/'
    ).pipe(
      map((user) => (user)),
      catchError((error) => {
        return of(null);
      }),
    );
  }
}
