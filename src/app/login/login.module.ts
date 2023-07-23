import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { CreateComponent } from './create/create.component';
import { SigninComponent } from './signin/signin.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';

@NgModule({
  declarations: [
    CreateComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
