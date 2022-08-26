import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { Person } from 'src/app/person/model/Person';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { UserPage } from '../model/UserPage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  findPage(pageable: Pageable, username:String, name:String): Observable<UserPage>{
    return this.http.post<UserPage>(environment.server + "/user/findPage", {pageable:pageable, username:username, name:name});
  }

  deleteUserById(userId: number): Observable<any> {
    return this.http.delete(environment.server+'/user/'+userId);
  }  

  saveUser(user: User): Observable<any> {
    let url='/user'
    return this.http.put<User>(environment.server+url,user);
  }

  
  

}
