import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment } from "../model/Comment";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    /**
     * Constructor: inicializa servicio HttpClient para comunicación con backend.
     * 
     * @param http Servicio HttpClient
     */
    constructor(
        private http: HttpClient
    ) { }

    saveComment(comment: Comment): Observable<void> {
        return this.http.put<void>(environment.server + "/comment", comment);
    }


    deleteComment(id: number): Observable<void> {
        return this.http.delete<void>(environment.server + "/comment/"+id);
    }
}