import { HttpClient } from "@angular/common/http";
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

    /** Constructor */
    constructor(
        private http: HttpClient
    ) { }

    /** PUT: Enviar archivo a backend */
    upload(upload: FormData): Observable<FormData> {
        return this.http.put<FormData>(environment.server + "/evidence", upload);
    }

}