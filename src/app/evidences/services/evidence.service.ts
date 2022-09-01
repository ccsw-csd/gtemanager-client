import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Properties } from "src/app/properties/model/Properties";
import { environment } from "src/environments/environment";
import { Evidence } from "../model/Evidence";

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

    findAll(): Observable<Evidence[]> {
        return this.http.get<Evidence[]>(environment.server + "/evidence-view/");
    }

    findEvidenceByGeography(idGeography?: number): Observable<Evidence[]> {
        let path = "/evidence-view/";

        if (idGeography != null)
            path = "/evidence-view/?geography=" + idGeography;

        this.http.get<Evidence[]>(environment.server + path).forEach(element => {
            console.log(element);
        });

        return this.http.get<Evidence[]>(environment.server + path);
    }

    // getProperties(): Observable<Properties> {

    // }

    /**
     * POST: Enviar archivo y variable de borrado de comentarios al backend a través del endpoint en /evidence.
     * 
     * @param formData Elemento a subir
     * @returns Observable para manejo de la petición
     */
    uploadEvidence(formData: FormData): Observable<FormData> {
        return this.http.post<FormData>(environment.server + "/evidence", formData);
    }

}