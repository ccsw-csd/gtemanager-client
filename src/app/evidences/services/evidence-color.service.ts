import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../model/Comment";

@Injectable({
    providedIn: 'root'
})
export class EvidenceColorService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    modifyColor(personId: number, rowColor: String): Observable<void> {
        return this.http.put<void>(environment.server + "/evidence-color/"+personId+"/"+rowColor, null);
    }
}