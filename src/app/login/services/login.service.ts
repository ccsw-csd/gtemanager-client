import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseCredentials } from 'src/app/core/models/ResponseCredentials';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  login(username: string, password: string): Observable<ResponseCredentials> {

    this.authService.clearCredentials();

    let urlSSO = 'http://ccsw.capgemini.com/sso';

    return this.http.post<ResponseCredentials>(urlSSO + '/authenticate', {username:username, password: password});
  }
  
  putCredentials(res: ResponseCredentials) {
    this.authService.putTokenCredentials(res);
  }
  
}

