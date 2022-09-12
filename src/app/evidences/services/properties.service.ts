import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Properties } from "../model/Properties";

@Injectable({
    providedIn: 'root'
})
export class PropertiesService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    findAll(): Observable<Properties[]> {
        return this.http.get<Properties[]>(environment.server + "/properties/");
    }
}