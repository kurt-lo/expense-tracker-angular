import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Expense } from './expense';  /*DOCU: This is the interface, expense.ts */

/* 
  DOCU: This is where the API endpoint and angular communicates. This is where methods should be placed. 
  HTTPHeaders define what type of data it expects from the api.
*/


@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private apiURL = 'https://localhost:7162/api/Expense/';
    //define header options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type':'application/json'
        })
    }
    constructor(private httpClient:HttpClient) { } /*DOCU: We declare the httpClient to allow us to use its methods. */
    //getting all records
    getAll():Observable<any>{
        return this.httpClient.get(this.apiURL + 'GetExpenses')
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //create method 03/01/2023
    /*DOCU: post request just like in ajax $.post() where the values from the form values as argument are stringified. */
    create(expense:Expense):Observable<any>{
        return this.httpClient.post(this.apiURL + 'InsertExpenses', JSON.stringify(expense), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //update method 03/01/2023
    update(id:number, expense:Expense):Observable<any>{
        return this.httpClient.put(this.apiURL + 'UpdateExpenseById/' + id, JSON.stringify(expense), this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //delete method 03/01/2023
    delete(id:number){
        return this.httpClient.delete(this.apiURL + 'DeleteExpense/'+ id, this.httpOptions)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //search
    find(id:number):Observable<any>{
        console.log("find #: " + this.apiURL + "GetExpenseById/" + id);
        return this.httpClient.get(this.apiURL + "GetExpenseById/" + id)
        .pipe(
            catchError(this.errorHandler)
        )
    }

    //show expenses by category
    show_by_category(category:string):Observable<any>{
        console.log("the items in the category are: " + this.apiURL + "ShowExpensesByCategory/" + category);
        return this.httpClient.get(this.apiURL + "ShowExpensesByCategory?category=" + category)
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
