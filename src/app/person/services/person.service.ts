import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  findPersonsByFilter(filter: String) : Observable<Person[]>{
    return this.http.get<Person[]>(environment.server + '/person/' + filter)
  }
}
