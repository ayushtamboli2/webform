import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router, private helper: JwtHelperService) { }

  departmentlogin(credentials: any): Observable<any> {
    return this.http.post(environment.rootUrl + 'login/login', credentials).pipe(map((res: any) => {
      if (res && res.token) {
        localStorage.setItem('token', res.token)
      }
      return res;
    }))
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token')) {
      return true
    } else {
      return false
    }
  }

  get currentUser() {
    const token = localStorage.getItem('token')
    if (token) {
      if (!this.helper.isTokenExpired(token)) {
        return this.helper.decodeToken(token)
      } else {
        this.logout()
      }
    }
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getrole() {
    return this.currentUser.rolecode;
  }

}