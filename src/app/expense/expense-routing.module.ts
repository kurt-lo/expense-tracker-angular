import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';

/*DOCU: domain+ /path is the link url for the components. */
const routes: Routes = [
    {path:'expense', redirectTo:'expense/index', pathMatch: 'full'},
    {path:'expense/index', component:IndexComponent},
    {path:'expense/view/:expenseId', component: ViewComponent},
    {path:'expense/create', component: CreateComponent},
    {path:'expense/edit/:expenseId', component: EditComponent},
    {path:'expense/summary', component: ExpenseSummaryComponent},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseRoutingModule { }
