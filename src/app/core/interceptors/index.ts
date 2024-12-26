import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // ajout de l'interceptor dans la liste des interceptors et mettre multi à true car dans une application il peut y avoir plusieurs interceptors
];
