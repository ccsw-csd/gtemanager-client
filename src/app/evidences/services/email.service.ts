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
   * Incluye DatePipe para procesamiento de fechas.
   */
  constructor(
    private http: HttpClient,
    private pipe: DatePipe
  ) { }

  /** 
   * POST: enviar fecha de cierre e ID de centro a backend para procesar y enviar los correos electrónicos de esa geografía.
   */
  sendEmails(closingDate: Date, centerId: number): Observable<any> {
    return this.http.post<any>(this.composeUrl(closingDate, centerId), null);
  }

  /**
  * Componer parámetros de URL dada una fecha de cierre e ID de centro.
  */
  composeUrl(closingDate: Date, centerId: number) {
    let url = environment.server + "/email/sendReminders";
    let params = "closingDate=" + this.pipe.transform(closingDate, "yyyy-MM-dd") + "&" + "centerId=" + centerId;
    return url + "?" + params;
  }
}
