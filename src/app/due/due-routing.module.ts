import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path:'due', redirectTo:'due/index', pathMatch:'full'},
  {path:'due/index', component:IndexComponent},
  {path:'due/view/:dueId', component:ViewComponent},
  {path:'due/create', component:CreateComponent},
  {path:'due/edit/:dueId', component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DueRoutingModule { }
