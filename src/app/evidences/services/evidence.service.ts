import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

/**
 * Servicio de datos de evidencias
 * @author cavire
 */
@Injectable({
    providedIn: 'root'
})
export class EvidenceService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * PUT: Enviar archivo y variable de borrado de comentarios al backend a través del endpoint en /evidence.
     * 
     * @param formData Elemento a subir
     * @returns Observable para manejo de la petición
     */
    uploadEvidence(formData: FormData): Observable<FormData> {
        return this.http.put<FormData>(environment.server + "/evidence", formData);
    }

}