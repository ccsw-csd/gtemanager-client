import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evidence } from 'src/app/evidences/model/Evidence';
import { environment } from 'src/environments/environment';
import { Blacklist } from '../model/Blacklist';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  constructor(private http: HttpClient) { }


  saveComment(id: number, comment: string): Observable<void> {
    return this.http.put<void>(environment.server + "/blacklist/save-comment", {id: id, comment: comment});
  }


  getList(center?: string): Observable<Blacklist[]> {

    let path = "/blacklist/";

    if (center != null)
        path += "?geography=" + center;

    return this.http.get<Blacklist[]>(environment.server + path);
  }

  save(date: Date, personId: number[]): Observable<void> {    

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return this.http.put<void>(environment.server + "/blacklist", {month: month, year: year, day: day, persons: personId});
  }


  delete(id: number): Observable<void> {    
    return this.http.delete<void>(environment.server + "/blacklist/"+id);
  }


}
