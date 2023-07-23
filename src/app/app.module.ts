import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; /*DOCU: import this one to allow http requests. don't forget to import it in the imports */



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpenseModule } from './expense/expense.module'; /*DOCU: import the created module to allow it to be displayed. otherwise it will say "error cannot match any routes" */
import { DueModule } from './due/due.module';
import { LoginModule } from './login/login.module';
import { HeaderComponent } from './header/header.component';

import { DatePipe } from '@angular/common';

import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { SignupComponent } from './signup/signup.component'

/*DOCU: Whatever moduel or provider you import in your components, you must import it here also and declare it in the corresponding array. */

    @NgModule({
        declarations: [
            HeaderComponent,
            AppComponent,
            SignupComponent
        ],
        imports: [
            BrowserModule,
            ExpenseModule,
            DueModule,
            LoginModule,
            HttpClientModule,
            AppRoutingModule,
        ],
        providers: [DatePipe, {provide:LocationStrategy, useClass:HashLocationStrategy}],
        bootstrap: [AppComponent]
    })
    export class AppModule { }
