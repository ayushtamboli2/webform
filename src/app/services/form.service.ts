import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getFunction(functionName: any) {
    return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

      throw new Error(e);
    }));
  };

  // captcha
  getCaptcha(){
    return this.http.get(environment.rootUrl +'captcha')   
  }

  saveDetails(functionName: any, data: any) {
    //console.log("kuch bhi",data);
    //console.log("kuch bhi",data.user_id[0]);
    return this.http.post(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

}
