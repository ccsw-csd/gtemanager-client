import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reminder } from '../models/Reminder';

/**
 * Servicio de datos de envío de correos electrónicos
 */
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
   * 
   * @param reminder Objeto Reminder con fecha de cierre e ID de centro para procesado de correos electrónicos.
   */
  sendEmails(reminder: Reminder): Observable<any> {
    return this.http.post<any>(environment.server + "/email/sendReminders", reminder);
  }

}
