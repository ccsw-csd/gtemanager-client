import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardData } from '../models/DashboardData';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  public getData(): Observable<DashboardData> {

      return this.http.get<DashboardData>(environment.server + "/dashboard/");
  }
}
