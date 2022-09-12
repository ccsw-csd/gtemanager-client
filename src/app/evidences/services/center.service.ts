import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Center } from "../model/Center";

@Injectable({
    providedIn: 'root'
})
export class CenterService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<Center[]> {

        return this.http.get<Center[]>(environment.server + "/center/");
    }
}
