import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate { // permet de proteger les routes de l'application
  
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {  // sera appelé avant d'acceder à une route  // retourne true si l'utilisateur est connecté, false sinon
 
        const token = this.auth.getToken();

        if(token) {
            return true;
        } else {
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
  

}