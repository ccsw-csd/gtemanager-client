import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EvidenceManagerService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    /**
     * POST: Enviar archivo al backend a través del endpoint en /evidence-manager.
     * 
     * @param formData Elemento a subir
     * @returns Observable para manejo de la petición
     */
    uploadEvidenceManager(formData: FormData): Observable<FormData> {

        return this.http.post<FormData>(environment.server + "/evidence-manager", formData);
    }
}