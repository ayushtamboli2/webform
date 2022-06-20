import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WimService {

  constructor(private http: HttpClient) { }

  getFunction(functionName: any) {
    return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {
      throw new Error(e);
    }));
  };

  //update Department
  updateFunction(functionName: any, data: any) {
    // console.log(data)
    return this.http.put(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

}
