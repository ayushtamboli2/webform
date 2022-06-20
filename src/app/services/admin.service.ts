import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //Get Function for All
  getFunction(functionName: any) {
    return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

      throw new Error(e);
    }));
  }

  //Get Function1 for All
  getFunction1(functionName: any) {
    return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

      throw new Error(e);
    }));
  }

  //add User 
  saveDetails(functionName: any, data: any) {
    //console.log("kuch bhi",data);
    //console.log("kuch bhi",data.user_id[0]);
    return this.http.post(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  //delete Department
  deleteFunction(functionName: any) {
    return this.http.delete(environment.rootUrl + functionName).pipe(tap(res => res),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  //update Department
  updateFunction(functionName: any, data: any) {
    // console.log(data)
    return this.http.put(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  //add User 
  sendQuery(functionName: any, data: any) {
    //console.log("kuch bhi",data);
    //console.log("kuch bhi",data.user_id[0]);
    return this.http.post(environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }


}
