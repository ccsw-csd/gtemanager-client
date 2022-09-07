import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Center } from '../models/Center';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  /**
   * Constructor: inicializa servicio HttpClient para comunicación con backend.
   * 
   TODO DOCS
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
  * GET: Obtener todos los centros de la base de datos.
  * @returns Listado de Center
  */
  getCenters(): Observable<Center[]> {
    return this.http.get<Center[]>(environment.server + "/center");
  }
}
