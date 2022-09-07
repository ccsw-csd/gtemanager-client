import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Center } from 'src/app/evidences/models/Center';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  /**
   * Constructor: inicializa servicio HttpClient para comunicación con backend.
   * 
   TODO DOCS
   */
  constructor(
    private http: HttpClient,
    private pipe: DatePipe
  ) { }

  /** TODO DOCS */
  sendEmails(closingDate: Date, centerId: number): Observable<any> {
    return this.http.post<any>(this.composeFindUrl(closingDate, centerId), null);
  }

  /**
  * TODO DOCS
  */
  private composeFindUrl(closingDate: Date, centerId: number) {
    let url = environment.server + "/email/sendReminders";
    let params = "closingDate=" + this.pipe.transform(closingDate, "yyyy-MM-dd") + "&" + "centerId=" + centerId;
    return url + "?" + params;
  }
}
