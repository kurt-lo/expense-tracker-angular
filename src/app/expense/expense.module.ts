import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseRoutingModule } from './expense-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';

/*DOCU: Components from due module to be imported in order to use it in the view. */
import { DueModule } from '../due/due.module';

/*DOCU: you need this if you want to use form methods */
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ExpenseSummaryComponent } from './expense-summary/expense-summary.component';



@NgModule({
    declarations: [
        IndexComponent,
        CreateComponent,
        ViewComponent,
        EditComponent,
        ExpenseSummaryComponent,

    ],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DueModule
    ],
})
export class ExpenseModule { }
