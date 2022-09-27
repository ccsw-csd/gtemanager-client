import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EvidenceError } from "../model/EvidenceError";

/**
 * Servicio de datos de errores
 */
@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<EvidenceError[]> {

        return this.http.get<EvidenceError[]>(environment.server + "/evidence-error/");
    }
}