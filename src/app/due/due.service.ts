import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Due } from './due';

@Injectable({
  providedIn: 'root'
})
export class DueService {
    private apiURL = 'https://localhost:7162/api/Due/';
    //define header options
    httpOptions = {
        headers: new HttpHeaders ({
            'Content-type':'application/json'
        })
    }

    constructor(private httpClient:HttpClient) { } /*DOCU: We declare the httpClient to allow us to use its methods. */
    /*DOCU: Getting all records from Due API */
    getAll():Observable<any>{
        return this.httpClient.get(this.apiURL + 'GetDues')
        .pipe(
            catchError(this.errorHandler)
        )
    }

    /*DOCU: Create a record by submitting a put(post) request to your API endpoint. 
    Observable<any> is the return type of this method. An observable is a data that are emitted
    overtime so that any changes you can subscribe to that data.*/
    create(due:Due):Observable<any>{
        return this.httpClient.post(this.apiURL + 'InsertDue', JSON.stringify(due), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    /*DOCU: Delete method just gets the id from the url and it becomes the argument for your method. */
    delete(id:number){
        return this.httpClient.delete(this.apiURL + 'DeleteDue/' + id, this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    /*DOCU: This method will find the due data according to property Id. This is needed for
    view method as well since it needs to get the data for a particular entry Id. */
    find(id:number):Observable<any>{
        return this.httpClient.get(this.apiURL + 'GetDueById/' + id, this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }


    /*DOCU: the edit method is using HttpPut to update the existing values by Id. */
    edit(id:number, due:Due):Observable<any>{
        return this.httpClient.put(this.apiURL + 'UpdateDueById/' + id, JSON.stringify(due), this.httpOptions)
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
