import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {path:'', redirectTo:'login/signin', pathMatch:'full'},
  {path:'login/signin', component:SigninComponent},
  {path:'login/create', component:CreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
