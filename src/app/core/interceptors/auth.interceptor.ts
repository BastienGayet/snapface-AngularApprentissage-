import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // appel pour toute requete envpoyer par l'applciaiton 
        // les object req est immuable, il faut le cloner pour le modifier

        const headers = new HttpHeaders()
        .append('Authorization', `Bearer ${this.auth.getToken()}`); // ajout du token dans le header de la requete

        const  modifiedReq = req.clone({ headers}); // clonage de la requete avec les nouveaux headers


        return next.handle(modifiedReq); // envoie de la requete modifié
    }
}