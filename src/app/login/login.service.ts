import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Login } from './login';

@Injectable({
providedIn: 'root'
})
export class LoginService {

    private apiURL = 'https://localhost:7162/api/User/'
    //define header options
    httpOptions = {
        headers: new Headers({
            'Content-type':'application/json'
        })
    }

    constructor(private httpClient:HttpClient) { }

    find(username:string, password:string):Observable<any>{
        return this.httpClient.get(this.apiURL+ 'LogIn?username='+username+'&password='+password)
        .pipe(
            catchError(this.errorHandler)
        )
    }



    //error handler
    errorHandler(error:any){
        let errorMessage = '';
        if(error.error instanceof ErrorEvent){
            errorMessage = error.error.message;
        }else{
            errorMessage = 'Error code: ${error.status}\n ${error.message}';
        }

        return throwError(errorMessage);
        }
}
