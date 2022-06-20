import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WimGuardGuard implements CanActivate {
  constructor(private AS: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.AS.isLoggedIn()) {
      if (this.AS.getrole() == 3) {
        return true
      } else {
        this.router.navigate(['login'])
        return false
      }
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }
}
