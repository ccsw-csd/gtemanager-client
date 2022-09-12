import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Properties } from "../model/Properties";
import { environment } from "src/environments/environment";
import { Comment } from "../model/Comment";
import { Evidence } from "../model/Evidence";
import { Person } from "../model/Person";
import { Center } from "../model/Center";

/**
 * Servicio de datos de evidencias
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

    findAll(): Observable<Evidence[]> {

        return this.http.get<Evidence[]>(environment.server + "/evidence-view/");
    }

    getEvidences(center?: number): Observable<Evidence[]> {

        let path = "/evidence-view/";

        if (center != null)
            path += "?geography=" + center;

        return this.http.get<Evidence[]>(environment.server + path);
    }

    getPersonById(idPerson: number): Observable<Person> {
        return this.http.get<Person>(environment.server + "/person?id=" + idPerson);
    }

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