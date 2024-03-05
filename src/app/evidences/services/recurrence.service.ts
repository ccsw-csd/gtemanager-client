import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../model/Comment";

@Injectable({
    providedIn: 'root'
})
export class RecurrenceService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    save(personId, enabled): Observable<void> {
        return this.http.put<void>(environment.server + "/recurrence", {personId: personId, enabled: enabled});
    }

    saveMultiple(personId, enabled): Observable<void> {
        return this.http.put<void>(environment.server + "/recurrence/multiple", {personId: personId, enabled: enabled});
    }

}