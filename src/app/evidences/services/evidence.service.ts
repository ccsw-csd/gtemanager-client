import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Upload } from "../models/Upload";

@Injectable({
    providedIn: 'root'
})
export class EvidenceService {

    http: HttpClient;

    upload(upload: Upload): Observable<Upload> {
        return this.http.put<Upload>(environment.server + "/evidence", upload);
    }

}