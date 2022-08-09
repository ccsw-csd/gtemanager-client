import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { environment } from 'src/environments/environment';
import { UserPage } from '../model/UserPage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findPage(pageable: Pageable, username:String, name:String): Observable<UserPage>{
    return this.http.post<UserPage>(environment.server + "/user/findPage", {pageable:pageable, username:username, name:name});
  }

}
